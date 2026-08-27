import test from "node:test";
import assert from "node:assert/strict";

import {
  createPlanBFooter,
  createPlanBHeader,
  createPlanBPageShell,
  createPlanBSiteHeader,
  defaultPlanBThemeContent,
  initializePlanBThemeToggle,
  mountPlanBHeader,
} from "../src/theme/index.js";

test("default theme content exposes header copy", () => {
  assert.equal(defaultPlanBThemeContent.siteHeader.brand, "Lugano Plan B Theme");
  assert.ok(defaultPlanBThemeContent.siteHeader.navItems.length > 0);
  assert.equal(defaultPlanBThemeContent.header.eyebrow, "Lugano Plan B shared theme");
  assert.match(defaultPlanBThemeContent.header.title, /visual shell/i);
  assert.match(defaultPlanBThemeContent.header.lede, /host keeps control/i);
  assert.equal(defaultPlanBThemeContent.footer.brand, "Lugano Plan B Theme");
  assert.ok(defaultPlanBThemeContent.footer.groups.length > 0);
});

test("createPlanBHeader renders the hero as a non-banner section", () => {
  globalThis.document = {
    createElement(tagName) {
      return {
        tagName,
        className: "",
        innerHTML: "",
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      };
    },
  };

  const hero = createPlanBHeader({
    eyebrow: "Shared theme",
    title: "One shell",
    lede: "Host-owned content.",
  });

  assert.equal(hero.tagName, "section");
  assert.equal(hero.className, "planb-hero");
  assert.equal(hero.attributes["aria-labelledby"], "planb-hero-title");
  assert.match(hero.innerHTML, /id="planb-hero-title"/);
  assert.doesNotMatch(hero.innerHTML, /data-planb-theme-toggle/);
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
  assert.match(siteHeader.innerHTML, /class="planb-site-header__actions"/);
  assert.match(siteHeader.innerHTML, /data-planb-theme-toggle/);
  assert.match(siteHeader.innerHTML, /role="switch"/);
  assert.match(siteHeader.innerHTML, /aria-checked="false"/);
  assert.match(siteHeader.innerHTML, /planb-theme-toggle__icon--sun/);
  assert.match(siteHeader.innerHTML, /planb-theme-toggle__icon--moon/);
});

test("site header and footer escape host-provided content", () => {
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
    brand: "<Plan B>",
    navItems: [{ label: "Cards", href: "#cards" }],
    action: { label: "Open", href: "#open" },
  });
  const footer = createPlanBFooter({
    brand: "<Plan B>",
    summary: "Shared & safe",
    groups: [{ title: "Explore", links: [{ label: "Cards", href: "#cards" }] }],
    meta: "Demo only",
  });

  assert.match(siteHeader.innerHTML, /&lt;Plan B&gt;/);
  assert.doesNotMatch(siteHeader.innerHTML, /<Plan B>/);
  assert.match(footer.innerHTML, /Shared &amp; safe/);
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
        attributes: {},
        append(child) {
          this.children.push(child);
        },
        setAttribute(name, value) {
          this.attributes[name] = value;
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
  assert.doesNotMatch(header.innerHTML, /data-planb-theme-toggle/);
});

test("createPlanBFooter renders footer summary navigation and meta text", () => {
  globalThis.document = {
    createElement(tagName) {
      return {
        tagName,
        className: "",
        innerHTML: "",
      };
    },
  };

  const footer = createPlanBFooter({
    brand: "Civic Footer",
    summary: "Reusable civic footer summary.",
    groups: [
      {
        title: "Explore",
        links: [{ label: "Library", href: "#library" }],
      },
    ],
    meta: "Built for open cities.",
  });

  assert.equal(footer.tagName, "footer");
  assert.equal(footer.className, "planb-footer");
  assert.match(footer.innerHTML, /Civic Footer/);
  assert.match(footer.innerHTML, /aria-label="Footer"/);
  assert.match(footer.innerHTML, /#library/);
  assert.match(footer.innerHTML, /Built for open cities/);
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
  const footer = { tagName: "footer" };
  const shell = createPlanBPageShell({
    siteHeader,
    header,
    footer,
    mainContent: "<section>Body</section>",
  });

  assert.equal(shell.className, "planb-page-shell");
  assert.equal(shell.children[0].tagName, "a");
  assert.equal(shell.children[0].className, "planb-skip-link");
  assert.equal(shell.children[0].href, "#planb-main-content");
  assert.equal(shell.children[0].textContent, "Skip to main content");
  assert.equal(shell.children[1], siteHeader);
  assert.equal(shell.children[2], header);
  assert.equal(shell.children[3].tagName, "main");
  assert.equal(shell.children[3].id, "planb-main-content");
  assert.equal(shell.children[3].tabIndex, -1);
  assert.match(shell.children[3].innerHTML, /Body/);
  assert.equal(shell.children[4], footer);
});

test("initializePlanBThemeToggle follows the system until a two-state choice is made", () => {
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
    removeItem(key) {
      storageValues.delete(key);
    },
  };
  const mediaListeners = new Map();
  const mediaQueryList = {
    matches: false,
    addEventListener(type, handler) {
      mediaListeners.set(type, handler);
    },
    removeEventListener(type) {
      mediaListeners.delete(type);
    },
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

  assert.equal(themeToggle.textContent, "Switch to dark theme");
  assert.equal(themeToggle.dataset.themePreference, "system");
  assert.equal(themeToggle.dataset.themeTarget, "dark");
  assert.equal(themeToggle.dataset.activeTheme, "light");
  assert.equal(themeToggle.attributes.role, "switch");
  assert.equal(themeToggle.attributes["aria-checked"], "false");
  assert.equal(themeToggle.attributes["aria-label"], "Switch to dark theme");
  assert.equal(metaColorScheme.content, "light dark");

  listeners.get("click")();

  assert.equal(storage.getItem("planb-color-scheme"), "dark");
  assert.equal(root.dataset.theme, "dark");
  assert.equal(metaColorScheme.content, "dark");
  assert.equal(themeToggle.textContent, "Switch to light theme");
  assert.equal(themeToggle.dataset.themeTarget, "light");
  assert.equal(themeToggle.dataset.activeTheme, "dark");
  assert.equal(themeToggle.attributes["aria-checked"], "true");
  assert.equal(controls.getPreference(), "dark");

  listeners.get("click")();

  assert.equal(storage.getItem("planb-color-scheme"), "light");
  assert.equal(root.dataset.theme, "light");
  assert.equal(metaColorScheme.content, "light");
  assert.equal(themeToggle.textContent, "Switch to dark theme");
  assert.equal(themeToggle.dataset.themeTarget, "dark");
  assert.equal(themeToggle.attributes["aria-checked"], "false");
  assert.equal(controls.getPreference(), "light");

  mediaQueryList.matches = true;
  mediaListeners.get("change")();
  assert.equal(root.dataset.theme, "light");

  controls.dispose();
  assert.equal(listeners.has("click"), false);
  assert.equal(mediaListeners.has("change"), false);
});
