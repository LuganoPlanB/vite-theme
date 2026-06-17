import "./theme/theme.css";

import {
  createPlanBHeader,
  createPlanBPageShell,
  defaultPlanBThemeContent,
  initializePlanBThemeToggle,
} from "./theme/index.js";

const app = document.querySelector("#app");

app.replaceChildren(
  createPlanBPageShell({
    header: createPlanBHeader(defaultPlanBThemeContent.header),
    mainContent: `
      <section class="planb-panel">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Light Blue</p>
          <h2>One theme shell, two color modes, same package shape.</h2>
          <p>
            This branch keeps the existing font stack and public API, but now exposes a light mode
            and a dark mode that follow the browser or operating system setting automatically.
          </p>
        </div>
      </section>

      <section class="planb-panel planb-grid">
        <article class="planb-card">
          <h3>Visual direction</h3>
          <p>Theme tokens, page shell styles, responsive header markup, the shared hero image, and coordinated light or dark palettes.</p>
        </article>
        <article class="planb-card">
          <h3>What stayed fixed</h3>
          <p>The existing font stack, DOM helpers, class namespace, and framework-agnostic package surface.</p>
        </article>
      </section>
    `,
  }),
);

initializePlanBThemeToggle();
