# Next Steps

Note:
The live site has been simplified into one responsive categorized AI directory. Future sessions should improve that system rather than reviving the removed fullscreen/map/boot architecture.

## Must-Haves

### 1. Finalize real-device responsive polish

Priority: Highest

Goal:
Confirm the new shared directory layout feels intentional on actual desktop and mobile hardware, then tighten any remaining spacing or touch-target issues.

Acceptance criteria:

- Header, hero, toolbar, cards, and detail panel feel clean on common desktop and phone sizes.
- No horizontal overflow appears on small screens.
- The detail panel remains fully usable on desktop and mobile.
- Sticky navigation remains helpful without covering important content.

Regression warnings:

- Do not reintroduce separate desktop map logic.
- Do not turn mobile back into a special-case experimental interface.

### 2. Improve logo coverage and consistency

Priority: High

Goal:
Replace the most visible monogram fallbacks with stable local brand assets where practical, while keeping the fallback system intact.

Acceptance criteria:

- Major tools keep rendering cleanly even if an image asset fails.
- New local assets are documented in `assets/logos/SOURCES.md`.
- Card/logo treatment remains visually consistent.

Regression warnings:

- Do not hotlink fragile assets into production casually.
- Do not leave broken image states in the final UI.

### 3. Refine search and category navigation

Priority: High

Goal:
Make the directory faster to scan and easier to navigate without cluttering the page.

Acceptance criteria:

- Search remains responsive and easy to understand.
- Category filters and overview cards feel coherent rather than duplicative.
- Empty-state behavior stays polished.

Regression warnings:

- Do not turn the toolbar into a dense control panel.
- Do not hide too much content behind filters by default.

### 4. Maintain and expand the structured data cleanly

Priority: High

Goal:
Keep content maintainable through structured data instead of spreading copy into render logic.

Acceptance criteria:

- New tools/categories stay primarily in `scripts/data/universe.js`.
- `directorySections`, `directoryItems`, and related exports remain the live source of truth.
- Outbound links, descriptions, and categories remain accurate.

Regression warnings:

- Do not hard-code lots of content directly into `components.js` or `app.js`.
- Do not let the legacy map-era data and the live directory data drift into confusion.

### 5. Decide whether to clean up legacy map data

Priority: Medium

Goal:
Evaluate whether the old map-oriented exports in `scripts/data/universe.js` should be removed or retained for reference.

Acceptance criteria:

- If removed, the live directory exports remain intact and documented.
- If retained, comments/docs clearly explain that the map data is legacy and not live UI architecture.

Regression warnings:

- Do not delete structured data casually without confirming it is unused.

### 6. Preserve performance and Netlify compatibility

Priority: Medium

Goal:
Keep the site lightweight and easy to deploy on Netlify with the existing root-static setup.

Acceptance criteria:

- Root `index.html` remains deployable as a static entry.
- `netlify.toml` root publish assumptions still hold unless intentionally changed.
- Changes do not introduce an unnecessary build dependency.

Regression warnings:

- Do not add a framework/toolchain unless the user explicitly wants that tradeoff.
- Do not make `docs/` the accidental source of truth for Netlify deployment.

## Nice-To-Haves

- Add a lightweight “copy link” or shareable deep-link affordance for selected tools.
- Add a small “featured” rationale or curation note for the top cards.
- Consider a subtle alphabetical or “popular first” sorting control if it stays simple.
- Audit whether unused legacy assets/files in `docs/` should be cleaned up in a future focused pass.

## Do Not Regress

- The clean categorized homepage structure
- Search and category filtering
- Closable detail panel behavior
- Strong logo fallback handling
- Dark modern visual language
- Netlify root-static deployment
- Structured content and asset metadata files
