import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const demoSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const themeSource = await readFile(
  new URL("../src/theme/theme.css", import.meta.url),
  "utf8",
);
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("demo showcases every documented content pattern", () => {
  for (const className of [
    "planb-grid",
    "planb-card",
    "planb-logo-grid",
    "planb-logo-card",
    "planb-timeline",
    "planb-timeline__item",
    "planb-publication-grid",
    "planb-publication-card",
    "planb-meta-list",
    "planb-software-grid",
    "planb-software-card",
    "planb-action-row",
    "planb-button-link",
    "planb-text-link",
  ]) {
    assert.match(demoSource, new RegExp(`class=\\"[^\\"]*${className}`));
  }
});

test("demo stays content-neutral and contains no placeholder destinations", () => {
  assert.doesNotMatch(demoSource, /civic hacking|smart cit|open city data/i);
  assert.doesNotMatch(demoSource, /example\.com|github\.com\/example/i);
  assert.match(demoSource, /application keeps its routes/i);
});

test("demo teaches adoption and exposes the Plan B asset contract", () => {
  assert.match(demoSource, /id="planb-install-code"/);
  assert.match(demoSource, /data-copy-code="planb-install-code"/);
  assert.match(demoSource, /class="planb-specimen-contract"/);
  assert.match(demoSource, /planb-logo-asset--wide/);
  assert.match(demoSource, /planb-logo-asset--bitcoin/);
  assert.match(demoSource, /planb-logo-asset--square/);
});

test("shared interaction states use contrast-safe semantic colors", () => {
  assert.match(themeSource, /--planb-color-focus: var\(--planb-color-neon-violet\)/);
  assert.match(themeSource, /outline: 2px solid var\(--planb-color-focus\)/);
  assert.match(
    themeSource,
    /background: color-mix\(in srgb, var\(--planb-color-accent-strong\) 86%, var\(--planb-color-accent\)\)/,
  );
  assert.doesNotMatch(themeSource, /outline: 2px solid var\(--planb-color-neon-cyan\)/);
});

test("shared collections and actions remain usable at narrow widths", () => {
  for (const minimum of ["10rem", "15rem", "18rem"]) {
    assert.match(
      themeSource,
      new RegExp(`minmax\\(min\\(${minimum}, 100%\\), 1fr\\)`),
    );
  }

  assert.match(themeSource, /\.planb-brand \{[\s\S]*?min-height: 2\.75rem/);
  assert.match(themeSource, /\.planb-site-nav a \{[\s\S]*?min-height: 2\.75rem/);
  assert.match(themeSource, /\.planb-site-nav a \{[\s\S]*?min-width: 2\.75rem/);
  assert.match(themeSource, /\.planb-button-link \{[\s\S]*?min-height: 2\.75rem/);
  assert.match(themeSource, /\.planb-footer__nav a \{[\s\S]*?min-height: 2\.75rem/);
  assert.match(themeSource, /\.planb-page-shell \{[\s\S]*?overflow-wrap: anywhere/);
  assert.match(themeSource, /\.planb-skip-link:focus-visible/);
  assert.match(themeSource, /\.planb-specimen-index \{[\s\S]*?position: sticky/);
  assert.match(indexSource, /rel="icon"/);
});
