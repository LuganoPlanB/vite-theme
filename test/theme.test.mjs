import test from "node:test";
import assert from "node:assert/strict";

import {
  createPlanBPageShell,
  createPlanBSiteHeader,
  defaultPlanBThemeContent,
  initializePlanBThemeToggle,
  mountPlanBHeader,
} from "../src/theme/index.js";

test("default theme content exposes header copy", () => {
  assert.equal(defaultPlanBThemeContent.siteHeader.brand, "Plan B");
  assert.ok(defaultPlanBThemeContent.siteHeader.navItems.length > 0);
  assert.equal(defaultPlanBThemeContent.header.eyebrow, "Lugano Plan B");
  assert.match(defaultPlanBThemeContent.header.title, /civic/i);
  assert.match(defaultPlanBThemeContent.header.lede, /smart city/i);
});

test("createPlanBSiteHeader renders brand navigation and action", () => {
  globalThis.document = {
    createElement(tagName) {
      return {
        tagName,
        className: "",
        innerHTML: "",
      };
    },
  };

  const siteHeader = createPlanBSiteHeader({
    brand: "Civic Foundation",
    navItems: [{ label: "Projects", href: "#projects" }],
    action: { label: "Contact", href: "mailto:test@example.com" },
  });

  assert.equal(siteHeader.tagName, "header");
  assert.equal(siteHeader.className, "planb-site-header");
  assert.match(siteHeader.innerHTML, /Civic Foundation/);
  assert.match(siteHeader.innerHTML, /aria-label="Primary"/);
  assert.match(siteHeader.innerHTML, /#projects/);
  assert.match(siteHeader.innerHTML, /mailto:test@example.com/);
});

test("mountPlanBHeader prepends the header markup", () => {
  const target = {
    children: [],
    prepend(node) {
      this.children.unshift(node);
    },
  };

  globalThis.document = {
    createElement(tagName) {
      return {
        tagName,
        className: "",
        innerHTML: "",
        children: [],
        append(child) {
          this.children.push(child);
        },
      };
    },
  };

  const header = mountPlanBHeader({
    target,
    headerContent: {
      eyebrow: "Custom",
      title: "Injected",
      lede: "Mounted into a host application.",
    },
  });

  assert.equal(target.children[0], header);
  assert.match(header.innerHTML, /Custom/);
  assert.match(header.innerHTML, /Injected/);
  assert.match(header.innerHTML, /data-planb-theme-toggle/);
  assert.match(header.innerHTML, /aria-pressed="false"/);
});

test("createPlanBPageShell appends header and main content", () => {
  globalThis.document = {
    createElement(tagName) {
      return {
        tagName,
        className: "",
        innerHTML: "",
        children: [],
        append(child) {
          this.children.push(child);
        },
      };
    },
  };

  const siteHeader = { tagName: "site-header" };
  const header = { tagName: "header" };
  const shell = createPlanBPageShell({
    siteHeader,
    header,
    mainContent: "<section>Body</section>",
  });

  assert.equal(shell.className, "planb-page-shell");
  assert.equal(shell.children[0], siteHeader);
  assert.equal(shell.children[1], header);
  assert.equal(shell.children[2].tagName, "main");
  assert.match(shell.children[2].innerHTML, /Body/);
});

test("initializePlanBThemeToggle applies and persists manual theme preference", () => {
  const listeners = new Map();
  const themeToggle = {
    dataset: {},
    textContent: "",
    title: "",
    attributes: {},
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    removeEventListener(type) {
      listeners.delete(type);
    },
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
  };
  const metaColorScheme = { content: "light dark" };
  const root = { dataset: {} };
  const storageValues = new Map();
  const storage = {
    getItem(key) {
      return storageValues.get(key) || null;
    },
    setItem(key, value) {
      storageValues.set(key, value);
    },
  };
  const mediaQueryList = {
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  };
  const documentRef = {
    documentElement: root,
    querySelector(selector) {
      if (selector === "[data-planb-theme-toggle]") {
        return themeToggle;
      }

      if (selector === 'meta[name="color-scheme"]') {
        return metaColorScheme;
      }

      return null;
    },
  };

  const controls = initializePlanBThemeToggle({ documentRef, storage, mediaQueryList });

  assert.equal(themeToggle.textContent, "Use dark");
  assert.equal(themeToggle.dataset.themeTarget, "dark");
  assert.equal(themeToggle.attributes["aria-pressed"], "false");
  assert.equal(metaColorScheme.content, "light dark");

  listeners.get("click")();

  assert.equal(storage.getItem("planb-color-scheme"), "dark");
  assert.equal(root.dataset.theme, "dark");
  assert.equal(metaColorScheme.content, "dark");
  assert.equal(themeToggle.textContent, "Use light");
  assert.equal(themeToggle.attributes["aria-pressed"], "true");
  assert.equal(controls.getPreference(), "dark");
});
