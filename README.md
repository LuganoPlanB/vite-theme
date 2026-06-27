# Lugano Plan B Vite Theme

Reusable Vite theme:

- shared CSS tokens and layout
- the homepage header and hero treatment
- the hero image asset

## What this repo exports

- `lugano-planb-vite-theme/theme.css`: the reusable theme stylesheet
- `lugano-planb-vite-theme`: DOM helpers to mount Plan B site chrome, hero, and page shell

The exports point to source files on purpose. In Vite projects this is seamless: Vite resolves the package exports, processes the CSS import, and rewrites the hero asset URL automatically.

## Local development

```sh
npm install
npm run dev
```

Open the local Vite server to see the demo page.

## Tests

```sh
npm test
```

## Adopt in another Vite repository


Install from github:
```sh
npm install https://github.com/LuganoPlanB/vite-theme.git
```
or from a local sibling checkout:
```sh
npm install ../lugano-planb-vite-theme
```

In the target app entrypoint:

```js
import "lugano-planb-vite-theme/theme.css";
import {
  createPlanBFooter,
  createPlanBHeader,
  createPlanBPageShell,
  createPlanBSiteHeader,
  defaultPlanBThemeContent,
} from "lugano-planb-vite-theme";

document.querySelector("#app").replaceChildren(
  createPlanBPageShell({
    siteHeader: createPlanBSiteHeader(defaultPlanBThemeContent.siteHeader),
    header: createPlanBHeader({
      eyebrow: "Lugano LIPS",
      title: "Lugano Improvement Proposals",
      lede: "Open proposals for the Lugano ecosystem.",
    }),
    mainContent: "<section class=\"planb-panel\"><h2>Latest proposals</h2></section>",
    footer: createPlanBFooter(defaultPlanBThemeContent.footer),
  }),
);
```

Then render the rest of the page as usual below the header.

For simpler host apps, `mountPlanBHeader` remains available when only the hero is needed.

## Example: adopt in `lugano-lips`

Minimal `src/main.js` shape:

```js
import "lugano-planb-vite-theme/theme.css";
import { mountPlanBHeader } from "lugano-planb-vite-theme";

const app = document.querySelector("#app");

mountPlanBHeader({
  target: app,
  headerContent: {
    eyebrow: "Lugano LIPS",
    title: "Lugano Improvement Proposals",
    lede: "Community-authored proposals with the Plan B visual shell.",
  },
});

const content = document.createElement("main");
content.className = "planb-container planb-main";
content.innerHTML = `
  <section class="planb-panel">
    <h2>Latest proposals</h2>
    <p>Render your repository content here.</p>
  </section>
`;

app.append(content);
```

If the host app needs different spacing or colors, override the CSS custom properties after importing the theme:

```css
:root {
  --planb-color-canvas: #121212;
  --planb-color-panel: #1f1f1f;
}
```

## Showcase elements

The stylesheet also includes reusable showcase classes for civic project pages:

- `planb-logo-grid`, `planb-logo-card`, `planb-logo-mark`: partner, initiative, or working-group cards with a compact identity mark.
- `planb-timeline`, `planb-timeline__item`: ordered historical milestones with dates and descriptions.
- `planb-publication-grid`, `planb-publication-card`, `planb-meta-list`: academic publications, whitepapers, and research briefs.
- `planb-software-grid`, `planb-software-card`, `planb-action-row`: software projects with separate homepage and source-code links.

See `src/main.js` for minimal semantic markup examples.

## Site chrome

Use `createPlanBSiteHeader` for the top brand/navigation bar and `createPlanBFooter` for footer navigation and meta text. `createPlanBPageShell` accepts both as optional `siteHeader` and `footer` elements around the existing hero and main content.

## Repository structure

- `src/theme/domain.js`: theme defaults and normalization rules
- `src/theme/index.js`: public DOM API for host apps
- `src/theme/theme.css`: reusable style layer
- `src/main.js`: demo page entry
- `test/theme.test.mjs`: lightweight API tests
