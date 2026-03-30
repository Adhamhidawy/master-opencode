# Phase 1: Foundation & Content - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-30
**Phase:** 01-foundation-content
**Areas discussed:** Content data structure, Code highlighting, Navigation & layout, Home page composition

---

## Content Data Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Structured blocks (discriminated unions) | TypeScript typed content blocks (heading, paragraph, codeBlock, infoBox, stepList, table, tabBar). Type-safe, enables search, works with Shiki. | ✓ |
| Raw HTML strings | Keep content as HTML strings like prototype. Fastest migration. | |
| MDX files | Write lessons as .mdx with custom components. Natural authoring but adds build complexity. | |

**User's choice:** "The best professional way" — interpreted as structured blocks
**Notes:** User wants the most professional approach. Structured discriminated unions provide type safety, enable search, and work cleanly with Shiki server-side highlighting.

---

## Code Highlighting

| Option | Description | Selected |
|--------|-------------|----------|
| Shiki server-side (Recommended) | Zero client JS, supports custom themes. Match prototype colors with custom Shiki theme. | ✓ |
| CSS classes matching prototype | Keep prototype's .prompt/.cmd/.flag/.str CSS classes. Simpler but manual span wrapping. | |

**User's choice:** Shiki server-side
**Notes:** RSC-compatible, zero runtime cost. Custom theme needed to match prototype's syntax coloring.

---

## Navigation & Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Match prototype (Recommended) | Fixed top nav + mobile sidebar. Phase 2 links present but routes may show placeholder. | ✓ |
| Simplified nav | Only Phase 1 links visible. Add Phase 2 links later. | |

**User's choice:** Match prototype
**Notes:** All nav links visible from Phase 1. Phase 2 pages (Playground, Challenges, Quiz) can show placeholder or redirect.

---

## Home Page Composition

| Option | Description | Selected |
|--------|-------------|----------|
| Full prototype layout (Recommended) | Hero + stats + lesson grid + agent loop (static) + workflow guides. All in Phase 1. | ✓ |
| Minimal | Hero + lesson grid only. Defer agent loop and workflows. | |

**User's choice:** "Make it like the prototype but with creativity — more unique, minimal, simple, and more professional"
**Notes:** Include all prototype sections but elevate the design beyond a direct copy. More refined, minimal aesthetic.

---

## the agent's Discretion

- Exact spacing, typography, border-radius values
- Shiki theme color mapping details
- Mobile sidebar animation approach
- Loading states and error handling

## Deferred Ideas

None — discussion stayed within phase scope
