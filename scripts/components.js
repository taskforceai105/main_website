const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderNavbar = (categories) => `
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand-mark" href="#hero" aria-label="Det 105 AI Task Force home">
        <span class="brand-mark__crest">
          <img src="assets/AI_TaskForce.png" alt="" />
        </span>
        <span class="brand-mark__title">
          <strong>DET 105 AI TASK FORCE</strong>
          <span>Student AI Exploration Hub</span>
        </span>
      </a>

      <nav class="top-nav" aria-label="Primary">
        <div class="nav-links">
          <a class="nav-link nav-link--primary" href="#hero">Overview</a>
          <a class="nav-link" href="#tool-explorer">Tool Explorer</a>
          <div class="menu-wrap" data-menu-wrap>
            <button
              class="menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="mega-menu"
              data-menu-toggle
            >
              Tool Categories
            </button>
            ${renderMegaMenu(categories)}
          </div>
        </div>
        <a class="cta-link" href="#tool-explorer">Explore Tools</a>
      </nav>
    </div>
  </header>
`;

export const renderMegaMenu = (categories) => `
  <section class="mega-menu" id="mega-menu" aria-label="Tool categories">
    <div class="mega-menu__header">
      <div>
        <span class="mega-menu__eyebrow">Tactical Access Grid</span>
        <h2 class="mega-menu__title">Launch into the AI ecosystem without the clutter.</h2>
        <p class="mega-menu__copy">
          The homepage stays intentionally focused. This menu surfaces the current categories and a few
          fast-entry links, while the explorer below provides the full card view.
        </p>
      </div>
      <span class="mega-menu__hint">Hover, click, or tap to explore</span>
    </div>

    <div class="mega-menu__grid">
      ${categories
        .map(
          (category) => `
            <article class="menu-column">
              <h3 class="menu-column__title">${escapeHtml(category.title)}</h3>
              <p class="menu-column__description">${escapeHtml(category.description)}</p>
              <ul class="menu-column__list">
                ${category.tools
                  .slice(0, 3)
                  .map(
                    (tool) => `
                      <li>
                        <a href="${tool.href}" target="_blank" rel="noreferrer">
                          <span>${escapeHtml(tool.name)}</span>
                        </a>
                      </li>
                    `,
                  )
                  .join("")}
              </ul>
            </article>
          `,
        )
        .join("")}
    </div>
  </section>
`;

export const renderHero = (content, orbitingLogos) => `
  <section class="hero-section section-shell" id="hero" data-reveal>
    <div class="hero-layout">
      <div class="hero-copy">
        <span class="eyebrow">${escapeHtml(content.eyebrow)}</span>
        <h1 class="hero-title">
          ${escapeHtml(content.title)}
          <span>Curated. Technical. Mission-ready.</span>
        </h1>
        <p class="hero-subtitle">${escapeHtml(content.subtitle)}</p>
        <p class="hero-supporting">${escapeHtml(content.supportingLine)}</p>
        <div class="hero-actions">
          <a class="hero-button" href="#tool-explorer">Explore Tools</a>
          <a class="hero-button hero-button--ghost" href="#mission-brief">View Mission Brief</a>
        </div>
      </div>

      <div class="hero-visual-area">
        <div class="hero-visual-shell" data-parallax-shell>
          <span class="hero-beacon hero-beacon--a"></span>
          <span class="hero-beacon hero-beacon--b"></span>
          <span class="orbital-grid" aria-hidden="true"></span>
          <div class="coin-stage" aria-label="Animated Det 105 AI Task Force emblem">
            <span class="ring ring--outer" aria-hidden="true"></span>
            <span class="ring ring--middle" aria-hidden="true"></span>
            <span class="ring ring--inner" aria-hidden="true"></span>

            <div class="orbit" aria-label="Orbiting AI ecosystem logos">
              ${orbitingLogos
                .map(
                  (logo) => `
                    <div class="orbit-item" style="--angle: ${logo.angle}">
                      <a
                        class="orbit-badge"
                        href="${logo.href}"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="${escapeHtml(logo.name)}"
                      >
                        <img src="${logo.asset}" alt="${escapeHtml(logo.name)} badge" />
                      </a>
                    </div>
                  `,
                )
                .join("")}
            </div>

            <div class="energy-nodes" aria-hidden="true">
              <span class="energy-node"></span>
              <span class="energy-node"></span>
              <span class="energy-node"></span>
            </div>

            <div class="coin-emblem">
              <div class="coin-face coin-face--front">
                <img src="assets/AI_TaskForce.png" alt="Det 105 AI Task Force emblem" />
              </div>
              <div class="coin-face coin-face--back">
                <div class="service-rings" aria-hidden="true"></div>
                <div class="coin-back-core">
                  <div class="service-badges">
                    <span class="service-pill">USAF</span>
                    <span class="service-pill">USSF</span>
                  </div>
                  <strong>Joint Air &amp; Space AI Focus</strong>
                  <span>
                    A premium back-face treatment inspired by service heritage, aerospace precision, and
                    modern AI operations.
                  </span>
                </div>
              </div>
              <div class="coin-edge" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-signals" id="mission-brief">
        ${content.signals
          .map(
            (signal) => `
              <article class="signal-card">
                <p class="signal-card__label">${escapeHtml(signal.label)}</p>
                <p class="signal-card__text">${escapeHtml(signal.text)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

export const renderToolCards = (category) =>
  category.tools
    .map(
      (tool) => `
        <article class="tool-card" data-reveal>
          <span class="tool-card__tag">${escapeHtml(tool.tag)}</span>
          <h4 class="tool-card__title">${escapeHtml(tool.name)}</h4>
          <p class="tool-card__description">${escapeHtml(tool.description)}</p>
          <a class="tool-card__link" href="${tool.href}" target="_blank" rel="noreferrer">
            Open official link
          </a>
        </article>
      `,
    )
    .join("");

export const renderToolExplorer = (categories, intro) => `
  <section class="tools-section section-shell" id="tool-explorer" data-reveal>
    <div class="tools-shell">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Tool Explorer</span>
          <h2>Focused categories. Fast decisions.</h2>
          <p>${escapeHtml(intro)}</p>
        </div>
        <div class="section-badge">
          <strong>${categories.length}</strong>
          Curated lanes
        </div>
      </div>

      <div class="category-tabs" role="tablist" aria-label="AI tool categories">
        ${categories
          .map(
            (category, index) => `
              <button
                class="category-tab${index === 0 ? " is-active" : ""}"
                type="button"
                role="tab"
                aria-selected="${index === 0 ? "true" : "false"}"
                aria-controls="tools-panel"
                data-category-tab
                data-category-id="${category.id}"
              >
                ${escapeHtml(category.title)}
              </button>
            `,
          )
          .join("")}
      </div>

      <div class="tools-panel" id="tools-panel" role="tabpanel" tabindex="0">
        <div class="tools-panel__heading">
          <div>
            <h3 data-panel-title>${escapeHtml(categories[0].title)}</h3>
            <p data-panel-description>${escapeHtml(categories[0].description)}</p>
          </div>
        </div>
        <div class="tools-grid" data-tools-grid>
          ${renderToolCards(categories[0])}
        </div>
      </div>
    </div>
  </section>
`;

export const renderFooter = (content) => `
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div>
        <p class="site-footer__title">${escapeHtml(content.footerNote)}</p>
        <p class="site-footer__copy">${escapeHtml(content.footerDisclaimer)}</p>
      </div>
      <p class="site-footer__meta">
        <span>Netlify-ready static deployment</span>
        <span>Data-driven tool registry for future updates</span>
      </p>
    </div>
  </footer>
`;
