# the WHYKINGS Academy — website

Marketing site for **the WHYKINGS Academy**, designed in Claude Design and
hosted free on GitHub Pages.

- **Live:** https://www.thewhykingsacademy.com
- **Repo:** https://github.com/theWHYKINGS/academy (Pages: branch `main`, root)
- **Design project:** https://claude.ai/design/p/e696e06a-4026-4306-a498-ef6b7d67bbd9

Same deploy loop as the main site (`~/Desktop/website-dev` →
theWHYKINGS.github.io), just a second project.

## The loop

1. You edit the page in **Claude Design**.
2. You say **"deploy"**.
3. Claude pulls the live source + its dependencies through the authenticated
   browser session, unpacks them here, and pushes to GitHub Pages.

See [scripts/pull-from-design.md](scripts/pull-from-design.md) for the details.

```bash
python3 scripts/unpack_code.py              # newest ~/Downloads/ak_code*.json -> repo
scripts/deploy.sh "describe what changed"   # build_legal + commit + push
```

## Layout

| Path | What |
|---|---|
| `index.html` | the page — the Claude Design source `Academy Redesign.dc.html`, renamed |
| `support.js`, `_ds/` | its code + design-system dependencies (pulled, never hand-edited) |
| `assets/` | images referenced by the page (helm, wordmark, client logos) |
| `legal/` | built Impressum + Datenschutz (generated — edit `src/legal/` instead) |
| `src/legal/` | legal page sources + `legal.css` |
| `scripts/` | pull / build / deploy tooling |
| `CNAME`, `.nojekyll` | GitHub Pages config — do not delete |

## DNS status

The domain's nameservers currently point at **OnePage.io**, where the old site
is hosted. Until DNS is switched to GitHub Pages, the custom domain will not
serve this repo — use the `github.io` URL to preview.
