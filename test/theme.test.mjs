import test from "node:test";
import assert from "node:assert/strict";

import {
  createPlanBPageShell,
  defaultPlanBThemeContent,
  mountPlanBHeader,
} from "../src/theme/index.js";

test("default theme content exposes header copy", () => {
  assert.equal(defaultPlanBThemeContent.header.eyebrow, "Lugano Plan B");
  assert.match(defaultPlanBThemeContent.header.title, /theme/i);
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

  const header = { tagName: "header" };
  const shell = createPlanBPageShell({
    header,
    mainContent: "<section>Body</section>",
  });

  assert.equal(shell.className, "planb-page-shell");
  assert.equal(shell.children[0], header);
  assert.equal(shell.children[1].tagName, "main");
  assert.match(shell.children[1].innerHTML, /Body/);
});
