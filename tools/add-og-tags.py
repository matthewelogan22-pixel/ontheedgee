"""Add OpenGraph/Twitter card tags to preview pages so shared links render a
proper card instead of a bare URL.

Insertion happens inside <head> only; base64 image payloads are never touched.
"""
import re, sys, pathlib, html

BASE = "https://ontheedge.app/preview/"

def main(paths):
    done = skipped = 0
    for p in paths:
        path = pathlib.Path(p)
        src = path.read_text(encoding="utf-8", errors="surrogateescape")

        if "og:title" in src:
            skipped += 1
            continue

        m_title = re.search(r"<title>(.*?)</title>", src, re.S)
        if not m_title:
            print(f"SKIP (no <title>): {path.name}")
            skipped += 1
            continue
        title = m_title.group(1).strip()

        m_desc = re.search(r'<meta\s+name="description"\s+content="(.*?)"\s*/?>', src, re.S)
        desc = m_desc.group(1).strip() if m_desc else title

        url = BASE + path.name
        tags = (
            f'\n<meta property="og:type" content="website">'
            f'\n<meta property="og:site_name" content="{html.escape(title, quote=True)}">'
            f'\n<meta property="og:title" content="{html.escape(title, quote=True)}">'
            f'\n<meta property="og:description" content="{desc}">'
            f'\n<meta property="og:url" content="{url}">'
            f'\n<meta name="twitter:card" content="summary_large_image">'
            f'\n<meta name="twitter:title" content="{html.escape(title, quote=True)}">'
            f'\n<meta name="twitter:description" content="{desc}">'
        )

        # anchor after the description meta when present, else after </title>
        if m_desc:
            out = src[:m_desc.end()] + tags + src[m_desc.end():]
        else:
            out = src[:m_title.end()] + tags + src[m_title.end():]

        if src.count("base64,") != out.count("base64,"):
            print(f"SKIP (base64 count changed): {path.name}")
            skipped += 1
            continue

        path.write_text(out, encoding="utf-8", errors="surrogateescape")
        done += 1

    print(f"tagged: {done}   skipped: {skipped}")

if __name__ == "__main__":
    main(sys.argv[1:])
