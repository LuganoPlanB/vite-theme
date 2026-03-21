import { createDefaultPlanBThemeContent, normalizePlanBHeaderContent } from "./domain.js";

export const defaultPlanBThemeContent = createDefaultPlanBThemeContent();

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

