# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Framework-agnostic ESM source for Vite and VitePress projects. The repository also contains a Vite demo used to verify the package in isolation.

## Users

The primary users are maintainers of `luganoplanb.github.io` and other Plan B sub-sites who need to apply the same visual language without importing another site's content or business logic.

## Product Purpose

The theme provides the reusable visual shell for the Plan B Foundation's Vite and VitePress websites. It keeps shared presentation consistent while allowing every host application to own its routes, content, and domain behavior.

## Positioning

It is a deliberately small, package-first theme contract: shared CSS tokens, namespaced components, assets, and plain DOM helpers that remain easy to adopt across independent Vite projects.

## Operating Context

Host projects import the theme CSS and its framework-agnostic DOM helpers, then render their own content beneath the shared shell. The repository's demo exists only to exercise the public API and must remain content-neutral.

## Capabilities and Constraints

- The package is ESM-only and exports source files so Vite can process CSS and assets.
- Public exports are `lugano-planb-vite-theme` and `lugano-planb-vite-theme/theme.css`.
- Reusable CSS classes use the `planb-` prefix, and host-customizable decisions use CSS custom properties where appropriate.
- The public DOM API is framework-agnostic and must not acquire host-app business logic.
- Public exports, helper semantics, and the CSS class contract must remain stable unless a breaking change is explicitly requested.
- Do not add framework bindings or dependencies unless the benefit is explicit and approved.

## Brand Commitments

Preserve the shared Lugano Plan B identity and its connection to civic hacking, Bitcoin culture, public-interest technology, and informed technical curiosity. The theme must work for both technically fluent and tech-curious audiences across Foundation sub-sites.

## Evidence on Hand

- `src/theme/theme.css` is the reusable visual contract.
- `src/theme/index.js` is the public DOM API.
- `src/theme/domain.js` owns defaults and normalization rules.
- `src/theme/assets` contains shared visual assets.
- `src/main.js` is the content-neutral package demo.
- `README.md` and `AGENTS.md` document adoption, ownership boundaries, invariants, and the current public API.

## Product Principles

- Keep the package small, direct, and easy to adopt.
- Share presentation without coupling host applications to one another.
- Favor stable, namespaced contracts and explicit customization points.
- Let host sites own their content, domain language, and workflows.
- Make the shared identity credible to hackers and approachable to curious public audiences.

