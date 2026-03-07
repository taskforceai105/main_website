import {
  renderDetailPanel,
  renderFocusScene,
  renderFooter,
  renderHeader,
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
const mobileViewportQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(max-width: 760px), (orientation: landscape) and (max-height: 540px)")
    : null;
const savedModeKey = "det105-interface-mode";

const galaxyMap = new Map(galaxyClusters.map((galaxy) => [galaxy.id, galaxy]));
const defaultGalaxyId = galaxyClusters[0]?.id ?? null;

const appState = {
  interfaceMode: null,
  phase: "intro",
  selectedGalaxyId: null,
  focusedGalaxyId: defaultGalaxyId,
  selectedPlanetId: null,
  universeBriefOpen: false,
  transitionLock: false,
  universeZoom: "overview",
};

let rootElement;
let detailPanel;
let focusLayer;
let universeFocusPanel;
let sceneHint;
let sceneZoom;
let universeCamera;
let transitionTimer;
let detailHideTimer;

const isMobileViewport = () => Boolean(mobileViewportQuery?.matches);
const getRecommendedMode = () => (isMobileViewport() ? "mobile" : "pc");
const getInterfaceMode = () => appState.interfaceMode ?? getRecommendedMode();
const getModeConfig = () => interfaceModes[getInterfaceMode()] ?? interfaceModes.pc;
const isMobileMode = () => getInterfaceMode() === "mobile";
const isPcMode = () => getInterfaceMode() === "pc";

const getGalaxy = () => (appState.selectedGalaxyId ? galaxyMap.get(appState.selectedGalaxyId) ?? null : null);
const getFocusedGalaxy = () =>
  appState.focusedGalaxyId ? galaxyMap.get(appState.focusedGalaxyId) ?? galaxyClusters[0] ?? null : null;

const getPlanet = () => {
  const galaxy = getGalaxy();
  return galaxy?.planets.find((planet) => planet.id === appState.selectedPlanetId) ?? null;
};

const readStoredMode = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(savedModeKey);
  return value === "pc" || value === "mobile" ? value : null;
};

const storeMode = (mode) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(savedModeKey, mode);
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

  if (!galaxy || appState.phase !== "universe" || appState.universeZoom !== "focused") {
    rootElement.style.setProperty("--camera-scale", "1");
    rootElement.style.setProperty("--camera-x", "0%");
    rootElement.style.setProperty("--camera-y", "0%");
    return;
  }

  const scale = isPcMode() ? 1.2 : 1.06;
  const translateX = `${(50 - galaxy.universeX) * (isPcMode() ? 0.56 : 0.22)}%`;
  const translateY = `${(50 - galaxy.universeY) * (isPcMode() ? 0.42 : 0.18)}%`;
  rootElement.style.setProperty("--camera-scale", String(scale));
  rootElement.style.setProperty("--camera-x", translateX);
  rootElement.style.setProperty("--camera-y", translateY);
};

const updateHeader = () => {
  const status = document.querySelector("[data-header-state]");
  const briefToggle = document.querySelector("[data-open-brief]");
  const modeButton = document.querySelector("[data-open-mode]");

  if (modeButton) {
    modeButton.textContent = `${getModeConfig().label} Mode`;
  }

  if (!status) {
    return;
  }

  if (briefToggle) {
    briefToggle.hidden = isMobileMode();
  }

  if (appState.phase === "intro") {
    status.textContent = "Select Interface";
    if (briefToggle) {
      briefToggle.disabled = true;
    }
    return;
  }

  if (appState.phase === "universe") {
    status.textContent = isPcMode() ? "Universe Map / Desktop" : "Universe Map / Mobile";
    if (briefToggle) {
      briefToggle.textContent = appState.universeBriefOpen ? "Hide Brief" : "Universe Brief";
      briefToggle.disabled = isMobileMode();
    }
    return;
  }

  const galaxy = getGalaxy();
  status.textContent = galaxy ? `${galaxy.title} Drilldown` : "Galaxy Drilldown";
  if (briefToggle) {
    briefToggle.disabled = true;
  }
};

const updateModeSelection = () => {
  const launchButton = document.querySelector("[data-enter-universe]");
  const recommendedButton = document.querySelector("[data-use-recommended]");
  const modeTitle = document.querySelector("[data-mode-panel-title]");
  const modeCopy = document.querySelector("[data-mode-panel-copy]");
  const modeKicker = document.querySelector("[data-mode-panel-kicker]");
  const rotateGuidance = document.querySelector("[data-rotate-guidance]");
  const rotateTitle = document.querySelector("[data-rotate-title]");
  const rotateCopy = document.querySelector("[data-rotate-copy]");
  const recommendedMode = interfaceModes[getRecommendedMode()];
  const mode = appState.interfaceMode;
  const modeConfig = mode ? interfaceModes[mode] : null;

  document.querySelectorAll("[data-select-mode]").forEach((button) => {
    const isSelected = button.dataset.selectMode === mode;
    button.classList.toggle("is-selected", isSelected);
    button.classList.toggle("is-recommended", button.dataset.selectMode === recommendedMode.id);
  });

  if (launchButton) {
    launchButton.disabled = !modeConfig;
    launchButton.textContent = modeConfig ? modeConfig.enterLabel : universeContent.enterLabel;
  }

  if (recommendedButton) {
    recommendedButton.textContent = `Use Recommended Mode (${recommendedMode.label})`;
  }

  if (!modeTitle || !modeCopy || !modeKicker) {
    return;
  }

  if (!modeConfig) {
    modeKicker.textContent = "Interface Profile";
    modeTitle.textContent = "Select a command view";
    modeCopy.textContent =
      "Choose PC or Mobile to load the interface profile that fits your device and control style.";
    if (rotateGuidance) {
      rotateGuidance.hidden = true;
      rotateGuidance.classList.remove("is-active");
    }
    return;
  }

  modeKicker.textContent = modeConfig.eyebrow;
  modeTitle.textContent = modeConfig.title;
  modeCopy.textContent = modeConfig.summary;

  if (!rotateGuidance || !rotateTitle || !rotateCopy) {
    return;
  }

  const showRotate = modeConfig.id === "mobile";
  rotateGuidance.hidden = !showRotate;
  rotateGuidance.classList.toggle("is-active", showRotate);

  if (showRotate) {
    rotateTitle.textContent = modeConfig.rotateTitle;
    rotateCopy.textContent = modeConfig.rotateCopy;
  }
};

const updateUniverseLayer = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    const isSelected = button.dataset.galaxyId === appState.selectedGalaxyId;
    const isFocused =
      button.dataset.galaxyId === appState.focusedGalaxyId &&
      appState.phase === "universe" &&
      (isMobileMode() || appState.universeZoom === "focused");
    button.classList.toggle("is-selected", isSelected);
    button.classList.toggle("is-focused", isFocused);
  });
};

const updateUniverseBrief = () => {
  const brief = document.querySelector("[data-universe-brief]");
  if (!brief) {
    return;
  }

  const shouldShow = appState.phase === "universe" && appState.universeBriefOpen && isPcMode();
  brief.hidden = !shouldShow;
  brief.classList.toggle("is-active", shouldShow);
};

const updateSceneHint = () => {
  if (!sceneHint) {
    return;
  }

  const shouldShow = appState.phase !== "intro" && Boolean(appState.interfaceMode);
  sceneHint.hidden = !shouldShow;

  if (!shouldShow) {
    sceneHint.innerHTML = "";
    sceneHint.classList.remove("is-active");
    return;
  }

  sceneHint.innerHTML = renderSceneHint(getModeConfig(), appState.phase, getFocusedGalaxy());
  sceneHint.classList.add("is-active");
};

const bindZoomControls = () => {
  sceneZoom?.querySelector("[data-zoom-in]")?.addEventListener("click", () => {
    if (appState.phase === "universe") {
      if (appState.universeZoom !== "focused") {
        focusGalaxy(appState.focusedGalaxyId ?? defaultGalaxyId, true);
        return;
      }

      if (appState.focusedGalaxyId) {
        enterGalaxy(appState.focusedGalaxyId);
      }
    }
  });

  sceneZoom?.querySelector("[data-zoom-out]")?.addEventListener("click", () => {
    if (appState.selectedPlanetId) {
      closeDetailPanel();
      return;
    }

    if (appState.phase === "galaxy" && !appState.transitionLock) {
      focusLayer?.querySelector("[data-back-universe]")?.click();
      return;
    }

    if (appState.phase === "universe") {
      appState.universeZoom = "overview";
      setCameraVars(null);
      updateScene();
    }
  });
};

const updateSceneZoom = () => {
  if (!sceneZoom) {
    return;
  }

  const shouldShow = appState.phase !== "intro" && Boolean(appState.interfaceMode);
  sceneZoom.hidden = !shouldShow;

  if (!shouldShow) {
    sceneZoom.innerHTML = "";
    sceneZoom.classList.remove("is-active");
    return;
  }

  sceneZoom.innerHTML = renderZoomControls(getInterfaceMode(), appState.phase, appState.universeZoom === "focused");
  sceneZoom.classList.add("is-active");
  bindZoomControls();
};

const closeDetailPanel = (immediate = false) => {
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

const updateUniverseFocusPanel = () => {
  if (!universeFocusPanel) {
    return;
  }

  const galaxy = getFocusedGalaxy();
  const shouldShow =
    appState.phase === "universe" &&
    Boolean(galaxy) &&
    Boolean(appState.interfaceMode) &&
    (isMobileMode() || appState.universeZoom === "focused");

  universeFocusPanel.hidden = !shouldShow;
  universeFocusPanel.classList.toggle("is-active", shouldShow);

  if (!shouldShow || !galaxy) {
    universeFocusPanel.innerHTML = "";
    return;
  }

  universeFocusPanel.innerHTML = renderUniverseFocusPanel(galaxy, getInterfaceMode());
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
    appState.selectedPlanetId = null;
    closeDetailPanel(true);

    withTransitionLock(() => {
      appState.phase = "galaxy";
      window.setTimeout(() => {
        appState.phase = "universe";
        appState.focusedGalaxyId = returnGalaxyId ?? appState.focusedGalaxyId;
        appState.selectedGalaxyId = null;
        appState.universeBriefOpen = false;
        appState.universeZoom = isPcMode() ? "focused" : "overview";
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

  if (appState.phase !== "galaxy") {
    focusLayer.innerHTML = "";
    return;
  }

  const galaxy = getGalaxy();
  if (!galaxy) {
    focusLayer.innerHTML = "";
    return;
  }

  focusLayer.innerHTML = renderFocusScene(galaxy, getInterfaceMode());
  bindFocusSceneEvents();
};

const updateDetailPanel = () => {
  if (!detailPanel) {
    return;
  }

  if (appState.phase !== "galaxy" || !appState.selectedPlanetId) {
    closeDetailPanel();
    return;
  }

  const galaxy = getGalaxy();
  const planet = getPlanet();

  if (!galaxy || !planet) {
    closeDetailPanel(true);
    return;
  }

  detailPanel.hidden = false;
  detailPanel.innerHTML = renderDetailPanel({ galaxy, planet, mode: getInterfaceMode() });
  detailPanel.style.setProperty("--panel-accent", galaxy.accent);
  detailPanel.classList.remove("is-active");

  window.requestAnimationFrame(() => {
    detailPanel.classList.add("is-active");
  });

  detailPanel.querySelector("[data-close-detail]")?.addEventListener("click", closeDetailPanel);
  detailPanel.querySelector("[data-back-galaxy]")?.addEventListener("click", closeDetailPanel);
};

const updateScene = () => {
  if (!rootElement) {
    return;
  }

  rootElement.dataset.phase = appState.phase;
  rootElement.dataset.viewport = isMobileViewport() ? "mobile-viewport" : "wide-viewport";
  rootElement.dataset.interfaceMode = getInterfaceMode();
  rootElement.dataset.universeZoom = appState.universeZoom;
  rootElement.dataset.orientation =
    typeof window !== "undefined" && window.innerWidth > window.innerHeight ? "landscape" : "portrait";

  if (appState.phase === "universe") {
    setCameraVars(getFocusedGalaxy());
  } else {
    setCameraVars(null);
  }

  updateHeader();
  updateModeSelection();
  updateUniverseLayer();
  updateUniverseBrief();
  updateUniverseFocusPanel();
  updateSceneHint();
  updateSceneZoom();
  updateFocusScene();
  updateDetailPanel();
};

const selectInterfaceMode = (mode, persist = true) => {
  if (!(mode in interfaceModes)) {
    return;
  }

  appState.interfaceMode = mode;
  appState.universeBriefOpen = false;

  if (persist) {
    storeMode(mode);
  }

  if (mode === "mobile") {
    appState.universeZoom = "overview";
  }

  updateScene();
};

const focusGalaxy = (galaxyId, zoomFocused) => {
  if (!galaxyMap.has(galaxyId)) {
    return;
  }

  appState.focusedGalaxyId = galaxyId;
  appState.universeZoom = zoomFocused ? "focused" : appState.universeZoom;
  setCameraVars(galaxyMap.get(galaxyId));
  updateScene();
};

const enterUniverse = () => {
  if (appState.transitionLock) {
    return;
  }

  if (!appState.interfaceMode) {
    selectInterfaceMode(getRecommendedMode());
  }

  appState.phase = "universe";
  appState.universeBriefOpen = false;
  appState.selectedGalaxyId = null;
  appState.selectedPlanetId = null;
  appState.focusedGalaxyId = appState.focusedGalaxyId ?? defaultGalaxyId;
  appState.universeZoom = isPcMode() ? "overview" : "overview";
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
  appState.focusedGalaxyId = galaxyId;
  appState.selectedPlanetId = null;
  appState.universeBriefOpen = false;
  appState.universeZoom = "focused";
  setTravelVars(galaxy);
  rootElement.classList.add("is-drilling");
  updateScene();
  withTransitionLock(() => {}, transitionDuration);
};

const openModeSelector = () => {
  appState.phase = "intro";
  appState.selectedGalaxyId = null;
  appState.selectedPlanetId = null;
  appState.universeBriefOpen = false;
  appState.universeZoom = "overview";
  closeDetailPanel(true);
  setTravelVars(null);
  setCameraVars(null);
  updateScene();
};

const setupInteractions = () => {
  document.querySelectorAll("[data-galaxy-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const galaxyId = button.dataset.galaxyId;

      if (appState.phase !== "universe") {
        return;
      }

      if (isMobileMode()) {
        focusGalaxy(galaxyId, true);
        return;
      }

      if (appState.focusedGalaxyId === galaxyId && appState.universeZoom === "focused") {
        enterGalaxy(galaxyId);
        return;
      }

      focusGalaxy(galaxyId, true);
    });
  });

  document.querySelectorAll("[data-select-mode]").forEach((button) => {
    button.addEventListener("click", () => selectInterfaceMode(button.dataset.selectMode));
  });

  document.querySelector("[data-enter-universe]")?.addEventListener("click", enterUniverse);
  document.querySelector("[data-use-recommended]")?.addEventListener("click", () => {
    selectInterfaceMode(getRecommendedMode());
    enterUniverse();
  });
  document.querySelector("[data-open-mode]")?.addEventListener("click", openModeSelector);

  document.querySelector("[data-close-brief]")?.addEventListener("click", () => {
    appState.universeBriefOpen = false;
    updateUniverseBrief();
  });

  document.querySelector("[data-open-brief]")?.addEventListener("click", () => {
    if (appState.phase !== "universe" || isMobileMode()) {
      return;
    }

    appState.universeBriefOpen = !appState.universeBriefOpen;
    updateUniverseBrief();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (appState.phase === "intro") {
        enterUniverse();
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

      if (appState.phase === "universe" && appState.universeBriefOpen) {
        appState.universeBriefOpen = false;
        updateUniverseBrief();
      }
    }

    if (event.key === "Enter" && appState.phase === "universe" && isPcMode() && appState.focusedGalaxyId) {
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

const setupZoomGestures = () => {
  const stage = document.querySelector("[data-scene-stage]");

  if (!stage) {
    return;
  }

  const pointers = new Map();
  let pinchStartDistance = null;
  let pinchHandled = false;

  const getDistance = () => {
    const values = [...pointers.values()];
    if (values.length < 2) {
      return 0;
    }

    const [first, second] = values;
    return Math.hypot(first.x - second.x, first.y - second.y);
  };

  const resetPinch = () => {
    pinchStartDistance = null;
    pinchHandled = false;
  };

  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") {
      return;
    }

    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 2) {
      pinchStartDistance = getDistance();
      pinchHandled = false;
    }
  });

  stage.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "touch" || !pointers.has(event.pointerId) || !isMobileMode()) {
      return;
    }

    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size !== 2 || !pinchStartDistance || pinchHandled) {
      return;
    }

    const scale = getDistance() / pinchStartDistance;

    if (scale > 1.1) {
      pinchHandled = true;

      if (appState.phase === "universe" && appState.focusedGalaxyId) {
        enterGalaxy(appState.focusedGalaxyId);
      }
    }

    if (scale < 0.9) {
      pinchHandled = true;

      if (appState.selectedPlanetId) {
        closeDetailPanel();
        return;
      }

      if (appState.phase === "galaxy" && !appState.transitionLock) {
        focusLayer?.querySelector("[data-back-universe]")?.click();
      }
    }
  });

  const clearPointer = (event) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) {
      resetPinch();
    }
  };

  stage.addEventListener("pointerup", clearPointer);
  stage.addEventListener("pointercancel", clearPointer);
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

      if (event.deltaY < -8) {
        if (appState.phase === "universe") {
          if (appState.universeZoom !== "focused") {
            focusGalaxy(appState.focusedGalaxyId ?? defaultGalaxyId, true);
          } else if (appState.focusedGalaxyId) {
            enterGalaxy(appState.focusedGalaxyId);
          }
        }
      }

      if (event.deltaY > 8) {
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
    appState.interfaceMode = mode;
  }

  if (phase === "universe") {
    appState.phase = "universe";
    appState.interfaceMode = appState.interfaceMode ?? getRecommendedMode();
    if (galaxyMap.has(galaxy)) {
      appState.focusedGalaxyId = galaxy;
      appState.universeZoom = "focused";
    }
    appState.universeBriefOpen = params.get("brief") === "open" && isPcMode();
  }

  if (phase === "galaxy" && galaxyMap.has(galaxy)) {
    appState.phase = "galaxy";
    appState.interfaceMode = appState.interfaceMode ?? getRecommendedMode();
    appState.selectedGalaxyId = galaxy;
    appState.focusedGalaxyId = galaxy;
    appState.universeZoom = "focused";
    appState.universeBriefOpen = false;
    setTravelVars(galaxyMap.get(galaxy));

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

  appState.interfaceMode = readStoredMode();

  root.innerHTML = `
    <div class="page-shell app-shell" data-phase="intro" data-interface-mode="unset">
      ${renderHeader(universeContent)}
      ${renderScene(universeContent, galaxyClusters, interfaceModes)}
      ${renderFooter(universeContent)}
    </div>
  `;

  rootElement = root.querySelector(".app-shell");
  detailPanel = root.querySelector("[data-detail-panel]");
  focusLayer = root.querySelector("[data-focus-layer]");
  universeFocusPanel = root.querySelector("[data-universe-focus]");
  sceneHint = root.querySelector("[data-scene-hint]");
  sceneZoom = root.querySelector("[data-scene-zoom]");
  universeCamera = root.querySelector("[data-universe-camera]");

  setTravelVars(null);
  setCameraVars(null);
  applyDebugStateFromUrl();
  updateScene();
  setupInteractions();
  setupParallax();
  setupWheelZoom();
  setupZoomGestures();

  if (mobileViewportQuery) {
    const handleViewportChange = () => {
      if (isMobileMode()) {
        appState.universeBriefOpen = false;
      }

      updateModeSelection();
      updateScene();
    };

    mobileViewportQuery.addEventListener("change", handleViewportChange);
  }

  window.addEventListener("resize", updateScene);
};

if (typeof document !== "undefined") {
  boot();
}
