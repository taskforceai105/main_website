# Next Steps

Note:
The current codebase auto-detects desktop vs mobile and now intentionally serves a strong desktop command-map experience plus a simpler mobile directory. Future sessions should verify/polish that split on real devices rather than assuming both modes share the same interaction model.

## Must-Haves

### 1. Finalize mobile explorer landscape polish

Priority: Highest

Goal:
Finish the remaining mobile explorer polish so portrait and rotated-phone views feel fully deliberate instead of just workable.

Acceptance criteria:

- Intro CTA, hero card, category chips, and tool cards all fit comfortably on modern phone sizes.
- Mobile explorer remains easy to understand without relying on the desktop galaxy metaphor.
- Low-height landscape mobile framing feels intentional, not like desktop squeezed into a short window.
- Tool detail panels stay fully inside the viewport in portrait and landscape.

Regression warnings:

- Do not collapse Mobile Explorer back into the desktop universe composition.
- Do not reintroduce map-style node clutter or gesture-heavy navigation on phones.

### 2. Refine desktop connected-map readability

Priority: Highest

Goal:
Keep the connected desktop AI universe readable and dramatic while preserving the new single-scene architecture.

Acceptance criteria:

- Region halos, node labels, and relationship webbing remain legible at the default view.
- The default camera framing shows the whole ecosystem comfortably on common desktop sizes.
- Added labels, copy, or chrome do not crowd the main stage.
- Any new informational UI remains optional and closable.

Regression warnings:

- Do not turn the map into a dense dashboard.
- Do not add heavy visual effects that compromise frame pacing.

### 3. Strengthen desktop node polish

Priority: High

Goal:
Improve node treatment, hover/focus response, and cluster distinction without adding GPU-heavy effects.

Acceptance criteria:

- Node selection feels clearly intentional.
- Related-node highlighting remains subtle but informative.
- Region identity is clear without giant labels.
- The detail panel continues to stay fully on-screen.

Regression warnings:

- Do not turn node styling into a noisy glow-fest.
- Do not break the current bounded pan/zoom behavior.

### 4. Tune desktop launch flow

Priority: High

Goal:
Keep the desktop landing -> fullscreen attempt -> boot -> map flow polished and reliable.

Acceptance criteria:

- Clicking the main CTA attempts fullscreen without breaking when denied.
- The boot sequence stays short and feels integrated with the launch flow.
- Transition timing still feels smooth on mainstream desktop browsers.
- Motion still respects reduced-motion preferences.

Regression warnings:

- Do not turn the boot layer into a long blocking splash screen.
- Do not let fullscreen assumptions break the non-fullscreen fallback.

### 5. Improve node/logo presentation

Priority: High

Goal:
Evolve map nodes beyond simple badges while staying polished and production-safe.

Acceptance criteria:

- Tool/company nodes feel more visually distinctive than plain circular dots.
- Official brand marks are used when practical and reliable.
- If a remote asset is unreliable, a local copy is stored cleanly in `assets/logos/`.
- Fallback monograms remain deliberate and readable when no official asset is practical.

Regression warnings:

- Do not hotlink fragile assets into production casually.
- Do not mix inconsistent logo treatments that make the galaxy feel amateurish.

### 6. Expand and maintain desktop universe content

Priority: Medium

Goal:
Keep homepage content maintainable through structured data instead of spreading content into markup logic.

Acceptance criteria:

- New galaxy/tool content stays primarily in `scripts/data/universe.js`.
- New connected-map nodes stay in the desktop universe arrays in `scripts/data/universe.js`.
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

- Add subtle map home/focus affordances for keyboard users on desktop.
- Polish the mobile explorer landscape framing after real-device review.
- Audit whether unused legacy assets/files in `docs/` should be cleaned up in a future focused pass.
- Add a clearer content-editing note for non-code maintainers if the structured data grows.

## Do Not Regress

- Intro -> boot -> connected desktop map -> detail hierarchy
- Automatic desktop vs mobile experience detection
- Simplified mobile explorer flow
- Closable overlays and panels
- Dark cinematic style
- Clean universe-level presentation
- Netlify root-static deployment
- Structured content and asset metadata files
