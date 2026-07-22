#!/usr/bin/env python3
"""inject_head.py — add the bits the Claude Design source doesn't carry.

index.html is regenerated from Claude Design on every deploy, so anything we
add by hand is wiped each pull. This re-applies it idempotently:

  * <html lang="de">
  * <title> + meta description + og/twitter tags
  * favicon / apple-touch-icon links
  * footer legal links (the design source points them at "#kontakt")

Run it after unpack_code.py; deploy.sh does that for you.

    python3 scripts/inject_head.py
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
idx = root / "index.html"
html = idx.read_text(encoding="utf-8")

TITLE = "the WHYKINGS ACADEMY — Leadership-Trainings ohne Seminar-Hangover"
DESC = ("Leadership-Trainings der WHYKINGS Academy: praxisnah, wirksam und ohne "
        "Seminar-Hangover. Kurskatalog, Formate und Kontakt.")
URL = "https://www.thewhykingsacademy.com/"

HEAD = f"""<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{TITLE}</title>
<meta name="description" content="{DESC}" />
<link rel="canonical" href="{URL}" />
<link rel="icon" type="image/png" sizes="32x32" href="assets/logos/favicon-32.png" />
<link rel="icon" type="image/png" sizes="64x64" href="assets/logos/favicon-64.png" />
<link rel="apple-touch-icon" href="assets/logos/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:title" content="{TITLE}" />
<meta property="og:description" content="{DESC}" />
<meta property="og:url" content="{URL}" />
<meta property="og:image" content="{URL}assets/wordmark-green.png" />
<meta name="twitter:card" content="summary_large_image" />
"""

changed = []

# 1. <html> -> <html lang="de">
if not re.search(r"<html[^>]*\blang=", html):
    html = re.sub(r"<html\b", '<html lang="de"', html, count=1)
    changed.append('lang="de"')

# 2. head block (marked, so re-runs replace instead of stacking up)
BEGIN, END = "<!-- injected-head:begin -->", "<!-- injected-head:end -->"
block = f"{BEGIN}\n{HEAD}{END}\n"
if BEGIN in html:
    html = re.sub(re.escape(BEGIN) + r".*?" + re.escape(END) + r"\n?", block, html, flags=re.S)
else:
    i = html.find("<head>")
    if i == -1:
        raise SystemExit("ERROR: no <head> found in index.html")
    html = html[: i + len("<head>")] + "\n" + block + html[i + len("<head>") :]
    changed.append("head block")

# 3. footer legal links — the design source points both at "#kontakt"
for label, target in (("Impressum", "legal/Impressum.html"),
                      ("Datenschutz", "legal/Datenschutz.html")):
    new, n = re.subn(r'href="#kontakt"(?=[^>]*>' + label + r"</a>)", f'href="{target}"', html)
    if n:
        html, _ = new, changed.append(f"{label} link")

idx.write_text(html, encoding="utf-8")
print("✓ inject_head: " + (", ".join(changed) if changed else "already up to date"))
