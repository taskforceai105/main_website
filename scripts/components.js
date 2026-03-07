import { logoCatalog } from "./data/logo-sources.js";
import { withBasePath } from "./site-paths.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const getLogoMeta = (logoKey, label) => {
  const logo = logoCatalog[logoKey];
  const fallbackText = escapeHtml(logo?.text ?? label.slice(0, 2).toUpperCase());
  const surface = logo?.surface ?? "dark";

  return {
    logo,
    fallbackText,
    surface,
  };
};

export const renderMarkBadge = (logoKey, label, extraClass = "") => {
  const { logo, fallbackText, surface } = getLogoMeta(logoKey, label);
  const modeClass = !logo || logo.type !== "image" ? "mark-badge--fallback" : "mark-badge--image";
  const className = `mark-badge ${modeClass} mark-badge--${surface}${extraClass ? ` ${extraClass}` : ""}`;

  if (!logo || logo.type !== "image") {
    return `
      <span class="${className}">
        <span class="mark-badge__mono">${fallbackText}</span>
      </span>
    `;
  }

  return `
    <span class="${className}">
      <img
        src="${withBasePath(logo.src.startsWith("/") ? logo.src : `/${logo.src}`)}"
        alt="${escapeHtml(logo.alt)}"
        class="mark-badge__image mark-badge__image--${logo.fit}"
        loading="lazy"
        decoding="async"
        onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
      />
      <span class="mark-badge__mono" hidden>${fallbackText}</span>
    </span>
  `;
};

const renderIntroTitle = (title) => {
  if (title === "DET 105 AI TASK FORCE") {
    return "<span>DET 105</span><span>AI TASK FORCE</span>";
  }

  return `<span>${escapeHtml(title)}</span>`;
};

const renderSectionChip = (section, activeCategory) => `
  <button
    class="category-chip${activeCategory === section.id ? " is-active" : ""}"
    type="button"
    data-set-category="${section.id}"
  >
    ${escapeHtml(section.title)}
    <span>${escapeHtml(section.count)}</span>
  </button>
`;

const renderOverviewCard = (section, activeCategory) => `
  <button
    class="category-overview-card${activeCategory === section.id ? " is-active" : ""}"
    type="button"
    data-set-category="${section.id}"
    style="--section-accent:${section.accent};"
  >
    <span class="category-overview-card__kicker">${escapeHtml(section.subtitle)}</span>
    <strong>${escapeHtml(section.title)}</strong>
    <p>${escapeHtml(section.description)}</p>
    <span class="category-overview-card__meta">${escapeHtml(`${section.count} items`)}</span>
  </button>
`;

const renderToolCard = (item, { featured = false } = {}) => `
  <article
    class="tool-card${featured ? " tool-card--featured" : ""}"
    data-tool-card
    style="--item-accent:${item.accent ?? "#74beff"};"
  >
    <div class="tool-card__topline">
      <span class="tool-card__tag">${escapeHtml(item.categoryTitle)}</span>
      ${item.featured ? '<span class="tool-card__tag tool-card__tag--popular">Popular</span>' : ""}
    </div>
    <div class="tool-card__header">
      ${renderMarkBadge(item.logoKey, item.name, "tool-card__badge")}
      <div class="tool-card__identity">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.type)}</p>
      </div>
    </div>
    <p class="tool-card__description">${escapeHtml(item.description)}</p>
    <div class="tool-card__footer">
      <button class="tool-card__action" type="button" data-open-tool="${item.id}">
        View details
      </button>
      <a class="tool-card__link" href="${item.officialLink}" target="_blank" rel="noreferrer">
        Official site
      </a>
    </div>
  </article>
`;

const renderDirectorySection = (section, items) => `
  <section class="directory-section" id="section-${section.id}" data-section-id="${section.id}">
    <div class="directory-section__heading">
      <div>
        <span class="panel-kicker">${escapeHtml(section.subtitle)}</span>
        <h2>${escapeHtml(section.title)}</h2>
      </div>
      <span class="directory-section__count">${escapeHtml(`${items.length} items`)}</span>
    </div>
    <p class="directory-section__copy">${escapeHtml(section.description)}</p>
    <div class="tool-grid">
      ${items.map((item) => renderToolCard(item)).join("")}
    </div>
  </section>
`;

export const renderAppShell = (content, stats) => `
  <div class="site-shell">
    <main class="page-shell" id="top">
      <section class="hero-panel">
        <div class="hero-panel__copy">
          <span class="panel-kicker">Modern AI Directory</span>
          <h1 class="hero-title">${renderIntroTitle(content.title)}</h1>
          <p class="hero-subtitle">${escapeHtml(content.subtitle)}</p>
          <p class="hero-description">${escapeHtml(content.teaser)}</p>
          <div class="hero-actions">
            <button class="scene-button scene-button--primary" type="button" data-browse-directory>
              Explore categories
            </button>
            <a class="scene-button scene-button--ghost" href="#featured-tools">
              Featured tools
            </a>
          </div>
        </div>

        <div class="hero-panel__stats" aria-label="Directory summary">
          <article class="stat-card">
            <span>Real items</span>
            <strong>${escapeHtml(stats.totalItems)}</strong>
            <p>Curated tools, platforms, and operating concepts.</p>
          </article>
          <article class="stat-card">
            <span>Categories</span>
            <strong>${escapeHtml(stats.totalCategories)}</strong>
            <p>Organized by topic instead of an experimental map layer.</p>
          </article>
          <article class="stat-card">
            <span>Featured</span>
            <strong>${escapeHtml(stats.featuredItems)}</strong>
            <p>Higher-signal tools surface first without hiding the rest.</p>
          </article>
        </div>
      </section>

      <section class="category-overview">
        <div class="section-head">
          <div>
            <span class="panel-kicker">Topic Overview</span>
            <h2>Explore by category</h2>
          </div>
          <p>Use the category bar or search to move through the directory quickly.</p>
        </div>
        <div class="category-overview__grid" data-category-overview></div>
      </section>

      <section class="directory-toolbar" id="directory-start" data-directory-start>
        <div class="directory-toolbar__search">
          <label class="search-field">
            <span class="search-field__label">Search the directory</span>
            <input
              type="search"
              name="directory-search"
              autocomplete="off"
              spellcheck="false"
              placeholder="Search tools, topics, or use cases"
              data-search-input
            />
          </label>
          <button class="header-button header-button--ghost" type="button" data-clear-search hidden>
            Clear
          </button>
        </div>
        <nav class="category-nav" aria-label="AI directory topics" data-category-nav></nav>
      </section>

      <section class="featured-tools" id="featured-tools">
        <div class="section-head">
          <div>
            <span class="panel-kicker">Featured Tools</span>
            <h2>Start with the mainstream platforms</h2>
          </div>
          <p>These tools carry the most weight in current student and professional AI workflows.</p>
        </div>
        <div class="featured-grid" data-featured-grid></div>
      </section>

      <section class="directory-results">
        <div class="directory-results__header">
          <div>
            <span class="panel-kicker">Directory</span>
            <h2>Tools and resources</h2>
          </div>
          <p data-results-summary></p>
        </div>
        <div class="directory-sections" data-directory-sections></div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <p class="site-footer__title">${escapeHtml(content.footerNote)}</p>
        <p class="site-footer__copy">${escapeHtml(content.footerDisclaimer)}</p>
      </div>
    </footer>
  </div>

  <div class="detail-overlay" data-detail-overlay hidden></div>
`;

export const renderCategoryOverview = (sections, activeCategory) =>
  sections.map((section) => renderOverviewCard(section, activeCategory)).join("");

export const renderCategoryNav = (sections, activeCategory) => `
  <button
    class="category-chip${activeCategory === "all" ? " is-active" : ""}"
    type="button"
    data-set-category="all"
  >
    All topics
    <span>${escapeHtml(sections.length)}</span>
  </button>
  ${sections.map((section) => renderSectionChip(section, activeCategory)).join("")}
`;

export const renderFeaturedGrid = (items) =>
  items.length
    ? items.map((item) => renderToolCard(item, { featured: true })).join("")
    : `
        <article class="empty-state empty-state--compact">
          <h3>No featured tools match the current filters.</h3>
          <p>Clear the search or topic filter to restore the full featured set.</p>
        </article>
      `;

export const renderDirectorySections = (sections, itemsBySection, hasResults) => {
  if (!hasResults) {
    return `
      <article class="empty-state">
        <h3>No tools match the current filters.</h3>
        <p>Try a broader search or switch back to All topics.</p>
      </article>
    `;
  }

  return sections
    .map((section) => {
      const items = itemsBySection.get(section.id) ?? [];
      if (!items.length) {
        return "";
      }

      return renderDirectorySection(section, items);
    })
    .join("");
};

export const renderResultsSummary = ({ totalVisible, totalItems, query, activeCategoryLabel }) => {
  if (query) {
    return `${totalVisible} matching items${activeCategoryLabel ? ` in ${activeCategoryLabel}` : ""}.`;
  }

  if (activeCategoryLabel) {
    return `${totalVisible} items in ${activeCategoryLabel}.`;
  }

  return `${totalItems} curated items across the full directory.`;
};

export const renderDetailPanel = ({ item, relatedItems }) => `
  <div class="detail-overlay__backdrop" data-close-detail></div>
  <aside class="detail-panel" aria-modal="true" role="dialog" aria-labelledby="detail-title">
    <button class="panel-close" type="button" data-close-detail aria-label="Close detail panel">
      Close
    </button>
    <div class="detail-panel__header">
      ${renderMarkBadge(item.logoKey, item.name, "detail-panel__badge")}
      <div>
        <span class="panel-kicker">${escapeHtml(item.categoryTitle)}</span>
        <h2 id="detail-title">${escapeHtml(item.name)}</h2>
        <p class="detail-panel__subtitle">${escapeHtml(item.type)}</p>
      </div>
    </div>
    <p class="detail-panel__description">${escapeHtml(item.description)}</p>
    <div class="detail-panel__callout">
      <span>Why it matters</span>
      <p>${escapeHtml(item.goodFor)}</p>
    </div>
    <div class="detail-panel__meta">
      ${item.tags.map((tag) => `<span class="detail-pill">${escapeHtml(tag)}</span>`).join("")}
    </div>
    ${
      relatedItems.length
        ? `
            <div class="detail-panel__related">
              <span>Related ecosystem</span>
              <div class="detail-panel__related-list">
                ${relatedItems
                  .map(
                    (related) => `
                      <button type="button" class="detail-pill detail-pill--interactive" data-open-tool="${related.id}">
                        ${escapeHtml(related.name)}
                      </button>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          `
        : ""
    }
    <div class="detail-panel__actions">
      <a class="scene-button scene-button--primary" href="${item.officialLink}" target="_blank" rel="noreferrer">
        Open official link
      </a>
      <button class="scene-button scene-button--ghost" type="button" data-focus-category="${item.categoryId}">
        View ${escapeHtml(item.categoryTitle)}
      </button>
    </div>
  </aside>
`;
