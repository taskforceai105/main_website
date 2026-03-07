import {
  renderBootOverlay,
  renderDetailPanel,
  renderDesktopUniverse,
  renderFooter,
  renderHeader,
  renderMobileExplorer,
  renderScene,
  renderSceneHint,
} from "./components.js";
import {
  desktopUniverseDimensions,
  desktopUniverseNodes,
  desktopUniverseRegions,
  galaxyClusters,
  universeContent,
} from "./data/universe.js";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const panelTransitionDuration = prefersReducedMotion ? 0 : 280;
const desktopDefaultScale = 0.74;
const desktopMinScale = 0.7;
const desktopMaxScale = 1.5;
const desktopFocusScale = 0.98;
const desktopDefaultX = 72;
const desktopDefaultY = 24;
const bootSteps = [
  {
    label: "Command Core",
    short: "Core",
    copy: "Bringing the Det 105 command core online and clearing the navigation shell.",
  },
  {
    label: "Model Ecosystems",
    short: "Models",
    copy: "Mapping frontier assistants, coding systems, and grounded research networks.",
  },
  {
    label: "Strategic Nodes",
    short: "Nodes",
    copy: "Syncing relationships across tools, local stacks, media systems, and learning pathways.",
  },
  {
    label: "Universe Ready",
    short: "Online",
    copy: "Command interface calibrated. Interactive AI universe now available.",
  },
];

const galaxyMap = new Map(galaxyClusters.map((galaxy) => [galaxy.id, galaxy]));
const desktopNodeMap = new Map(desktopUniverseNodes.map((node) => [node.id, node]));
const desktopRegionMap = new Map(desktopUniverseRegions.map((region) => [region.id, region]));
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
  selectedToolId: null,
  universeBriefOpen: false,
  isFullscreen: false,
  bootStepIndex: 0,
  bootProgress: 0,
  transitionLock: false,
  desktopView: {
    scale: desktopDefaultScale,
    x: desktopDefaultX,
    y: desktopDefaultY,
  },
  pointerDrag: {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: null,
  },
};

let rootElement;
let sceneStage;
let detailPanel;
let mobileExplorer;
let desktopUniverse;
let sceneHint;
let universeBrief;
let bootOverlay;
let detailHideTimer;
let desktopViewport;
let desktopPlane;
let bootTimers = [];

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
  const shortLandscape = width > height && height <= 580;
  const touchFirstTablet = width <= 1180 && coarsePointer && !hoverCapable;

  if ((narrowViewport && (coarsePointer || touchCapable || mobileUa)) || shortLandscape || touchFirstTablet) {
    return "mobile";
  }

  if (finePointer && hoverCapable && width >= 901) {
    return "pc";
  }

  return width < 840 ? "mobile" : "pc";
};

const isMobileMode = () => appState.deviceMode === "mobile";
const isPcMode = () => appState.deviceMode === "pc";

const getActiveMobileGalaxy = () =>
  appState.selectedGalaxyId ? galaxyMap.get(appState.selectedGalaxyId) ?? galaxyClusters[0] ?? null : galaxyClusters[0] ?? null;

const getMobilePlanet = () => {
  const galaxy = getActiveMobileGalaxy();
  return galaxy?.planets.find((planet) => planet.id === appState.selectedToolId) ?? null;
};

const getSelectedDesktopNode = () => (appState.selectedToolId ? desktopNodeMap.get(appState.selectedToolId) ?? null : null);

const clearBootTimers = () => {
  bootTimers.forEach((timer) => window.clearTimeout(timer));
  bootTimers = [];
};

const clampDesktopView = (view) => {
  if (!desktopViewport) {
    return view;
  }

  const bounds = desktopViewport.getBoundingClientRect();
  const scaledWidth = desktopUniverseDimensions.width * view.scale;
  const scaledHeight = desktopUniverseDimensions.height * view.scale;
  const limitX = Math.max(0, (scaledWidth - bounds.width) / 2 + 64);
  const limitY = Math.max(0, (scaledHeight - bounds.height) / 2 + 64);

  return {
    scale: Math.min(desktopMaxScale, Math.max(desktopMinScale, view.scale)),
    x: Math.min(limitX, Math.max(-limitX, view.x)),
    y: Math.min(limitY, Math.max(-limitY, view.y)),
  };
};

const applyDesktopView = () => {
  if (!desktopPlane) {
    return;
  }

  appState.desktopView = clampDesktopView(appState.desktopView);
  const { scale, x, y } = appState.desktopView;
  desktopPlane.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;

  const label = desktopUniverse?.querySelector(".desktop-map-controls__label");
  if (label) {
    label.textContent = getSelectedDesktopNode()
      ? `${getSelectedDesktopNode().name} selected`
      : `${Math.round(scale * 100)}% view`;
  }
};

const setDesktopView = (nextView) => {
  appState.desktopView = clampDesktopView(nextView);
  applyDesktopView();
};

const resetDesktopView = () => {
  setDesktopView({
    scale: desktopDefaultScale,
    x: desktopDefaultX,
    y: desktopDefaultY,
  });
};

const zoomDesktopView = (delta, pointer = null) => {
  if (!desktopViewport) {
    return;
  }

  const previous = appState.desktopView;
  const nextScale = Math.min(desktopMaxScale, Math.max(desktopMinScale, previous.scale + delta));
  if (nextScale === previous.scale) {
    return;
  }

  const bounds = desktopViewport.getBoundingClientRect();
  const pointX = pointer ? pointer.clientX - bounds.left - bounds.width / 2 : 0;
  const pointY = pointer ? pointer.clientY - bounds.top - bounds.height / 2 : 0;

  const nextX = pointX - ((pointX - previous.x) / previous.scale) * nextScale;
  const nextY = pointY - ((pointY - previous.y) / previous.scale) * nextScale;

  setDesktopView({
    scale: nextScale,
    x: nextX,
    y: nextY,
  });
};

const focusDesktopNode = (nodeId) => {
  const node = desktopNodeMap.get(nodeId);
  if (!node) {
    return;
  }

  const targetScale = Math.min(desktopMaxScale, Math.max(desktopFocusScale, appState.desktopView.scale));
  const x = (desktopUniverseDimensions.width / 2 - node.x) * targetScale;
  const y = (desktopUniverseDimensions.height / 2 - node.y) * targetScale;

  appState.selectedToolId = nodeId;
  appState.desktopView = clampDesktopView({
    scale: targetScale,
    x,
    y,
  });
  updateScene();
};

const closeDetailPanel = (immediate = false) => {
  appState.selectedToolId = null;

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

const toggleFullscreen = async () => {
  if (!document.fullscreenEnabled) {
    return;
  }

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await sceneStage?.requestFullscreen?.({ navigationUI: "hide" });
    }
  } catch {
    // Continue gracefully when fullscreen is blocked or unsupported.
  }
};

const tryEnterFullscreen = async () => {
  if (!isPcMode() || !document.fullscreenEnabled) {
    return;
  }

  try {
    if (!document.fullscreenElement) {
      await sceneStage?.requestFullscreen?.({ navigationUI: "hide" });
    }
  } catch {
    // Fullscreen is optional for desktop entry.
  }
};

const updateHeader = () => {
  const status = document.querySelector("[data-header-state]");
  const briefToggle = document.querySelector("[data-open-brief]");

  if (!status || !briefToggle) {
    return;
  }

  const showBriefToggle = isPcMode() && appState.phase === "desktop";
  briefToggle.hidden = !showBriefToggle;
  briefToggle.disabled = !showBriefToggle;
  briefToggle.textContent = appState.universeBriefOpen ? "Hide Brief" : "Map Brief";

  if (appState.phase === "intro") {
    status.textContent = "Standby";
    return;
  }

  if (appState.phase === "boot") {
    status.textContent = "Command Core Initializing";
    return;
  }

  if (isMobileMode()) {
    const galaxy = getActiveMobileGalaxy();
    status.textContent = galaxy ? `${galaxy.title} Directory` : "AI Tool Directory";
    return;
  }

  const selectedNode = getSelectedDesktopNode();
  status.textContent = selectedNode ? `${selectedNode.name} Briefing` : "Interactive AI Universe";
};

const updateUniverseBrief = () => {
  if (!universeBrief) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase === "desktop" && appState.universeBriefOpen;
  universeBrief.hidden = !shouldShow;
  universeBrief.classList.toggle("is-active", shouldShow);
};

const updateSceneHint = () => {
  if (!sceneHint) {
    return;
  }

  const shouldShow = appState.phase === "desktop" || appState.phase === "mobile";
  sceneHint.hidden = !shouldShow;

  if (!shouldShow) {
    sceneHint.innerHTML = "";
    sceneHint.classList.remove("is-active");
    return;
  }

  sceneHint.innerHTML = renderSceneHint({
    phase: appState.phase,
    isFullscreen: appState.isFullscreen,
  });
  sceneHint.classList.add("is-active");
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
      appState.selectedToolId = button.dataset.planetId;
      updateScene();
    });
  });
};

const bindDesktopUniverseEvents = () => {
  desktopViewport = desktopUniverse?.querySelector("[data-desktop-viewport]") ?? null;
  desktopPlane = desktopUniverse?.querySelector("[data-desktop-plane]") ?? null;

  desktopUniverse?.querySelector("[data-desktop-zoom-in]")?.addEventListener("click", () => {
    zoomDesktopView(0.12);
  });

  desktopUniverse?.querySelector("[data-desktop-zoom-out]")?.addEventListener("click", () => {
    zoomDesktopView(-0.12);
  });

  desktopUniverse?.querySelector("[data-desktop-reset]")?.addEventListener("click", () => {
    resetDesktopView();
  });

  desktopUniverse?.querySelector("[data-toggle-fullscreen]")?.addEventListener("click", () => {
    toggleFullscreen();
  });

  desktopUniverse?.querySelectorAll("[data-desktop-node]").forEach((button) => {
    button.addEventListener("click", () => {
      if (appState.pointerDrag.moved) {
        appState.pointerDrag.moved = false;
        return;
      }

      focusDesktopNode(button.dataset.nodeId);
    });
  });

  desktopViewport?.addEventListener("click", (event) => {
    if (event.target !== desktopViewport && event.target !== desktopPlane) {
      return;
    }

    if (appState.pointerDrag.moved) {
      appState.pointerDrag.moved = false;
      return;
    }

    if (appState.selectedToolId) {
      closeDetailPanel(true);
      updateScene();
    }
  });

  desktopViewport?.addEventListener(
    "wheel",
    (event) => {
      if (!isPcMode() || appState.phase !== "desktop") {
        return;
      }

      event.preventDefault();
      zoomDesktopView(event.deltaY < 0 ? 0.08 : -0.08, event);
    },
    { passive: false },
  );

  desktopViewport?.addEventListener("pointerdown", (event) => {
    if (!isPcMode() || appState.phase !== "desktop" || event.button !== 0) {
      return;
    }

    appState.pointerDrag.active = true;
    appState.pointerDrag.moved = false;
    appState.pointerDrag.startX = event.clientX;
    appState.pointerDrag.startY = event.clientY;
    appState.pointerDrag.originX = appState.desktopView.x;
    appState.pointerDrag.originY = appState.desktopView.y;
    appState.pointerDrag.pointerId = event.pointerId;
    desktopViewport.setPointerCapture(event.pointerId);
    desktopViewport.classList.add("is-dragging");
  });

  desktopViewport?.addEventListener("pointermove", (event) => {
    if (!appState.pointerDrag.active || appState.pointerDrag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - appState.pointerDrag.startX;
    const deltaY = event.clientY - appState.pointerDrag.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      appState.pointerDrag.moved = true;
    }

    setDesktopView({
      scale: appState.desktopView.scale,
      x: appState.pointerDrag.originX + deltaX,
      y: appState.pointerDrag.originY + deltaY,
    });
  });

  const endDrag = (event) => {
    if (!appState.pointerDrag.active || appState.pointerDrag.pointerId !== event.pointerId) {
      return;
    }

    appState.pointerDrag.active = false;
    appState.pointerDrag.pointerId = null;
    desktopViewport?.classList.remove("is-dragging");
    if (desktopViewport?.hasPointerCapture(event.pointerId)) {
      desktopViewport.releasePointerCapture(event.pointerId);
    }
    window.requestAnimationFrame(() => {
      appState.pointerDrag.moved = false;
    });
  };

  desktopViewport?.addEventListener("pointerup", endDrag);
  desktopViewport?.addEventListener("pointercancel", endDrag);

  applyDesktopView();
};

const updateDesktopUniverse = () => {
  if (!desktopUniverse) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase === "desktop";
  desktopUniverse.hidden = !shouldShow;
  desktopUniverse.classList.toggle("is-active", shouldShow);

  if (!shouldShow) {
    desktopUniverse.innerHTML = "";
    desktopViewport = null;
    desktopPlane = null;
    return;
  }

  desktopUniverse.innerHTML = renderDesktopUniverse({
    regions: desktopUniverseRegions,
    nodes: desktopUniverseNodes,
    dimensions: desktopUniverseDimensions,
    selectedNodeId: appState.selectedToolId,
    isFullscreen: appState.isFullscreen,
    showBriefToggle: appState.universeBriefOpen,
  });

  bindDesktopUniverseEvents();
};

const updateBootOverlay = () => {
  if (!bootOverlay) {
    return;
  }

  const shouldShow = isPcMode() && appState.phase === "boot";
  bootOverlay.hidden = !shouldShow;
  bootOverlay.classList.toggle("is-active", shouldShow);

  if (!shouldShow) {
    bootOverlay.innerHTML = "";
    return;
  }

  bootOverlay.innerHTML = renderBootOverlay(bootSteps, appState.bootStepIndex, appState.bootProgress);
};

const updateDetailPanel = () => {
  if (!detailPanel) {
    return;
  }

  const isDesktopDetail = isPcMode() && appState.phase === "desktop" && Boolean(appState.selectedToolId);
  const isMobileDetail = isMobileMode() && appState.phase === "mobile" && Boolean(appState.selectedToolId);

  if (!isDesktopDetail && !isMobileDetail) {
    closeDetailPanel();
    return;
  }

  let detailConfig;

  if (isDesktopDetail) {
    const node = getSelectedDesktopNode();
    const region = node ? desktopRegionMap.get(node.regionId) ?? null : null;
    if (!node || !region) {
      closeDetailPanel(true);
      return;
    }

    detailConfig = {
      title: node.name,
      kicker: "Node Brief",
      subtitle: `${region.title} / ${node.type}`,
      description: node.description,
      why: node.goodFor,
      href: node.href,
      backLabel: "Back to map",
      mode: "pc",
      accent: region.accent,
    };
  } else {
    const galaxy = getActiveMobileGalaxy();
    const planet = getMobilePlanet();
    if (!galaxy || !planet) {
      closeDetailPanel(true);
      return;
    }

    detailConfig = {
      title: planet.name,
      kicker: "Tool Brief",
      subtitle: `${galaxy.title} / ${planet.type}`,
      description: planet.description,
      why: planet.goodFor,
      href: planet.href,
      backLabel: "Back to directory",
      mode: "mobile",
      accent: galaxy.accent,
    };
  }

  detailPanel.hidden = false;
  detailPanel.innerHTML = renderDetailPanel(detailConfig);
  detailPanel.style.setProperty("--panel-accent", detailConfig.accent);
  detailPanel.classList.remove("is-active");

  window.requestAnimationFrame(() => {
    detailPanel.classList.add("is-active");
  });

  const clearSelection = () => {
    closeDetailPanel();
    updateScene();
  };

  detailPanel.querySelector("[data-close-detail]")?.addEventListener("click", clearSelection);
  detailPanel.querySelector("[data-clear-selection]")?.addEventListener("click", clearSelection);
};

const updateScene = () => {
  if (!rootElement) {
    return;
  }

  rootElement.dataset.phase = appState.phase;
  rootElement.dataset.interfaceMode = appState.deviceMode;
  rootElement.dataset.deviceMode = appState.deviceMode;
  rootElement.dataset.viewport = window.innerWidth <= 900 ? "mobile-viewport" : "wide-viewport";
  rootElement.dataset.orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  document.body.dataset.appPhase = appState.phase;
  document.body.dataset.interfaceMode = appState.deviceMode;

  updateHeader();
  updateUniverseBrief();
  updateSceneHint();
  updateDesktopUniverse();
  updateMobileExplorer();
  updateBootOverlay();
  updateDetailPanel();
};

const enterMobileExplorer = () => {
  clearBootTimers();
  appState.phase = "mobile";
  appState.universeBriefOpen = false;
  appState.selectedGalaxyId = appState.selectedGalaxyId ?? defaultGalaxyId;
  closeDetailPanel(true);
  updateScene();
};

const enterDesktopUniverse = () => {
  clearBootTimers();
  appState.phase = "desktop";
  appState.universeBriefOpen = false;
  closeDetailPanel(true);
  if (
    appState.desktopView.scale === desktopDefaultScale &&
    appState.desktopView.x === desktopDefaultX &&
    appState.desktopView.y === desktopDefaultY
  ) {
    resetDesktopView();
  }
  updateScene();
};

const startDesktopBootSequence = async () => {
  if (appState.transitionLock) {
    return;
  }

  appState.transitionLock = true;
  appState.universeBriefOpen = false;
  closeDetailPanel(true);
  await tryEnterFullscreen();
  appState.phase = "boot";
  appState.bootStepIndex = 0;
  appState.bootProgress = 12;
  updateScene();

  const totalDuration = prefersReducedMotion ? 700 : 1700;
  const interval = totalDuration / bootSteps.length;

  bootSteps.forEach((_, index) => {
    bootTimers.push(
      window.setTimeout(() => {
        appState.bootStepIndex = index;
        appState.bootProgress = Math.round(((index + 1) / bootSteps.length) * 100);
        updateBootOverlay();
      }, interval * index),
    );
  });

  bootTimers.push(
    window.setTimeout(() => {
      appState.transitionLock = false;
      enterDesktopUniverse();
    }, totalDuration),
  );
};

const enterPrimaryExperience = () => {
  if (appState.transitionLock) {
    return;
  }

  if (isMobileMode()) {
    enterMobileExplorer();
    return;
  }

  startDesktopBootSequence();
};

const syncDeviceMode = (nextMode) => {
  if (nextMode === appState.deviceMode) {
    return;
  }

  appState.deviceMode = nextMode;
  appState.universeBriefOpen = false;
  clearBootTimers();
  closeDetailPanel(true);

  if (nextMode === "mobile") {
    appState.phase = appState.phase === "intro" ? "intro" : "mobile";
    appState.selectedGalaxyId = appState.selectedGalaxyId ?? defaultGalaxyId;
  } else {
    appState.phase = appState.phase === "intro" ? "intro" : "desktop";
    resetDesktopView();
  }

  updateScene();
};

const applyDebugStateFromUrl = () => {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const phase = params.get("phase");
  const galaxy = params.get("galaxy");
  const planet = params.get("planet");
  const node = params.get("node");

  if (mode === "pc" || mode === "mobile") {
    appState.deviceMode = mode;
  }

  if (phase === "mobile" || (phase === "universe" && isMobileMode())) {
    appState.phase = "mobile";
    if (galaxyMap.has(galaxy)) {
      appState.selectedGalaxyId = galaxy;
    }
    if (planet) {
      appState.selectedToolId = planet;
    }
    return;
  }

  if (phase === "desktop" || phase === "universe" || phase === "galaxy") {
    appState.phase = "desktop";
    const targetNodeId = node ?? planet;
    if (desktopNodeMap.has(targetNodeId)) {
      appState.selectedToolId = targetNodeId;
      const targetNode = desktopNodeMap.get(targetNodeId);
      appState.desktopView = clampDesktopView({
        scale: desktopFocusScale,
        x: (desktopUniverseDimensions.width / 2 - targetNode.x) * desktopFocusScale,
        y: (desktopUniverseDimensions.height / 2 - targetNode.y) * desktopFocusScale,
      });
    }
  }

  if (phase === "boot") {
    appState.phase = "boot";
    appState.bootStepIndex = Math.min(2, bootSteps.length - 1);
    appState.bootProgress = 68;
  }
};

const setupCommonInteractions = () => {
  document.querySelector("[data-enter-primary]")?.addEventListener("click", enterPrimaryExperience);

  document.querySelector("[data-close-brief]")?.addEventListener("click", () => {
    appState.universeBriefOpen = false;
    updateUniverseBrief();
  });

  document.querySelector("[data-open-brief]")?.addEventListener("click", () => {
    if (!isPcMode() || appState.phase !== "desktop") {
      return;
    }

    appState.universeBriefOpen = !appState.universeBriefOpen;
    updateUniverseBrief();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && appState.phase === "intro") {
      enterPrimaryExperience();
      return;
    }

    if (event.key !== "Escape") {
      return;
    }

    if (appState.selectedToolId) {
      closeDetailPanel();
      updateScene();
      return;
    }

    if (appState.universeBriefOpen) {
      appState.universeBriefOpen = false;
      updateUniverseBrief();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    appState.isFullscreen = Boolean(document.fullscreenElement);
    if (appState.phase === "desktop") {
      updateScene();
    }
  });
};

const setupParallax = () => {
  if (!sceneStage || prefersReducedMotion) {
    return;
  }

  const reset = () => {
    rootElement.style.setProperty("--pointer-x", "0px");
    rootElement.style.setProperty("--pointer-y", "0px");
  };

  sceneStage.addEventListener("pointermove", (event) => {
    if (isMobileMode() || appState.phase === "mobile") {
      reset();
      return;
    }

    const bounds = sceneStage.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    rootElement.style.setProperty("--pointer-x", `${offsetX * 0.015}px`);
    rootElement.style.setProperty("--pointer-y", `${offsetY * 0.018}px`);
  });

  sceneStage.addEventListener("pointerleave", reset);
};

export const boot = (root = document.getElementById("app")) => {
  if (!root) {
    return;
  }

  appState.deviceMode = detectDeviceMode();

  root.innerHTML = `
    <div class="page-shell app-shell" data-phase="intro" data-interface-mode="${appState.deviceMode}">
      ${renderHeader(universeContent)}
      ${renderScene(universeContent)}
      ${renderFooter(universeContent)}
    </div>
  `;

  rootElement = root.querySelector(".app-shell");
  sceneStage = root.querySelector("[data-scene-stage]");
  detailPanel = root.querySelector("[data-detail-panel]");
  mobileExplorer = root.querySelector("[data-mobile-explorer]");
  desktopUniverse = root.querySelector("[data-desktop-universe]");
  sceneHint = root.querySelector("[data-scene-hint]");
  universeBrief = root.querySelector("[data-universe-brief]");
  bootOverlay = root.querySelector("[data-boot-overlay]");
  appState.isFullscreen = Boolean(document.fullscreenElement);

  applyDebugStateFromUrl();
  setupCommonInteractions();
  setupParallax();
  updateScene();

  const handleViewportChange = () => {
    const nextMode = detectDeviceMode();
    if (nextMode !== appState.deviceMode) {
      syncDeviceMode(nextMode);
      return;
    }

    if (appState.phase === "desktop") {
      applyDesktopView();
    }

    updateScene();
  };

  mediaQueries.forEach((query) => query.addEventListener("change", handleViewportChange));
  window.addEventListener("resize", handleViewportChange);
};

if (typeof document !== "undefined") {
  boot();
}
