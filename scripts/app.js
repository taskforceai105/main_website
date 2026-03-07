import {
  renderAppShell,
  renderCategoryNav,
  renderCategoryOverview,
  renderDetailPanel,
  renderDirectorySections,
  renderFeaturedGrid,
  renderResultsSummary,
} from "./components.js";
import {
  directoryItems,
  directorySections,
  directoryStats,
  featuredDirectoryItems,
  universeContent,
} from "./data/universe.js";

const appState = {
  activeCategory: "all",
  query: "",
  selectedToolId: null,
};

const itemMap = new Map(directoryItems.map((item) => [item.id, item]));
const sectionMap = new Map(directorySections.map((section) => [section.id, section]));

let appRoot;
let searchInput;
let clearSearchButton;
let categoryNav;
let categoryOverview;
let featuredGrid;
let directorySectionsContainer;
let resultsSummary;
let detailOverlay;

const applyInitialUrlState = () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const query = params.get("q");
  const tool = params.get("tool");

  if (category && (category === "all" || sectionMap.has(category))) {
    appState.activeCategory = category;
  }

  if (query) {
    appState.query = normalize(query);
  }

  if (tool && itemMap.has(tool)) {
    appState.selectedToolId = tool;
  }
};

const normalize = (value) => value.trim().toLowerCase();

const getSearchTokens = (item) =>
  [
    item.name,
    item.type,
    item.description,
    item.goodFor,
    item.categoryTitle,
    ...(item.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

const matchesFilters = (item) => {
  if (appState.activeCategory !== "all" && item.categoryId !== appState.activeCategory) {
    return false;
  }

  if (!appState.query) {
    return true;
  }

  return getSearchTokens(item).includes(appState.query);
};

const getVisibleItems = () => directoryItems.filter(matchesFilters);

const buildVisibleSections = () => {
  const visibleItems = getVisibleItems();
  const itemsBySection = new Map(
    directorySections.map((section) => [
      section.id,
      visibleItems.filter((item) => item.categoryId === section.id),
    ]),
  );

  const visibleSections = directorySections.filter((section) => {
    if (appState.activeCategory !== "all" && section.id !== appState.activeCategory) {
      return false;
    }

    return (itemsBySection.get(section.id) ?? []).length > 0;
  });

  return {
    visibleItems,
    itemsBySection,
    visibleSections,
  };
};

const getFeaturedItems = () => featuredDirectoryItems.filter(matchesFilters).slice(0, 8);

const updateDetailOverlay = () => {
  if (!detailOverlay) {
    return;
  }

  const item = appState.selectedToolId ? itemMap.get(appState.selectedToolId) ?? null : null;
  if (!item) {
    detailOverlay.hidden = true;
    detailOverlay.classList.remove("is-active");
    detailOverlay.innerHTML = "";
    document.body.classList.remove("has-detail-open");
    return;
  }

  const relatedItems = (item.relatedNodeIds ?? [])
    .map((id) => itemMap.get(id))
    .filter(Boolean)
    .slice(0, 6);

  detailOverlay.hidden = false;
  detailOverlay.classList.add("is-active");
  detailOverlay.innerHTML = renderDetailPanel({
    item,
    relatedItems,
  });
  document.body.classList.add("has-detail-open");
};

const updateDirectory = () => {
  const { visibleItems, itemsBySection, visibleSections } = buildVisibleSections();
  const activeCategoryLabel =
    appState.activeCategory !== "all" ? sectionMap.get(appState.activeCategory)?.title ?? "" : "";

  categoryNav.innerHTML = renderCategoryNav(directorySections, appState.activeCategory);
  categoryOverview.innerHTML = renderCategoryOverview(directorySections, appState.activeCategory);
  featuredGrid.innerHTML = renderFeaturedGrid(getFeaturedItems());
  directorySectionsContainer.innerHTML = renderDirectorySections(
    visibleSections,
    itemsBySection,
    visibleItems.length > 0,
  );
  resultsSummary.textContent = renderResultsSummary({
    totalVisible: visibleItems.length,
    totalItems: directoryStats.totalItems,
    query: appState.query,
    activeCategoryLabel,
  });
  clearSearchButton.hidden = !appState.query;
  updateDetailOverlay();
};

const scrollToDirectory = () => {
  document.querySelector("[data-directory-start]")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const setActiveCategory = (categoryId) => {
  appState.activeCategory = categoryId;
  updateDirectory();

  if (categoryId !== "all") {
    document.getElementById(`section-${categoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    scrollToDirectory();
  }
};

const bindEvents = () => {
  appRoot.addEventListener("click", (event) => {
    const browseTrigger = event.target.closest("[data-browse-directory]");
    if (browseTrigger) {
      scrollToDirectory();
      return;
    }

    const openTool = event.target.closest("[data-open-tool]");
    if (openTool) {
      appState.selectedToolId = openTool.dataset.openTool;
      updateDetailOverlay();
      return;
    }

    const categoryButton = event.target.closest("[data-set-category]");
    if (categoryButton) {
      setActiveCategory(categoryButton.dataset.setCategory);
      return;
    }

    const closeDetail = event.target.closest("[data-close-detail]");
    if (closeDetail) {
      appState.selectedToolId = null;
      updateDetailOverlay();
      return;
    }

    const focusCategory = event.target.closest("[data-focus-category]");
    if (focusCategory) {
      appState.selectedToolId = null;
      updateDetailOverlay();
      setActiveCategory(focusCategory.dataset.focusCategory);
      return;
    }

    const clearSearch = event.target.closest("[data-clear-search]");
    if (clearSearch) {
      appState.query = "";
      searchInput.value = "";
      updateDirectory();
      searchInput.focus();
    }
  });

  searchInput.addEventListener("input", (event) => {
    appState.query = normalize(event.target.value);
    updateDirectory();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && appState.selectedToolId) {
      appState.selectedToolId = null;
      updateDetailOverlay();
    }
  });
};

const init = () => {
  appRoot = document.getElementById("app");
  if (!appRoot) {
    return;
  }

  appRoot.innerHTML = renderAppShell(universeContent, directoryStats);

  searchInput = appRoot.querySelector("[data-search-input]");
  clearSearchButton = appRoot.querySelector("[data-clear-search]");
  categoryNav = appRoot.querySelector("[data-category-nav]");
  categoryOverview = appRoot.querySelector("[data-category-overview]");
  featuredGrid = appRoot.querySelector("[data-featured-grid]");
  directorySectionsContainer = appRoot.querySelector("[data-directory-sections]");
  resultsSummary = appRoot.querySelector("[data-results-summary]");
  detailOverlay = appRoot.querySelector("[data-detail-overlay]");

  applyInitialUrlState();
  bindEvents();
  searchInput.value = appState.query;
  updateDirectory();
};

if (typeof document !== "undefined") {
  init();
}
