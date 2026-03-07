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
- Different desktop and mobile interaction models when usability demands it

The current hierarchy to preserve is now split by device context:

Desktop / PC:
1. Intro screen
2. Boot / loading cinematic
3. Connected universe map
4. Tool detail panel

Mobile:
1. Intro screen
2. Simplified category explorer
3. Tool detail panel

## Why Progressive Disclosure Matters

The homepage concept works only if the user is oriented in layers.

- The intro establishes tone and invites entry.
- On desktop, the landing page should stay concise and branded.
- On desktop, the boot/loading layer should be short and polished.
- On desktop, the connected map should reveal one shared AI ecosystem without dumping all explanation into the viewport.
- On mobile, the explorer should move directly from category selection to readable tool cards.
- The detail panel is the final layer for specifics and outbound links.

If future edits expose all galaxies, tools, text blocks, and panels at once, the core UX breaks down quickly. On desktop the cinematic drilldown feel is lost. On mobile the site simply becomes hard to use.

## What Earlier Versions Seem To Have Struggled With

Based on the repo history and leftover files, earlier iterations included simpler landing-page/static-image approaches and GitHub Pages-oriented publish artifacts. The current codebase is already a more intentional interactive version, but a few risks remain:

- `docs/` still contains older publish-oriented files that can confuse future sessions.
- The desktop map can become visually busy if more labels, lines, or node effects are added casually.
- The desktop map is now a bounded 2.5D command field rather than separate live galaxy scenes, so future edits should respect the performance tradeoffs that made that choice practical.

## What The Current Site Already Does

The current root homepage implementation is a static HTML/CSS/JS experience with:

- an intro overlay
- an automatically detected desktop/PC experience
- an automatically detected mobile explorer experience
- a fullscreen-attempt desktop launch flow
- a short boot/loading cinematic on desktop
- a connected desktop AI universe map with region clusters, relationship webbing, drag, and wheel zoom
- a simplified category-and-tool directory on mobile
- a closable detail panel for the selected tool in both contexts
- a closable universe brief panel
- keyboard escape behavior that backs out one layer at a time
- structured data for galaxy/tool content in `scripts/data/universe.js`
- structured logo metadata in `scripts/data/logo-sources.js`

The rendered experience is driven by `scripts/app.js` state and `scripts/components.js` render functions.

## Visual/UX Decisions To Preserve

- Keep the site dark, polished, and space-like.
- Preserve the central "command core" identity treatment unless there is a strong reason to revise it.
- Keep the connected desktop map clean enough that regions and node clusters remain legible.
- Preserve the bounded drag/zoom behavior instead of turning the map into an infinite wandering canvas.
- Keep the mobile experience simpler than desktop, even if that means dropping the galaxy metaphor on phones.
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
- Breaking the desktop intro -> boot -> connected map -> detail flow
- Breaking the simplified mobile explorer flow
- Adding too many node effects, particles, or lines and making the desktop map stutter
- Introducing UI that cannot be closed
- Adding fragile remote asset dependencies without local fallback
- Accidentally treating `docs/` legacy publish files as the main homepage source

## Uncertainty To Keep In Mind

This repo currently has no automated tests and no formal build/lint pipeline. Future sessions should verify behavior carefully after edits and should be explicit when something is inferred from code rather than confirmed in a browser preview.
