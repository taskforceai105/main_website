import { renderFooter, renderHeader, renderUniverseScene } from "./components.js";
import { galaxyClusters, universeContent } from "./site-data.js";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const galaxyMap = new Map(
  galaxyClusters.map((galaxy) => [
    galaxy.id,
    {
      ...galaxy,
      planets: galaxy.planets.map((planet) => ({ ...planet, galaxyId: galaxy.id, galaxyTitle: galaxy.title })),
    },
  ]),
);

let activeGalaxyId = null;
let activePlanetId = null;
let revealObserver;

const renderPage = () => `
  <div class="page-shell">
    ${renderHeader(universeContent)}
    ${renderUniverseScene(universeContent, galaxyClusters)}
    ${renderFooter(universeContent)}
  </div>
`;

const getActiveGalaxy = () => (activeGalaxyId ? galaxyMap.get(activeGalaxyId) ?? null : null);

const getActivePlanet = () => {
  const galaxy = getActiveGalaxy();
  return galaxy?.planets.find((planet) => planet.id === activePlanetId) ?? null;
};

const setPanelContent = () => {
  const panel = document.querySelector("[data-info-panel]");
  const title = document.querySelector("[data-panel-title]");
  const subtitle = document.querySelector("[data-panel-subtitle]");
  const description = document.querySelector("[data-panel-description]");
  const goodFor = document.querySelector("[data-panel-goodfor]");
  const link = document.querySelector("[data-panel-link]");
  const meta = document.querySelector("[data-panel-meta]");
  const back = document.querySelector("[data-panel-back]");

  if (!panel || !title || !subtitle || !description || !goodFor || !link || !meta || !back) {
    return;
  }

  const galaxy = getActiveGalaxy();
  const planet = getActivePlanet();

  if (planet) {
    panel.dataset.state = "planet";
    panel.classList.add("is-open");
    panel.style.setProperty("--panel-accent", galaxy.accent);
    meta.textContent = `${galaxy.title} sector / ${planet.type}`;
    title.textContent = planet.name;
    subtitle.textContent = `Inside ${galaxy.title}`;
    description.textContent = planet.description;
    goodFor.textContent = planet.goodFor;
    link.href = planet.href;
    link.hidden = false;
    back.hidden = false;
    back.textContent = `Back to ${galaxy.title}`;
    return;
  }

  if (galaxy) {
    panel.dataset.state = "galaxy";
    panel.classList.add("is-open");
    panel.style.setProperty("--panel-accent", galaxy.accent);
    meta.textContent = "Galaxy focus";
    title.textContent = galaxy.title;
    subtitle.textContent = galaxy.subtitle;
    description.textContent = galaxy.description;
    goodFor.textContent = galaxy.why;
    link.href = galaxy.planets[0]?.href ?? "#";
    link.hidden = !galaxy.planets[0]?.href;
    back.hidden = true;
    return;
  }

  panel.dataset.state = "galaxy";
  panel.classList.add("is-open");
  panel.style.setProperty("--panel-accent", "var(--accent)");
  meta.textContent = "Universe overview";
  title.textContent = universeContent.overviewTitle;
  subtitle.textContent = universeContent.overviewSubtitle;
  description.textContent = universeContent.overviewDescription;
  goodFor.textContent = universeContent.overviewWhy;
  link.href = "#";
  link.hidden = true;
  back.hidden = true;
};

const syncSelectionState = () => {
  document.querySelectorAll("[data-galaxy]").forEach((galaxyElement) => {
    const isActive = galaxyElement.dataset.galaxyId === activeGalaxyId;
    galaxyElement.classList.toggle("is-active", isActive);
    galaxyElement.classList.toggle("is-dimmed", Boolean(activeGalaxyId) && !isActive);
  });

  document.querySelectorAll("[data-legend-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.galaxyId === activeGalaxyId);
  });

  document.querySelectorAll("[data-planet-button]").forEach((button) => {
    const parentGalaxy = button.closest("[data-galaxy]")?.dataset.galaxyId;
    const isPlanetActive = button.dataset.planetId === activePlanetId;
    button.classList.toggle("is-active", isPlanetActive);
    button.classList.toggle(
      "is-muted",
      Boolean(activeGalaxyId) && parentGalaxy !== activeGalaxyId,
    );
  });
};

const focusGalaxy = (galaxyId, { resetPlanet = true } = {}) => {
  if (!galaxyMap.has(galaxyId)) {
    return;
  }

  activeGalaxyId = galaxyId;
  if (resetPlanet) {
    activePlanetId = null;
  }

  syncSelectionState();
  setPanelContent();
};

const focusPlanet = (planetId) => {
  for (const galaxy of galaxyMap.values()) {
    const planet = galaxy.planets.find((candidate) => candidate.id === planetId);
    if (planet) {
      activeGalaxyId = galaxy.id;
      activePlanetId = planet.id;
      syncSelectionState();
      setPanelContent();
      return;
    }
  }
};

const closePanel = () => {
  activeGalaxyId = null;
  activePlanetId = null;
  setPanelContent();
  syncSelectionState();
};

const setupInteractions = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    button.addEventListener("click", () => focusGalaxy(button.dataset.galaxyId));
  });

  document.querySelectorAll("[data-legend-button]").forEach((button) => {
    button.addEventListener("click", () => focusGalaxy(button.dataset.galaxyId));
  });

  document.querySelectorAll("[data-planet-button]").forEach((button) => {
    button.addEventListener("click", () => focusPlanet(button.dataset.planetId));
  });

  document.querySelector("[data-panel-close]")?.addEventListener("click", closePanel);

  document.querySelector("[data-panel-back]")?.addEventListener("click", () => {
    activePlanetId = null;
    setPanelContent();
    syncSelectionState();
  });

  document.querySelector("[data-focus-core]")?.addEventListener("click", () => {
    activeGalaxyId = null;
    activePlanetId = null;
    setPanelContent();
    syncSelectionState();
    document.querySelector("[data-universe-wrapper]")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });
};

const setupParallax = () => {
  const scene = document.querySelector("[data-universe-scene]");

  if (!scene || prefersReducedMotion) {
    return;
  }

  const reset = () => {
    scene.style.setProperty("--pointer-x", "0px");
    scene.style.setProperty("--pointer-y", "0px");
  };

  scene.addEventListener("pointermove", (event) => {
    const bounds = scene.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    scene.style.setProperty("--pointer-x", `${offsetX * 0.015}px`);
    scene.style.setProperty("--pointer-y", `${offsetY * 0.018}px`);
  });

  scene.addEventListener("pointerleave", reset);
};

const setupScrollDepth = () => {
  const wrapper = document.querySelector("[data-universe-wrapper]");
  const scene = document.querySelector("[data-universe-scene]");

  if (!wrapper || !scene || prefersReducedMotion) {
    return;
  }

  const update = () => {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const total = Math.max(rect.height - windowHeight, 1);
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    scene.style.setProperty("--scroll-depth", progress.toFixed(3));
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
};

const revealElements = () => {
  const elements = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver?.disconnect();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  elements.forEach((element) => revealObserver.observe(element));
};

export const boot = (root = document.getElementById("app")) => {
  if (!root) {
    return;
  }

  root.innerHTML = renderPage();
  setupInteractions();
  setupParallax();
  setupScrollDepth();
  revealElements();
  closePanel();
};

if (typeof document !== "undefined") {
  boot();
}
