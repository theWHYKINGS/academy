#!/usr/bin/env bash
#
# deploy.sh — publish the current index.html to GitHub Pages.
#
# This commits whatever is in the working tree (normally a freshly pulled
# index.html from the Claude Design Academy project) and pushes it to
# github.com/theWHYKINGS/academy, which GitHub Pages then serves at
# https://www.thewhykingsacademy.com.
#
# Usage:
#   scripts/deploy.sh                 # commits with a timestamped message
#   scripts/deploy.sh "Update hero"   # commits with a custom message
#
# The *pull* step (fetching the latest source out of Claude Design) is done by
# Claude via the authenticated browser session — see scripts/pull-from-design.md.
# This script only handles the publish half of the loop.

set -euo pipefail

cd "$(dirname "$0")/.."          # repo root
export PATH="$HOME/.local/bin:$PATH"   # local gh install

MSG="${1:-Update site — $(date '+%Y-%m-%d %H:%M')}"

# --- post-process the fresh source before publishing ---
echo "Building legal pages…"
python3 scripts/build_legal.py
echo "Injecting title / favicons / footer links…"
python3 scripts/inject_head.py

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing changed — working tree is clean. Nothing to deploy."
  exit 0
fi

echo "Staging changes…"
git add -A
git status --short

echo "Committing: $MSG"
git commit -q -m "$MSG

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"

echo "Pushing to GitHub…"
git push -q origin main

echo
echo "✅ Pushed. GitHub Pages will rebuild in ~1 minute."
echo "   Live:  https://www.thewhykingsacademy.com"
echo "   Build: https://github.com/theWHYKINGS/academy/actions"
