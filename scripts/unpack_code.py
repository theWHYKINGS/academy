#!/usr/bin/env python3
"""unpack_code.py — decode an ak_code.json bundle pulled from the Claude Design
Academy project into the repo, as a multi-page site.

The bundle holds the page sources (Academy Redesign + training detail pages)
under their original design filenames, plus shared dependencies (support.js,
_ds/…). This writes:

  * each page in scripts/pages.py to its `out` path, with asset refs made
    root-absolute and cross-page links rewritten to their clean URLs, and
  * every other bundle entry (deps) to its own path unchanged.

Pages NOT listed in pages.py (an offline export, a scaffold/template, an old
variant) are skipped — they must never be published.

    python3 scripts/unpack_code.py [path/to/ak_code.json]
    (defaults to the newest ~/Downloads/ak_code*.json)
"""
import base64
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import PAGES, absolutize_assets, rewrite_links   # noqa: E402

root = Path(__file__).resolve().parent.parent

if len(sys.argv) > 1:
    src = Path(sys.argv[1])
else:
    matches = sorted(Path.home().glob("Downloads/ak_code*.json"), key=lambda p: p.stat().st_mtime)
    if not matches:
        raise SystemExit("No ak_code*.json found in ~/Downloads")
    src = matches[-1]
print(f"reading {src.name}")

data = json.loads(src.read_text(encoding="utf-8"))
by_src = {p["src"]: p for p in PAGES}

# Every page declared in pages.py must actually be in the bundle, or we'd
# silently publish a site with dead internal links.
missing = [p["src"] for p in PAGES if p["src"] not in data]
if missing:
    raise SystemExit(f"pages.py lists pages missing from the bundle: {missing}\n"
                     f"bundle has: {[k for k in data if k.endswith('.html')]}")

pages_written, deps_written, skipped = 0, 0, []
for rel, obj in data.items():
    raw = base64.b64decode(obj["content"])

    if rel in by_src:                                    # a published page
        out = by_src[rel]["out"]
        html = raw.decode("utf-8")
        html = absolutize_assets(html)
        html = rewrite_links(html)
        dest = (root / out).resolve()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html, encoding="utf-8")
        pages_written += 1
        print(f"  page: {rel}  ->  {out}")
        continue

    if rel.lower().endswith(".html"):                    # a page we don't publish
        skipped.append(rel)
        continue

    dest = (root / rel).resolve()                        # a dependency / asset
    if root not in dest.parents:
        print(f"  ! skipped (outside repo): {rel}")
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(raw)
    deps_written += 1

print(f"✓ wrote {pages_written} pages + {deps_written} dependencies")
if skipped:
    print(f"  (skipped {len(skipped)} unpublished .html: {', '.join(skipped)})")
