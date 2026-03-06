# Session Handoff

## Current Repo State

This repo is currently a static site, not a framework app.

- No `package.json`
- No Node/Vite/Next/Astro build pipeline
- Netlify config in `netlify.toml` publishes the repository root
- Primary homepage entry is root `index.html`

## Framework / Stack

- HTML entry file: `index.html`
- Styling: `styles.css`
- JavaScript: native ES modules in `scripts/`
- Data/config: plain JS objects/arrays in `scripts/data/`
- Assets: `assets/` and `assets/logos/`

## Key Directories And Files

- `index.html`: main deployed page
- `styles.css`: primary site stylesheet
- `scripts/app.js`: app state, interactions, transitions, event wiring
- `scripts/components.js`: HTML render functions for header, intro, universe, galaxy, detail panel, footer
- `scripts/data/universe.js`: universe copy plus galaxy/tool definitions
- `scripts/data/logo-sources.js`: logo catalog and source metadata
- `assets/det105.png`: current brand/crest image used in header and command core
- `assets/logos/`: local logo copies and fallbacks
- `netlify.toml`: root publish config

## Homepage Components / Experience

The homepage is currently composed from these major UI layers:

- Header with brand, universe-brief toggle, and status text
- Main scene stage with stars, nebulae, grid, command core, and galaxy nodes
- Intro overlay
- Universe brief panel
- Focus layer for selected galaxy
- Detail panel for selected tool/node
- Footer

## Current State Flow

State lives in `scripts/app.js`:

- `phase`: `"intro"`, `"universe"`, or `"galaxy"`
- `selectedGalaxyId`
- `selectedPlanetId`
- `universeBriefOpen`
- `transitionLock`

Important flow behavior:

- Default state is `phase: "intro"`.
- `enterUniverse()` moves from intro to universe.
- `enterGalaxy(galaxyId)` moves from universe to galaxy and clears selected tool state.
- In galaxy phase, clicking a planet/tool node opens the detail panel.
- Backing out from galaxy view returns to universe with a timed transition.
- Escape key exits the deepest currently open layer first.

There is also a debug URL helper:

- `?phase=universe`
- `?phase=universe&brief=open`
- `?phase=galaxy&galaxy=<id>`
- `?phase=galaxy&galaxy=<id>&planet=<id>`

## Current Content Model

`scripts/data/universe.js` currently defines:

- global copy for intro/universe/footer text
- six galaxy clusters:
  - `llms`
  - `coding`
  - `research`
  - `media`
  - `local`
  - `learning`

Each galaxy includes title/subtitle, accent colors, universe position, focus copy, and a `planets` array containing node position, size, description, reason-for-use text, and official outbound link.

## Asset / Logo Handling

- Local logos are stored under `assets/logos/`.
- `scripts/data/logo-sources.js` maps logical logo keys to local assets or monogram fallbacks.
- `assets/logos/SOURCES.md` documents local asset origins.
- Current code prefers local files in production rather than depending on remote hotlinks.
- Some concept nodes and at least one product (`notebooklm`) intentionally use monogram fallbacks.

## Deployment Notes

- Netlify publishes `.` with no build command.
- Root `index.html` is the canonical homepage for Netlify.
- There is also a `docs/` directory from earlier GitHub Pages-oriented work:
  - `docs/index.html` points back to root assets via `<base href="../" />`
  - `docs/styles.css` appears to be an old/stale stylesheet and is not the root homepage stylesheet
  - `docs/.nojekyll` and root `.nojekyll` both exist

Future sessions should treat `docs/` carefully and avoid assuming it is the live homepage source.

## Mobile / Responsiveness Notes

The main stylesheet includes responsive breakpoints at roughly:

- `980px`
- `760px`
- `520px`

The current mobile implementation is not just a shrunken desktop layout. At `760px` and below, the homepage now uses a mobile-specific adaptation:

- intro overlay uses tighter typography, safe-area-aware padding, and full-width touch targets
- universe view becomes a guided composition:
  - command core stays prominent
  - galaxy destinations shift into a horizontal card rail
  - only one galaxy's metadata is surfaced in the dedicated focus card at a time
- galaxy drilldown becomes a vertical flow:
  - hero card for the selected galaxy
  - stacked tool cards instead of freeform absolute node placement
- tool details open in a mobile bottom sheet / fixed panel with its own close affordance

Desktop and tablet widths still keep the richer spatial map/drilldown composition.

## Known Fragile / Important Areas

- `transitionLock` timing in `scripts/app.js` is important for avoiding conflicting clicks during phase changes.
- The universe layer / command core / focus layer interaction is heavily CSS-driven; visual changes often require coordinated CSS and state review.
- The current repo has no automated lint/test/build pipeline.
- Browser verification inside the sandbox may be limited; this session could inspect code and file structure directly, but could not stand up a local preview server due sandbox socket restrictions.

## What A New Session Should Inspect First

1. `AGENTS.md`
2. `docs/PROJECT_CONTEXT.md`
3. `docs/NEXT_STEPS.md`
4. `docs/SESSION_HANDOFF.md`
5. `index.html`
6. `scripts/app.js`
7. `scripts/components.js`
8. `scripts/data/universe.js`
9. `scripts/data/logo-sources.js`
10. `styles.css`

## Immediate Observations From This Inspection

- The current homepage already implements the intended intro -> universe -> galaxy -> tool-detail hierarchy.
- The site is data-driven enough that future content expansion should mostly happen in `scripts/data/universe.js`.
- The strongest sources of future confusion are the legacy `docs/` publish artifacts and the lack of a formal validation pipeline.
