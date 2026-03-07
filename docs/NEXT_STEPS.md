# Next Steps

Note:
The current codebase now auto-detects desktop vs mobile and intentionally serves two different experiences. Future sessions should verify/polish that split on real devices rather than assuming mobile still uses the galaxy-map interaction model.

## Must-Haves

### 1. Finalize mobile explorer polish

Priority: Highest

Goal:
Finish the remaining mobile explorer polish so portrait and rotated-phone views feel fully deliberate instead of just mostly corrected.

Acceptance criteria:

- Intro CTA, hero card, category chips, and tool cards all fit comfortably on modern phone sizes.
- Mobile explorer remains easy to understand without relying on the desktop galaxy metaphor.
- Low-height landscape mobile framing feels intentional, not like desktop squeezed into a short window.
- Tool detail panels stay fully inside the viewport in portrait and landscape.

Regression warnings:

- Do not collapse Mobile Explorer back into the desktop universe composition.
- Do not reintroduce map-style node clutter or gesture-heavy navigation on phones.

### 2. Reduce desktop universe-level clutter

Priority: Highest

Goal:
Keep the universe map readable and dramatic, with galaxy destinations only and no premature detail spillover.

Acceptance criteria:

- Desktop universe view remains visually cleaner than galaxy drilldown.
- No planet/tool nodes appear until a galaxy is selected.
- Additional labels, copy, or chrome do not crowd the main stage.
- Any new informational UI in universe view is optional and closable.

Regression warnings:

- Do not turn the desktop universe view into a dense dashboard.
- Do not add persistent panels that fight the map for attention.

### 3. Strengthen the intro overlay

Priority: High

Goal:
Make the first-screen moment feel more intentional and cinematic while staying concise.

Acceptance criteria:

- Intro remains the default entry state.
- Copy stays brief and orientation-focused.
- The primary action clearly leads into the universe experience.
- Users can still bypass or exit the intro path cleanly.

Regression warnings:

- Do not overload the intro with long explanations.
- Do not create an intro that traps the user or blocks recovery.

### 4. Improve universe -> galaxy drilldown transitions

Priority: High

Goal:
Make galaxy selection feel like a dramatic zoom/travel event rather than a simple view swap.

Acceptance criteria:

- Galaxy click produces a clear drilldown transition.
- The selected galaxy feels like the destination anchor.
- Returning to universe view remains clear and reliable.
- Motion still respects reduced-motion preferences.

Regression warnings:

- Do not remove the clear back path to universe view.
- Do not break the current transition lock/state flow in `scripts/app.js`.

### 5. Improve node/logo presentation

Priority: High

Goal:
Evolve planet/tool nodes beyond simple spheres while staying polished and production-safe.

Acceptance criteria:

- Tool/company nodes feel more visually distinctive than plain circular dots.
- Official brand marks are used when practical and reliable.
- If a remote asset is unreliable, a local copy is stored cleanly in `assets/logos/`.
- Fallback monograms remain deliberate and readable when no official asset is practical.

Regression warnings:

- Do not hotlink fragile assets into production casually.
- Do not mix inconsistent logo treatments that make the galaxy feel amateurish.

### 6. Refine content/data structure

Priority: Medium

Goal:
Keep homepage content maintainable through structured data instead of spreading content into markup logic.

Acceptance criteria:

- New galaxy/tool content stays primarily in `scripts/data/universe.js`.
- Logo/source metadata stays in `scripts/data/logo-sources.js` or supporting asset notes.
- Render logic remains mostly presentational.

Regression warnings:

- Do not hard-code lots of copy directly into `components.js` or `app.js`.

### 7. Preserve performance and Netlify compatibility

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

- Add a more dramatic galaxy-selection visual accent without increasing clutter.
- Polish the new mobile explorer layout and landscape framing after real-device review.
- Audit whether unused legacy assets/files in `docs/` should be cleaned up in a future focused pass.
- Add a clearer content-editing note for non-code maintainers if the structured data grows.

## Do Not Regress

- Intro -> universe -> galaxy -> detail hierarchy
- Automatic desktop vs mobile experience detection
- Simplified mobile explorer flow
- Closable overlays and panels
- Dark cinematic style
- Clean universe-level presentation
- Netlify root-static deployment
- Structured content and asset metadata files
