#!/usr/bin/env python3
"""inject_head.py — add the bits the Claude Design source doesn't carry, to
every published page (see scripts/pages.py).

The pages are regenerated from Claude Design on every deploy, so anything we add
by hand is wiped each pull. This re-applies it idempotently, per page:

  * <html lang="de">
  * per-page <title> + meta description + canonical + og/twitter tags
  * favicon / apple-touch-icon links
  * footer legal links (the design source points them at "#kontakt")

All links are root-absolute (/legal/…, /assets/…) so they work from any page
depth. Run after unpack_code.py; deploy.sh does that for you.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import PAGES, SITE                       # noqa: E402

root = Path(__file__).resolve().parent.parent

BEGIN, END = "<!-- injected-head:begin -->", "<!-- injected-head:end -->"


def head_block(page):
    url = SITE + page["url"]
    return f"""{BEGIN}
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{page['title']}</title>
<meta name="description" content="{page['desc']}" />
<link rel="canonical" href="{url}" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/favicon-32.png" />
<link rel="icon" type="image/png" sizes="64x64" href="/assets/logos/favicon-64.png" />
<link rel="apple-touch-icon" href="/assets/logos/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{page['title']}" />
<meta property="og:description" content="{page['desc']}" />
<meta property="og:url" content="{url}" />
<meta property="og:image" content="{SITE}/assets/wordmark-green.png" />
<meta name="twitter:card" content="summary_large_image" />
{END}
"""


def process(page):
    path = root / page["out"]
    html = path.read_text(encoding="utf-8")
    changed = []

    if not re.search(r"<html[^>]*\blang=", html):
        html = re.sub(r"<html\b", '<html lang="de"', html, count=1)
        changed.append('lang')

    block = head_block(page)
    if BEGIN in html:
        html = re.sub(re.escape(BEGIN) + r".*?" + re.escape(END) + r"\n?",
                      block, html, flags=re.S)
    else:
        i = html.find("<head>")
        if i == -1:
            raise SystemExit(f"ERROR: no <head> in {page['out']}")
        html = html[: i + len("<head>")] + "\n" + block + html[i + len("<head>"):]
        changed.append("head")

    # footer legal links — the design source points both at "#kontakt".
    # Absolute /legal/… so detail pages in subfolders link correctly too.
    for label, target in (("Impressum", "/legal/Impressum.html"),
                          ("Datenschutz", "/legal/Datenschutz.html")):
        html, n = re.subn(r'href="#kontakt"(?=[^>]*>' + label + r"</a>)",
                          f'href="{target}"', html)
        if n:
            changed.append(label)

    path.write_text(html, encoding="utf-8")
    return changed


for page in PAGES:
    ch = process(page)
    print(f"✓ inject_head {page['out']}: " + (", ".join(ch) if ch else "up to date"))
