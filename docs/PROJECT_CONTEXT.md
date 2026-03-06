# Project Context

## What This Site Is

The Det 105 AI Task Force site is a student-facing AI exploration homepage. Its job is to orient students to major AI categories, tools, and foundational practices through a cinematic "AI universe" experience rather than through a long course-like landing page.

This is not meant to be a full curriculum. The homepage should stay relatively brief, visual, and navigational: short descriptions, clear groupings, and links/resources that let students go deeper elsewhere.

## Current Direction

- Futuristic
- Dark
- Cinematic
- Space / galaxy exploration metaphor
- Premium, elite, technical presentation
- Minimal clutter
- Progressive disclosure instead of showing all content at once

The current hierarchy to preserve is:

1. Intro screen
2. Universe map
3. Galaxy drilldown
4. Tool detail panel

## Why Progressive Disclosure Matters

The homepage concept works only if the user is oriented in layers.

- The intro establishes tone and invites entry.
- The universe view should stay clean and high-level.
- The galaxy view is where tool/company nodes appear.
- The detail panel is the final layer for specifics and outbound links.

If future edits expose all galaxies, tools, text blocks, and panels at once, the core UX breaks down quickly. The homepage becomes noisy and loses the cinematic drilldown feel.

## What Earlier Versions Seem To Have Struggled With

Based on the repo history and leftover files, earlier iterations included simpler landing-page/static-image approaches and GitHub Pages-oriented publish artifacts. The current codebase is already a more intentional interactive version, but a few risks remain:

- `docs/` still contains older publish-oriented files that can confuse future sessions.
- The universe layer can still become visually busy if more labels or nodes are added casually.
- Planet/tool nodes currently use circular logo badges; this works, but the product direction still wants more visually interesting node treatment over time.

## What The Current Site Already Does

The current root homepage implementation is a static HTML/CSS/JS experience with:

- an intro overlay
- a universe map with galaxy buttons
- a galaxy drilldown scene with planet/tool nodes
- a closable detail panel for the selected tool
- a closable universe brief panel
- keyboard escape behavior that backs out one layer at a time
- structured data for galaxy/tool content in `scripts/data/universe.js`
- structured logo metadata in `scripts/data/logo-sources.js`

The rendered experience is driven by `scripts/app.js` state and `scripts/components.js` render functions.

## Visual/UX Decisions To Preserve

- Keep the site dark, polished, and space-like.
- Preserve the central "command core" identity treatment unless there is a strong reason to revise it.
- Keep the universe layer cleaner than galaxy drilldown scenes.
- Do not reveal planet/tool nodes before a galaxy is selected.
- Preserve closable overlays/panels and non-trapping interaction.
- Keep copy concise and data-driven.

## Content And Asset Strategy

- Galaxy/tool definitions live in `scripts/data/universe.js`.
- Logo choices and provenance live in `scripts/data/logo-sources.js`.
- Stable local logo copies live in `assets/logos/`.
- Monogram fallbacks are already used where clean official product assets were not practical.

This is a good pattern to preserve. Future sessions should extend the structured data first, then adjust rendering/styling only as needed.

## Architecture Snapshot

- Stack: plain static HTML, CSS, and ES modules
- Entry point: `index.html`
- Main state logic: `scripts/app.js`
- Render helpers: `scripts/components.js`
- Content/config: `scripts/data/universe.js`, `scripts/data/logo-sources.js`
- Primary stylesheet: `styles.css`
- Netlify deployment: root publish, no build step

## Known Risks / Regressions To Avoid

- Turning the homepage into a text-heavy lesson page
- Breaking the intro -> universe -> galaxy -> detail flow
- Showing planets/tools in the universe view
- Introducing UI that cannot be closed
- Adding fragile remote asset dependencies without local fallback
- Accidentally treating `docs/` legacy publish files as the main homepage source

## Uncertainty To Keep In Mind

This repo currently has no automated tests and no formal build/lint pipeline. Future sessions should verify behavior carefully after edits and should be explicit when something is inferred from code rather than confirmed in a browser preview.
