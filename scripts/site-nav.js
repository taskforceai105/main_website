const navItems = [
  { label: "AI Directory", href: "/ai-directory/" },
  { label: "Option A", href: "/option-a/" },
  { label: "Option B", href: "/option-b/" },
  { label: "Option C", href: "/option-c/" },
  { label: "Option D", href: "/option-d/" },
  { label: "Option E", href: "/option-e/" },
];

const normalizePath = (path) => {
  if (!path) {
    return "/";
  }

  const cleaned = path.endsWith("/") ? path : `${path}/`;
  return cleaned === "//" ? "/" : cleaned;
};

const renderNav = (currentPath) => `
  <header class="site-nav">
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="/" aria-label="Det 105 AI Task Force home">
        <span class="site-nav__crest">
          <img src="/assets/det105.png" alt="" />
        </span>
        <span class="site-nav__brand-copy">
          <span>Det 105 AI Task Force</span>
          <strong>Navigation</strong>
        </span>
      </a>

      <button
        class="site-nav__toggle"
        type="button"
        aria-expanded="false"
        aria-controls="site-nav-links"
        data-site-nav-toggle
      >
        Menu
      </button>

      <nav class="site-nav__links" id="site-nav-links" aria-label="Primary navigation" data-site-nav-links>
        ${navItems
          .map(
            (item) => `
              <a
                class="site-nav__link${normalizePath(item.href) === currentPath ? " is-active" : ""}"
                href="${item.href}"
              >
                ${item.label}
              </a>
            `,
          )
          .join("")}
      </nav>
    </div>
  </header>
`;

const init = () => {
  const mount = document.querySelector("[data-site-nav]");
  if (!mount) {
    return;
  }

  const currentPath = normalizePath(window.location.pathname);
  mount.innerHTML = renderNav(currentPath);

  const toggle = mount.querySelector("[data-site-nav-toggle]");
  const links = mount.querySelector("[data-site-nav-links]");
  if (!toggle || !links) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
};

if (typeof document !== "undefined") {
  init();
}
