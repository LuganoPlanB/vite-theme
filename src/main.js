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

      <section class="planb-panel">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Network</p>
          <h2>Civic teams building shared urban capability.</h2>
          <p>
            Use logo cards for initiatives, labs, partners, or working groups that need a compact
            identity mark and a short description.
          </p>
        </div>
        <div class="planb-logo-grid">
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">OD</div>
            <div>
              <h3>Open Data Desk</h3>
              <p>Publishes practical civic datasets and lightweight guides for public-interest builders.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">CL</div>
            <div>
              <h3>Civic Lab</h3>
              <p>Hosts recurring prototyping sessions with residents, researchers, and municipal teams.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">UT</div>
            <div>
              <h3>Urban Tools</h3>
              <p>Maintains small software components for mapping, reporting, and public dashboards.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="planb-panel">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Timeline</p>
          <h2>Milestones from idea to civic infrastructure.</h2>
          <p>
            Timeline items work for history pages, event recaps, grant cycles, or long-running
            public technology programs.
          </p>
        </div>
        <ol class="planb-timeline" aria-label="Foundation milestones">
          <li class="planb-timeline__item">
            <time datetime="2021">2021</time>
            <div>
              <h3>Community challenge launched</h3>
              <p>Residents and civic hackers mapped local service gaps and turned the first ideas into prototypes.</p>
            </div>
          </li>
          <li class="planb-timeline__item">
            <time datetime="2023">2023</time>
            <div>
              <h3>Open data pilot shipped</h3>
              <p>City partners published reusable datasets with documentation, versioning, and feedback loops.</p>
            </div>
          </li>
          <li class="planb-timeline__item">
            <time datetime="2026">2026</time>
            <div>
              <h3>Shared civic toolchain</h3>
              <p>Maintainers standardized design, software, and governance patterns for new public-interest projects.</p>
            </div>
          </li>
        </ol>
      </section>
    `,
  }),
);

initializePlanBThemeToggle();
