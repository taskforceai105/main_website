# AGENTS.md

## Repository Purpose

This repo contains the Det 105 AI Task Force website homepage. It is currently a static, Netlify-compatible site that presents an "AI universe" map for students in Det 105 to explore AI sectors, tools, and foundational topics without turning the homepage into a full course or a long text wall.

## Product Vision

- Visual direction: futuristic, dark, cinematic, premium, technical, space-like.
- Core concept: an AI universe / galaxy exploration interface.
- Audience: students exploring AI tools and topics inside the organization.
- Content model: brief descriptions plus outbound links/resources, not dense lessons.
- Tone to preserve: polished and elite, not childish, cartoonish, or cluttered.

## Current UX Model

The intended hierarchy is strict progressive disclosure:

1. Intro screen
2. Universe map
3. Galaxy drilldown
4. Tool detail panel

Preserve the rule that users should not see every layer at once.

Current implementation already follows this model:

- Intro overlay is the initial state.
- Universe view shows galaxy-level destinations only.
- Planet/tool nodes appear only after entering a galaxy.
- Tool details open in a closable panel after selecting a planet.
- Escape closes the deepest open layer first.

## Design Principles

- Keep the universe layer cleaner than the galaxy layer.
- Do not expose planet/tool nodes in the universe view.
- Galaxy selection should feel like a dramatic zoom / drilldown transition.
- Tool/company nodes should be more interesting than plain spheres when improved, but changes must stay coherent with the current visual system.
- Keep overlays and panels closable. No blocking UI that traps the user.
- Avoid text-heavy layouts, clutter, cartoon styling, and bright toy-like treatments.
- Prefer structured content/config data over hard-coded copy in rendering logic.

## Asset / Logo Rules

- Prefer official remote/public brand assets only when they are reliable enough for production.
- If a remote logo is fragile, store a local copy under `assets/logos/`.
- Keep source notes in `assets/logos/SOURCES.md` and `scripts/data/logo-sources.js`.
- If no clean official asset is practical, use a deliberate monogram fallback rather than a low-quality or misleading mark.
- Reuse the existing local asset structure instead of scattering logos across the repo.

## Technical Workflow Rules

- Read this file first in every new session.
- Then read:
  - `docs/PROJECT_CONTEXT.md`
  - `docs/NEXT_STEPS.md`
  - `docs/SESSION_HANDOFF.md`
- Inspect the current homepage implementation before making changes:
  - `index.html`
  - `scripts/app.js`
  - `scripts/components.js`
  - `scripts/data/universe.js`
  - `scripts/data/logo-sources.js`
  - `styles.css`
- Build on the existing implementation. Do not restart the site from scratch unless a narrowly scoped refactor is clearly justified.
- Keep content editable through structured data/config files when possible.
- Be careful with `docs/`: `docs/index.html` is a legacy GitHub Pages-oriented entry that points back to root assets, while the Netlify deployment publishes the repository root.
- Do not assume a framework build pipeline exists. This repo currently has no `package.json`, no Node-based bundler, and no formal lint/test setup.

## Netlify / Deployment Rules

- Netlify publish directory is the repository root: see `netlify.toml`.
- There is no build command today.
- Keep the site deployable as plain static files unless the user explicitly asks for a tooling change.
- If introducing tooling, justify it carefully and keep Netlify deployment implications explicit.

## Files Future Agents Must Read First

1. `AGENTS.md`
2. `docs/PROJECT_CONTEXT.md`
3. `docs/NEXT_STEPS.md`
4. `docs/SESSION_HANDOFF.md`
5. The current homepage implementation files listed above

## What Not To Break

- The progressive-disclosure flow: intro -> universe -> galaxy -> tool detail.
- The rule that planet/tool nodes stay hidden until a galaxy is selected.
- The dark cinematic visual language.
- Closable overlays, modals, and panels.
- Structured content data in `scripts/data/universe.js`.
- Local logo handling and source tracking.
- Netlify compatibility with root-level static publishing.

Also be aware of current repo-specific pitfalls:

- `docs/styles.css` appears to be a stale legacy file and is not the stylesheet used by the live root homepage.
- `docs/index.html` exists, but root `index.html` is the primary deployed entry for Netlify.

## Expected Validation Before Completing Work

- If lint/build commands exist, run them before finishing.
- In the current repo state, there is no formal lint/build pipeline, so at minimum:
  - run `git diff --check`
  - run a lightweight JS import/syntax smoke check on the module files if possible
  - confirm Netlify assumptions were not broken (root publish, no required build step unless intentionally added)
- If you cannot run a meaningful browser preview in the sandbox, say so clearly in the handoff/final note.
