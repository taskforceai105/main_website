# Det 105 AI Task Force

A polished static landing page for the Det 105 AI Task Force website. The site is designed for Netlify deployment and keeps the homepage intentionally focused: a premium hero, animated command-center styling, and a curated AI tool explorer for students.

## Local preview

Serve the repository root with any static server.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Edit content

- Update tool categories, links, and card copy in `scripts/site-data.js`.
- Swap placeholder orbit badges in `assets/logos/`.
- Replace or refresh the main emblem image in `assets/AI_TaskForce.png` if needed.

## Netlify

- Publish directory: `.`
- Build command: none required

This repo is a static site and does not depend on a Node build step.
