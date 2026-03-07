import {
  renderDetailPanel,
  renderFocusScene,
  renderFooter,
  renderHeader,
  renderMobileExplorer,
  renderScene,
  renderSceneHint,
  renderUniverseFocusPanel,
  renderZoomControls,
} from "./components.js";
import { galaxyClusters, interfaceModes, universeContent } from "./data/universe.js";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const transitionDuration = prefersReducedMotion ? 0 : 1000;
const panelTransitionDuration = prefersReducedMotion ? 0 : 280;

const galaxyMap = new Map(galaxyClusters.map((galaxy) => [galaxy.id, galaxy]));
const defaultGalaxyId = galaxyClusters[0]?.id ?? null;

const mediaQueries =
  typeof window === "undefined"
    ? []
    : [
        window.matchMedia("(pointer: coarse)"),
        window.matchMedia("(any-pointer: coarse)"),
        window.matchMedia("(hover: hover)"),
        window.matchMedia("(any-hover: hover)"),
      ];

const appState = {
  deviceMode: null,
  phase: "intro",
  selectedGalaxyId: defaultGalaxyId,
  focusedGalaxyId: defaultGalaxyId,
  selectedPlanetId: null,
  universeBriefOpen: false,
  transitionLock: false,
  universeZoom: "overview",
};

let rootElement;
let detailPanel;
let focusLayer;
let mobileExplorer;
let sceneHint;
let sceneZoom;
let universeFocusPanel;
let transitionTimer;
let detailHideTimer;

const detectDeviceMode = () => {
  if (typeof window === "undefined") {
    return "pc";
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const coarsePointer =
    window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(any-pointer: coarse)").matches;
  const hoverCapable =
    window.matchMedia("(hover: hover)").matches || window.matchMedia("(any-hover: hover)").matches;
  const finePointer =
    window.matchMedia("(pointer: fine)").matches || window.matchMedia("(any-pointer: fine)").matches;
  const touchCapable = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  const mobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  const narrowViewport = width <= 900;
  const shortLandscape = width > height && height <= 560;
  const touchFirstTablet = width <= 1180 && coarsePointer && !hoverCapable;

  if ((narrowViewport && (coarsePointer || touchCapable || mobileUa)) || shortLandscape || touchFirstTablet) {
    return "mobile";
  }

  if (finePointer && hoverCapable && width >= 901) {
    return "pc";
  }

  return width < 840 ? "mobile" : "pc";
};

const getDeviceMode = () => appState.deviceMode ?? detectDeviceMode();
const getModeConfig = () => interfaceModes[getDeviceMode()] ?? interfaceModes.pc;
const isMobileMode = () => getDeviceMode() === "mobile";
const isPcMode = () => getDeviceMode() === "pc";

const getDesktopGalaxy = () =>
  appState.selectedGalaxyId ? galaxyMap.get(appState.selectedGalaxyId) ?? null : null;

const getFocusedGalaxy = () =>
  appState.focusedGalaxyId ? galaxyMap.get(appState.focusedGalaxyId) ?? galaxyClusters[0] ?? null : null;

const getActiveMobileGalaxy = () =>
  appState.selectedGalaxyId ? galaxyMap.get(appState.selectedGalaxyId) ?? galaxyClusters[0] ?? null : galaxyClusters[0];

const getActiveGalaxy = () => (isMobileMode() && appState.phase === "mobile" ? getActiveMobileGalaxy() : getDesktopGalaxy());

const getPlanet = () => {
  const galaxy = getActiveGalaxy();
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

const setTravelVars = (galaxy) => {
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

const setCameraVars = (galaxy) => {
  if (!rootElement) {
    return;
  }

  if (!galaxy || !isPcMode() || appState.phase !== "universe" || appState.universeZoom !== "focused") {
    rootElement.style.setProperty("--camera-scale", "1");
    rootElement.style.setProperty("--camera-x", "0%");
    rootElement.style.setProperty("--camera-y", "0%");
    return;
  }

  rootElement.style.setProperty("--camera-scale", "1.2");
  rootElement.style.setProperty("--camera-x", `${(50 - galaxy.universeX) * 0.56}%`);
  rootElement.style.setProperty("--camera-y", `${(50 - galaxy.universeY) * 0.42}%`);
};

const closeDetailPanel = (immediate = false) => {
  appState.selectedPlanetId = null;

  if (!detailPanel) {
    return;
  }

  window.clearTimeout(detailHideTimer);
  detailPanel.classList.remove("is-active");

  const hide = () => {
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
  };

  if (immediate || prefersReducedMotion) {
    hide();
    return;
  }

  detailHideTimer = window.setTimeout(hide, panelTransitionDuration);
};

const updateHeader = () => {
  const status = document.querySelector("[data-header-state]");
  const briefToggle = document.querySelector("[data-open-brief]");
  const deviceBadge = document.querySelector("[data-device-badge]");

  if (deviceBadge) {
    deviceBadge.textContent = isMobileMode() ? "Mobile Explorer" : "Desktop Universe";
  }

  if (!status || !briefToggle) {
    return;
  }

  const showBriefToggle = isPcMode() && appState.phase === "universe";
  briefToggle.hidden = !showBriefToggle;
  briefToggle.disabled = !showBriefToggle;

  if (appState.phase === "intro") {
    status.textContent = isMobileMode() ? "Touch-First Tool Explorer" : "Desktop Command View";
    return;
  }

  if (isMobileMode()) {
    const galaxy = getActiveMobileGalaxy();
    status.textContent = galaxy ? `${galaxy.title} Directory` : "Mobile Explorer";
    return;
  }

  if (appState.phase === "universe") {
    status.textContent = "Universe Map / Desktop";
    briefToggle.textContent = appState.universeBriefOpen ? "Hide Brief" : "Universe Brief";
    return;
  }

  const galaxy = getDesktopGalaxy();
  status.textContent = galaxy ? `${galaxy.title} Drilldown` : "Galaxy Drilldown";
};

const updateIntroOverlay = () => {
  const title = document.querySelector("[data-intro-profile-title]");
  const copy = document.querySelector("[data-intro-profile-copy]");
  const primary = document.querySelector("[data-enter-primary]");

  if (!title || !copy || !primary) {
    return;
  }

  if (isMobileMode()) {
    title.textContent = "Mobile Tool Explorer";
    copy.textContent = "Simplified touch-first category browsing with clean tool cards and mobile-safe detail sheets.";
    primary.textContent = "Open Mobile Explorer";
    return;
  }

  title.textContent = "Desktop Universe Command";
  copy.textContent = "Rich cinematic navigation with galaxy drilldown, tool-node exploration, and desktop focus controls.";
  primary.textContent = "Enter AI Universe";
};

const updateUniverseLayer = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    const isSelected = button.dataset.galaxyId === appState.selectedGalaxyId;
    const isFocused =
      isPcMode() &&
      button.dataset.galaxyId === appState.focusedGalaxyId &&
      appState.phase === "universe" &&
      appState.universeZoom === "focused";

    button.classList.toggle("is-selected", isSelected);
    button.classList.toggle("is-focused", isFocused);
  });
};

const updateUniverseBrief = () => {
  const brief = document.querySelector("[data-universe-brief]");
  if (!brief) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase === "universe" && appState.universeBriefOpen;
  brief.hidden = !shouldShow;
  brief.classList.toggle("is-active", shouldShow);
};

const bindZoomControls = () => {
  sceneZoom?.querySelector("[data-zoom-in]")?.addEventListener("click", () => {
    if (!isPcMode() || appState.phase !== "universe") {
      return;
    }

    if (appState.universeZoom !== "focused") {
      focusGalaxy(appState.focusedGalaxyId ?? defaultGalaxyId, true);
      return;
    }

    if (appState.focusedGalaxyId) {
      enterGalaxy(appState.focusedGalaxyId);
    }
  });

  sceneZoom?.querySelector("[data-zoom-out]")?.addEventListener("click", () => {
    if (!isPcMode()) {
      return;
    }

    if (appState.selectedPlanetId) {
      closeDetailPanel();
      return;
    }

    if (appState.phase === "galaxy" && !appState.transitionLock) {
      focusLayer?.querySelector("[data-back-universe]")?.click();
      return;
    }

    if (appState.phase === "universe" && appState.universeZoom === "focused") {
      appState.universeZoom = "overview";
      setCameraVars(null);
      updateScene();
    }
  });
};

const updateSceneHint = () => {
  if (!sceneHint) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase !== "intro";
  sceneHint.hidden = !shouldShow;

  if (!shouldShow) {
    sceneHint.innerHTML = "";
    sceneHint.classList.remove("is-active");
    return;
  }

  sceneHint.innerHTML = renderSceneHint(getModeConfig(), appState.phase, getFocusedGalaxy());
  sceneHint.classList.add("is-active");
};

const updateSceneZoom = () => {
  if (!sceneZoom) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase !== "intro";
  sceneZoom.hidden = !shouldShow;

  if (!shouldShow) {
    sceneZoom.innerHTML = "";
    sceneZoom.classList.remove("is-active");
    return;
  }

  sceneZoom.innerHTML = renderZoomControls(getDeviceMode(), appState.phase, appState.universeZoom === "focused");
  sceneZoom.classList.add("is-active");
  bindZoomControls();
};

const updateUniverseFocusPanel = () => {
  if (!universeFocusPanel) {
    return;
  }

  const galaxy = getFocusedGalaxy();
  const shouldShow = isPcMode() && appState.phase === "universe" && Boolean(galaxy) && appState.universeZoom === "focused";

  universeFocusPanel.hidden = !shouldShow;
  universeFocusPanel.classList.toggle("is-active", shouldShow);

  if (!shouldShow || !galaxy) {
    universeFocusPanel.innerHTML = "";
    return;
  }

  universeFocusPanel.innerHTML = renderUniverseFocusPanel(galaxy, getDeviceMode());
  universeFocusPanel.style.setProperty("--panel-accent", galaxy.accent);
  universeFocusPanel.querySelector("[data-enter-focused-galaxy]")?.addEventListener("click", () => {
    enterGalaxy(galaxy.id);
  });
};

const bindFocusSceneEvents = () => {
  focusLayer?.querySelector("[data-back-universe]")?.addEventListener("click", () => {
    if (appState.transitionLock) {
      return;
    }

    const returnGalaxyId = appState.selectedGalaxyId;
    rootElement.classList.add("is-returning");
    closeDetailPanel(true);

    withTransitionLock(() => {
      appState.phase = "galaxy";
      window.setTimeout(() => {
        appState.phase = "universe";
        appState.focusedGalaxyId = returnGalaxyId ?? appState.focusedGalaxyId;
        appState.selectedGalaxyId = null;
        appState.universeBriefOpen = false;
        appState.universeZoom = "focused";
        setTravelVars(null);
        setCameraVars(getFocusedGalaxy());
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

  if (!isPcMode() || appState.phase !== "galaxy") {
    focusLayer.innerHTML = "";
    return;
  }

  const galaxy = getDesktopGalaxy();
  if (!galaxy) {
    focusLayer.innerHTML = "";
    return;
  }

  focusLayer.innerHTML = renderFocusScene(galaxy, getDeviceMode());
  bindFocusSceneEvents();
};

const updateMobileExplorer = () => {
  if (!mobileExplorer) {
    return;
  }

  const shouldShow = isMobileMode() && appState.phase === "mobile";
  mobileExplorer.hidden = !shouldShow;
  mobileExplorer.classList.toggle("is-active", shouldShow);

  if (!shouldShow) {
    mobileExplorer.innerHTML = "";
    return;
  }

  const galaxy = getActiveMobileGalaxy();
  if (!galaxy) {
    mobileExplorer.innerHTML = "";
    return;
  }

  mobileExplorer.innerHTML = renderMobileExplorer(universeContent, galaxyClusters, galaxy);

  mobileExplorer.querySelectorAll("[data-mobile-category]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.selectedGalaxyId = button.dataset.galaxyId;
      closeDetailPanel(true);
      updateScene();
    });
  });

  mobileExplorer.querySelectorAll("[data-mobile-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.selectedGalaxyId = button.dataset.galaxyId;
      appState.selectedPlanetId = button.dataset.planetId;
      updateDetailPanel();
    });
  });
};

const updateDetailPanel = () => {
  if (!detailPanel) {
    return;
  }

  const supportsDetail =
    (isPcMode() && appState.phase === "galaxy") || (isMobileMode() && appState.phase === "mobile");

  if (!supportsDetail || !appState.selectedPlanetId) {
    closeDetailPanel();
    return;
  }

  const galaxy = getActiveGalaxy();
  const planet = getPlanet();

  if (!galaxy || !planet) {
    closeDetailPanel(true);
    return;
  }

  detailPanel.hidden = false;
  detailPanel.innerHTML = renderDetailPanel({ galaxy, planet, mode: getDeviceMode() });
  detailPanel.style.setProperty("--panel-accent", galaxy.accent);
  detailPanel.classList.remove("is-active");

  window.requestAnimationFrame(() => {
    detailPanel.classList.add("is-active");
  });

  const closeAndRefresh = () => {
    closeDetailPanel();
    updateScene();
  };

  detailPanel.querySelector("[data-close-detail]")?.addEventListener("click", closeAndRefresh);
  detailPanel.querySelector("[data-back-galaxy]")?.addEventListener("click", closeAndRefresh);
};

const updateScene = () => {
  if (!rootElement) {
    return;
  }

  rootElement.dataset.phase = appState.phase;
  rootElement.dataset.viewport = window.innerWidth <= 900 ? "mobile-viewport" : "wide-viewport";
  rootElement.dataset.interfaceMode = getDeviceMode();
  rootElement.dataset.deviceMode = getDeviceMode();
  rootElement.dataset.universeZoom = appState.universeZoom;
  rootElement.dataset.orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";

  if (isPcMode() && appState.phase === "universe") {
    setCameraVars(getFocusedGalaxy());
  } else {
    setCameraVars(null);
  }

  updateHeader();
  updateIntroOverlay();
  updateUniverseLayer();
  updateUniverseBrief();
  updateUniverseFocusPanel();
  updateSceneHint();
  updateSceneZoom();
  updateFocusScene();
  updateMobileExplorer();
  updateDetailPanel();
};

const enterDesktopUniverse = () => {
  if (appState.transitionLock) {
    return;
  }

  appState.phase = "universe";
  appState.universeBriefOpen = false;
  appState.selectedGalaxyId = null;
  appState.selectedPlanetId = null;
  appState.focusedGalaxyId = appState.focusedGalaxyId ?? defaultGalaxyId;
  appState.universeZoom = "overview";
  rootElement.classList.add("is-unveiling");
  updateScene();
  withTransitionLock(() => {}, transitionDuration);
};

const enterMobileExplorer = () => {
  appState.phase = "mobile";
  appState.selectedGalaxyId = appState.selectedGalaxyId ?? defaultGalaxyId;
  appState.focusedGalaxyId = appState.selectedGalaxyId;
  appState.universeBriefOpen = false;
  appState.universeZoom = "overview";
  closeDetailPanel(true);
  setTravelVars(null);
  setCameraVars(null);
  updateScene();
};

const enterPrimaryExperience = () => {
  if (isMobileMode()) {
    enterMobileExplorer();
    return;
  }

  enterDesktopUniverse();
};

const focusGalaxy = (galaxyId, zoomFocused) => {
  if (!isPcMode() || !galaxyMap.has(galaxyId)) {
    return;
  }

  appState.focusedGalaxyId = galaxyId;
  appState.universeZoom = zoomFocused ? "focused" : appState.universeZoom;
  setCameraVars(galaxyMap.get(galaxyId));
  updateScene();
};

const enterGalaxy = (galaxyId) => {
  if (!isPcMode() || appState.transitionLock || !galaxyMap.has(galaxyId)) {
    return;
  }

  const galaxy = galaxyMap.get(galaxyId);
  appState.phase = "galaxy";
  appState.selectedGalaxyId = galaxyId;
  appState.focusedGalaxyId = galaxyId;
  appState.selectedPlanetId = null;
  appState.universeBriefOpen = false;
  appState.universeZoom = "focused";
  setTravelVars(galaxy);
  rootElement.classList.add("is-drilling");
  updateScene();
  withTransitionLock(() => {}, transitionDuration);
};

const syncDeviceMode = (nextMode) => {
  if (nextMode === appState.deviceMode) {
    return;
  }

  appState.deviceMode = nextMode;
  appState.universeBriefOpen = false;
  closeDetailPanel(true);

  if (nextMode === "mobile") {
    appState.selectedGalaxyId = appState.selectedGalaxyId ?? appState.focusedGalaxyId ?? defaultGalaxyId;
    appState.phase = appState.phase === "intro" ? "intro" : "mobile";
    appState.universeZoom = "overview";
    setTravelVars(null);
    setCameraVars(null);
  } else {
    appState.focusedGalaxyId = appState.selectedGalaxyId ?? appState.focusedGalaxyId ?? defaultGalaxyId;
    appState.selectedGalaxyId = null;
    appState.phase = appState.phase === "intro" ? "intro" : "universe";
    appState.universeZoom = "overview";
    setTravelVars(null);
  }

  updateScene();
};

const setupInteractions = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!isPcMode() || appState.phase !== "universe") {
        return;
      }

      const galaxyId = button.dataset.galaxyId;

      if (appState.focusedGalaxyId === galaxyId && appState.universeZoom === "focused") {
        enterGalaxy(galaxyId);
        return;
      }

      focusGalaxy(galaxyId, true);
    });
  });

  document.querySelector("[data-enter-primary]")?.addEventListener("click", enterPrimaryExperience);

  document.querySelector("[data-close-brief]")?.addEventListener("click", () => {
    appState.universeBriefOpen = false;
    updateUniverseBrief();
  });

  document.querySelector("[data-open-brief]")?.addEventListener("click", () => {
    if (!isPcMode() || appState.phase !== "universe") {
      return;
    }

    appState.universeBriefOpen = !appState.universeBriefOpen;
    updateUniverseBrief();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (appState.phase === "intro") {
        enterPrimaryExperience();
        return;
      }

      if (appState.selectedPlanetId) {
        closeDetailPanel();
        updateScene();
        return;
      }

      if (isPcMode() && appState.phase === "galaxy" && !appState.transitionLock) {
        focusLayer?.querySelector("[data-back-universe]")?.click();
        return;
      }

      if (isPcMode() && appState.phase === "universe" && appState.universeBriefOpen) {
        appState.universeBriefOpen = false;
        updateUniverseBrief();
      }
    }

    if (event.key === "Enter" && isPcMode() && appState.phase === "universe" && appState.focusedGalaxyId) {
      if (appState.universeZoom === "focused") {
        enterGalaxy(appState.focusedGalaxyId);
      } else {
        focusGalaxy(appState.focusedGalaxyId, true);
      }
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
    if (!isPcMode() || appState.phase === "intro") {
      reset();
      return;
    }

    const bounds = stage.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    rootElement.style.setProperty("--pointer-x", `${offsetX * 0.015}px`);
    rootElement.style.setProperty("--pointer-y", `${offsetY * 0.018}px`);
  });

  stage.addEventListener("pointerleave", reset);
};

const setupWheelZoom = () => {
  const stage = document.querySelector("[data-scene-stage]");

  if (!stage) {
    return;
  }

  stage.addEventListener(
    "wheel",
    (event) => {
      if (!isPcMode() || appState.phase === "intro") {
        return;
      }

      event.preventDefault();

      if (event.deltaY < -8 && appState.phase === "universe") {
        if (appState.universeZoom !== "focused") {
          focusGalaxy(appState.focusedGalaxyId ?? defaultGalaxyId, true);
        } else if (appState.focusedGalaxyId) {
          enterGalaxy(appState.focusedGalaxyId);
        }
      }

      if (event.deltaY > 8) {
        if (appState.selectedPlanetId) {
          closeDetailPanel();
          updateScene();
          return;
        }

        if (appState.phase === "galaxy" && !appState.transitionLock) {
          focusLayer?.querySelector("[data-back-universe]")?.click();
          return;
        }

        if (appState.phase === "universe" && appState.universeZoom === "focused") {
          appState.universeZoom = "overview";
          setCameraVars(null);
          updateScene();
        }
      }
    },
    { passive: false },
  );
};

const applyDebugStateFromUrl = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const phase = params.get("phase");
  const galaxy = params.get("galaxy");
  const planet = params.get("planet");
  const mode = params.get("mode");

  if (mode === "pc" || mode === "mobile") {
    appState.deviceMode = mode;
  }

  if (phase === "universe" && isPcMode()) {
    appState.phase = "universe";
    if (galaxyMap.has(galaxy)) {
      appState.focusedGalaxyId = galaxy;
      appState.universeZoom = "focused";
    }
    appState.universeBriefOpen = params.get("brief") === "open";
  }

  if (phase === "galaxy" && isPcMode() && galaxyMap.has(galaxy)) {
    appState.phase = "galaxy";
    appState.selectedGalaxyId = galaxy;
    appState.focusedGalaxyId = galaxy;
    appState.universeZoom = "focused";
    setTravelVars(galaxyMap.get(galaxy));

    if (planet) {
      const target = galaxyMap.get(galaxy).planets.find((entry) => entry.id === planet);
      appState.selectedPlanetId = target?.id ?? null;
    }
  }

  if (phase === "mobile" || (phase === "universe" && isMobileMode())) {
    appState.phase = "mobile";
    if (galaxyMap.has(galaxy)) {
      appState.selectedGalaxyId = galaxy;
    }

    if (planet) {
      const targetGalaxy = getActiveMobileGalaxy();
      const target = targetGalaxy?.planets.find((entry) => entry.id === planet);
      appState.selectedPlanetId = target?.id ?? null;
    }
  }
};

export const boot = (root = document.getElementById("app")) => {
  if (!root) {
    return;
  }

  appState.deviceMode = detectDeviceMode();

  root.innerHTML = `
    <div class="page-shell app-shell" data-phase="intro" data-interface-mode="${appState.deviceMode}">
      ${renderHeader(universeContent)}
      ${renderScene(universeContent, galaxyClusters)}
      ${renderFooter(universeContent)}
    </div>
  `;

  rootElement = root.querySelector(".app-shell");
  detailPanel = root.querySelector("[data-detail-panel]");
  focusLayer = root.querySelector("[data-focus-layer]");
  mobileExplorer = root.querySelector("[data-mobile-explorer]");
  sceneHint = root.querySelector("[data-scene-hint]");
  sceneZoom = root.querySelector("[data-scene-zoom]");
  universeFocusPanel = root.querySelector("[data-universe-focus]");

  setTravelVars(null);
  setCameraVars(null);
  applyDebugStateFromUrl();
  updateScene();
  setupInteractions();
  setupParallax();
  setupWheelZoom();

  const handleViewportChange = () => {
    const nextMode = detectDeviceMode();
    if (nextMode !== appState.deviceMode) {
      syncDeviceMode(nextMode);
      return;
    }

    updateScene();
  };

  mediaQueries.forEach((query) => query.addEventListener("change", handleViewportChange));
  window.addEventListener("resize", handleViewportChange);
};

if (typeof document !== "undefined") {
  boot();
}
