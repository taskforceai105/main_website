import { renderFooter, renderHero, renderNavbar, renderToolCards, renderToolExplorer } from "./components.js";
import { orbitingLogos, siteContent, toolCategories } from "./site-data.js";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const renderPage = () => `
  <div class="page-shell">
    ${renderNavbar(toolCategories)}
    <main>
      ${renderHero(siteContent, orbitingLogos)}
      ${renderToolExplorer(toolCategories, siteContent.explorerIntro)}
    </main>
    ${renderFooter(siteContent)}
  </div>
`;

const activateCategory = (categoryId) => {
  const category = toolCategories.find((entry) => entry.id === categoryId);

  if (!category) {
    return;
  }

  const title = document.querySelector("[data-panel-title]");
  const description = document.querySelector("[data-panel-description]");
  const grid = document.querySelector("[data-tools-grid]");
  const tabs = document.querySelectorAll("[data-category-tab]");

  if (!title || !description || !grid) {
    return;
  }

  title.textContent = category.title;
  description.textContent = category.description;
  grid.innerHTML = renderToolCards(category);

  tabs.forEach((tab) => {
    const isActive = tab.dataset.categoryId === categoryId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  revealElements();
};

const setupTabs = () => {
  document.querySelectorAll("[data-category-tab]").forEach((tab) => {
    tab.addEventListener("click", () => activateCategory(tab.dataset.categoryId));
  });
};

const setMenuOpen = (isOpen) => {
  const wrap = document.querySelector("[data-menu-wrap]");
  const button = document.querySelector("[data-menu-toggle]");

  if (!wrap || !button) {
    return;
  }

  wrap.classList.toggle("is-open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
};

const setupMenu = () => {
  const wrap = document.querySelector("[data-menu-wrap]");
  const button = document.querySelector("[data-menu-toggle]");

  if (!wrap || !button) {
    return;
  }

  button.addEventListener("click", () => {
    setMenuOpen(!wrap.classList.contains("is-open"));
  });

  wrap.addEventListener("mouseenter", () => {
    if (window.innerWidth > 1080) {
      setMenuOpen(true);
    }
  });

  wrap.addEventListener("mouseleave", () => {
    if (window.innerWidth > 1080) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrap.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
};

let revealObserver;

const revealElements = () => {
  const elements = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => revealObserver.observe(element));
};

const setupParallax = () => {
  if (prefersReducedMotion) {
    return;
  }

  const shell = document.querySelector("[data-parallax-shell]");

  if (!shell) {
    return;
  }

  const reset = () => {
    shell.style.setProperty("--parallax-x", "0px");
    shell.style.setProperty("--parallax-y", "0px");
  };

  shell.addEventListener("pointermove", (event) => {
    const bounds = shell.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    shell.style.setProperty("--parallax-x", `${offsetX * 0.015}px`);
    shell.style.setProperty("--parallax-y", `${offsetY * 0.015}px`);
  });

  shell.addEventListener("pointerleave", reset);
};

export const boot = (root = document.getElementById("app")) => {
  if (!root) {
    return;
  }

  root.innerHTML = renderPage();
  setupTabs();
  setupMenu();
  setupParallax();
  revealElements();
};

if (typeof document !== "undefined") {
  boot();
}
