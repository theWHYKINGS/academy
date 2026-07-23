# Pulling the latest from Claude Design (Academy)

Claude does this through the authenticated browser session (Claude-in-Chrome),
because the Claude Design API needs your claude.ai login. These are the steps
Claude runs — you just say **"deploy"**.

## Project

- **Project ID:** `e696e06a-4026-4306-a498-ef6b7d67bbd9`
- **Entry file:** the single top-level **`*.dc.html`** → published as `index.html`
- **API base:** `https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/`
- **Auth:** claude.ai session cookies (same-origin fetch from an open claude.ai tab)

## ⚠️ Which file is the source?

`ListFiles` first, then pick by rule — the entry file has already been renamed
once (`Academy Redesign.dc.html` → `Academy Deploy.dc.html` → back again), so
never assume a name:

- **Use** the top-level `*.dc.html` — that's the editable design source.
- **Never** publish `theWHYKINGS Academy.html` (~1.4 MB, `<title>Bundled Page</title>`).
  That's the offline export, which lags behind the source.
- **If more than one `.dc.html` exists** (e.g. a copy, or a "Hero Layout Optionen"
  variant), stop and ask which one is canonical — publishing the wrong copy ships
  changes Dominik didn't make. As of 2026-07-23 he cleaned the project up so only
  one remains.

## We host the SOURCE, not the offline export

The Claude Design offline export lags behind edits, so we build from the live
source. It's client-rendered but always current.

## ⚠️ Discover the file list DYNAMICALLY

The Academy source is simpler than the main site (no `sections/*.jsx`), but the
dependency set still changes. Pull the source first, then parse **its own**
references — never hardcode.

```js
const PID = 'e696e06a-4026-4306-a498-ef6b7d67bbd9';
const call = async (path) => (await fetch(
  'https://claude.ai/design/anthropic.omelette.api.v1alpha.OmeletteService/GetFile',
  { method:'POST', headers:{'Content-Type':'application/json','Connect-Protocol-Version':'1'},
    credentials:'include', body: JSON.stringify({ projectId: PID, path }) })).json();

// 1. pull the source, decode it
const srcB64 = (await call('Academy Redesign.dc.html')).content;
const src = new TextDecoder().decode(Uint8Array.from(atob(srcB64), c => c.charCodeAt(0)));

// 2. derive the dependency list FROM the source (no hardcoding)
const refs = [...src.matchAll(/(?:src|href)="((?:sections\/|_ds\/|assets\/)[^"]+|(?:\.\/)?[\w.-]+\.js)"/g)]
  .map(m => m[1].replace(/^\.\//, '')).filter(p => !p.startsWith('http'));
const paths = ['Academy Redesign.dc.html', ...new Set(refs)];
// → currently: support.js, _ds/<design-system>/tokens/*.css, styles.css, _ds_bundle.js,
//   plus assets/*.png. Also add any _ds/tokens/*.css that styles.css @imports.

// 3. bundle-fetch code files into ak_code.json, images into ak_images.json,
//    download them (bytes stay out of context)
```

Note the prefixes: **`ak_`** for Academy bundles, `wk_` for the main site — so the
two never get mixed up in ~/Downloads.

## Then, locally

```bash
python3 scripts/unpack_code.py        # newest ak_code*.json -> repo (source -> index.html)
scripts/deploy.sh "describe what changed"   # build_legal + commit + push
```

## Images (only when they change)

Images live under `assets/` and are committed. Re-pull only if a local render
shows broken images: bundle-fetch them as `ak_images.json`, then
`python3 scripts/unpack_images.py`.

## Legal pages

`src/legal/` holds the Impressum/Datenschutz sources (copied from the main site);
`scripts/build_legal.py` (run by deploy.sh) turns them into self-contained pages
at `legal/Impressum.html` + `legal/Datenschutz.html`.

## Gotchas

- The source's `<script data-omelette-injected>` harness is re-minified server-side
  on every fetch, so `index.html` always shows a diff — noise, not a real change.
  It's inert when hosted standalone (self-disables when `window.parent === window`).
- `.nojekyll` must stay (so GitHub serves the `_ds/` underscore folder).
- The Chrome extension disconnects often mid-session — reconnect and retry.
- DNS: the domain's nameservers point at OnePage.io — until that changes, the
  custom domain will NOT serve from GitHub Pages.
