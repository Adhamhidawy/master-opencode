---
phase: 03-auth-persistent-progress
plan: 02
subsystem: auth
tags: [clerk, server-actions, supabase, progress, navbar, auth-ui]

# Dependency graph
requires:
  - phase: 03-01
    provides: "Clerk middleware, ClerkProvider, Supabase server client, user_progress table"
provides:
  - "Server Actions for progress CRUD with Clerk auth validation"
  - "Auth-aware navbar with SignInButton and UserButton"
affects: [03-03]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Server Actions with auth() validation before Supabase operations", "Special slug pattern (__quiz__, __challenges__) for non-lesson progress tracking", "Client-side auth UI via useUser() hook from @clerk/nextjs"]

key-files:
  created:
    - src/app/actions/progress.ts
  modified:
    - src/components/layout/navbar.tsx

key-decisions:
  - "Special slugs __quiz__ and __challenges__ store non-lesson progress in user_progress table"
  - "getUserProgress returns empty data for unauthenticated users (no throw) to support graceful degradation"
  - "Removed afterSignOutUrl prop from UserButton (not available in installed Clerk v7 version)"

patterns-established:
  - "Server Actions pattern: auth() gate → createClient() → Supabase operation → error throw on failure"
  - "Auth-aware client components: useUser() hook for isSignedIn conditional rendering"
  - "Progress data shape: { completedLessons: string[], quizScore: number | null, challengeResults: string[] }"

requirements-completed: [AUTH-01, AUTH-02, AUTH-04, DATA-04]

# Metrics
duration: 4min
completed: 2026-03-31
---

# Phase 03 Plan 02: Server Actions & Auth Navbar Summary

**Four Clerk-authenticated Server Actions for progress CRUD and navbar with conditional sign-in button/user avatar using Clerk client-side hooks**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-31T13:17:29Z
- **Completed:** 2026-03-31T13:22:06Z
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments
- Server Actions bridge Clerk auth and Supabase: every action validates auth via `auth()` before any database operation
- Navbar conditionally renders purple "Sign in" button (modal) for anonymous users and UserButton avatar for authenticated users
- Progress nav link appears only when signed in, linking to /progress route

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Server Actions for progress CRUD with Clerk auth validation** - `0e1146e` (feat)
2. **Task 2: Update Navbar with Clerk auth-aware sign-in button and user avatar** - `0d40c5f` (feat)

## Files Created/Modified
- `src/app/actions/progress.ts` - Four Server Actions: markLessonComplete, getUserProgress, saveQuizScore, saveChallengeResults with auth guards
- `src/components/layout/navbar.tsx` - Added SignInButton, UserButton, useUser from @clerk/nextjs; conditional Progress link; auth UI between search and theme toggle

## Decisions Made
- Used special slugs `__quiz__` and `__challenges__` in user_progress table to store non-lesson progress (quiz score, challenge IDs) — avoids schema changes
- `getUserProgress()` returns empty defaults for unauthenticated users instead of throwing — enables graceful degradation in Server Components
- Removed `afterSignOutUrl` prop from UserButton because the installed Clerk v7 version doesn't support this prop

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unsupported afterSignOutUrl prop from UserButton**
- **Found during:** Task 2 (Navbar auth UI)
- **Issue:** TypeScript error — `afterSignOutUrl` prop doesn't exist on UserButton in installed @clerk/nextjs v7
- **Fix:** Removed the prop; Clerk handles sign-out redirect via dashboard configuration
- **Files modified:** src/components/layout/navbar.tsx
- **Verification:** npm run build passes with zero errors
- **Committed in:** 0d40c5f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minimal — sign-out redirect can be configured in Clerk dashboard instead.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Server Actions ready for consumption by lesson pages, quiz page, and challenges page in Plan 03-03
- Navbar auth UI functional — sign-in modal and user avatar working
- Progress link visible to authenticated users pointing to /progress (protected by Clerk middleware from Plan 01)

## Self-Check: PASSED

- All 2 key files verified on disk (src/app/actions/progress.ts, src/components/layout/navbar.tsx)
- Both task commits (0e1146e, 0d40c5f) verified in git log
- npm run build passes with 17 static pages, zero errors

---
*Phase: 03-auth-persistent-progress*
*Completed: 2026-03-31*
