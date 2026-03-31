# Master OpenCode

## What This Is

A production-grade interactive learning platform to master OpenCode — the open-source AI coding agent. Features structured lessons, interactive challenges, quizzes, a cheat sheet, and user progress tracking. Free for everyone. The full content already exists in a single-file HTML prototype (`index.html`) and will be migrated into a modern Next.js application.

## Core Value

Users can learn OpenCode from zero to hero through interactive, hands-on lessons with real-time feedback and progress tracking.

## Requirements

### Validated

- [x] Migrate all 8 lessons from index.html into structured TypeScript data files — Validated in Phase 1
- [x] Migrate all 6 challenges — Validated in Phase 2
- [x] Migrate all 10 quiz questions — Validated in Phase 2
- [x] Migrate cheat sheet with 6 categories — Validated in Phase 1
- [x] Create App Router pages: /, /lessons, /lessons/[slug], /challenges, /cheat-sheet, /quiz — Validated in Phase 1 & 2
- [x] Wire up Clerk auth with GitHub OAuth — Validated in Phase 3
- [x] Auth middleware protecting /progress route only — Validated in Phase 3
- [x] Create Supabase client setup (server + browser) using @supabase/ssr — Validated in Phase 3
- [x] Define user_progress table schema as SQL migration file — Validated in Phase 3
- [x] Clerk user ID as foreign key (not Supabase Auth) — Validated in Phase 3
- [x] Generate AGENTS.md — Validated in Phase 1
- [x] Build progress tracking UI — Validated in Phase 3

### Active

(None — all requirements validated)

### Out of Scope

- Mobile native app — web-first, responsive design is sufficient
- User-generated content — content is curated from the HTML prototype
- Payment/monetization — the platform is free for everyone
- CMS or admin panel — content lives in code as TypeScript data files
- Social features — no comments, sharing, or community features

## Context

- An existing single-file HTML prototype (`index.html`) contains all content: 8 lessons, 6 challenges, 10 quizzes, a cheat sheet, and a playground section. This is the source of truth for content.
- Dark mode is the default in the HTML prototype and must be preserved.
- The HTML prototype includes a terminal simulator for the playground, animated agent loop visualization, search functionality, and workflow guides.
- OpenCode is a real product with 133K+ GitHub stars. Content references actual commands, config files, and workflows.

## Constraints

- **Tech Stack**: Next.js 15 (App Router, React Server Components), Tailwind CSS v4 (CSS-first config — NO tailwind.config.js), TypeScript strict mode — non-negotiable
- **Auth**: Clerk for authentication (GitHub OAuth primary provider) — not Supabase Auth
- **Database**: Supabase for data only (progress tracking table) — uses @supabase/ssr package (not deprecated auth-helpers)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Foreign Key**: Clerk user ID (clerk_user_id text field) in Supabase user_progress table
- **Content**: Do NOT build new content — read index.html and migrate everything

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 App Router with RSC | Modern React patterns, SSR for SEO, streaming | — Pending |
| Tailwind v4 CSS-first config | No tailwind.config.js, all config in globals.css via @theme | — Pending |
| Clerk + Supabase (separate concerns) | Clerk handles auth, Supabase handles data only | — Pending |
| Content as TypeScript data files | Static, version-controlled, type-safe content | — Pending |
| Dark mode default | Matches HTML prototype aesthetic | — Pending |
| GitHub OAuth as primary provider | Target audience is developers already on GitHub | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-31 after Phase 3 completion (all phases done — v1.0.0)*
