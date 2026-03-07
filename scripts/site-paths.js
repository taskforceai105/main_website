// Keep this list aligned with the deployable top-level route folders.
const knownTopLevelRoutes = new Set([
  "ai-directory",
  "docs",
  "option-a",
  "option-b",
  "option-c",
  "option-d",
  "option-e",
]);

const ensureLeadingSlash = (value) => {
  if (!value) {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
};

export const getBasePath = (pathname = window.location.pathname) => {
  const normalizedPath = ensureLeadingSlash(pathname);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (!segments.length) {
    return "/";
  }

  if (knownTopLevelRoutes.has(segments[0])) {
    return "/";
  }

  return `/${segments[0]}/`;
};

export const withBasePath = (path, pathname = window.location.pathname) => {
  const normalizedPath = ensureLeadingSlash(path);
  const basePath = getBasePath(pathname);

  if (normalizedPath === "/") {
    return basePath;
  }

  return `${basePath.replace(/\/$/, "")}${normalizedPath}`;
};

export const stripBasePath = (path) => {
  const normalizedPath = ensureLeadingSlash(path);
  const basePath = getBasePath(normalizedPath);

  if (basePath === "/") {
    return normalizedPath;
  }

  const stripped = normalizedPath.slice(basePath.length - 1);
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
};
