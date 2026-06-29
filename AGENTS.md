# AGENTS.md

## Overview

This repository is a small reusable Vite theme package for the Lugano Plan B visual shell.

- The source of truth is the theme itself, not a demo app.
- The reusable surface is limited to shared CSS, the header markup helpers, and the hero image asset.
- The demo page in `src/main.js` exists to verify the package in isolation.
- This repo is intentionally minimal and should stay easy to adopt from other Vite projects.

## Working Model

When making changes, preserve the package-first structure.

- Treat `src/theme/theme.css` as the primary style layer consumed by host apps.
- Treat `src/theme/index.js` as the public runtime API.
- Treat `src/theme/domain.js` as the place for defaults and normalization rules.
- Keep `src/main.js` limited to demo usage of the public API.
- Prefer small direct edits over abstractions.

## Public API

The current public package exports are:

- `lugano-planb-vite-theme`
- `lugano-planb-vite-theme/theme.css`

Code that changes these exports, their semantics, or the CSS class contract is a breaking change unless the user explicitly asks for it.

### `src/theme/index.js`

Use this file for the public DOM helpers.

- Keep the API framework-agnostic and Vite-friendly.
- Prefer plain DOM operations over framework-specific adapters.
- Preserve the current functions unless a breaking change is requested:
  - `createPlanBHeader`
  - `createPlanBPageShell`
  - `mountPlanBHeader`
- Escape interpolated text before injecting HTML.

### `src/theme/theme.css`

Use this file for the reusable theme contract.

- Prefer CSS custom properties for anything host apps may want to override.
- Keep class names namespaced with the `planb-` prefix.
- Avoid styling generic selectors in ways that would surprise host apps.
- Keep asset references relative so Vite can rewrite them during build.

### `src/theme/domain.js`

- Keep defaults explicit and readable.
- Preserve required header invariants: `eyebrow`, `title`, and `lede` must always resolve to strings.
- Prefer normalization over clever fallback logic.

### `src/main.js`

- Keep it as a demo entry only.
- Do not move host-app-specific content or business logic into this repo.

## Local Commands

Install dependencies:

```sh
npm install
```

Run the demo locally:

```sh
npm run dev
```

Build the package demo:

```sh
npm run build
```

Run tests:

```sh
npm test
```

## Change Strategy

Prefer this order:

1. Decide whether the request affects the public API, the style contract, or only the demo.
2. Make the minimum direct edit.
3. Run the smallest relevant test command.
4. If the package output changed, run `npm run build`.
5. Update `README.md` when adoption steps or public behavior changed.

## Things To Avoid

- Do not add framework bindings unless explicitly requested.
- Do not couple the package to `planb-tech-radar` data structures or content.
- Do not turn the demo into the product.
- Do not add dependencies for simple DOM or CSS work.
- Do not rename public classes or exports casually.

## Useful Repository Facts

- The package is ESM-only (`"type": "module"`).
- The package exports source files on purpose so Vite can process CSS and assets seamlessly.
- The hero image lives in `src/theme/assets/`.
- Lightweight API tests live in `test/theme.test.mjs`.

## Manual adoption (without GitHub Action)

When the GitHub Action cannot be used (local development, non-CI workflows),
download and extract the latest release archive:

```sh
curl -LO https://github.com/LuganoPlanB/vite-theme/releases/latest/download/lugano-planb-vite-theme.tar.gz
tar -xzf lugano-planb-vite-theme.tar.gz -C src/
```

The archive contains a self-contained directory with its own `package.json`.

### npm install from source (bare specifiers)

```sh
npm install https://github.com/LuganoPlanB/vite-theme.git
```

Or from a local checkout:

```sh
npm install ../lugano-planb-vite-theme
```

Then use bare specifier imports:

```js
import "lugano-planb-vite-theme/theme.css";
import { createPlanBPageShell, createPlanBHeader, /* ... */ } from "lugano-planb-vite-theme";
```

### Direct import after local extract

```js
import "./lugano-planb-vite-theme/theme.css";
import { createPlanBPageShell, createPlanBHeader, /* ... */ } from "./lugano-planb-vite-theme/index.js";
```

### Full page shell example

```js
import "./lugano-planb-vite-theme/theme.css";
import {
  createPlanBFooter,
  createPlanBHeader,
  createPlanBPageShell,
  createPlanBSiteHeader,
  defaultPlanBThemeContent,
} from "./lugano-planb-vite-theme/index.js";

document.querySelector("#app").replaceChildren(
  createPlanBPageShell({
    siteHeader: createPlanBSiteHeader(defaultPlanBThemeContent.siteHeader),
    header: createPlanBHeader({
      eyebrow: "Lugano Plan B",
      title: "Your Project Title",
      lede: "A short description of your project.",
    }),
    mainContent: '<section class="planb-panel"><h2>Content</h2></section>',
    footer: createPlanBFooter(defaultPlanBThemeContent.footer),
  }),
);
```

### Hero-only (mountPlanBHeader)

```js
import "lugano-planb-vite-theme/theme.css";
import { mountPlanBHeader } from "lugano-planb-vite-theme";

mountPlanBHeader({
  target: document.querySelector("#app"),
  headerContent: {
    eyebrow: "Your Eyebrow",
    title: "Your Title",
    lede: "Your lede text.",
  },
});
```

### VitePress manual integration

Extract into `.vitepress/theme/`:

```sh
curl -LO https://github.com/LuganoPlanB/vite-theme/releases/latest/download/lugano-planb-vite-theme.tar.gz
tar -xzf lugano-planb-vite-theme.tar.gz -C .vitepress/theme/
```

Then in `.vitepress/theme/index.js`:

```js
import DefaultTheme from "vitepress/theme";
import "./lugano-planb-vite-theme/theme.css";
import { initializePlanBThemeToggle } from "./lugano-planb-vite-theme/index.js";

export default {
  extends: DefaultTheme,
  enhanceApp() {
    initializePlanBThemeToggle();
  },
};
```

### CSS custom property overrides

```css
:root {
  --planb-color-canvas: #121212;
  --planb-color-panel: #1f1f1f;
  --planb-color-accent: #e15364;
}
```

### Showcase CSS classes

- `planb-logo-grid`, `planb-logo-card`, `planb-logo-mark` — partner/initiative cards
- `planb-timeline`, `planb-timeline__item` — milestones
- `planb-publication-grid`, `planb-publication-card`, `planb-meta-list` — publications
- `planb-software-grid`, `planb-software-card`, `planb-action-row` — software projects
- `planb-panel`, `planb-card`, `planb-grid`, `planb-section-heading` — generic layout
- `planb-button-link`, `planb-text-link` — links and CTAs
