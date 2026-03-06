# Det 105 AI Task Force

An immersive static homepage for the Det 105 AI Task Force website. The current version is an AI universe / galaxy map experience built for Netlify deployment: a central command core, topic-sector galaxies, clickable planetary nodes, and a focused detail panel for exploration.

## Local preview

Serve the repository root with any static server.

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Edit content

- Update universe sectors, node positions, links, and copy in `scripts/site-data.js`.
- Replace the command-core identity image in `assets/det105.png` if needed.
- Fine-tune visual layout and motion in `styles.css`.

## Netlify

- Publish directory: `.`
- Build command: none required

This repo is a static site and does not depend on a Node build step.
