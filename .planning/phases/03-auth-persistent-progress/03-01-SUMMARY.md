---
phase: 03-auth-persistent-progress
plan: 01
subsystem: auth
tags: [clerk, supabase, middleware, clerk-provider, server-client, browser-client, sql-migration]

# Dependency graph
requires: []
provides:
  - "Clerk middleware protecting /progress route"
  - "ClerkProvider wrapping app for auth state"
  - "Supabase server client using service role key"
  - "Supabase browser client using anon key"
  - "SQL migration file for user_progress table"
affects: [03-02, 03-03]

# Tech tracking
tech-stack:
  added: ["@clerk/nextjs", "@supabase/ssr", "@supabase/supabase-js"]
  patterns: ["clerkMiddleware with createRouteMatcher for selective route protection", "Supabase SSR server/client split with @supabase/ssr"]

key-files:
  created:
    - middleware.ts
    - src/lib/supabase/server.ts
    - src/lib/supabase/client.ts
    - supabase/migrations/001_user_progress.sql
    - .env.local.example
  modified:
    - src/app/layout.tsx
    - package.json

key-decisions:
  - "Used --legacy-peer-deps for @clerk/nextjs due to React 19.1.0 vs ~19.1.4 peer dep mismatch"
  - "Supabase server client uses service role key for Server Actions; all writes validated via Clerk auth()"
  - "RLS policies as defense-in-depth layer; service role key bypasses RLS"

patterns-established:
  - "clerkMiddleware + createRouteMatcher for route protection in middleware.ts"
  - "ClerkProvider as outermost wrapper around <html> in layout.tsx"
  - "Supabase server client: createServerClient from @supabase/ssr with cookies() from next/headers"
  - "Supabase browser client: createBrowserClient from @supabase/ssr with public env vars"
  - "clerk_user_id TEXT as foreign key (not Supabase Auth UID)"

requirements-completed: [AUTH-01, AUTH-03, DATA-01, DATA-02, DATA-03]

# Metrics
duration: 6min
completed: 2026-03-31
---

# Phase 03 Plan 01: Auth & DB Foundation Summary

**Clerk auth middleware with /progress route protection, ClerkProvider wrapping, Supabase SSR server/browser clients, and user_progress SQL migration with RLS**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-31T13:04:59Z
- **Completed:** 2026-03-31T13:11:00Z
- **Tasks:** 2
- **Files modified:** 7 (5 created, 2 modified)

## Accomplishments
- Clerk authentication installed and configured with clerkMiddleware protecting only /progress route
- ClerkProvider wraps the entire app enabling auth state in all components
- Supabase SSR server client (service role key) and browser client (anon key) ready for use
- SQL migration file defines user_progress table with clerk_user_id text FK, RLS policies, and unique constraint

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Clerk, create middleware, wrap layout with ClerkProvider** - `6949e44` (feat)
2. **Task 2: Install Supabase SSR, create server and browser clients, create SQL migration** - `c8a8b9f` (feat)

## Files Created/Modified
- `middleware.ts` - Clerk auth middleware with createRouteMatcher protecting /progress route
- `src/app/layout.tsx` - Root layout wrapped with ClerkProvider
- `src/lib/supabase/server.ts` - Server-side Supabase client using service role key
- `src/lib/supabase/client.ts` - Browser-side Supabase client using anon key
- `supabase/migrations/001_user_progress.sql` - user_progress table with clerk_user_id FK, unique constraint, RLS
- `.env.local.example` - Template with all 6 required env vars
- `package.json` - Added @clerk/nextjs, @supabase/ssr, @supabase/supabase-js

## Decisions Made
- Used `--legacy-peer-deps` to resolve React 19.1.0 peer dependency conflict with @clerk/nextjs@7.0.7 (expects ~19.1.4)
- Server-side Supabase operations use service role key (bypasses RLS); auth validation happens via Clerk's `auth()` in Server Actions
- RLS policies included as defense-in-depth layer, even though service role key bypasses them

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Used --legacy-peer-deps for npm install**
- **Found during:** Task 1 (Install @clerk/nextjs)
- **Issue:** @clerk/nextjs@7.0.7 has peer dependency on React ~19.1.4 but project uses React 19.1.0
- **Fix:** Used `--legacy-peer-deps` flag on both npm install commands (Clerk and Supabase)
- **Files modified:** package.json, package-lock.json
- **Verification:** npm install succeeds, npm run build passes with 17 static pages
- **Committed in:** 6949e44 (part of Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minimal — React 19.1.0 is compatible with Clerk 7.0.7 in practice, the peer dep range is overly strict.

## Issues Encountered
None

## User Setup Required

**External services require manual configuration.** The user has already added credentials to `.env.local`. Remaining setup:
- **Clerk Dashboard:** Enable GitHub OAuth provider, set sign-in URL to /sign-in
- **Supabase Dashboard:** Run SQL migration from `supabase/migrations/001_user_progress.sql` in SQL Editor

## Next Phase Readiness
- Auth and database foundation complete — all subsequent plans (03-02, 03-03) can proceed
- Clerk middleware active, ClerkProvider available app-wide
- Supabase clients ready for import in Server Components/Actions and Client Components
- SQL migration file ready for execution in Supabase Dashboard

## Self-Check: PASSED

- All 7 key files verified on disk
- Both task commits (6949e44, c8a8b9f) verified in git log
- npm run build passes with 17 static pages, zero errors

---
*Phase: 03-auth-persistent-progress*
*Completed: 2026-03-31*
