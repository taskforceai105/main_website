# Det 105 AI Task Force

A clean static website for the Det 105 AI Task Force. The current version includes:

- a minimal landing homepage at `/`
- a shared top navigation bar
- an AI directory at `/ai-directory/`
- categorized tool sections with 50+ real items
- a responsive detail drawer / bottom sheet

## Local preview

Serve the repository root with any static server.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

- Home: `http://localhost:4173/`
- AI Directory: `http://localhost:4173/ai-directory/`

## GitHub Pages deployment

This repo now deploys to GitHub Pages through GitHub Actions.

- Workflow: `.github/workflows/deploy-pages.yml`
- Static build artifact: `dist/`
- Local build command: `python3 scripts/build_pages.py`

The build is intentionally lightweight. It copies the static site into `dist/` and preserves the current HTML/CSS/ES-module structure for GitHub Pages.

Important notes:

- The site is configured for GitHub Pages project-path hosting such as `/main_website/`.
- Shared nav links and logo paths detect the Pages base path automatically at runtime.
- In the GitHub repository settings, set `Pages` to deploy from `GitHub Actions`.

## Edit content

- Update category, tool, and copy data in `scripts/data/universe.js`.
- Update logo metadata in `scripts/data/logo-sources.js`.
- Replace the brand crest in `assets/det105.png` if needed.
- Fine-tune layout and transitions in `styles.css`.

## Brand assets

- Stable local copies live in `assets/logos/`.
- Source notes are tracked in `scripts/data/logo-sources.js`.
- Some concept nodes intentionally use monogram fallbacks when no clean public product asset is exposed.

## Static hosting notes

- No framework or Node bundler is required.
- The site remains plain static HTML, CSS, and ES modules.
- GitHub Pages deployment publishes the built `dist/` artifact rather than the repository root.

## Project Context Files

For future Codex or contributor sessions, start with `AGENTS.md`, then read:

- `docs/PROJECT_CONTEXT.md`
- `docs/NEXT_STEPS.md`
- `docs/SESSION_HANDOFF.md`

Those files capture the current homepage architecture, product direction, and next-priority work so new sessions can continue from the existing implementation instead of restarting.
