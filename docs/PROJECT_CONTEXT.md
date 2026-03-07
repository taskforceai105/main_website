# Project Context

## What This Site Is

The Det 105 AI Task Force site is a student-facing AI exploration hub. Its job is to orient students to major AI categories, tools, and foundational practices through a clean categorized directory instead of a long lesson page or a fragile experimental interface.

This is not meant to be a full curriculum. The homepage should stay relatively brief, visual, and navigational: short descriptions, clear groupings, and links/resources that let students go deeper elsewhere.

## Current Direction

- Dark
- Modern
- Premium
- Clean and stable
- Light futuristic touches
- Category-based exploration
- Shared desktop/mobile design language
- Structured content over one-off hard-coded layouts

## Why The Simplification Happened

Recent desktop iterations pushed into fullscreen, boot/loading, and connected-map experiments. That direction became too fragile and hurt reliability. The current product decision is a corrective simplification:

- no galaxy architecture in the live UI
- no fullscreen-first launch
- no boot cinematic
- no drag/zoom map interaction
- no heavy desktop-only scene system

The current site should feel like a premium AI directory, not a game or simulation.

## What The Current Site Already Does

The current root homepage implementation is now split into:

- a minimal landing home page at `/`
- a separate AI directory page at `/ai-directory/`

The AI directory route is a static HTML/CSS/JS experience with:

- a shared top navigation bar
- a branded hero and summary stats
- category overview cards
- a sticky search/filter toolbar
- a featured-tools section
- multiple topic sections with tool cards
- a closable detail drawer on desktop and bottom sheet on mobile
- shared content and logo data for both desktop and mobile
- 50+ real AI-related items sourced from structured data

The rendered experience is driven by `scripts/app.js` state and `scripts/components.js` render functions.

## Current Information Architecture

The live site is organized into clear topic sections built from structured data in `scripts/data/universe.js`. Current categories include:

- AI Learning
- LLM Systems
- Coding Tools
- Research / Knowledge
- Agents / Automation
- Local / Open Source
- Image / Media
- Voice / Audio

Each item is presented as a card with:

- logo or monogram fallback
- name
- short description
- category/type
- official link
- optional detail drawer content such as why it matters and related tools

## What Earlier Versions Struggled With

- The desktop map/fullscreen/boot architecture became fragile and harder to maintain.
- Complex scene logic created usability and reliability risks that outweighed the visual payoff.
- Device-specific logic became more complex than the actual content/navigation needs.
- Broken or inconsistent logo handling was more obvious in dense visual layouts.

## Visual/UX Decisions To Preserve

- Keep the site dark, polished, and modern.
- Preserve concise copy and readable spacing.
- Keep desktop richer through width and layout, not through a separate interaction model.
- Keep mobile simple, touch-friendly, and readable.
- Preserve strong logo rendering and deliberate monogram fallbacks.
- Keep the detail drawer/sheet easy to open and easy to close.
- Keep the page stable and fast.

## Content And Asset Strategy

- Tool/category definitions live in `scripts/data/universe.js`.
- The live UI uses the directory-oriented exports in that file:
  - `directorySections`
  - `directoryItems`
  - `featuredDirectoryItems`
  - `directoryStats`
- Logo choices and provenance live in `scripts/data/logo-sources.js`.
- Stable local logo copies live in `assets/logos/`.
- Monogram fallbacks are already used where clean official product assets were not practical.

This is the pattern to preserve. Future sessions should extend the structured data first, then adjust rendering/styling only as needed.

## Architecture Snapshot

- Stack: plain static HTML, CSS, and ES modules
- Root landing page: `index.html`
- AI directory page: `ai-directory/index.html`
- Main state logic: `scripts/app.js`
- Shared nav logic: `scripts/site-nav.js`
- Pages path handling: `scripts/site-paths.js`
- Static build step: `scripts/build_pages.py`
- Render helpers: `scripts/components.js`
- Content/config: `scripts/data/universe.js`, `scripts/data/logo-sources.js`
- Primary stylesheet: `styles.css`
- GitHub Pages deployment: GitHub Actions builds a `dist/` artifact with `python3 scripts/build_pages.py`

## Known Risks / Regressions To Avoid

- Reintroducing the removed fullscreen/map/boot architecture without a very strong reason
- Turning the homepage into a text-heavy lesson page
- Breaking the search/filter/navigation flow
- Breaking the detail drawer or making it fall off-screen
- Leaving broken logo states in the UI
- Adding fragile remote asset dependencies without local fallback
- Accidentally treating `docs/` legacy publish files as the main homepage source
- Reintroducing root-only path assumptions that break under GitHub Pages project-path hosting

## Uncertainty To Keep In Mind

This repo currently has no automated tests and no formal build/lint pipeline. Future sessions should verify behavior carefully after edits and should be explicit when something is inferred from code rather than confirmed in a browser preview.
