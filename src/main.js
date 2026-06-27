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
          <p class="planb-eyebrow">Foundation</p>
          <h2>Open infrastructure for civic experiments.</h2>
          <p>
            Plan B supports teams turning city data, digital services, and community ideas into
            practical tools for residents, builders, and public institutions.
          </p>
        </div>
      </section>

      <section class="planb-panel planb-grid">
        <article class="planb-card">
          <h3>Open city data</h3>
          <p>Reusable datasets, maps, and civic APIs that help teams understand mobility, energy, housing, and public space.</p>
        </article>
        <article class="planb-card">
          <h3>Civic hacking labs</h3>
          <p>Focused programs where residents, engineers, designers, and institutions prototype public-interest services together.</p>
        </article>
        <article class="planb-card">
          <h3>Smart city tools</h3>
          <p>Small, maintainable interfaces for urban dashboards, participatory planning, and transparent local decision-making.</p>
        </article>
        <article class="planb-card">
          <h3>Community stewardship</h3>
          <p>Shared standards, lightweight governance, and documentation that keep civic technology useful beyond a single event.</p>
        </article>
      </section>
    `,
  }),
);

initializePlanBThemeToggle();
