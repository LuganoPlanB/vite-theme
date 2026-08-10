import "./theme/theme.css";

import {
  createPlanBFooter,
  createPlanBHeader,
  createPlanBPageShell,
  createPlanBSiteHeader,
  defaultPlanBThemeContent,
  initializePlanBThemeToggle,
} from "./theme/index.js";

const app = document.querySelector("#app");

app.replaceChildren(
  createPlanBPageShell({
    siteHeader: createPlanBSiteHeader(defaultPlanBThemeContent.siteHeader),
    header: createPlanBHeader(defaultPlanBThemeContent.header),
    footer: createPlanBFooter(defaultPlanBThemeContent.footer),
    mainContent: `
      <section class="planb-panel" id="foundation">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Foundation patterns</p>
          <h2>Panels, headings, and responsive grids.</h2>
          <p>
            This specimen page demonstrates the reusable visual language. Its labels are
            intentionally generic so applications remain the owners of their content.
          </p>
        </div>
      </section>

      <section class="planb-panel planb-grid" aria-label="Card examples">
        <article class="planb-card">
          <h3>Standard card</h3>
          <p>A compact surface for one idea, status, service, or short piece of supporting copy.</p>
        </article>
        <article class="planb-card">
          <h3>Second card</h3>
          <p>Cards flow into responsive columns without requiring a framework-specific component.</p>
        </article>
        <article class="planb-card">
          <h3>Third card</h3>
          <p>Host sites can combine theme tokens with their own domain-specific classes and content.</p>
        </article>
        <article class="planb-card">
          <h3>Fourth card</h3>
          <p>Light and dark appearances use the same semantic markup and theme custom properties.</p>
        </article>
      </section>

      <section class="planb-panel" id="cards">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Identity cards</p>
          <h2>Marks for teams, products, or collections.</h2>
          <p>The mark and copy are placeholders that expose spacing, hierarchy, and wrapping.</p>
        </div>
        <div class="planb-logo-grid">
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">AA</div>
            <div>
              <h3>Example alpha</h3>
              <p>A short description demonstrates the default compact card rhythm.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">BB</div>
            <div>
              <h3>Example beta</h3>
              <p>A second item shows how repeated identity cards form a responsive grid.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-mark" aria-hidden="true">CC</div>
            <div>
              <h3>Example gamma</h3>
              <p>Initials are decorative; the visible heading carries the accessible name.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="planb-panel" id="timeline">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Timeline</p>
          <h2>Ordered milestones with supporting detail.</h2>
          <p>Use this pattern for dated history, delivery stages, or an ordered process.</p>
        </div>
        <ol class="planb-timeline" aria-label="Example milestones">
          <li class="planb-timeline__item">
            <time datetime="2024">2024</time>
            <div>
              <h3>First milestone</h3>
              <p>A concise explanation gives the date context without turning the timeline into a table.</p>
            </div>
          </li>
          <li class="planb-timeline__item">
            <time datetime="2025">2025</time>
            <div>
              <h3>Second milestone</h3>
              <p>Longer copy wraps beneath the item title while the date remains easy to scan.</p>
            </div>
          </li>
          <li class="planb-timeline__item">
            <time datetime="2026">2026</time>
            <div>
              <h3>Current milestone</h3>
              <p>The final example confirms the connector and spacing at the end of the list.</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="planb-panel" id="collections">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Publication cards</p>
          <h2>Metadata-rich entries for a library.</h2>
          <p>Publication cards pair descriptive copy, structured metadata, and a restrained text link.</p>
        </div>
        <div class="planb-publication-grid">
          <article class="planb-publication-card">
            <p class="planb-card-kicker">Guide · Edition 01</p>
            <h3>Example publication title</h3>
            <p>A neutral abstract demonstrates a short publication summary.</p>
            <dl class="planb-meta-list">
              <div>
                <dt>Author</dt>
                <dd>Example author</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Web document</dd>
              </div>
            </dl>
            <a class="planb-text-link" href="#collections">Text link example</a>
          </article>
          <article class="planb-publication-card">
            <p class="planb-card-kicker">Reference · Edition 02</p>
            <h3>Another publication title</h3>
            <p>A second entry shows the responsive two-column publication layout.</p>
            <dl class="planb-meta-list">
              <div>
                <dt>Maintainer</dt>
                <dd>Example team</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Demonstration</dd>
              </div>
            </dl>
            <a class="planb-text-link" href="#collections">Secondary text link</a>
          </article>
        </div>
      </section>

      <section class="planb-panel" id="actions">
        <div class="planb-section-heading">
          <p class="planb-eyebrow">Software cards</p>
          <h2>Action-oriented cards for tools and services.</h2>
          <p>These examples show kickers, compact marks, primary buttons, and secondary links.</p>
        </div>
        <div class="planb-software-grid">
          <article class="planb-software-card">
            <div class="planb-software-card__header">
              <div class="planb-logo-mark" aria-hidden="true">UI</div>
              <p class="planb-card-kicker">Interface pattern</p>
            </div>
            <h3>Example product</h3>
            <p>A software-card specimen with two levels of action emphasis.</p>
            <div class="planb-action-row">
              <a class="planb-button-link" href="#actions">Primary action</a>
              <a class="planb-text-link" href="#foundation">Secondary action</a>
            </div>
          </article>
          <article class="planb-software-card">
            <div class="planb-software-card__header">
              <div class="planb-logo-mark" aria-hidden="true">API</div>
              <p class="planb-card-kicker">Service pattern</p>
            </div>
            <h3>Example service</h3>
            <p>A companion specimen confirms alignment with different title and copy lengths.</p>
            <div class="planb-action-row">
              <a class="planb-button-link" href="#actions">Open example</a>
              <a class="planb-text-link" href="#timeline">View details</a>
            </div>
          </article>
        </div>
      </section>
    `,
  }),
);

initializePlanBThemeToggle();
