/**
 * Returns the default theme copy used by the demo and as a safe fallback for consumers.
 *
 * @returns {{header: {eyebrow: string, title: string, lede: string}}}
 */
export function createDefaultPlanBThemeContent() {
  return {
    header: {
      eyebrow: "Lugano Plan B",
      title: "Civic technology for open cities",
      lede:
        "A shared visual shell for smart city projects, public-interest tools, and civic hacking communities building with open urban data.",
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
