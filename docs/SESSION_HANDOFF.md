# Session Handoff

## Current Repo State

This repo is currently a static site, not a framework app.

- No `package.json`
- No Node/Vite/Next/Astro build pipeline
- Netlify config in `netlify.toml` publishes the repository root
- Primary landing page entry is root `index.html`

## Framework / Stack

- HTML entry file: `index.html`
- Styling: `styles.css`
- JavaScript: native ES modules in `scripts/`
- Data/config: plain JS objects/arrays in `scripts/data/`
- Assets: `assets/` and `assets/logos/`

## Key Directories And Files

- `index.html`: minimal landing homepage
- `ai-directory/index.html`: live AI directory page
- `option-a/index.html` through `option-e/index.html`: simple placeholder pages linked from the nav
- `styles.css`: primary site stylesheet for the landing page, shared nav, placeholders, and AI directory
- `scripts/app.js`: app state, search/filter logic, detail panel state, and event wiring
- `scripts/components.js`: render functions for header, hero, category overview, toolbar, cards, detail panel, and footer
- `scripts/site-nav.js`: shared top navigation renderer and mobile menu behavior
- `scripts/data/universe.js`: site copy plus structured tool/category data
- `scripts/data/logo-sources.js`: logo catalog and source metadata
- `assets/det105.png`: current brand/crest image used in the header
- `assets/logos/`: local logo copies and monogram-supporting assets
- `netlify.toml`: root publish config

## Homepage Components / Experience

The root homepage is currently composed from:

- Shared top navigation
- Minimal landing panel with intentionally sparse content

The AI directory page at `/ai-directory/` is composed from:

- Shared top navigation
- Hero with concise intro copy and summary stats
- Category overview cards
- Sticky search/filter toolbar
- Featured tools section
- Category sections with tool cards
- Detail overlay with desktop drawer / mobile bottom sheet behavior
- Footer

## Current State Flow

State lives in `scripts/app.js`:

- `activeCategory`
- `query`
- `selectedToolId`

Important flow behavior:

- The root route `/` loads a minimal landing page.
- The AI directory lives at `/ai-directory/`.
- Placeholder pages live at `/option-a/` through `/option-e/`.
- There is no manual device-mode selection.
- There is no fullscreen launch, boot sequence, map camera, or phase-based scene flow anymore.
- Search and category filters update the featured set and section content.
- Clicking a tool opens the detail panel.
- Clicking a related tool inside the detail panel swaps the selected tool.
- The detail panel closes with the close button, backdrop click, or `Escape`.
- `?category=<id>`, `?q=<term>`, and `?tool=<id>` are supported as lightweight URL initializers for testing and deep-linking.

## Current Content Model

`scripts/data/universe.js` currently defines the live directory exports:

- `directorySections`
- `directoryItems`
- `featuredDirectoryItems`
- `directoryStats`

Current live categories are:

- `learning`
- `llms`
- `coding`
- `research`
- `agents`
- `local`
- `media`
- `voice`

`directoryItems` currently contains 56 real items.

Each live item includes or derives:

- `id`
- `name`
- `type`
- `categoryId`
- `categoryTitle`
- `importance`
- `description`
- `goodFor`
- `officialLink`
- `logoKey`
- `relatedNodeIds`
- `featured`
- `tags`

Note:
`scripts/data/universe.js` still contains older map-oriented exports such as `galaxyClusters`, `desktopUniverseRegions`, and `desktopUniverseNodes`. The live app no longer renders the map/fullscreen architecture, but that older data still exists in the file and may be cleaned up later if desired.

## Asset / Logo Handling

- Local logos are stored under `assets/logos/`.
- `scripts/data/logo-sources.js` maps logical logo keys to local assets or monogram fallbacks.
- `assets/logos/SOURCES.md` documents local asset origins.
- `docs/RESOURCE_AUDIT.md` tracks the current outbound-link audit and source decisions.
- Current code prefers local files in production rather than depending on remote hotlinks.
- The UI-level fallback is robust: image badges hide failed images and reveal monogram text instead.

## Deployment Notes

- Netlify publishes `.` with no build command.
- Root `index.html` is the canonical landing homepage for Netlify.
- The AI directory is a separate static route under `ai-directory/`.
- There is also a `docs/` directory from earlier GitHub Pages-oriented work:
  - `docs/index.html` points back to root assets via `<base href="../" />`
  - `docs/styles.css` appears to be an old/stale stylesheet and is not the root homepage stylesheet
  - `docs/.nojekyll` and root `.nojekyll` both exist

Future sessions should treat `docs/` carefully and avoid assuming it is the live homepage source.

## Responsive / Layout Notes

The live site now uses one shared responsive layout rather than separate desktop/mobile products.

Current implementation details:

- Desktop gets wider grids, roomier spacing, and a right-side detail drawer.
- Mobile keeps the same content model but collapses into one-column cards and a bottom-sheet detail panel.
- The sticky toolbar remains visible on long pages for easier navigation.
- The header stacks cleanly on small widths.
- The site no longer depends on mode detection, fullscreen state, or gesture-specific map interactions.

## Known Fragile / Important Areas

- `scripts/data/universe.js` mixes live directory exports with older legacy map data; future cleanup should be careful and deliberate.
- The repo still has no automated lint/test/build pipeline.
- Browser verification inside the sandbox is limited enough that real-device follow-up is still worthwhile.
- Logo quality is mixed: many important marks are local images, but some products intentionally still use monogram fallbacks.

## Current Validation Snapshot

This simplification pass was validated with:

- `git diff --check`
- JS module import smoke check for `scripts/app.js`
- JS data import check confirming `directoryItems.length === 56`
- Headless Chrome screenshots of desktop, mobile portrait, and mobile landscape for the rebuilt directory shell

## What A New Session Should Inspect First

1. `AGENTS.md`
2. `docs/PROJECT_CONTEXT.md`
3. `docs/NEXT_STEPS.md`
4. `docs/SESSION_HANDOFF.md`
5. `index.html`
6. `ai-directory/index.html`
7. `scripts/site-nav.js`
8. `scripts/app.js`
9. `scripts/components.js`
10. `scripts/data/universe.js`
11. `scripts/data/logo-sources.js`
12. `styles.css`

## Immediate Observations From This Inspection

- The live site has been deliberately reset from the fragile desktop map/fullscreen architecture into a simpler landing-plus-directory structure.
- Desktop and mobile now share the same structure instead of diverging into separate products.
- The best future improvements are now around polish, logo quality, search/filter UX, and data maintenance rather than scene architecture.
- The strongest sources of future confusion are the older map-era data still present in `scripts/data/universe.js` and the legacy `docs/` publish artifacts.
