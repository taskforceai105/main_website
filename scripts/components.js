import { logoCatalog } from "./data/logo-sources.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const seeded = (index, salt) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const renderStarLayer = (count, layer) => `
  <div class="star-layer star-layer--${layer}" aria-hidden="true">
    ${Array.from({ length: count }, (_, index) => {
      const x = Math.round(seeded(index, layer.length + 1) * 1000) / 10;
      const y = Math.round(seeded(index, layer.length + 2) * 1000) / 10;
      const size = (0.9 + seeded(index, layer.length + 3) * 2.6).toFixed(2);
      const alpha = (0.28 + seeded(index, layer.length + 4) * 0.72).toFixed(2);
      const delay = (seeded(index, layer.length + 5) * 6).toFixed(2);
      return `<span class="star" style="--x:${x}%; --y:${y}%; --size:${size}px; --alpha:${alpha}; --delay:${delay}s;"></span>`;
    }).join("")}
  </div>
`;

const renderLogoMark = (logoKey, label) => {
  const logo = logoCatalog[logoKey];

  if (!logo) {
    return `<span class="mark-badge__mono">${escapeHtml(label.slice(0, 2).toUpperCase())}</span>`;
  }

  if (logo.type === "image") {
    return `<img src="${logo.src}" alt="${escapeHtml(logo.alt)}" class="mark-badge__image mark-badge__image--${logo.fit}" />`;
  }

  return `<span class="mark-badge__mono">${escapeHtml(logo.text)}</span>`;
};

const renderIntroTitle = (title) => {
  if (title === "DET 105 AI TASK FORCE") {
    return "<span>DET 105</span><span>AI TASK FORCE</span>";
  }

  return `<span>${escapeHtml(title)}</span>`;
};

const renderGalaxyNode = (galaxy) => `
  <button
    class="galaxy-node"
    type="button"
    style="--galaxy-x:${galaxy.universeX}%; --galaxy-y:${galaxy.universeY}%; --galaxy-accent:${galaxy.accent}; --galaxy-accent-soft:${galaxy.accentSoft};"
    data-galaxy-button
    data-galaxy-id="${galaxy.id}"
  >
    <span class="galaxy-node__rings" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <span class="galaxy-node__orb" aria-hidden="true"></span>
    <span class="galaxy-node__label">
      <strong>${escapeHtml(galaxy.title)}</strong>
      <span>${escapeHtml(galaxy.subtitle)}</span>
    </span>
  </button>
`;

export const renderUniverseFocusPanel = (galaxy) => `
  <div class="universe-focus-card__header">
    <div>
      <span class="panel-kicker">Galaxy Focus</span>
      <h3>${escapeHtml(galaxy.title)}</h3>
    </div>
    <span class="universe-focus-card__badge">${escapeHtml(`${galaxy.planets.length} nodes`)}</span>
  </div>
  <p class="universe-focus-card__subtitle">${escapeHtml(galaxy.subtitle)}</p>
  <p class="universe-focus-card__copy">${escapeHtml(galaxy.why)}</p>
  <div class="universe-focus-card__actions">
    <button class="scene-button" type="button" data-enter-focused-galaxy>
      ${escapeHtml(`Enter ${galaxy.title}`)}
    </button>
  </div>
`;

const renderPlanetNode = (planet, accent) => `
  <button
    class="planet-node planet-node--${planet.size}"
    type="button"
    style="--planet-x:${planet.focusX}%; --planet-y:${planet.focusY}%; --planet-accent:${accent};"
    data-planet-button
    data-planet-id="${planet.id}"
  >
    <span class="planet-node__halo" aria-hidden="true"></span>
    <span class="planet-node__ring" aria-hidden="true"></span>
    <span class="planet-node__badge mark-badge">
      ${renderLogoMark(planet.logoKey, planet.name)}
    </span>
    <span class="planet-node__label">
      <strong>${escapeHtml(planet.name)}</strong>
      <span>${escapeHtml(planet.type)}</span>
    </span>
  </button>
`;

export const renderHeader = (content) => `
  <header class="app-header">
    <div class="app-header__brand">
      <span class="app-header__crest">
        <img src="assets/det105.png" alt="" />
      </span>
      <div>
        <p class="app-header__eyebrow">Det 105 AI Task Force</p>
        <h1 class="app-header__title">AI Universe</h1>
      </div>
    </div>
    <div class="app-header__actions">
      <button class="header-chip" type="button" data-open-brief>Universe Brief</button>
      <span class="header-state" data-header-state>${escapeHtml(content.subtitle)}</span>
    </div>
  </header>
`;

export const renderIntroOverlay = (content) => `
  <div class="intro-overlay" data-intro-overlay>
    <div class="intro-overlay__backdrop"></div>
    <div class="intro-overlay__panel">
      <span class="intro-overlay__eyebrow">Command Cosmos</span>
      <h2 class="intro-overlay__title">${renderIntroTitle(content.title)}</h2>
      <p class="intro-overlay__subtitle">${escapeHtml(content.subtitle)}</p>
      <p class="intro-overlay__copy">${escapeHtml(content.teaser)}</p>
      <p class="intro-overlay__detail">${escapeHtml(content.introPrompt)}</p>
      <div class="intro-overlay__actions">
        <button class="scene-button" type="button" data-enter-universe>
          ${escapeHtml(content.enterLabel)}
        </button>
        <button class="scene-button scene-button--ghost" type="button" data-skip-intro>
          ${escapeHtml(content.skipLabel)}
        </button>
      </div>
    </div>
  </div>
`;

export const renderUniverseBrief = (content) => `
  <aside class="universe-brief" data-universe-brief>
    <button class="panel-close" type="button" data-close-brief aria-label="Close universe brief">
      Close
    </button>
    <span class="panel-kicker">Universe Map</span>
    <h3>${escapeHtml(content.universeBriefTitle)}</h3>
    <p>${escapeHtml(content.universeBriefText)}</p>
  </aside>
`;

export const renderScene = (content, galaxies) => `
  <main class="scene-shell">
    <section class="scene-stage" data-scene-stage>
      ${renderStarLayer(120, "deep")}
      ${renderStarLayer(80, "mid")}
      ${renderStarLayer(50, "near")}
      <div class="nebula nebula--north" aria-hidden="true"></div>
      <div class="nebula nebula--east" aria-hidden="true"></div>
      <div class="nebula nebula--south" aria-hidden="true"></div>
      <div class="scene-vignette" aria-hidden="true"></div>
      <div class="scene-grid" aria-hidden="true"></div>
      <div class="scene-travel" aria-hidden="true"></div>

      <div class="command-core" data-command-core>
        <span class="command-core__rings" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="command-core__shell">
          <div class="command-core__logo-wrap">
            <img src="assets/det105.png" alt="Det 105 AI Task Force logo" class="command-core__logo" />
          </div>
        </div>
        <div class="command-core__text">
          <p>Det 105 Command Core</p>
          <strong>AI Universe Hub</strong>
          <span>Central identity node for galaxy-scale exploration.</span>
        </div>
      </div>

      <div class="universe-layer" data-universe-layer>
        ${galaxies.map(renderGalaxyNode).join("")}
      </div>

      <aside class="universe-focus-card" data-universe-focus hidden></aside>

      <div class="focus-layer" data-focus-layer aria-live="polite"></div>

      ${renderUniverseBrief(content)}

      <aside class="detail-panel" data-detail-panel hidden></aside>
    </section>

    ${renderIntroOverlay(content)}
  </main>
`;

export const renderFocusScene = (galaxy) => `
  <div
    class="focus-scene"
    style="--focus-accent:${galaxy.accent}; --focus-accent-soft:${galaxy.accentSoft};"
  >
    <div class="focus-scene__toolbar">
      <button class="back-control" type="button" data-back-universe>
        Back to Universe
      </button>
      <span class="focus-scene__meta">Galaxy Drilldown</span>
    </div>

    <div class="focus-galaxy">
      <span class="focus-galaxy__mist focus-galaxy__mist--a" aria-hidden="true"></span>
      <span class="focus-galaxy__mist focus-galaxy__mist--b" aria-hidden="true"></span>
      <span class="focus-galaxy__mist focus-galaxy__mist--c" aria-hidden="true"></span>
      <div class="focus-galaxy__core">
        <span class="focus-galaxy__core-rings" aria-hidden="true">
          <span></span>
          <span></span>
        </span>
        <div class="focus-galaxy__core-copy">
          <span class="panel-kicker">Destination Locked</span>
          <h2>${escapeHtml(galaxy.focusTitle)}</h2>
          <p>${escapeHtml(galaxy.focusCopy)}</p>
        </div>
      </div>

      <div class="focus-planets">
        <div class="focus-planets__header">
          <span class="panel-kicker">Tool Orbit</span>
          <p>Tap a tool node to open its briefing.</p>
        </div>
        ${galaxy.planets.map((planet) => renderPlanetNode(planet, galaxy.accent)).join("")}
      </div>
    </div>
  </div>
`;

export const renderDetailPanel = ({ galaxy, planet }) => {
  const isPlanet = Boolean(planet);
  const title = isPlanet ? planet.name : galaxy.focusTitle;
  const typeLine = isPlanet ? `${galaxy.title} / ${planet.type}` : galaxy.subtitle;
  const description = isPlanet ? planet.description : galaxy.description;
  const why = isPlanet ? planet.goodFor : galaxy.why;
  const href = isPlanet ? planet.href : null;

  return `
    <span class="detail-panel__handle" aria-hidden="true"></span>
    <button class="panel-close" type="button" data-close-detail aria-label="Close detail panel">
      Close
    </button>
    <span class="panel-kicker">${isPlanet ? "Tool Brief" : "Galaxy Brief"}</span>
    <h3>${escapeHtml(title)}</h3>
    <p class="detail-panel__subtitle">${escapeHtml(typeLine)}</p>
    <p class="detail-panel__description">${escapeHtml(description)}</p>
    <div class="detail-panel__callout">
      <span>Why it matters</span>
      <p>${escapeHtml(why)}</p>
    </div>
    <div class="detail-panel__actions">
      ${
        href
          ? `<a class="scene-button" href="${href}" target="_blank" rel="noreferrer">Open official link</a>`
          : ""
      }
      ${
        isPlanet
          ? `<button class="scene-button scene-button--ghost" type="button" data-back-galaxy>Back to galaxy</button>`
          : ""
      }
    </div>
  `;
};

export const renderFooter = (content) => `
  <footer class="site-footer">
    <div>
      <p class="site-footer__title">${escapeHtml(content.footerNote)}</p>
      <p class="site-footer__copy">${escapeHtml(content.footerDisclaimer)}</p>
    </div>
  </footer>
`;
