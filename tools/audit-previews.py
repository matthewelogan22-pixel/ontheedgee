"""Corrected audit: full-payload image hashes, non-capturing claim groups."""
import re, pathlib, hashlib, collections

D = pathlib.Path("C:/Users/Admin/ontheedgee/public/preview")
files = sorted(D.glob("*.html"))

B64 = re.compile(r'data:image/[a-z]+;base64,([A-Za-z0-9+/=]+)')
# every alternative non-capturing so findall returns whole matches
CLAIMS = re.compile(
    r'licen[sc]ed|fully insured|public liability insurance|certified|accredited|'
    r'\b\d{1,2}\+? years\b|qbcc|master (?:electrician|plumber|builder)|'
    r'award.winning|fully qualified', re.I)

imgs_by_hash = collections.defaultdict(list)
rows, weights = [], []

for f in files:
    raw = f.read_text(encoding="utf-8", errors="replace")
    payloads = B64.findall(raw)
    for i, p in enumerate(payloads):
        # hash the ENTIRE payload - headers alone collide
        imgs_by_hash[hashlib.sha1(p.encode()).hexdigest()[:16]].append(f"{f.stem}#{i}")
        weights.append((len(p) * 3 // 4, f.stem, i))

    body = B64.sub("IMG", raw)
    txt = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', body, flags=re.S)
    txt = re.sub(r'<[^>]+>', ' ', txt)
    txt = re.sub(r'\s+', ' ', txt)
    rows.append(dict(name=f.stem, kb=round(len(raw)/1024), n=len(payloads),
                     claims=sorted(set(m.lower() for m in CLAIMS.findall(txt) if m))))

print("=" * 66)
dupes = {k: v for k, v in imgs_by_hash.items() if len(v) > 1}
cross = {k: v for k, v in dupes.items()
         if len({e.split('#')[0] for e in v}) > 1}
print(f"[A] IDENTICAL PHOTOS SHARED ACROSS DIFFERENT BUSINESSES: {len(cross)} group(s)")
for v in cross.values():
    print("    " + "  ".join(sorted(v)))
if not cross:
    print("    none")

same = {k: v for k, v in dupes.items() if k not in cross}
print(f"\n[B] SAME PHOTO REPEATED WITHIN ONE PAGE: {len(same)} case(s)")
for v in same.values():
    print("    " + "  ".join(sorted(v)))
if not same:
    print("    none")

claimed = [r for r in rows if r["claims"]]
print(f"\n[C] CREDENTIAL CLAIMS IN VISIBLE COPY: {len(claimed)} file(s)")
for r in claimed:
    print(f"    {r['name']:40} {r['claims']}")
if not claimed:
    print("    none")

print(f"\n[D] PAGE WEIGHT - anything over 1.5MB is a problem on mobile data")
for r in sorted(rows, key=lambda r: -r["kb"])[:10]:
    bar = "#" * min(40, r["kb"] // 130)
    print(f"    {r['name']:40} {r['kb']:5} KB {bar}")
over = [r for r in rows if r["kb"] > 1500]
print(f"    --> {len(over)} of {len(rows)} pages exceed 1.5MB")

print(f"\n[E] SINGLE HEAVIEST IMAGES")
for sz, name, i in sorted(weights, reverse=True)[:8]:
    print(f"    {name+'#'+str(i):46} {sz//1024:5} KB")
