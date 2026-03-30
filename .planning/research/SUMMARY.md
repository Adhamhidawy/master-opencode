# Project Research Summary

**Project:** Master OpenCode — Interactive Learning Platform
**Domain:** Educational web application (CLI tool learning platform)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

Master OpenCode is an interactive learning platform that teaches users how to use the OpenCode CLI tool through structured lessons, hands-on challenges, and a unique terminal simulator. It's a Next.js 15 App Router application with React Server Components serving static content (lessons, cheat sheet) and Client Components handling interactivity (quiz, challenges, terminal playground). The content is managed as TypeScript data files — no CMS, no database reads for content. All lesson content is compiled at build time and delivered as static HTML via SSG, making it infinitely scalable for content delivery without infrastructure cost.

The recommended approach is a 4-phase build: (1) foundation + static content delivery, (2) interactive learning components, (3) authentication and persistent progress, and (4) polish with search and deployment. The key architectural insight is the strict Server/Client Component boundary — content pages are pure RSC with zero client JavaScript, while interactive features are isolated Client Component "islands." Progress works without authentication via localStorage, with Supabase persistence as an additive layer for logged-in users. This means the entire learning experience ships in Phase 1-2 without needing Clerk or Supabase.

The primary risks are version-compatibility pitfalls: Clerk v7 has breaking API changes from v6, Tailwind v4 uses a completely different configuration model than v3, and Next.js 15 requires TypeScript 5.8.x (not 6.x). Each of these will cause silent failures or broken builds if old patterns are used. The content migration from the HTML prototype to structured TypeScript data is the largest single task and must happen early since every downstream feature depends on it.

## Key Findings

### Recommended Stack

The stack is constrained by project requirements (Next.js 15, Tailwind v4, Clerk, Supabase) with all versions verified against npm registry on 2026-03-30. No alternatives are needed — the constrained choices are all current stable releases.

**Core technologies:**
- **Next.js 15.5.10 + React 19.1.0**: App Router framework with RSC support. Pinned to v15 (v16 exists but project requires 15).
- **Tailwind CSS 4.2.2**: Utility-first CSS with CSS-first config (no `tailwind.config.js`). Uses `@theme {}` and `@plugin` directives in CSS.
- **Clerk v7.0.7**: GitHub OAuth authentication. Key breaking changes: `clerkMiddleware()` replaces `authMiddleware()`, `<Show when="signed-in">` replaces `<SignedIn>`, `auth()` is now async.
- **Supabase (data-only)**: `@supabase/ssr` 0.10.0 + `@supabase/supabase-js` 2.100.1. Data storage only — no Supabase Auth. Uses `PUBLISHABLE_KEY` (not `ANON_KEY`).
- **Shiki 4.0.2**: Server-side syntax highlighting. RSC-compatible, zero runtime cost. Must NOT be imported in Client Components.
- **Framer Motion 12.38.0**: Agent loop animation and transitions. Client Components only.
- **Zod 4.3.6**: Schema validation for quiz answers, challenge submissions, and data file validation.

**Critical version requirements:** TypeScript must be pinned to `5.8.x` (not 6.x). Clerk must use v7 APIs exclusively. Tailwind must use v4 CSS-first patterns exclusively. Middleware file must be `middleware.ts` (not `proxy.ts`, which is Next.js 16 only).

### Expected Features

**Must have (P1 — launch blockers):**
- 8 structured lessons with sectioned content (paragraphs, code blocks, info boxes, tables, step lists)
- Lesson navigation (prev/next + sidebar with active state)
- Code blocks with syntax highlighting (Shiki) and copy button
- 6 scenario-based challenges with feedback explanations
- 10-question quiz with scoring (7/10 pass threshold)
- Cheat sheet with 6 categories (CLI Commands, Slash Commands, Keybinds, Special Syntax, Install Methods, Config Files)
- Dark mode default + light mode toggle
- Terminal simulator with typing animation and 9 predefined command responses
- Animated agent loop visualization (You → LLM → Tools → Codebase → Result)
- Progress bar using localStorage (no auth required)

**Should have (P2 — post-launch):**
- Ctrl+K full-text search across lessons, challenges, and cheat sheet
- 3 workflow guide cards with expandable steps
- Persistent progress via Clerk auth + Supabase database
- Auth-protected `/progress` dashboard

**Explicitly excluded:** Real terminal execution, code editor (Monaco/CodeMirror), user-generated content, CMS, gamification, social features, video, AI chat, mobile native app, payment/monetization, email notifications.

### Architecture Approach

The architecture follows a strict Server/Client Component split aligned with the Next.js App Router "islands" model. Content delivery (lessons, cheat sheet, home page) uses Server Components with zero client JavaScript — Shiki highlights code at build time, `generateStaticParams()` pre-renders all lesson pages, and static HTML streams to the browser. Interactive features (quiz, challenges, terminal simulator, agent loop, search) are self-contained Client Components that receive data via props from their Server Component parents. State management is minimal: React context for theme only, `useState` for ephemeral page state, and `localStorage` for progress — no Zustand/Jotai/Redux needed.

**Major components:**
1. **Content Layer** (`src/data/*.ts`): All content as typed TypeScript data files. Lessons use discriminated union types (`LessonSection`) instead of raw HTML strings. This enables Shiki highlighting, type-safe rendering, search indexing, and accessibility.
2. **Presentation Layer** (`src/app/`, `src/components/`): App Router pages composed from shared components organized by role — `content/` (RSC display), `interactive/` (Client Components), `ui/` (design primitives), `layout/` (structural).
3. **Progress Layer** (dual-source): `localStorage` for anonymous users (immediate, synchronous). Supabase `user_progress` table for authenticated users via Server Actions. Supabase uses Clerk's `userId` as a text foreign key — no Supabase Auth, no webhook syncing.
4. **Auth Layer**: Clerk middleware runs on all routes for session propagation, but `auth.protect()` is applied only to `/progress`. All learning content is publicly accessible without login.

### Critical Pitfalls

1. **Clerk v6 API patterns with v7** — Use `clerkMiddleware()`, `<Show when="signed-in">`, and `await auth()`. Search codebase for deprecated `authMiddleware`, `<SignedIn>`, `<SignedOut>`.
2. **`middleware.ts` vs `proxy.ts`** — Next.js 15 uses `middleware.ts`. Next.js 16 uses `proxy.ts`. Wrong filename = silently broken auth.
3. **Tailwind v3 config patterns with v4** — No `tailwind.config.js`. Use `@import "tailwindcss"`, `@plugin`, and `@theme {}` in CSS. Check for legacy config files.
4. **Supabase `getSession()` for auth verification** — Vulnerable to cookie spoofing. Use `getClaims()` (validates JWT signature) for any security decision.
5. **TypeScript 6.x with Next.js 15** — Pin to `5.8.x`. TypeScript 6.0.x causes build errors and incompatible type definitions.

## Implications for Roadmap

Based on the dependency chain from ARCHITECTURE.md and feature priorities from FEATURES.md, the recommended phase structure is:

### Phase 1: Foundation & Static Content
**Rationale:** Everything depends on the project being initialized with correct versions and the content existing as structured data. This phase delivers the core value proposition — all lessons and the cheat sheet accessible in the browser.
**Delivers:** Working Next.js 15 app with all 8 lessons, cheat sheet, layout shell (navbar, sidebar, footer), code blocks with Shiki syntax highlighting and copy button, lesson navigation, dark/light theme, responsive design.
**Addresses:** P1 features — structured lessons, lesson navigation, code blocks, cheat sheet, dark mode, responsive design, syntax highlighting.
**Avoids:** Pitfalls 1-5 (correct versions from day one), Pitfall 6 (Shiki server-side only), Pitfall 11 (generateStaticParams from start), Pitfall 13 (prose-invert from start).
**Key effort:** Content migration from HTML prototype (`index.html` — 816 lines) to structured TypeScript data files. This is the largest single task.

### Phase 2: Interactive Learning Features
**Rationale:** With content rendering working, add the interactive components that make this a learning platform (not just documentation). Each interactive component is self-contained and can be built in parallel.
**Delivers:** Terminal simulator (playground page), 6 scenario-based challenges page, 10-question quiz page, animated agent loop visualization on home page, 3 workflow guide cards, localStorage-based progress bar.
**Addresses:** P1 features — terminal simulator, challenges, quiz, agent loop visualization, progress bar, workflow guides.
**Uses:** Framer Motion (agent loop animations), Zod (quiz/challenge validation), lucide-react (icons).
**Avoids:** Pitfall 10 (Framer Motion in Client Components only), xterm.js anti-pattern (custom CSS terminal).
**Implements:** Client Component "islands" architecture — quiz, challenges, and terminal are isolated interactive components.

### Phase 3: Authentication & Persistent Progress
**Rationale:** Auth and database are additive — the platform works completely without them for anonymous users. This is the most complex integration (Clerk + Supabase + Server Actions) and benefits from having a stable codebase to integrate into.
**Delivers:** Clerk GitHub OAuth, middleware with route protection, Supabase client setup (server + browser), user_progress table with RLS, progress sync from localStorage to Supabase, auth-protected `/progress` dashboard, sign-in/sign-up UI.
**Addresses:** P2 features — persistent progress, auth-protected progress page.
**Uses:** Clerk v7.0.7, @supabase/ssr 0.10.0, Server Actions pattern.
**Avoids:** Pitfall 1 (Clerk v7 APIs), Pitfall 2 (middleware.ts filename), Pitfall 4 (getClaims not getSession), Pitfall 7 (PUBLISHABLE_KEY), Pitfall 9 (real env vars for production).
**Implements:** Dual-source progress pattern, Clerk-as-identity-provider with Supabase-as-data-store.

### Phase 4: Search & Polish
**Rationale:** Search and polish are final touches that enhance the complete experience. Deferring search is acceptable because sidebar navigation covers discovery initially.
**Delivers:** Ctrl+K full-text search across lessons, challenges, and cheat sheet. Responsive design refinement. Animation polish. Deployment to Vercel. Environment variable setup. Performance audit.
**Addresses:** P2 features — search functionality, deployment.
**Uses:** Client-side search index (build-time bundled data), Vercel deployment.
**Avoids:** Pitfall 14 (Tailwind v4 CSS class ordering), Pitfall 9 (Clerk env vars in Vercel).

### Phase Ordering Rationale

- **Dependency chain:** Foundation must exist before components; components must exist before pages; pages must exist before interactive features can be added to them. Content data must exist before any rendering is possible.
- **Value-first:** Phase 1 delivers the core value (reading lessons). Each subsequent phase adds more value without blocking the previous one.
- **Complexity escalation:** Phase 1-2 use well-documented patterns (RSC, Client Components). Phase 3 introduces the most complex integration (Clerk + Supabase + Server Actions) when the codebase is stable. Phase 4 is low-risk polish.
- **Anti-feature discipline:** The research explicitly identified 11 features to NOT build. Each phase should be checked against the anti-feature list to prevent scope creep.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Content migration strategy — parsing 816 lines of HTML prototype into structured TypeScript data. The HTML uses custom CSS classes and inline styles that need systematic conversion. Also: Shiki highlighter setup and singleton pattern.
- **Phase 2:** Terminal simulator design — 9 predefined command responses need UX design for typing animation, scroll behavior, and command history. Framer Motion agent loop animation has complex multi-step state cycling.
- **Phase 3:** Clerk + Supabase integration without Supabase Auth — the service-role-key approach for Server Actions needs specific implementation research. RLS policy design for Clerk user IDs.

Phases with standard patterns (skip research-phase):
- **Phase 1 (layout, routing):** Next.js App Router patterns are well-documented. Tailwind v4 CSS-first config is documented. `generateStaticParams` is standard.
- **Phase 3 (Clerk setup):** Clerk quickstart is comprehensive. `@supabase/ssr` patterns are officially documented.
- **Phase 4 (search, deployment):** Client-side search with bundled data is a standard pattern. Vercel deployment is well-documented.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry on 2026-03-30. All constrained technologies are current stable releases. Breaking changes documented from official sources. |
| Features | HIGH | Feature list derived directly from HTML prototype analysis (816 lines of source truth). Competitor analysis confirms table stakes. Anti-features explicitly defined in PROJECT.md. |
| Architecture | HIGH | Next.js App Router patterns are well-established. Server/Client Component split is documented in official Next.js docs. Supabase SSR pattern is officially documented. Content-as-data pattern is straightforward. |
| Pitfalls | HIGH | All critical pitfalls verified against official docs (Clerk quickstart, Supabase SSR docs, Tailwind v4 migration guide, Next.js 15 changelog). Phase-specific warnings map to implementation order. |

**Overall confidence:** HIGH

### Gaps to Address

- **Content migration complexity:** The HTML prototype's content structure (inline HTML strings with custom classes) needs to be systematically parsed into the `LessonSection` discriminated union types. The exact effort depends on how regular the HTML structure is. Plan a dedicated content audit task in Phase 1.
- **Framer Motion React 19 compatibility:** framer-motion 12.38.0 doesn't explicitly document React 19 compatibility, though its peer dependency allows it. Test early in Phase 2 to confirm no issues.
- **Supabase service role key security:** The recommended approach uses a service role key in Server Actions to bypass RLS. While application-layer auth enforcement is standard, verify that the service role key is never exposed to the client bundle.
- **Terminal simulator UX details:** The 9 predefined commands and their responses are defined in the prototype, but the typing animation speed, scroll behavior, and visual fidelity need design decisions during implementation.

## Sources

### Primary (HIGH confidence)
- npm registry (`registry.npmjs.org`) — Version verification for all packages: next@15.5.10, react@19.1.0, tailwindcss@4.2.2, @clerk/nextjs@7.0.7, @supabase/ssr@0.10.0, shiki@4.0.2, framer-motion@12.38.0, zod@4.3.6 — **2026-03-30**
- Clerk official docs (`clerk.com/docs/quickstarts/nextjs`) — v7 breaking changes, `clerkMiddleware()`, `<Show>` component, async `auth()`, middleware file naming — **2026-03-30**
- Supabase official docs (`supabase.com/docs/guides/auth/server-side/nextjs`) — SSR client setup, `createServerClient`, `createBrowserClient`, `PUBLISHABLE_KEY`, `getClaims()` vs `getSession()` warning — **2026-03-30**
- Next.js official docs (`nextjs.org/docs`) — App Router, layouts, pages, `generateStaticParams`, `params` as Promise — **2026-03-30**
- Tailwind CSS v4 docs — CSS-first configuration, `@theme`, `@plugin`, `@import "tailwindcss"` — **2026-03-30**
- HTML prototype (`index.html`, 816 lines) — Complete source of truth for content, features, and UX patterns — **2026-03-30**

### Secondary (MEDIUM confidence)
- Competitor analysis: Codecademy, Next.js Learn, learn.svelte.dev, Exercism, javascript.info — Feature expectations and industry standards
- @tailwindcss/typography GitHub README — Tailwind v4 plugin registration via `@plugin` directive — **2026-03-30**

---
*Research completed: 2026-03-30*
*Ready for roadmap: yes*
