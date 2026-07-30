#!/usr/bin/env python3
"""localize_assets.py — point the pulled source at locally hosted assets.

The Claude Design source loads webfonts from fonts.googleapis.com and React /
Babel from unpkg.com. Both send the visitor's IP to a third party, which we'd
otherwise have to disclose (and defend) in the Datenschutzerklärung. Everything
is committed to this repo instead, and this script rewrites the references
after every pull — idempotently, so it can run on every deploy.

  * _ds/<ds>/tokens/fonts.css : the Google Fonts @import  ->  vendor/fonts-local.css
  * support.js                : the three unpkg URLs      ->  vendor/*.js

The vendored JS files are byte-identical to what unpkg serves — verified
against the SRI hashes that support.js itself carries (see --check), so the
browser's integrity check keeps working after the rewrite.

    python3 scripts/localize_assets.py            # rewrite (run by deploy.sh)
    python3 scripts/localize_assets.py --check    # verify vendored files only

Refreshing the fonts (new weights/families in the design system) is a manual
step — download the Google CSS, save the .woff2 files to assets/fonts/ and
regenerate vendor/fonts-local.css with paths like ../assets/fonts/<file>.
"""
import base64
import hashlib
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent

UNPKG = {
    "https://unpkg.com/react@18.3.1/umd/react.production.min.js":
        ("vendor/react.production.min.js", "REACT_SRI"),
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js":
        ("vendor/react-dom.production.min.js", "REACT_DOM_SRI"),
    "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js":
        ("vendor/babel.min.js", "BABEL_SRI"),
}

FONTS_LOCAL = "vendor/fonts-local.css"


def check_sri(support_src: str) -> list:
    """Compare each vendored JS file against the SRI hash support.js declares."""
    problems = []
    for url, (rel, sri_var) in UNPKG.items():
        m = re.search(sri_var + r'\s*=\s*"([^"]+)"', support_src)
        f = root / rel
        if not f.exists():
            problems.append(f"missing: {rel}")
            continue
        if not m:
            continue                      # source no longer declares an SRI hash
        algo, expected = m.group(1).split("-", 1)
        got = base64.b64encode(hashlib.new(algo, f.read_bytes()).digest()).decode()
        if got != expected:
            problems.append(f"SRI mismatch: {rel} (source expects a different build)")
    return problems


def main() -> int:
    changed = []

    # --- fonts ---
    fonts_css = list(root.glob("_ds/*/tokens/fonts.css"))
    if not fonts_css:
        print("  ! no _ds/*/tokens/fonts.css found — skipping fonts")
    for css in fonts_css:
        s = css.read_text(encoding="utf-8")
        depth = len(css.relative_to(root).parts) - 1        # …/tokens/fonts.css
        rel = "../" * depth + FONTS_LOCAL
        new, n = re.subn(
            r"@import\s+url\(['\"]https://fonts\.googleapis\.com/[^)]*\);",
            f"@import url('{rel}');", s)
        if n:
            css.write_text(new, encoding="utf-8")
            changed.append(f"{css.relative_to(root)} → {rel}")
        elif rel not in s:
            print(f"  ! {css.relative_to(root)}: no Google Fonts @import and no local "
                  f"import — check the design system's fonts.css")

    # --- unpkg ---
    support = root / "support.js"
    if support.exists():
        s = support.read_text(encoding="utf-8")
        problems = check_sri(s)
        if problems:
            print("  ! " + "\n  ! ".join(problems))
            print("  ! refusing to rewrite support.js — re-download the vendored files")
            return 1
        for url, (rel, _) in UNPKG.items():
            if url in s:
                # root-absolute: support.js is loaded from /support.js but any
                # relative ref inside it resolves against the *page* URL, which
                # on a /slug/ detail page would 404. /vendor/… works everywhere.
                s = s.replace(url, "/" + rel)
                changed.append(f"support.js → /{rel}")
        for url in re.findall(r"https://unpkg\.com/[^\"'\s)]+", s):
            print(f"  ! support.js still points at an unknown CDN file: {url}")
        support.write_text(s, encoding="utf-8")

    print("✓ localize_assets: " + (", ".join(changed) if changed else "already local"))
    return 0


if __name__ == "__main__":
    if "--check" in sys.argv:
        probs = check_sri((root / "support.js").read_text(encoding="utf-8"))
        print("\n".join(probs) if probs else "✓ vendored files match the declared SRI hashes")
        raise SystemExit(1 if probs else 0)
    raise SystemExit(main())
