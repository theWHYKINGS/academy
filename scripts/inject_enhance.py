#!/usr/bin/env python3
"""inject_enhance.py — ensure index.html loads enhance.js.

The page is regenerated from Claude Design on every deploy, which drops
our <script src="enhance.js"> tag. This re-adds it (idempotently) just before
</body>, so the footer legal links + working contact form survive every pull.

    python3 scripts/inject_enhance.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
idx = root / "index.html"
html = idx.read_text(encoding="utf-8")

TAG = '<script defer src="enhance.js"></script>'

if 'src="enhance.js"' in html:
    print("enhance.js already injected — nothing to do")
else:
    i = html.rfind("</body>")
    if i == -1:
        raise SystemExit("ERROR: no </body> found in index.html")
    html = html[:i] + "  " + TAG + "\n" + html[i:]
    idx.write_text(html, encoding="utf-8")
    print("enhance.js injected into index.html")
