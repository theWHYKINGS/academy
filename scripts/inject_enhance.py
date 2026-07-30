#!/usr/bin/env python3
"""inject_enhance.py — ensure every published page loads /enhance.js.

The pages are regenerated from Claude Design on every deploy, which drops our
<script src="/enhance.js"> tag. This re-adds it (idempotently) just before
</body> on each page in scripts/pages.py, so the contact form + footer legal
links survive every pull. The src is root-absolute so it resolves from any
page depth.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import PAGES                              # noqa: E402

root = Path(__file__).resolve().parent.parent
TAG = '<script defer src="/enhance.js"></script>'

for page in PAGES:
    path = root / page["out"]
    html = path.read_text(encoding="utf-8")
    if 'src="/enhance.js"' in html:
        print(f"  enhance.js already on {page['out']}")
        continue
    i = html.rfind("</body>")
    if i == -1:
        raise SystemExit(f"ERROR: no </body> in {page['out']}")
    html = html[:i] + "  " + TAG + "\n" + html[i:]
    path.write_text(html, encoding="utf-8")
    print(f"✓ enhance.js injected into {page['out']}")
