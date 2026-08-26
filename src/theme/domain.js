/**
 * Returns the default theme copy used by the demo and as a safe fallback for consumers.
 *
 * @returns {{siteHeader: {brand: string, navItems: Array<{label: string, href: string}>, action: {label: string, href: string}}, header: {eyebrow: string, title: string, lede: string}, footer: {brand: string, summary: string, groups: Array<{title: string, links: Array<{label: string, href: string}>}>, meta: string}}}
 */
export function createDefaultPlanBThemeContent() {
  return {
    siteHeader: {
      brand: "Plan B Theme",
      navItems: [
        { label: "Cards", href: "#cards" },
        { label: "Timeline", href: "#timeline" },
        { label: "Collections", href: "#collections" },
        { label: "Actions", href: "#actions" },
      ],
      action: { label: "View source", href: "https://github.com/LuganoPlanB/vite-theme" },
    },
    header: {
      eyebrow: "Theme specimen",
      title: "Reusable patterns for Plan B sites",
      lede:
        "A content-neutral showcase of the shared page shell, responsive surfaces, navigation, typography, actions, and light and dark themes.",
    },
    footer: {
      brand: "Plan B Theme",
      summary:
        "A reusable visual shell for Vite and VitePress sites. Host applications supply their own content.",
      groups: [
        {
          title: "Specimens",
          links: [
            { label: "Cards", href: "#cards" },
            { label: "Timeline", href: "#timeline" },
            { label: "Collections", href: "#collections" },
          ],
        },
        {
          title: "Theme",
          links: [
            { label: "Actions", href: "#actions" },
            { label: "GitHub", href: "https://github.com/LuganoPlanB/vite-theme" },
            { label: "Readme", href: "https://github.com/LuganoPlanB/vite-theme#readme" },
          ],
        },
      ],
      meta: "Demonstration content only. Product and editorial content belong to host sites.",
    },
  };
}

/**
 * Merges user supplied site header content with defaults while preserving required fields.
 *
 * @param {{brand?: string, navItems?: Array<{label?: string, href?: string}>, action?: {label?: string, href?: string}} | undefined} siteHeader
 * @returns {{brand: string, navItems: Array<{label: string, href: string}>, action: {label: string, href: string}}}
 */
export function normalizePlanBSiteHeaderContent(siteHeader = {}) {
  const defaults = createDefaultPlanBThemeContent().siteHeader;
  const navItems = Array.isArray(siteHeader.navItems) ? siteHeader.navItems : defaults.navItems;

  return {
    brand: siteHeader.brand?.trim() || defaults.brand,
    navItems: navItems
      .map((item) => ({
        label: item.label?.trim() || "",
        href: item.href?.trim() || "",
      }))
      .filter((item) => item.label && item.href),
    action: {
      label: siteHeader.action?.label?.trim() || defaults.action.label,
      href: siteHeader.action?.href?.trim() || defaults.action.href,
    },
  };
}

/**
 * Merges user supplied footer content with defaults while preserving required fields.
 *
 * @param {{brand?: string, summary?: string, groups?: Array<{title?: string, links?: Array<{label?: string, href?: string}>}>, meta?: string} | undefined} footer
 * @returns {{brand: string, summary: string, groups: Array<{title: string, links: Array<{label: string, href: string}>}>, meta: string}}
 */
export function normalizePlanBFooterContent(footer = {}) {
  const defaults = createDefaultPlanBThemeContent().footer;
  const groups = Array.isArray(footer.groups) ? footer.groups : defaults.groups;

  return {
    brand: footer.brand?.trim() || defaults.brand,
    summary: footer.summary?.trim() || defaults.summary,
    groups: groups
      .map((group) => ({
        title: group.title?.trim() || "",
        links: (Array.isArray(group.links) ? group.links : [])
          .map((link) => ({
            label: link.label?.trim() || "",
            href: link.href?.trim() || "",
          }))
          .filter((link) => link.label && link.href),
      }))
      .filter((group) => group.title && group.links.length > 0),
    meta: footer.meta?.trim() || defaults.meta,
  };
}

/**
 * Merges user supplied header content with the default copy while keeping required fields present.
 *
 * @param {{eyebrow?: string, title?: string, lede?: string} | undefined} header
 * @returns {{eyebrow: string, title: string, lede: string}}
 */
export function normalizePlanBHeaderContent(header = {}) {
  const defaults = createDefaultPlanBThemeContent().header;

  return {
    eyebrow: header.eyebrow?.trim() || defaults.eyebrow,
    title: header.title?.trim() || defaults.title,
    lede: header.lede?.trim() || defaults.lede,
  };
}
