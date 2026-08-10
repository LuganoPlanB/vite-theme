import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const demoSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");

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
  assert.match(demoSource, /intentionally generic/i);
});
