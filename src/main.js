import "./theme/theme.css";
import planBWideLogoUrl from "./theme/assets/logos/lugano_planb_2026_logo_wide_color.svg";

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
      <nav class="planb-specimen-index" aria-label="Theme specimens">
        <a href="#adopt">Start</a>
        <a href="#cards">Cards</a>
        <a href="#timeline">Timeline</a>
        <a href="#collections">Patterns</a>
      </nav>

      <section class="planb-brand-manifesto" id="adopt">
        <div class="planb-brand-manifesto__identity">
          <img src="${planBWideLogoUrl}" alt="Lugano's Plan B" width="236" height="61">
          <p>Shared civic technology, carried consistently across independent Plan B sites.</p>
        </div>
        <div class="planb-brand-manifesto__adoption">
          <h2>Start with the shared shell.</h2>
          <p>
            Import the theme and its plain DOM helpers. Your application keeps its routes,
            content, and business logic.
          </p>
          <div class="planb-code-sample">
            <pre tabindex="0"><code id="planb-install-code">import "lugano-planb-vite-theme/theme.css";
import { createPlanBPageShell } from "lugano-planb-vite-theme";</code></pre>
            <button type="button" data-copy-code="planb-install-code">Copy imports</button>
          </div>
          <p class="planb-copy-status" data-copy-status aria-live="polite"></p>
        </div>
      </section>

      <section class="planb-panel planb-panel--foundation" id="foundation">
        <div class="planb-section-heading">
          <h2>Foundation patterns</h2>
          <p>Use panels, headings, and responsive grids to structure host-owned content.</p>
        </div>
        <div class="planb-specimen-contract">
          <span>Layout contract</span>
          <code>.planb-panel</code>
          <code>.planb-grid</code>
          <code>--planb-color-canvas</code>
        </div>
      </section>

      <section class="planb-panel planb-grid planb-panel--examples" aria-label="Card examples">
        <article class="planb-card">
          <h3>Standard card</h3>
          <p>A compact surface for one idea, status, service, or short piece of supporting copy.</p>
        </article>
        <article class="planb-card">
          <h3>Second card</h3>
          <p>Cards flow into responsive columns without requiring a framework-specific component.</p>
        </article>
      </section>

      <section class="planb-panel" id="cards">
        <div class="planb-section-heading">
          <h2>Plan B identity assets</h2>
          <p>Official lockups and marks keep host sites recognizably connected without sharing content.</p>
        </div>
        <div class="planb-specimen-contract">
          <span>Identity contract</span>
          <code>.planb-logo-card</code>
          <code>.planb-logo-mark</code>
          <code>assets/logos/</code>
        </div>
        <div class="planb-logo-grid">
          <article class="planb-logo-card">
            <div class="planb-logo-asset planb-logo-asset--wide" aria-hidden="true"></div>
            <div>
              <h3>Wide lockup</h3>
              <p>Use where the full Lugano Plan B name has room to breathe.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-asset planb-logo-asset--bitcoin" aria-hidden="true"></div>
            <div>
              <h3>Bitcoin mark</h3>
              <p>Use as a compact signal when the full lockup is already established.</p>
            </div>
          </article>
          <article class="planb-logo-card">
            <div class="planb-logo-asset planb-logo-asset--square" aria-hidden="true"></div>
            <div>
              <h3>Square lockup</h3>
              <p>Use in compact cards and square placements while the heading carries the name.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="planb-panel" id="timeline">
        <div class="planb-section-heading">
          <h2>Timeline</h2>
          <p>Use this pattern for dated history, delivery stages, or an ordered process.</p>
        </div>
        <div class="planb-specimen-contract">
          <span>Sequence contract</span>
          <code>.planb-timeline</code>
          <code>.planb-timeline__item</code>
        </div>
        <ol class="planb-timeline" aria-label="Example milestones">
          <li class="planb-timeline__item">
            <time datetime="2024">2024</time>
            <div>
              <h3>First milestone</h3>
              <p>A concise explanation gives the date context without becoming a table.</p>
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
          <h2>Publication cards</h2>
          <p>Pair descriptive copy, structured metadata, and one restrained text link.</p>
        </div>
        <div class="planb-specimen-contract">
          <span>Collection contract</span>
          <code>.planb-publication-card</code>
          <code>.planb-meta-list</code>
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
          <h2>Software cards</h2>
          <p>Show compact marks, one primary action, and one supporting link.</p>
        </div>
        <div class="planb-specimen-contract">
          <span>Action contract</span>
          <code>.planb-software-card</code>
          <code>.planb-action-row</code>
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

const copyButton = document.querySelector("[data-copy-code]");
const copyStatus = document.querySelector("[data-copy-status]");

copyButton?.addEventListener("click", async () => {
  const code = document.getElementById(copyButton.dataset.copyCode);

  if (!code) {
    return;
  }

  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard API unavailable");
    }

    await navigator.clipboard.writeText(code.textContent);
    copyButton.textContent = "Imports copied";
    copyStatus.textContent = "The import snippet is ready to paste.";
  } catch {
    copyButton.textContent = "Select imports";
    copyStatus.textContent = "Copy is unavailable here. Select the code and copy it manually.";
    code.closest("pre")?.focus();
  }
});
