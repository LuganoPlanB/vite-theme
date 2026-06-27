/**
 * Returns the default theme copy used by the demo and as a safe fallback for consumers.
 *
 * @returns {{siteHeader: {brand: string, navItems: Array<{label: string, href: string}>, action: {label: string, href: string}}, header: {eyebrow: string, title: string, lede: string}}}
 */
export function createDefaultPlanBThemeContent() {
  return {
    siteHeader: {
      brand: "Plan B",
      navItems: [
        { label: "Network", href: "#network" },
        { label: "Timeline", href: "#timeline" },
        { label: "Library", href: "#library" },
        { label: "Software", href: "#software" },
      ],
      action: { label: "Start a project", href: "mailto:hello@example.com" },
    },
    header: {
      eyebrow: "Lugano Plan B",
      title: "Civic technology for open cities",
      lede:
        "A shared visual shell for smart city projects, public-interest tools, and civic hacking communities building with open urban data.",
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
