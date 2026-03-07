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

- `interfaceMode`: `"pc"` or `"mobile"`
- `phase`: `"intro"`, `"universe"`, or `"galaxy"`
- `selectedGalaxyId`
- `focusedGalaxyId`
- `selectedPlanetId`
- `universeBriefOpen`
- `universeZoom`: `"overview"` or `"focused"`
- `transitionLock`

Important flow behavior:

- Default state is `phase: "intro"`.
- Intro now includes an explicit interface-profile choice: `PC` or `Mobile`.
- The selected interface mode is persisted in `localStorage` under `det105-interface-mode`.
- `enterUniverse()` moves from intro to universe.
- `enterGalaxy(galaxyId)` moves from universe to galaxy and clears selected tool state.
- In galaxy phase, clicking a planet/tool node opens the detail panel.
- Backing out from galaxy view returns to universe with a timed transition.
- Escape key exits the deepest currently open layer first.
- Desktop wheel input and mobile touch gestures both participate in the current zoom/focus model.

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
- `assets/galaxies/` now contains custom local SVG visuals for each galaxy cluster.
- `docs/RESOURCE_AUDIT.md` tracks the current outbound-link audit and source decisions.
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

## Mode Separation / Responsiveness Notes

The homepage now intentionally supports two distinct interface profiles:

- `PC` mode
- `Mobile` mode

This is explicit app state, not just CSS breakpoint behavior.

Current implementation details:

- Intro profile selection is rendered in `scripts/components.js`.
- `scripts/app.js` stores the selected mode, updates mode-specific hints, and keeps PC/mobile control affordances separate.
- Mobile mode shows rotate guidance on the intro screen only.
- PC mode keeps desktop-oriented hinting and wheel/click focus behavior.
- Mobile mode keeps touch-oriented hinting, compact overlays, and mobile-safe panel behavior.

Current responsive/layout strategy in `styles.css`:

- Desktop/PC mode preserves the richer spatial composition.
- Narrow-width mobile mode uses a guided mobile composition with simplified galaxy cards and mobile-safe tool panels.
- Low-height landscape mobile mode has its own dedicated treatment so rotated phones do not fall back into the desktop composition accidentally.
- The mobile detail panel is a fixed bottom sheet in portrait and a bounded floating panel in low-height landscape.

## Known Fragile / Important Areas

- `transitionLock` timing in `scripts/app.js` is important for avoiding conflicting clicks during phase changes.
- The universe layer / command core / focus layer interaction is heavily CSS-driven; visual changes often require coordinated CSS and state review.
- The mode split is shared across JS state, intro rendering, hint rendering, zoom controls, and responsive CSS. Future edits should treat that as one system.
- The current repo has no automated lint/test/build pipeline.
- Browser verification inside the sandbox may be limited; this session could inspect code and file structure directly, but could not stand up a local preview server due sandbox socket restrictions.

Current real-device follow-up notes:

- The mobile intro has been tightened substantially, but should still be checked on actual iPhone/Android hardware for final CTA fit and safe-area comfort.
- The mobile universe focus card and the low-height landscape framing are improved, but still merit real-device polish after live touch testing.

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
