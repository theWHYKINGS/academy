#!/usr/bin/env python3
"""pages.py — the single source of truth for which Claude Design files become
which published pages, and under which URL.

The Academy started as one page and grew into a small multi-page site (homepage
+ training detail pages). Every build script imports PAGES from here so the set
of pages, their output paths, URLs and <head> metadata live in ONE place.

Adding a training detail page = add one (code, title) tuple to TRAININGS below.
The design stores each training as `trainings/<title>(<code>).dc.html`; its clean
URL is the slugified title (so K1 "Die fünf Gespräche" -> /die-fuenf-gespraeche/).
LINK_REWRITES maps the raw filenames to those URLs for STATIC hrefs (e.g. a detail
page's "back to home" link); the homepage's catalog "Details" links are built at
runtime by the design's React, so enhance.js rewrites those by code using
AK_TRAINING_URLS.
"""
import re
import urllib.parse

SITE = "https://www.thewhykingsacademy.com"

# Every training detail page: (code, exact title as it appears in the design
# filename `trainings/<title>(<code>).dc.html`). Order here only affects logging.
TRAININGS = [
    ("K1", "Die fünf Gespräche"),
    ("K2", "Aus dem Team in Führung"),
    ("K3", "Führung übernehmen, ohne alles zu übernehmen"),
    ("K4", "Leistung führen. Menschlich bleiben."),
    ("K5", "Druck von oben. Erwartungen von unten."),
    ("K6", "Veränderung führen, die du nicht entschieden hast"),
    ("K7", "Mitarbeitende im Home Office führen"),
    ("K8", "Führung durch Führungskräfte"),
    ("K9", "Entscheiden, wenn es keine gute Lösung gibt"),
    ("K10", "Das Belastungsgespräch"),
    ("K11", "Stopp ist eine Führungsentscheidung"),
    ("K12", "Widerspruch vor Zustimmung"),
    ("K13", "Entwicklung ohne Beförderung"),
    ("K14", "KI entscheidet mit"),
    ("I1", "Die erste Führungsrolle"),
    ("I2", "Beidhändig führen"),
    ("I3", "Product Leadership"),
    ("I4", "Human + AI Leadership"),
    ("I5", "Führungssysteme, die unter Druck tragen"),
]

_UMLAUT = {"ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss"}


def slugify(title):
    t = title.lower()
    for a, b in _UMLAUT.items():
        t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def _training_page(code, title):
    slug = slugify(title)
    return {
        "src": f"trainings/{title}({code}).dc.html",
        "out": f"{slug}/index.html",
        "url": f"/{slug}/",
        "code": code,
        "title": f"{title} — the WHYKINGS ACADEMY",
        "desc": (f"Führungstraining „{title}“ ({code}) der WHYKINGS Academy: "
                 f"Inhalte, Format, Termine und Anmeldung."),
    }


# order matters only for logging; `out` is the repo path, `url` the public path
PAGES = [
    {
        "src": "ACADEMY | HOME.dc.html",
        "out": "index.html",
        "url": "/",
        "title": "the WHYKINGS ACADEMY — Leadership-Trainings ohne Seminar-Hangover",
        "desc": ("Leadership-Trainings der WHYKINGS Academy: praxisnah, wirksam und "
                 "ohne Seminar-Hangover. Kurskatalog, Formate und Kontakt."),
    },
] + [_training_page(code, title) for code, title in TRAININGS]

# design source filename  ->  clean published URL (for STATIC hrefs)
LINK_REWRITES = {p["src"]: p["url"] for p in PAGES}

# training code -> clean URL. enhance.js injects/reads this to rewrite the
# homepage's runtime-built catalog "Details" links to the clean slug URLs.
AK_TRAINING_URLS = {p["code"]: p["url"] for p in PAGES if p.get("code")}


def link_variants(name):
    """Every spelling of an href that could point at a design source file:
    raw, space->%20, and full percent-encoding. So the rewrite catches whatever
    form the exported HTML happens to use."""
    return {
        name,
        name.replace(" ", "%20"),
        urllib.parse.quote(name),
        urllib.parse.quote(name, safe=""),
    }


def rewrite_links(html):
    """Replace every static href to a design source file with its clean URL.
    Detail pages sit one level deep and link back with a leading "../" (e.g.
    href="../ACADEMY | HOME.dc.html"), so match that prefix too."""
    for name, url in LINK_REWRITES.items():
        for variant in link_variants(name):
            html = html.replace(f'href="{variant}"', f'href="{url}"')
            html = html.replace(f'href="../{variant}"', f'href="{url}"')
    return html


# --- asset references: make them root-absolute so page depth doesn't matter ---
# The design source uses relative refs (_ds/…, assets/…, support.js). A subpage
# at /slug/index.html would resolve those against /slug/ and 404. Absolutising
# to /_ds/…, /assets/…, /support.js works from any depth.
_ASSET_ATTR = re.compile(
    r'((?:src|href)=")(?:\./)?('               # drop any leading ./ (e.g. "./support.js")
    r'(?:_ds/|assets/|uploads/|legal/)[^"]*'   # legal/: detail pages link these directly
    r'|support\.js'
    r'|image-slot\.js'
    r'|_ds_bundle\.js'
    r')(")'
)


def absolutize_assets(html):
    return _ASSET_ATTR.sub(lambda m: f"{m.group(1)}/{m.group(2)}{m.group(3)}", html)


# --- strip Claude Design's editor-only runtime ---------------------------------
# `image-slot.js` is the in-editor image-picker (it fetches from unsplash.com).
# The published pages already carry concrete <img src="assets/…"> for every slot,
# so the script does nothing useful when hosted standalone — and shipping it would
# break the Datenschutz promise that the site makes no third-party requests. Drop
# any <script> that loads it (in whatever relative/absolute form the export uses).
_EDITOR_SCRIPT = re.compile(
    r'\s*<script\b[^>]*\bsrc="[^"]*image-slot\.js"[^>]*>\s*</script>',
    re.IGNORECASE,
)


def strip_editor_runtime(html):
    return _EDITOR_SCRIPT.sub("", html)
