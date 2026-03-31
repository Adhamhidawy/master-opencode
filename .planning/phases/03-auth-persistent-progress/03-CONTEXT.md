# Phase 3: Auth & Persistent Progress - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire Clerk authentication (GitHub OAuth) and Supabase database for cross-session progress persistence. Users can sign in and their lesson completions, quiz scores, and challenge results persist across sessions. All learning content pages remain public. The /progress route is the only protected route.

</domain>

<decisions>
## Implementation Decisions

### Sign-in approach
- **D-01:** Clerk hosted sign-in page — redirect to Clerk's hosted UI. User visits /sign-in → Clerk's servers handle auth → returns to app authenticated. Simplest implementation, fully managed by Clerk.

### Anonymous user fallback
- **D-02:** localStorage progress is discarded on sign-in. When an anonymous user signs in with GitHub, their Supabase account starts empty. localStorage is temporary stand-in for unauthenticated browsing only — no merge with Supabase on sign-in.

### Progress page content
- **D-03:** /progress page shows all 8 lessons as a list/grid with green checkmarks on completed ones. A progress bar shows X/8 lessons complete. Quiz scores shown separately if the user has taken the quiz. "Continue" button links to the next uncompleted lesson.

### Clerk + Supabase pattern
- **D-04:** Clerk handles authentication (GitHub OAuth only). Supabase handles data only (no Supabase Auth). Clerk user ID (`clerk_user_id` text) is the foreign key in Supabase — never store Clerk email/name in Supabase.
- **D-05:** Server Actions (`markLessonComplete`, `getUserProgress`) validate auth via `auth()` from `@clerk/nextjs/server` before writing/reading Supabase. The /progress route is the only protected route — all other pages remain public.
- **D-06:** Use `@supabase/ssr` for Supabase client setup (not deprecated auth-helpers). Use `getClaims()` (not `getSession()`) for auth verification in Supabase RLS policies.

### Final polish
- **D-07:** All 5 polish items included: (1) mobile layout verification at 375px for all pages, (2) 404 page (not-found.tsx) with "Go home" button, (3) Open Graph meta tags in layout.tsx (title, description, og:image), (4) Shiki code block rendering check, (5) full `npm run build` with TypeScript and lint error fixes.

</decisions>

<specifics>
## Specific Ideas

- Clerk user ID field in Supabase: `clerk_user_id text NOT NULL`
- user_progress table: id, clerk_user_id, lesson_id, completed_at, quiz_score (unique constraint on clerk_user_id + lesson_id)
- After all features complete: update 01-CONTEXT.md and tag as v1.0.0

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth & Supabase
- `.planning/PROJECT.md` — Tech stack constraints (Clerk v7, @supabase/ssr, Clerk user ID as FK)
- `.planning/REQUIREMENTS.md` — Requirements: AUTH-01/02/03/04, DATA-01/02/03/04
- `.planning/phases/01-foundation-content/01-CONTEXT.md` — Phase 1 decisions on dark mode, Tailwind v4 CSS-first, layout patterns

### Clerk v7 patterns
- Clerk middleware: `clerkMiddleware()` in `middleware.ts` (NOT `proxy.ts`)
- Auth: `await auth()` is async — always `await auth()` in Server Components
- Components: `<Show when="signed-in">` (NOT `<SignedIn>`)
- User ID: `auth().user.id` (not `auth().session.userId`)

### Supabase
- `@supabase/ssr` for server and browser client setup
- RLS: `auth.jwt()` claims from Clerk JWT → `current_setting` for policy enforcement
- `getClaims()` replaces `getSession()` for auth verification

</canonical_refs>

<codebase>
## Existing Code Insights

### Reusable Assets
- `src/app/layout.tsx` — Root layout already has ThemeProvider, LayoutShell, SearchOverlay. Clerk provider needs to wrap here.
- `src/components/layout/navbar.tsx` — Client component. Need to add sign-in button / user avatar based on auth state. "Playground" link exists but /playground route doesn't exist yet (INTR-01 deferred to Phase 3).
- `src/components/ui/chapter-card.tsx` — Lesson card component that can receive a `completed` prop for checkmark display.
- `src/data/lessons.ts` — 8 lessons with slug, title, description, difficulty.
- `src/data/challenges.ts` — 6 challenges with id, title.
- `src/data/quiz.ts` — 10 quiz questions.

### Established Patterns
- Server Components for pages, Client Components for interactive state
- `"use client"` for useState/useEffect/useReducer
- `cn()` utility for conditional className
- Tailwind v4 CSS-first theme tokens in `globals.css` via `@theme`
- Dark mode default with CSS variable theming

### Integration Points
- `src/app/layout.tsx` — Add Clerk's `<ClerkProvider>` wrapper here
- `src/components/layout/navbar.tsx` — Add auth-aware sign-in/user avatar
- `src/app/page.tsx` — ChapterCard needs `completed` prop
- `src/app/lessons/page.tsx` — ChapterCard needs `completed` prop
- New route: `/progress` (protected) — server component fetching progress
- New route: `/sign-in` — Clerk hosted redirect
- New file: `middleware.ts` — Clerk auth middleware protecting /progress

</codebase>

<deferred>
## Deferred Ideas

- Playground page (/playground) with terminal simulator — INTR-01 deferred from Phase 2, not in Phase 3 scope
- Email/password auth — only GitHub OAuth in v1
- Progress bar in navigation — nice-to-have for v2

</deferred>

---

*Phase: 03-auth-persistent-progress*
*Context gathered: 2026-03-31*
