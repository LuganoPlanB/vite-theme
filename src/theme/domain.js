/**
 * Returns the default theme copy used by the demo and as a safe fallback for consumers.
 *
 * @returns {{header: {eyebrow: string, title: string, lede: string}}}
 */
export function createDefaultPlanBThemeContent() {
  return {
    header: {
      eyebrow: "Lugano Plan B",
      title: "Light blue theme variation",
      lede:
        "A brighter shared shell with calm blue surfaces, crisp contrast, and a more optimistic hardware-style finish for other Vite apps to reuse.",
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
