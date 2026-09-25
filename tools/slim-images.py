"""Recompress the base64 images embedded in every preview build.

Photos were embedded straight from Unsplash at full size, so several pages
run to multiple megabytes. This decodes each payload, caps its width, and
re-encodes as progressive JPEG, walking quality down until it fits a byte
budget. Image COUNT is asserted unchanged; nothing else in the file is touched.

    python slim.py          dry run - report only
    python slim.py --apply  rewrite the files
"""
import re, sys, base64, io, pathlib
from PIL import Image

D = pathlib.Path("C:/Users/Admin/ontheedgee/public/preview")
APPLY = "--apply" in sys.argv

MAX_W_LARGE = 1100      # the biggest image on a page (usually the hero)
MAX_W_OTHER = 800
BUDGET      = 150 * 1024   # bytes of encoded JPEG we accept per image
Q_START, Q_FLOOR, Q_STEP = 76, 58, 6

URI = re.compile(r'data:image/([a-z]+);base64,([A-Za-z0-9+/=]+)')


def recompress(raw: bytes, max_w: int):
    im = Image.open(io.BytesIO(raw))
    im.load()
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    if im.width > max_w:
        h = round(im.height * max_w / im.width)
        im = im.resize((max_w, h), Image.LANCZOS)
    best = None
    q = Q_START
    while q >= Q_FLOOR:
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
        best = buf.getvalue()
        if len(best) <= BUDGET:
            return best, im.size, q
        q -= Q_STEP
    # still over budget at the floor - shrink further, once
    if im.width > 640:
        h = round(im.height * 640 / im.width)
        im = im.resize((640, h), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=Q_FLOOR, optimize=True, progressive=True)
        best = buf.getvalue()
    return best, im.size, Q_FLOOR


before_total = after_total = 0
changed = []

for f in sorted(D.glob("*.html")):
    src = f.read_text(encoding="utf-8")
    hits = list(URI.finditer(src))
    if not hits:
        continue
    sizes = [len(m.group(2)) for m in hits]
    biggest = sizes.index(max(sizes))

    out, cursor, parts = [], 0, []
    for i, m in enumerate(hits):
        raw = base64.b64decode(m.group(2))
        max_w = MAX_W_LARGE if i == biggest else MAX_W_OTHER
        try:
            new, dims, q = recompress(raw, max_w)
        except Exception as e:
            print("   !! %s#%d decode failed (%s) - left untouched" % (f.stem, i, e))
            continue
        if len(new) >= len(raw):        # never make it bigger
            continue
        parts.append((m, new, len(raw), dims, q))

    if not parts:
        continue

    for m, new, oldlen, dims, q in parts:
        out.append(src[cursor:m.start()])
        out.append("data:image/jpeg;base64," + base64.b64encode(new).decode())
        cursor = m.end()
    out.append(src[cursor:])
    newsrc = "".join(out)

    n_before = src.count("base64,")
    n_after = newsrc.count("base64,")
    assert n_before == n_after, "%s: image count changed %d -> %d" % (f.stem, n_before, n_after)

    kb0, kb1 = len(src) / 1024, len(newsrc) / 1024
    before_total += kb0
    after_total += kb1
    if kb0 - kb1 > 20:
        changed.append((f, newsrc, kb0, kb1))

changed.sort(key=lambda r: r[2] - r[3], reverse=True)
print("%-40s %9s %9s %8s" % ("page", "before", "after", "saved"))
print("-" * 70)
for f, _, kb0, kb1 in changed:
    print("%-40s %7.0f KB %7.0f KB  %6.0f%%" % (f.stem, kb0, kb1, 100 * (kb0 - kb1) / kb0))
print("-" * 70)
print("%-40s %7.1f MB %7.1f MB  %6.0f%%" % (
    "TOTAL across %d pages" % len(changed),
    before_total / 1024, after_total / 1024,
    100 * (before_total - after_total) / before_total if before_total else 0))

if APPLY:
    for f, newsrc, _, _ in changed:
        f.write_text(newsrc, encoding="utf-8")
    print("\nWROTE %d files" % len(changed))
else:
    print("\n(dry run - pass --apply to write)")
