# Det 105 AI Task Force

A clean static homepage for the Det 105 AI Task Force website. The current version is a shared responsive AI directory with:

- a branded hero and category overview
- sticky search/filter navigation
- categorized tool sections with 50+ real items
- a responsive detail drawer / bottom sheet

## Local preview

Serve the repository root with any static server.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Edit content

- Update category, tool, and copy data in `scripts/data/universe.js`.
- Update logo metadata in `scripts/data/logo-sources.js`.
- Replace the brand crest in `assets/det105.png` if needed.
- Fine-tune layout and transitions in `styles.css`.

## Brand assets

- Stable local copies live in `assets/logos/`.
- Source notes are tracked in `scripts/data/logo-sources.js`.
- Some concept nodes intentionally use monogram fallbacks when no clean public product asset is exposed.

## Netlify

- Publish directory: `.`
- Build command: none required

This repo is a static site and does not depend on a Node build step.

## Project Context Files

For future Codex or contributor sessions, start with `AGENTS.md`, then read:

- `docs/PROJECT_CONTEXT.md`
- `docs/NEXT_STEPS.md`
- `docs/SESSION_HANDOFF.md`

Those files capture the current homepage architecture, product direction, and next-priority work so new sessions can continue from the existing implementation instead of restarting.
