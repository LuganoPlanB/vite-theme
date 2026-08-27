# Plan B Vite Theme

Drop-in visual shell for Vite and VitePress websites — CSS tokens, hero
header, site chrome helpers, and theme toggle.

The deployed demo is a content-neutral component specimen. It demonstrates
the complete public shell and CSS pattern set without acting as a foundation
website or owning civic, product, publication, or project content. Real Plan B
content belongs in [luganoplanb.github.io](https://github.com/LuganoPlanB/luganoplanb.github.io).

## Quick start

Add one step to your deploy workflow:

```yaml
- uses: LuganoPlanB/vite-theme/.github/actions/apply@v0
```

The action auto-detects Vite vs VitePress, downloads the latest release, and
extracts the theme into `src/` (Vite) or `.vitepress/theme/` (VitePress).

Then import in your entrypoint:

```js
import "./lugano-planb-vite-theme/theme.css";
import {
  createPlanBHeader,
  createPlanBPageShell,
  createPlanBSiteHeader,
  createPlanBFooter,
  defaultPlanBThemeContent,
  initializePlanBThemeToggle,
} from "./lugano-planb-vite-theme/index.js";
```

## Local development

```sh
npm install
npm run dev
npm test
```

## API

| Export | Description |
|---|---|
| `theme.css` | CSS custom properties, layout, panels, cards, footer |
| `createPlanBHeader(opts)` | Non-banner hero section (`eyebrow`, `title`, `lede`) |
| `createPlanBPageShell(opts)` | Full wrapper with skip link and focusable main landmark (`siteHeader`, `header`, `mainContent`, `footer`) |
| `createPlanBSiteHeader(opts)` | Top navigation bar |
| `createPlanBFooter(opts)` | Site footer with link groups |
| `mountPlanBHeader(opts)` | Quick hero-only mount into a container |
| `initializePlanBThemeToggle()` | System/light/dark preference control wired to `--planb-*` CSS vars |
| `defaultPlanBThemeContent` | Default copy for site header, hero, footer |

Customise colours:

```css
:root {
  --planb-color-canvas: #fffefa;
  --planb-color-panel: #fcfcfc;
  --planb-color-accent: #4f97e9;
}
```

The theme control cycles through system, light, and dark preferences. System
mode removes the stored override and follows `prefers-color-scheme`; explicit
light or dark choices persist under `planb-color-scheme`.

`createPlanBPageShell()` renders one page-level banner through
`createPlanBSiteHeader()`. The hero is a semantic section, and the shell adds a
“Skip to main content” link targeting `#planb-main-content`.

## Action inputs

| Input | Default | Description |
|---|---|---|
| `target` | `auto` | `vite`, `vitepress`, or `auto` (detects from `.vitepress/`) |
| `token` | `${{ github.token }}` | Token with read access to this repo's releases |

## Action outputs

| Output | Description |
|---|---|
| `path` | Relative path where the theme was extracted |
| `mode` | Detected project type (`vite` or `vitepress`) |
