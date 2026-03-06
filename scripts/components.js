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
      const size = 1 + seeded(index, layer.length + 3) * 2.8;
      const alpha = 0.35 + seeded(index, layer.length + 4) * 0.65;
      const delay = seeded(index, layer.length + 5) * 6;
      return `
        <span
          class="star"
          style="--x:${x}%; --y:${y}%; --size:${size}px; --alpha:${alpha}; --delay:${delay}s;"
        ></span>
      `;
    }).join("")}
  </div>
`;

const renderPlanet = (planet) => {
  const dx = planet.x - 50;
  const dy = planet.y - 50;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const distance = Math.sqrt(dx * dx + dy * dy);

  return `
    <button
      class="planet-node planet-node--${planet.size}"
      type="button"
      style="--planet-x:${planet.x}%; --planet-y:${planet.y}%; --trace-angle:${angle}deg; --trace-length:${distance}%;"
      data-planet-button
      data-planet-id="${planet.id}"
    >
      <span class="planet-node__trace" aria-hidden="true"></span>
      <span class="planet-node__body"></span>
      <span class="planet-node__label">
        <strong>${escapeHtml(planet.name)}</strong>
        <span>${escapeHtml(planet.type)}</span>
      </span>
    </button>
  `;
};

const renderGalaxy = (galaxy, index) => `
  <article
    class="galaxy-cluster${index === 0 ? " is-active" : ""}"
    style="--cluster-x:${galaxy.x}%; --cluster-y:${galaxy.y}%; --cluster-size:${galaxy.size}px; --cluster-accent:${galaxy.accent}; --cluster-accent-soft:${galaxy.accentSoft};"
    data-galaxy
    data-galaxy-id="${galaxy.id}"
  >
    <button class="galaxy-cluster__core" type="button" data-galaxy-button data-galaxy-id="${galaxy.id}">
      <span class="galaxy-cluster__aura" aria-hidden="true"></span>
      <span class="galaxy-cluster__pulse" aria-hidden="true"></span>
      <span class="galaxy-cluster__halo" aria-hidden="true"></span>
      <span class="galaxy-cluster__label">
        <strong>${escapeHtml(galaxy.title)}</strong>
        <span>${escapeHtml(galaxy.subtitle)}</span>
      </span>
    </button>
    <div class="galaxy-cluster__system">
      ${galaxy.planets.map(renderPlanet).join("")}
    </div>
  </article>
`;

const renderLegend = (galaxies) => `
  <div class="universe-legend" data-reveal>
    ${galaxies
      .map(
        (galaxy, index) => `
          <button
            class="legend-chip${index === 0 ? " is-active" : ""}"
            type="button"
            data-legend-button
            data-galaxy-id="${galaxy.id}"
          >
            <span class="legend-chip__swatch" style="--swatch:${galaxy.accent};"></span>
            <span class="legend-chip__title">${escapeHtml(galaxy.title)}</span>
            <span class="legend-chip__count">${galaxy.planets.length} nodes</span>
          </button>
        `,
      )
      .join("")}
  </div>
`;

export const renderHeader = (content) => `
  <header class="minimal-header" data-reveal>
    <div class="minimal-header__inner">
      <div class="minimal-header__brand">
        <span class="minimal-header__crest">
          <img src="assets/det105.png" alt="" />
        </span>
        <div>
          <p class="minimal-header__eyebrow">${escapeHtml(content.heading)}</p>
          <h1 class="minimal-header__title">
            ${escapeHtml(content.title)}
            <span>${escapeHtml(content.subtitle)}</span>
          </h1>
        </div>
      </div>
      <p class="minimal-header__copy">${escapeHtml(content.supportingLine)}</p>
    </div>
  </header>
`;

export const renderUniverseScene = (content, galaxies) => `
  <main class="universe-page">
    <section class="universe-intro section-shell" data-reveal>
      <div class="universe-intro__copy">
        <span class="universe-intro__eyebrow">Explorable Knowledge Map</span>
        <h2>Explore the AI universe.</h2>
        <p>${escapeHtml(content.missionLine)}</p>
      </div>
      <div class="universe-intro__actions">
        <a class="universe-button" href="#universe-map">Enter Map</a>
        <button class="universe-button universe-button--ghost" type="button" data-focus-core>
          Focus Command Core
        </button>
      </div>
    </section>

    <section class="universe-wrap" id="universe-map" data-universe-wrapper>
      <div class="universe-sticky">
        <div class="universe-scene" data-universe-scene>
          ${renderStarLayer(130, "deep")}
          ${renderStarLayer(90, "mid")}
          ${renderStarLayer(65, "near")}
          <div class="nebula nebula--north" aria-hidden="true"></div>
          <div class="nebula nebula--east" aria-hidden="true"></div>
          <div class="nebula nebula--south" aria-hidden="true"></div>
          <div class="cosmic-grid" aria-hidden="true"></div>
          <div class="light-column light-column--left" aria-hidden="true"></div>
          <div class="light-column light-column--right" aria-hidden="true"></div>

          <div class="command-core" data-command-core>
            <div class="command-core__rings" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="command-core__shell">
              <div class="command-core__logo-wrap">
                <img src="assets/det105.png" alt="Det 105 AI Task Force logo" class="command-core__logo" />
              </div>
            </div>
            <div class="command-core__text">
              <p>Det 105 Command Core</p>
              <strong>Central AI Universe Hub</strong>
              <span>Anchor node for student exploration across the surrounding AI sectors.</span>
            </div>
          </div>

          <div class="cluster-field" data-cluster-field>
            ${galaxies.map(renderGalaxy).join("")}
          </div>

          ${renderLegend(galaxies)}

          <aside class="info-panel" data-info-panel data-state="galaxy" aria-live="polite">
            <button class="info-panel__close" type="button" data-panel-close aria-label="Close detail panel">
              Close
            </button>
            <div class="info-panel__eyebrow" data-panel-meta>Galaxy focus</div>
            <h3 class="info-panel__title" data-panel-title></h3>
            <p class="info-panel__subtitle" data-panel-subtitle></p>
            <p class="info-panel__description" data-panel-description></p>
            <div class="info-panel__callout">
              <span>Why it matters</span>
              <p data-panel-goodfor></p>
            </div>
            <div class="info-panel__actions">
              <a class="info-panel__link" data-panel-link target="_blank" rel="noreferrer">
                Open official link
              </a>
              <button class="info-panel__secondary" type="button" data-panel-back>
                Back to sector
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="command-deck section-shell">
      ${content.commandDeck
        .map(
          (item) => `
            <article class="command-card" data-reveal>
              <span class="command-card__label">${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `,
        )
        .join("")}
    </section>
  </main>
`;

export const renderFooter = (content) => `
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>
        <p class="site-footer__title">${escapeHtml(content.footerNote)}</p>
        <p class="site-footer__copy">${escapeHtml(content.footerDisclaimer)}</p>
      </div>
      <p class="site-footer__meta">
        <span>Interactive AI galaxy homepage</span>
        <span>Structured data, static deploy, Netlify-safe</span>
      </p>
    </div>
  </footer>
`;
