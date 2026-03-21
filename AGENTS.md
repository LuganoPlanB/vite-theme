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
