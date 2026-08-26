---
name: Lugano Plan B Shared Theme
description: A lightly layered civic technology system for Plan B Foundation websites.
colors:
  civic-sky: "#4f97e9"
  lugano-night: "#082952"
  commons-gold: "#ffb604"
  network-cyan: "#23f5ff"
  assembly-violet: "#7468ff"
  signal-pink: "#ff5db1"
  warm-canvas: "#fffefa"
  cool-canvas: "#f3f9ff"
  panel: "#fcfcfc"
  civic-ink: "#030b20"
typography:
  display:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(3rem, 8vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.08
  headline:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.12
  title:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.12rem, 2vw, 1.45rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  card: "12px"
  panel: "16px"
  mark: "14px"
  pill: "999px"
spacing:
  xs: "10px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  section: "56px"
components:
  button-primary:
    backgroundColor: "{colors.lugano-night}"
    textColor: "{colors.warm-canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.62rem 0.95rem"
    height: "2.5rem"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.lugano-night}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.58rem 0.9rem"
    height: "2.5rem"
  card:
    backgroundColor: "{colors.cool-canvas}"
    textColor: "{colors.civic-ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.civic-ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
---

# Design System: Lugano Plan B Shared Theme

## Overview

**Creative North Star: "The Civic Digital Commons"**

This system should feel like technology that a city and its people can call their own: open, capable, curious, grounded, and collective. It combines the legibility and trust expected of public-interest work with the energy of a living hacker community. The light theme is the primary expression: an open white field, dark civic typography, and precise blue structure with small flashes of electric color.

The system is lightly layered, gently rounded, and quietly tactile. It is not bunker-like, crypto-bro, bureaucratic, or promotional. Neon cyan, violet, and pink appear mainly as shared gradient energy, focus signals, and small marks; they do not compete as independent brand voices. Dark mode is a supported alternative for preference and context, not the default identity.

This document is normative for the reusable theme. The richer implementation currently vendored in `luganoplanb.github.io/src/theme` is the strongest incumbent evidence; the package code must be brought into parity through a separate implementation task.

**Key Characteristics:**

- White-first civic clarity with a fully supported dark alternative.
- Strong navy typography, civic blue structure, and selective commons gold.
- Electric gradient details used as connective tissue, never as visual noise.
- Rounded, layered surfaces with restrained ambient lift.
- Dense enough for serious information, open enough for curious newcomers.

## Colors

The palette uses navy and blue for durable structure, gold for selective emphasis, and a compact electric gradient for communal energy.

### Primary

- **Civic Sky** (`civic-sky`): the main interactive and structural blue for borders, emphasis, and state changes.
- **Lugano Night** (`lugano-night`): the authoritative deep navy for strong text, headings, marks, and primary actions.

### Secondary

- **Commons Gold** (`commons-gold`): a scarce signal for civic opportunity, Bitcoin context, and moments that merit attention.

### Tertiary

- **Network Energy** (`network-cyan`, `assembly-violet`, `signal-pink`): a coordinated gradient vocabulary for focus rings, progress bars, dots, and small identity gestures. Use the trio together more often than as three unrelated accents.

### Neutral

- **Warm Canvas** (`warm-canvas`): the primary page ground.
- **Cool Canvas** (`cool-canvas`): the secondary ground and cool atmospheric layer.
- **Quiet Panel** (`panel`): the light surface for cards and controls.
- **Civic Ink** (`civic-ink`): the primary light-theme text color.

Dark mode switches the canvas to charcoal (`#171717`), panels to warm black (`#211d1d`), primary text to white, Civic Sky to Civic Coral (`#e15364`), and Commons Gold to Bitcoin Orange (`#f7931a`). The electric cyan, violet, and pink remain stable so focus and identity survive the mode change.

**The White Commons Rule.** New surfaces begin in the light theme unless the host product or user preference explicitly selects dark mode.

**The One Signal Rule.** A composition may use navy and blue freely, but gold or the electric gradient carries the single exceptional signal; do not scatter both across every element.

## Typography

**Display Font:** Inter (with Segoe UI, Arial, and sans-serif fallbacks)  
**Body Font:** Inter (with Segoe UI, Arial, and sans-serif fallbacks)  
**Label/Mono Font:** Consolas or SFMono-Regular for code only

**Character:** A single robust sans-serif family keeps civic information direct and technically credible. Scale, weight, and casing create hierarchy; decorative font pairing does not.

### Hierarchy

- **Display** (800, fluid display scale, 1.08): short hero statements, balanced to roughly 14–15 characters per line where the layout permits.
- **Headline** (800, fluid headline scale, 1.12): section propositions and primary content divisions, often carrying the shared heading gradient.
- **Title** (700, fluid title scale, 1.15): card and timeline titles with compact line spacing.
- **Body** (400, base text scale, 1.6): explanatory prose, generally constrained to 40–56rem for readable measure.
- **Label** (800, compact label scale, 0.08em tracking, uppercase): eyebrows, kickers, metadata, and short process markers.

**The Weight Before Ornament Rule.** Establish hierarchy through size, weight, spacing, and measure before adding gradient text or decorative effects.

## Layout

The system uses a centered container capped at 1180px with 20px desktop gutters and 12px mobile gutters. Sections follow a 56px vertical rhythm, panels use 28px internal spacing, and repeating grids use a compact 16px gap. Two-column content collapses to one column below 720px; auto-fit collections retain cards at roughly 15–18rem minimum widths.

The hero is stacked on small screens and becomes an asymmetric two-column composition from 960px: the title owns the left, while the theme control and lede settle on the right. Navigation wraps rather than truncates. Timeline geometry simplifies from a labeled two-column rail to a single-column rail on mobile. Container queries may refine an individual card without coupling it to the page viewport.

**The Open Edge Rule.** Preserve breathing room around serious content; density belongs inside structured grids, not against the viewport edge.

## Elevation & Depth

Depth is lightly layered and ambient. Panels combine a cool tonal shift, a faint border, a soft navy shadow, and a subtle inset highlight. Cards sit one level lower and lift by only 1–2px on hover. Dark mode removes glossy inset treatment and relies on restrained charcoal layering and shadow.

### Shadow Vocabulary

- **Panel ambient** (`0 18px 44px rgba(8, 41, 82, 0.08), 0 1px 0 rgba(255, 255, 255, 0.84) inset`): separates major sections from the page without making them float.
- **Card resting** (`inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 10px 24px rgba(8, 41, 82, 0.06)`): gives small surfaces quiet tactility.
- **Card hover** (`0 14px 28px` with a 10% Civic Sky tint): pairs with a 2px lift to acknowledge interaction.

**The Quiet Lift Rule.** Shadows explain grouping and state; they never create glossy product mockups or dramatic floating slabs.

## Shapes

Cards use gently rounded 12px corners; major panels use 16px; small identity marks use 14px; actions and status controls use full pill geometry. Borders are thin and blue-tinted in light mode, neutral and low-contrast in dark mode. Circular gradient dots and short masked gradient bars are the recurring signature geometry.

**The Rounded, Not Soft Rule.** Corners make technical surfaces approachable, but silhouettes remain precise and compact rather than inflated or playful.

## Components

### Buttons

- **Shape:** compact pill controls with a minimum height of 2.5rem.
- **Primary:** Lugano Night ground with Warm Canvas text and 0.62rem by 0.95rem padding.
- **Secondary:** Quiet Panel ground, blue-tinted border, and Lugano Night text.
- **Hover / Focus:** lift by 1px, strengthen the blue signal, and use a 2px Network Cyan focus outline with 3px offset.

### Cards / Containers

- **Corner Style:** 12px cards inside 16px panels.
- **Background:** cool, nearly white tonal layers in light mode; warm charcoal layers in dark mode.
- **Shadow Strategy:** ambient at rest and slightly stronger only for interactive cards.
- **Border:** a faint Civic Sky tint that strengthens on hover.
- **Internal Padding:** 20px for cards and 28px for panels.

### Navigation

Navigation is a flexible, wrapping row of compact bold links. The brand uses a small electric gradient dot; the principal action is a bordered pill. Links move from softened Civic Ink to Lugano Night on hover, with the common cyan focus treatment.

### Hero

The hero pairs a photographic civic context with restrained atmospheric gradients. A compact eyebrow and electric rule introduce the display statement. On wide screens, the lede becomes the counterweight to the title rather than simply stacking beneath it.

### Theme Toggle

The theme toggle is a labeled pill with a small gradient status dot. It must expose the next action in its label, persist an explicit preference, respect the system preference when unset, and remain fully usable with keyboard and reduced motion.

### Timeline

The timeline uses a thin blue rail and compact gradient nodes. Labels remain typographically strong while explanatory text stays soft. On narrow screens the rail moves to the left edge and the content becomes a single readable flow.

## Do's and Don'ts

### Do:

- **Do** begin with Warm Canvas, Civic Ink, Lugano Night, and Civic Sky before reaching for additional color.
- **Do** use the electric trio as a shared gradient, small focus signal, or connective mark.
- **Do** keep hierarchy decisive with bold headings, measured prose, and compact labels.
- **Do** preserve keyboard focus, reduced-motion behavior, responsive collapse, and explicit light/dark preference.
- **Do** prototype accepted system changes on the foundation website, then upstream reusable decisions into the theme package.

### Don't:

- **Don't** use bunker language: avoid oppressive black slabs, military dashboards, terminal cosplay, or security-theater styling.
- **Don't** imitate crypto-bro aesthetics with speculative glow, coin imagery, luxury gradients, or hype-driven calls to action.
- **Don't** mimic bureaucracy with dense formality, anonymous institutional blue, rigid document chrome, or passive language.
- **Don't** turn the system into marketing with oversized claims, ornamental statistics, or conversion-pattern clutter.
- **Don't** let cyan, violet, pink, gold, coral, and blue all compete independently in one composition.

