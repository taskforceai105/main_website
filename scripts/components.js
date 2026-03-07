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

const buildDesktopConnections = (nodes) => {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const seen = new Set();

  return nodes.flatMap((node) =>
    (node.relatedNodeIds ?? [])
      .map((relatedId) => {
        const related = nodeMap.get(relatedId);
        if (!related) {
          return null;
        }

        const key = [node.id, relatedId].sort().join(":");
        if (seen.has(key)) {
          return null;
        }

        seen.add(key);
        return {
          id: key,
          source: node,
          target: related,
        };
      })
      .filter(Boolean),
  );
};

const renderDesktopRegion = (region, selectedNodeId, nodeMap) => {
  const isActive = selectedNodeId && nodeMap.get(selectedNodeId)?.regionId === region.id;

  return `
    <section
      class="desktop-region${isActive ? " is-active" : ""}"
      style="--region-x:${region.x}px; --region-y:${region.y}px; --region-w:${region.width}px; --region-h:${region.height}px; --region-accent:${region.accent};"
      aria-hidden="true"
    >
      <div class="desktop-region__halo"></div>
      <div class="desktop-region__label">
        <span>${escapeHtml(region.subtitle)}</span>
        <strong>${escapeHtml(region.title)}</strong>
      </div>
    </section>
  `;
};

const renderDesktopConnection = (connection, selectedNodeId) => {
  const isActive =
    selectedNodeId && (selectedNodeId === connection.source.id || selectedNodeId === connection.target.id);

  return `
    <line
      class="desktop-connection${isActive ? " is-active" : ""}"
      x1="${connection.source.x}"
      y1="${connection.source.y}"
      x2="${connection.target.x}"
      y2="${connection.target.y}"
    />
  `;
};

const renderDesktopNode = (node, accent, selectedNodeId, relatedNodeIds) => {
  const isSelected = node.id === selectedNodeId;
  const isRelated = !isSelected && selectedNodeId && relatedNodeIds.has(node.id);
  const scale = Math.max(0.86, Math.min(1.32, node.importance ?? 1));

  return `
    <button
      class="desktop-node${isSelected ? " is-selected" : ""}${isRelated ? " is-related" : ""}"
      type="button"
      data-desktop-node
      data-node-id="${node.id}"
      style="--node-x:${node.x}px; --node-y:${node.y}px; --node-scale:${scale}; --node-accent:${accent};"
      aria-label="${escapeHtml(`${node.name}, ${node.type}`)}"
    >
      <span class="desktop-node__halo" aria-hidden="true"></span>
      <span class="desktop-node__ring" aria-hidden="true"></span>
      <span class="desktop-node__badge mark-badge">
        ${renderLogoMark(node.logoKey, node.name)}
      </span>
      <span class="desktop-node__label">
        <strong>${escapeHtml(node.name)}</strong>
        <span>${escapeHtml(node.type)}</span>
      </span>
    </button>
  `;
};

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
      <button class="header-chip" type="button" data-open-brief hidden>Map Brief</button>
      <span class="header-state" data-header-state>${escapeHtml(content.subtitle)}</span>
    </div>
  </header>
`;

export const renderIntroOverlay = (content) => `
  <div class="intro-overlay" data-intro-overlay>
    <div class="intro-overlay__backdrop"></div>
    <div class="intro-overlay__panel">
      <span class="intro-overlay__eyebrow">Det 105 Command Core</span>
      <h2 class="intro-overlay__title">${renderIntroTitle(content.title)}</h2>
      <p class="intro-overlay__subtitle">${escapeHtml(content.subtitle)}</p>
      <p class="intro-overlay__copy">${escapeHtml(content.teaser)}</p>
      <p class="intro-overlay__detail">${escapeHtml(content.introPrompt)}</p>
      <div class="intro-overlay__actions">
        <button class="scene-button scene-button--primary" type="button" data-enter-primary>
          ${escapeHtml(content.enterLabel)}
        </button>
      </div>
    </div>
  </div>
`;

export const renderBootOverlay = (steps, stepIndex, progress) => {
  const activeStep = steps[Math.min(stepIndex, steps.length - 1)] ?? steps[0];

  return `
    <div class="boot-overlay__backdrop"></div>
    <div class="boot-overlay__panel">
      <span class="panel-kicker">System Entry</span>
      <h2>Initializing AI Universe</h2>
      <p class="boot-overlay__copy">${escapeHtml(activeStep?.copy ?? "Bringing the command interface online.")}</p>
      <div class="boot-overlay__progress" aria-hidden="true">
        <span style="--boot-progress:${progress};"></span>
      </div>
      <ol class="boot-overlay__steps" aria-label="Initialization progress">
        ${steps
          .map(
            (step, index) => `
              <li class="boot-overlay__step${index < stepIndex ? " is-complete" : ""}${index === stepIndex ? " is-active" : ""}">
                <strong>${escapeHtml(step.label)}</strong>
                <span>${escapeHtml(step.short)}</span>
              </li>
            `,
          )
          .join("")}
      </ol>
    </div>
  `;
};

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

const renderMobileToolCard = (galaxy, planet) => `
  <button
    class="mobile-tool-card"
    type="button"
    data-mobile-tool
    data-galaxy-id="${galaxy.id}"
    data-planet-id="${planet.id}"
  >
    <span class="mobile-tool-card__badge mark-badge">
      ${renderLogoMark(planet.logoKey, planet.name)}
    </span>
    <span class="mobile-tool-card__copy">
      <strong>${escapeHtml(planet.name)}</strong>
      <span>${escapeHtml(planet.type)}</span>
      <p>${escapeHtml(planet.description)}</p>
    </span>
  </button>
`;

export const renderMobileExplorer = (content, galaxies, activeGalaxy) => `
  <section class="mobile-explorer__hero">
    <span class="panel-kicker">Det 105 Directory</span>
    <h2>${escapeHtml(content.subtitle)}</h2>
    <p>${escapeHtml("Explore AI tools and resources through a simplified category directory designed for touch-first browsing.")}</p>
  </section>

  <nav class="mobile-category-nav" aria-label="AI categories">
    ${galaxies
      .map(
        (galaxy) => `
          <button
            class="mobile-category-chip${galaxy.id === activeGalaxy.id ? " is-active" : ""}"
            type="button"
            data-mobile-category
            data-galaxy-id="${galaxy.id}"
          >
            ${escapeHtml(galaxy.title)}
          </button>
        `,
      )
      .join("")}
  </nav>

  <section class="mobile-category-panel" style="--focus-accent:${activeGalaxy.accent};">
    <div class="mobile-category-panel__header">
      <div>
        <span class="panel-kicker">Category Focus</span>
        <h3>${escapeHtml(activeGalaxy.title)}</h3>
      </div>
      <span class="mobile-category-panel__badge">${escapeHtml(`${activeGalaxy.planets.length} tools`)}</span>
    </div>
    <p class="mobile-category-panel__subtitle">${escapeHtml(activeGalaxy.subtitle)}</p>
    <p class="mobile-category-panel__copy">${escapeHtml(activeGalaxy.why)}</p>
  </section>

  <section class="mobile-tool-list" aria-label="${escapeHtml(activeGalaxy.title)} tools">
    ${activeGalaxy.planets.map((planet) => renderMobileToolCard(activeGalaxy, planet)).join("")}
  </section>
`;

export const renderDesktopUniverse = ({
  regions,
  nodes,
  dimensions,
  selectedNodeId,
  isFullscreen,
  showBriefToggle,
}) => {
  const regionMap = new Map(regions.map((region) => [region.id, region]));
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) ?? null : null;
  const relatedNodeIds = new Set(selectedNode?.relatedNodeIds ?? []);
  const connections = buildDesktopConnections(nodes);

  return `
    <div class="desktop-universe__controls">
      <div class="desktop-map-controls">
        <button class="zoom-control" type="button" data-desktop-zoom-out aria-label="Zoom out">-</button>
        <button class="zoom-control" type="button" data-desktop-reset aria-label="Reset map view">Home</button>
        <button class="zoom-control" type="button" data-desktop-zoom-in aria-label="Zoom in">+</button>
      </div>
      <div class="desktop-map-controls desktop-map-controls--meta">
        <span class="desktop-map-controls__label">${escapeHtml(selectedNode ? `${selectedNode.name} selected` : "Connected AI ecosystem")}</span>
        <button class="zoom-control zoom-control--wide" type="button" data-toggle-fullscreen aria-label="${
          isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
        }">
          ${escapeHtml(isFullscreen ? "Exit full" : "Fullscreen")}
        </button>
      </div>
    </div>

    <div class="desktop-universe__viewport" data-desktop-viewport>
      <div
        class="desktop-universe__plane"
        data-desktop-plane
        style="--plane-width:${dimensions.width}px; --plane-height:${dimensions.height}px;"
      >
        <div class="desktop-universe__core" aria-hidden="true">
          <span class="desktop-universe__core-rings">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="desktop-universe__core-shell">
            <img src="assets/det105.png" alt="" />
          </div>
          <div class="desktop-universe__core-copy">
            <span>Det 105 command core</span>
            <strong>Interconnected AI ecosystem</strong>
          </div>
        </div>

        <svg
          class="desktop-connections"
          viewBox="0 0 ${dimensions.width} ${dimensions.height}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${connections.map((connection) => renderDesktopConnection(connection, selectedNodeId)).join("")}
        </svg>

        <div class="desktop-regions">
          ${regions.map((region) => renderDesktopRegion(region, selectedNodeId, nodeMap)).join("")}
        </div>

        <div class="desktop-nodes">
          ${nodes
            .map((node) => renderDesktopNode(node, regionMap.get(node.regionId)?.accent ?? "#74beff", selectedNodeId, relatedNodeIds))
            .join("")}
        </div>
      </div>
    </div>

    <div class="desktop-universe__meta">
      <p class="desktop-universe__summary">
        ${escapeHtml(
          showBriefToggle
            ? "Drag to pan, use the mouse wheel to zoom, and click any node for a briefing."
            : "Mapped AI tools, model ecosystems, and learning fundamentals in one connected command field.",
        )}
      </p>
    </div>
  `;
};

export const renderScene = (content) => `
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
      <aside class="scene-hint" data-scene-hint hidden></aside>

      <section class="desktop-universe" data-desktop-universe hidden></section>
      <section class="mobile-explorer" data-mobile-explorer hidden></section>

      ${renderUniverseBrief(content)}

      <aside class="detail-panel" data-detail-panel hidden></aside>
      <section class="boot-overlay" data-boot-overlay hidden></section>
    </section>

    ${renderIntroOverlay(content)}
  </main>
`;

export const renderDetailPanel = ({ title, kicker, subtitle, description, why, href, backLabel, mode }) => `
  <span class="detail-panel__handle" aria-hidden="true"></span>
  <button class="panel-close" type="button" data-close-detail aria-label="Close detail panel">
    Close
  </button>
  <span class="panel-kicker">${escapeHtml(kicker)}</span>
  <h3>${escapeHtml(title)}</h3>
  <p class="detail-panel__subtitle">${escapeHtml(subtitle)}</p>
  <p class="detail-panel__description">${escapeHtml(description)}</p>
  <div class="detail-panel__callout">
    <span>Why it matters</span>
    <p>${escapeHtml(why)}</p>
  </div>
  <p class="detail-panel__mode-hint">
    ${
      mode === "mobile"
        ? "Use Close or Back to return to the directory."
        : "Use Close, Back to map, or Escape to dismiss this briefing."
    }
  </p>
  <div class="detail-panel__actions">
    ${href ? `<a class="scene-button" href="${href}" target="_blank" rel="noreferrer">Open official link</a>` : ""}
    <button class="scene-button scene-button--ghost" type="button" data-clear-selection>${escapeHtml(backLabel)}</button>
  </div>
`;

export const renderSceneHint = ({ phase, isFullscreen }) => {
  if (phase === "intro" || phase === "boot") {
    return "";
  }

  if (phase === "mobile") {
    return `
      <span class="panel-kicker">Quick Navigation</span>
      <p>Tap a category, then open any tool card for a concise briefing and official link.</p>
    `;
  }

  return `
    <span class="panel-kicker">Universe Navigation</span>
    <p>Drag to pan, use the mouse wheel to zoom, and click nodes to inspect the connected AI ecosystem.${
      isFullscreen ? " Press Escape to leave fullscreen." : ""
    }</p>
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
