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

- `deviceMode`: `"pc"` or `"mobile"`
- `phase`: `"intro"`, `"universe"`, `"galaxy"`, or `"mobile"`
- `selectedGalaxyId`
- `focusedGalaxyId`
- `selectedPlanetId`
- `universeBriefOpen`
- `universeZoom`: `"overview"` or `"focused"`
- `transitionLock`

Important flow behavior:

- Default state is `phase: "intro"`.
- Device mode is now chosen automatically from viewport, pointer/hover capability, touch capability, and a user-agent fallback.
- There is no longer a manual PC/Mobile selector.
- Desktop flow moves from intro to universe, then galaxy, then detail.
- Mobile flow moves from intro to a simplified explorer, then detail.
- `enterGalaxy(galaxyId)` is desktop-only and clears selected tool state.
- In galaxy phase or mobile explorer phase, clicking/tapping a tool opens the detail panel.
- Backing out from galaxy view returns to universe with a timed transition.
- Escape key exits the deepest currently open layer first.
- Desktop wheel input still participates in the current zoom/focus model.
- Mobile no longer relies on galaxy-map gestures for core navigation.

There is also a debug URL helper:

- `?phase=universe`
- `?phase=universe&brief=open`
- `?phase=galaxy&galaxy=<id>`
- `?phase=galaxy&galaxy=<id>&planet=<id>`
- `?phase=mobile&galaxy=<id>`
- `?phase=mobile&galaxy=<id>&planet=<id>`
- `?mode=pc` or `?mode=mobile` can still be used as a debug override for testing render paths

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

## Device Detection / Responsiveness Notes

The homepage now intentionally supports two automatically selected experiences:

- `Desktop Universe`
- `Mobile Explorer`

Current implementation details:

- `scripts/app.js` detects mobile vs desktop using multiple signals:
  - viewport width
  - short landscape height
  - coarse vs fine pointer capability
  - hover capability
  - touch capability
  - mobile user-agent fallback
- The app updates when resize/orientation changes produce a real mode change.
- Desktop keeps the cinematic universe + galaxy drilldown interaction model.
- Mobile uses a simplified category explorer with chips, tool cards, and a mobile-safe detail sheet.

Current responsive/layout strategy in `styles.css`:

- Desktop/PC mode preserves the richer spatial composition and zoom/focus behavior.
- Mobile intro is simpler and auto-detected.
- Mobile `phase="mobile"` hides the desktop map layers and shows the simplified explorer instead.
- The mobile detail panel is still fixed/bounded for viewport safety.
- Low-height landscape mobile is functional, but still a real-device polish area.

## Known Fragile / Important Areas

- `transitionLock` timing in `scripts/app.js` is important for avoiding conflicting clicks during phase changes.
- The universe layer / command core / focus layer interaction is heavily CSS-driven; visual changes often require coordinated CSS and state review.
- The mode split is shared across JS state, intro rendering, hint rendering, zoom controls, and responsive CSS. Future edits should treat that as one system.
- The current repo has no automated lint/test/build pipeline.
- Browser verification inside the sandbox may be limited; this session could inspect code and file structure directly, but could not stand up a local preview server due sandbox socket restrictions.

Current real-device follow-up notes:

- The mobile intro and explorer are now much simpler, but should still be checked on actual iPhone/Android hardware for final spacing and scroll feel.
- Low-height landscape mobile is serviceable, but still merits real-device polish after live touch testing.

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

- Desktop now preserves the intended intro -> universe -> galaxy -> tool-detail hierarchy.
- Mobile no longer forces the galaxy interaction model and instead uses a simpler explorer UI.
- The site is data-driven enough that future content expansion should mostly happen in `scripts/data/universe.js`.
- The strongest sources of future confusion are the legacy `docs/` publish artifacts and the lack of a formal validation pipeline.
