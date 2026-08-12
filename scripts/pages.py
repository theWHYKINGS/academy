#!/usr/bin/env python3
"""pages.py — the single source of truth for which Claude Design files become
which published pages, and under which URL.

The Academy started as one page and grew into a small multi-page site (homepage
+ training detail pages). Every build script imports PAGES from here so the set
of pages, their output paths, URLs and <head> metadata live in ONE place.

Adding a training detail page = add one dict below (and make sure the design
source links to it, and it back). The design filenames carry spaces/umlauts;
LINK_REWRITES maps those raw filenames to the clean published URLs.
"""
import re
import urllib.parse

SITE = "https://www.thewhykingsacademy.com"

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
    {
        "src": "trainings/Die fünf Gespräche.dc.html",
        "out": "die-fuenf-gespraeche/index.html",
        "url": "/die-fuenf-gespraeche/",
        "title": "Die fünf Gespräche — the WHYKINGS ACADEMY",
        "desc": ("Führungstraining „Die fünf Gespräche“ der WHYKINGS Academy: "
                 "Inhalte, Termine und Anmeldung."),
    },
]

# design source filename  ->  clean published URL
LINK_REWRITES = {p["src"]: p["url"] for p in PAGES}


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
    """Replace every href to a design source file with its clean URL."""
    for name, url in LINK_REWRITES.items():
        for variant in link_variants(name):
            html = html.replace(f'href="{variant}"', f'href="{url}"')
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
