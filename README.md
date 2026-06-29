# Plan B Vite Theme

Drop-in visual shell for Vite and VitePress websites — CSS tokens, hero
header, site chrome helpers, and theme toggle.

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
| `createPlanBHeader(opts)` | Hero section (`eyebrow`, `title`, `lede`) |
| `createPlanBPageShell(opts)` | Full wrapper (`siteHeader`, `header`, `mainContent`, `footer`) |
| `createPlanBSiteHeader(opts)` | Top navigation bar |
| `createPlanBFooter(opts)` | Site footer with link groups |
| `mountPlanBHeader(opts)` | Quick hero-only mount into a container |
| `initializePlanBThemeToggle()` | Light/dark toggle wired to `--planb-*` CSS vars |
| `defaultPlanBThemeContent` | Default copy for site header, hero, footer |

Customise colours:

```css
:root {
  --planb-color-canvas: #fffefa;
  --planb-color-panel: #fcfcfc;
  --planb-color-accent: #4f97e9;
}
```

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
