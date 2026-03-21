import "./theme/theme.css";

import {
  createPlanBHeader,
  createPlanBPageShell,
  defaultPlanBThemeContent,
} from "./theme/index.js";

const app = document.querySelector("#app");

app.replaceChildren(
  createPlanBPageShell({
    header: createPlanBHeader(defaultPlanBThemeContent.header),
    mainContent: `
      <section class="planb-panel">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Reusable Theme</p>
          <h2>Drop the same shell into other Vite apps.</h2>
          <p>
            This repo exposes the theme CSS and a small DOM API so another Vite app can import the
            style layer, mount the header, and keep its own content untouched.
          </p>
        </div>
      </section>

      <section class="planb-panel planb-grid">
        <article class="planb-card">
          <h3>What is included</h3>
          <p>Theme tokens, page shell styles, responsive header markup, and the Plan B hero image.</p>
        </article>
        <article class="planb-card">
          <h3>What is not included</h3>
          <p>Radar content, data files, or any page-specific business content from the source project.</p>
        </article>
      </section>
    `,
  }),
);
