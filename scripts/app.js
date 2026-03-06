import { renderDetailPanel, renderFocusScene, renderFooter, renderHeader, renderScene } from "./components.js";
import { galaxyClusters, universeContent } from "./data/universe.js";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const transitionDuration = prefersReducedMotion ? 0 : 1000;

const galaxyMap = new Map(galaxyClusters.map((galaxy) => [galaxy.id, galaxy]));

const appState = {
  phase: "intro",
  selectedGalaxyId: null,
  selectedPlanetId: null,
  universeBriefOpen: false,
  transitionLock: false,
};

let rootElement;
let detailPanel;
let focusLayer;
let transitionTimer;

const getGalaxy = () => (appState.selectedGalaxyId ? galaxyMap.get(appState.selectedGalaxyId) ?? null : null);

const getPlanet = () => {
  const galaxy = getGalaxy();
  return galaxy?.planets.find((planet) => planet.id === appState.selectedPlanetId) ?? null;
};

const withTransitionLock = (callback, duration = transitionDuration) => {
  appState.transitionLock = true;
  callback();
  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    appState.transitionLock = false;
    rootElement?.classList.remove("is-unveiling", "is-drilling", "is-returning");
  }, duration);
};

const setFocusVars = (galaxy) => {
  if (!rootElement) {
    return;
  }

  if (!galaxy) {
    rootElement.style.setProperty("--travel-x", "0%");
    rootElement.style.setProperty("--travel-y", "0%");
    rootElement.style.setProperty("--travel-accent", "#74beff");
    return;
  }

  rootElement.style.setProperty("--travel-x", `${50 - galaxy.universeX}%`);
  rootElement.style.setProperty("--travel-y", `${50 - galaxy.universeY}%`);
  rootElement.style.setProperty("--travel-accent", galaxy.accent);
};

const updateHeader = () => {
  const status = document.querySelector("[data-header-state]");
  const briefToggle = document.querySelector("[data-open-brief]");

  if (!status) {
    return;
  }

  if (appState.phase === "intro") {
    status.textContent = "Stand by";
    if (briefToggle) {
      briefToggle.textContent = "Universe Brief";
      briefToggle.disabled = true;
    }
    return;
  }

  if (appState.phase === "universe") {
    status.textContent = "Universe Map";
    if (briefToggle) {
      briefToggle.textContent = appState.universeBriefOpen ? "Hide Brief" : "Universe Brief";
      briefToggle.disabled = false;
    }
    return;
  }

  const galaxy = getGalaxy();
  status.textContent = galaxy ? `${galaxy.title} Drilldown` : "Galaxy Drilldown";
  if (briefToggle) {
    briefToggle.textContent = "Universe Brief";
    briefToggle.disabled = true;
  }
};

const updateUniverseLayer = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    const isSelected = button.dataset.galaxyId === appState.selectedGalaxyId;
    button.classList.toggle("is-selected", isSelected);
  });
};

const updateUniverseBrief = () => {
  const brief = document.querySelector("[data-universe-brief]");
  if (!brief) {
    return;
  }

  brief.hidden = !(appState.phase === "universe" && appState.universeBriefOpen);
};

const bindFocusSceneEvents = () => {
  focusLayer?.querySelector("[data-back-universe]")?.addEventListener("click", () => {
    if (appState.transitionLock) {
      return;
    }

    rootElement.classList.add("is-returning");
    appState.selectedPlanetId = null;
    withTransitionLock(() => {
      appState.phase = "galaxy";
      updateDetailPanel();
      window.setTimeout(() => {
        appState.phase = "universe";
        appState.selectedGalaxyId = null;
        appState.universeBriefOpen = false;
        setFocusVars(null);
        updateScene();
      }, transitionDuration * 0.62);
    }, transitionDuration);
  });

  focusLayer?.querySelectorAll("[data-planet-button]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.selectedPlanetId = button.dataset.planetId;
      updateDetailPanel();
    });
  });
};

const updateFocusScene = () => {
  if (!focusLayer) {
    return;
  }

  if (appState.phase !== "galaxy") {
    focusLayer.innerHTML = "";
    return;
  }

  const galaxy = getGalaxy();
  if (!galaxy) {
    focusLayer.innerHTML = "";
    return;
  }

  focusLayer.innerHTML = renderFocusScene(galaxy);
  bindFocusSceneEvents();
};

const updateDetailPanel = () => {
  if (!detailPanel) {
    return;
  }

  if (appState.phase !== "galaxy" || !appState.selectedPlanetId) {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
    return;
  }

  const galaxy = getGalaxy();
  if (!galaxy) {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
    return;
  }

  const planet = getPlanet();
  if (!planet) {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
    return;
  }

  detailPanel.hidden = false;
  detailPanel.innerHTML = renderDetailPanel({ galaxy, planet });
  detailPanel.style.setProperty("--panel-accent", galaxy.accent);

  detailPanel.querySelector("[data-close-detail]")?.addEventListener("click", () => {
    appState.selectedPlanetId = null;
    updateDetailPanel();
  });

  detailPanel.querySelector("[data-back-galaxy]")?.addEventListener("click", () => {
    appState.selectedPlanetId = null;
    updateDetailPanel();
  });
};

const updateScene = () => {
  if (!rootElement) {
    return;
  }

  rootElement.dataset.phase = appState.phase;
  updateHeader();
  updateUniverseLayer();
  updateUniverseBrief();
  updateFocusScene();
  updateDetailPanel();
};

const enterUniverse = () => {
  if (appState.transitionLock) {
    return;
  }

  appState.phase = "universe";
  appState.universeBriefOpen = false;
  rootElement.classList.add("is-unveiling");
  updateScene();
  withTransitionLock(() => {}, transitionDuration);
};

const enterGalaxy = (galaxyId) => {
  if (appState.transitionLock || !galaxyMap.has(galaxyId)) {
    return;
  }

  const galaxy = galaxyMap.get(galaxyId);
  appState.phase = "galaxy";
  appState.selectedGalaxyId = galaxyId;
  appState.selectedPlanetId = null;
  appState.universeBriefOpen = false;
  setFocusVars(galaxy);
  rootElement.classList.add("is-drilling");
  updateScene();
  withTransitionLock(() => {}, transitionDuration);
};

const setupInteractions = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    button.addEventListener("click", () => enterGalaxy(button.dataset.galaxyId));
  });

  document.querySelector("[data-enter-universe]")?.addEventListener("click", enterUniverse);
  document.querySelector("[data-skip-intro]")?.addEventListener("click", enterUniverse);

  document.querySelector("[data-close-brief]")?.addEventListener("click", () => {
    appState.universeBriefOpen = false;
    updateUniverseBrief();
  });

  document.querySelector("[data-open-brief]")?.addEventListener("click", () => {
    if (appState.phase !== "universe") {
      return;
    }

    appState.universeBriefOpen = !appState.universeBriefOpen;
    updateUniverseBrief();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (appState.phase === "intro") {
      enterUniverse();
      return;
    }

    if (appState.selectedPlanetId) {
      appState.selectedPlanetId = null;
      updateDetailPanel();
      return;
    }

    if (appState.phase === "galaxy" && !appState.transitionLock) {
      focusLayer?.querySelector("[data-back-universe]")?.click();
      return;
    }

    if (appState.phase === "universe" && appState.universeBriefOpen) {
      appState.universeBriefOpen = false;
      updateUniverseBrief();
    }
  });
};

const setupParallax = () => {
  const stage = document.querySelector("[data-scene-stage]");

  if (!stage || prefersReducedMotion) {
    return;
  }

  const reset = () => {
    rootElement.style.setProperty("--pointer-x", "0px");
    rootElement.style.setProperty("--pointer-y", "0px");
  };

  stage.addEventListener("pointermove", (event) => {
    const bounds = stage.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    rootElement.style.setProperty("--pointer-x", `${offsetX * 0.015}px`);
    rootElement.style.setProperty("--pointer-y", `${offsetY * 0.018}px`);
  });

  stage.addEventListener("pointerleave", reset);
};

const applyDebugStateFromUrl = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const phase = params.get("phase");
  const galaxy = params.get("galaxy");
  const planet = params.get("planet");

  if (phase === "universe") {
    appState.phase = "universe";
    appState.universeBriefOpen = params.get("brief") === "open";
  }

  if (phase === "galaxy" && galaxyMap.has(galaxy)) {
    appState.phase = "galaxy";
    appState.selectedGalaxyId = galaxy;
    appState.universeBriefOpen = false;
    setFocusVars(galaxyMap.get(galaxy));
    if (planet) {
      const target = galaxyMap.get(galaxy).planets.find((entry) => entry.id === planet);
      appState.selectedPlanetId = target?.id ?? null;
    }
  }
};

export const boot = (root = document.getElementById("app")) => {
  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="page-shell app-shell" data-phase="intro">
      ${renderHeader(universeContent)}
      ${renderScene(universeContent, galaxyClusters)}
      ${renderFooter(universeContent)}
    </div>
  `;

  rootElement = root.querySelector(".app-shell");
  detailPanel = root.querySelector("[data-detail-panel]");
  focusLayer = root.querySelector("[data-focus-layer]");

  setFocusVars(null);
  applyDebugStateFromUrl();
  updateScene();
  setupInteractions();
  setupParallax();
};

if (typeof document !== "undefined") {
  boot();
}
