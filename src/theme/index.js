import { createDefaultPlanBThemeContent, normalizePlanBHeaderContent } from "./domain.js";

export const defaultPlanBThemeContent = createDefaultPlanBThemeContent();
const PLANB_THEME_STORAGE_KEY = "planb-color-scheme";

/**
 * Creates the Plan B header element that consumers can prepend to their own pages.
 *
 * @param {{eyebrow?: string, title?: string, lede?: string}} headerContent
 * @returns {HTMLElement}
 */
export function createPlanBHeader(headerContent = {}) {
  const header = normalizePlanBHeaderContent(headerContent);
  const element = document.createElement("header");

  element.className = "planb-hero";
  element.innerHTML = `
    <div class="planb-hero__overlay"></div>
    <div class="planb-container planb-hero__inner">
      <p class="planb-eyebrow">${escapeHtml(header.eyebrow)}</p>
      <button
        type="button"
        class="planb-theme-toggle"
        data-planb-theme-toggle
        aria-live="polite"
      ></button>
      <h1>${escapeHtml(header.title)}</h1>
      <p class="planb-lede">${escapeHtml(header.lede)}</p>
    </div>
  `;

  return element;
}

/**
 * Creates a full page shell for the demo or for apps that want the complete wrapper.
 *
 * @param {{header: HTMLElement, mainContent?: string}} options
 * @returns {HTMLElement}
 */
export function createPlanBPageShell({ header, mainContent = "" }) {
  const shell = document.createElement("div");

  shell.className = "planb-page-shell";
  shell.append(header);

  const main = document.createElement("main");
  main.className = "planb-container planb-main";
  main.innerHTML = mainContent;
  shell.append(main);

  return shell;
}

/**
 * Mounts the header before the first child of a container to minimize integration work in host apps.
 *
 * @param {{target: Element, headerContent?: {eyebrow?: string, title?: string, lede?: string}}} options
 * @returns {HTMLElement}
 */
export function mountPlanBHeader({ target, headerContent = {} }) {
  const header = createPlanBHeader(headerContent);
  target.prepend(header);
  return header;
}

/**
 * Initializes the theme toggle and keeps the page synchronized with manual or system color scheme changes.
 *
 * @param {{documentRef?: Document, storage?: Storage, mediaQueryList?: MediaQueryList | {matches: boolean, addEventListener?: Function, removeEventListener?: Function, addListener?: Function, removeListener?: Function}}} options
 * @returns {{dispose: () => void, getPreference: () => string | null}}
 */
export function initializePlanBThemeToggle({
  documentRef = document,
  storage = globalThis.localStorage,
  mediaQueryList = globalThis.matchMedia?.("(prefers-color-scheme: dark)"),
} = {}) {
  const themeToggle = documentRef.querySelector("[data-planb-theme-toggle]");
  const metaColorScheme = documentRef.querySelector('meta[name="color-scheme"]');
  const root = documentRef.documentElement;

  if (!themeToggle || !root || !metaColorScheme) {
    return {
      dispose() {},
      getPreference() {
        return null;
      },
    };
  }

  const readPreference = () => storage?.getItem(PLANB_THEME_STORAGE_KEY) || null;
  const getSystemPreference = () => (mediaQueryList?.matches ? "dark" : "light");
  const getActiveTheme = () => root.dataset.theme || getSystemPreference();

  const syncTheme = () => {
    const preference = readPreference();

    if (preference === "light" || preference === "dark") {
      root.dataset.theme = preference;
      metaColorScheme.content = preference;
    } else {
      delete root.dataset.theme;
      metaColorScheme.content = "light dark";
    }

    const activeTheme = getActiveTheme();
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    themeToggle.dataset.themeTarget = nextTheme;
    themeToggle.textContent = nextTheme === "dark" ? "Dark mode" : "Light mode";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    themeToggle.title = `Switch to ${nextTheme} mode`;
  };

  const handleToggleClick = () => {
    const nextTheme = themeToggle.dataset.themeTarget === "dark" ? "dark" : "light";
    storage?.setItem(PLANB_THEME_STORAGE_KEY, nextTheme);
    syncTheme();
  };

  const handleSystemChange = () => {
    if (!readPreference()) {
      syncTheme();
    }
  };

  themeToggle.addEventListener("click", handleToggleClick);

  if (mediaQueryList?.addEventListener) {
    mediaQueryList.addEventListener("change", handleSystemChange);
  } else if (mediaQueryList?.addListener) {
    mediaQueryList.addListener(handleSystemChange);
  }

  syncTheme();

  return {
    dispose() {
      themeToggle.removeEventListener("click", handleToggleClick);

      if (mediaQueryList?.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleSystemChange);
      } else if (mediaQueryList?.removeListener) {
        mediaQueryList.removeListener(handleSystemChange);
      }
    },
    getPreference: readPreference,
  };
}

/**
 * Escapes text before interpolation into the DOM.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
