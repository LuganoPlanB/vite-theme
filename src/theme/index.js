import {
  createDefaultPlanBThemeContent,
  normalizePlanBFooterContent,
  normalizePlanBHeaderContent,
  normalizePlanBSiteHeaderContent,
} from "./domain.js";

export const defaultPlanBThemeContent = createDefaultPlanBThemeContent();
const PLANB_THEME_STORAGE_KEY = "planb-color-scheme";
const PLANB_THEMES = new Set(["light", "dark"]);

const planBThemeToggleMarkup = `
  <button
    type="button"
    class="planb-theme-toggle"
    data-planb-theme-toggle
    role="switch"
    aria-checked="false"
    aria-label="Switch to dark theme"
    title="Switch to dark theme"
  >
    <span class="planb-theme-toggle__track" aria-hidden="true">
      <span class="planb-theme-toggle__thumb">
        <svg class="planb-theme-toggle__icon planb-theme-toggle__icon--sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5"></circle>
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"></path>
        </svg>
        <svg class="planb-theme-toggle__icon planb-theme-toggle__icon--moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.2 15.1A8.4 8.4 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15Z"></path>
        </svg>
      </span>
    </span>
  </button>
`;

/**
 * Creates the site-level navigation header used above the hero.
 *
 * @param {{brand?: string, navItems?: Array<{label?: string, href?: string}>, action?: {label?: string, href?: string}}} siteHeaderContent
 * @returns {HTMLElement}
 */
export function createPlanBSiteHeader(siteHeaderContent = {}) {
  const siteHeader = normalizePlanBSiteHeaderContent(siteHeaderContent);
  const element = document.createElement("header");

  element.className = "planb-site-header";
  element.innerHTML = `
    <div class="planb-container planb-site-header__inner">
      <a class="planb-brand" href="/">
        <span class="planb-brand__mark" aria-hidden="true"></span>
        <span>${escapeHtml(siteHeader.brand)}</span>
      </a>
      <nav class="planb-site-nav" aria-label="Primary">
        <ul>
          ${siteHeader.navItems
            .map(
              (item) => `
                <li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>
              `,
            )
            .join("")}
        </ul>
      </nav>
      <div class="planb-site-header__actions">
        <a class="planb-header-action" href="${escapeHtml(siteHeader.action.href)}">
          ${escapeHtml(siteHeader.action.label)}
        </a>
        ${planBThemeToggleMarkup}
      </div>
    </div>
  `;

  return element;
}

/**
 * Creates the Plan B header element that consumers can prepend to their own pages.
 *
 * @param {{eyebrow?: string, title?: string, lede?: string}} headerContent
 * @returns {HTMLElement}
 */
export function createPlanBHeader(headerContent = {}) {
  const header = normalizePlanBHeaderContent(headerContent);
  const element = document.createElement("section");

  element.className = "planb-hero";
  element.setAttribute("aria-labelledby", "planb-hero-title");
  element.innerHTML = `
      <div class="planb-hero__overlay"></div>
      <div class="planb-container planb-hero__inner">
        <p class="planb-eyebrow">${escapeHtml(header.eyebrow)}</p>
        <h1 id="planb-hero-title">${escapeHtml(header.title)}</h1>
        <p class="planb-lede">${escapeHtml(header.lede)}</p>
      </div>
  `;

  return element;
}

/**
 * Creates the site footer used after the main page content.
 *
 * @param {{brand?: string, summary?: string, groups?: Array<{title?: string, links?: Array<{label?: string, href?: string}>}>, meta?: string}} footerContent
 * @returns {HTMLElement}
 */
export function createPlanBFooter(footerContent = {}) {
  const footer = normalizePlanBFooterContent(footerContent);
  const element = document.createElement("footer");

  element.className = "planb-footer";
  element.innerHTML = `
    <div class="planb-container planb-footer__inner">
      <div class="planb-footer__brand">
        <a class="planb-brand" href="/">
          <span class="planb-brand__mark" aria-hidden="true"></span>
          <span>${escapeHtml(footer.brand)}</span>
        </a>
        <p>${escapeHtml(footer.summary)}</p>
      </div>
      <nav class="planb-footer__nav" aria-label="Footer">
        ${footer.groups
          .map(
            (group) => `
              <section>
                <h2>${escapeHtml(group.title)}</h2>
                <ul>
                  ${group.links
                    .map(
                      (link) => `
                        <li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>
                      `,
                    )
                    .join("")}
                </ul>
              </section>
            `,
          )
          .join("")}
      </nav>
      <p class="planb-footer__meta">${escapeHtml(footer.meta)}</p>
    </div>
  `;

  return element;
}

/**
 * Creates a full page shell for the demo or for apps that want the complete wrapper.
 *
 * @param {{header: HTMLElement, mainContent?: string, siteHeader?: HTMLElement, footer?: HTMLElement}} options
 * @returns {HTMLElement}
 */
export function createPlanBPageShell({ header, mainContent = "", siteHeader = null, footer = null }) {
  const shell = document.createElement("div");

  shell.className = "planb-page-shell";

  const skipLink = document.createElement("a");
  skipLink.className = "planb-skip-link";
  skipLink.href = "#planb-main-content";
  skipLink.textContent = "Skip to main content";
  shell.append(skipLink);

  if (siteHeader) {
    shell.append(siteHeader);
  }
  shell.append(header);

  const main = document.createElement("main");
  main.id = "planb-main-content";
  main.tabIndex = -1;
  main.className = "planb-container planb-main";
  main.innerHTML = mainContent;
  shell.append(main);
  if (footer) {
    shell.append(footer);
  }

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

  const readPreference = () => {
    try {
      const preference = storage?.getItem(PLANB_THEME_STORAGE_KEY) || null;
      return PLANB_THEMES.has(preference) ? preference : null;
    } catch {
      return null;
    }
  };
  let preference = readPreference();

  const writePreference = (nextPreference) => {
    preference = nextPreference;

    try {
      storage?.setItem(PLANB_THEME_STORAGE_KEY, nextPreference);
    } catch {
      // A blocked storage API should not prevent the in-page theme control from working.
    }
  };
  const getSystemPreference = () => (mediaQueryList?.matches ? "dark" : "light");
  const getActiveTheme = () => root.dataset.theme || getSystemPreference();

  const syncTheme = () => {
    if (preference) {
      root.dataset.theme = preference;
      metaColorScheme.content = preference;
    } else {
      delete root.dataset.theme;
      metaColorScheme.content = "light dark";
    }

    const activeTheme = getActiveTheme();
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    const accessibleLabel = `Switch to ${nextTheme} theme`;

    themeToggle.dataset.themePreference = preference || "system";
    themeToggle.dataset.themeTarget = nextTheme;
    themeToggle.dataset.activeTheme = activeTheme;
    themeToggle.setAttribute("role", "switch");
    themeToggle.setAttribute("aria-checked", String(activeTheme === "dark"));
    themeToggle.setAttribute("aria-label", accessibleLabel);
    themeToggle.title = accessibleLabel;

    if (!themeToggle.querySelector?.(".planb-theme-toggle__track")) {
      themeToggle.textContent = accessibleLabel;
    }
  };

  const handleToggleClick = () => {
    const nextTheme = PLANB_THEMES.has(themeToggle.dataset.themeTarget)
      ? themeToggle.dataset.themeTarget
      : getActiveTheme() === "dark"
        ? "light"
        : "dark";

    writePreference(nextTheme);
    syncTheme();
  };

  const handleSystemChange = () => {
    if (!preference) {
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
    getPreference: () => preference,
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
