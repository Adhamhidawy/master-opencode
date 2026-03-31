# Phase 3: Auth & Persistent Progress - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-31
**Phase:** 03-auth-persistent-progress
**Areas discussed:** Sign-in UX, Anonymous fallback, Progress page content, Final polish

---

## Sign-in UX

| Option | Description | Selected |
|--------|-------------|----------|
| Clerk hosted page (Recommended) | Redirect to Clerk's hosted UI. Simplest setup, fully managed by Clerk. | ✓ |
| Custom /sign-in page with Clerk components | Render <SignIn> component on our /sign-in route. Keeps user on our domain, more control over surrounding UI. | |

**User's choice:** Clerk hosted page (Recommended)
**Notes:** Simplest implementation, fully managed by Clerk.

---

## Anonymous fallback

| Option | Description | Selected |
|--------|-------------|----------|
| localStorage progress is discarded (Recommended) | Start fresh with Supabase. Anonymous localStorage is temporary — when they sign in, their new account starts empty. Simple, no merge complexity. | ✓ |
| Prompt to merge local progress | On sign-in, detect localStorage progress and ask user if they want to keep it. Requires more complex merge logic. | |

**User's choice:** localStorage progress is discarded (Recommended)
**Notes:** Start fresh with Supabase on sign-in.

---

## Progress page content

| Option | Description | Selected |
|--------|-------------|----------|
| All lessons (checkmarks + % complete) (Recommended) | Show all 8 lessons as a list/grid. Completed ones get green checkmarks. Progress bar shows X/8 lessons complete. Quiz score shown separately. | ✓ |
| Completed items only | Only show completed lessons and past quiz attempts. Cleaner view but less motivating. | |

**User's choice:** All lessons (checkmarks + % complete) (Recommended)
**Notes:** More motivating — user sees how far they have left.

---

## Final polish

| Option | Description | Selected |
|--------|-------------|----------|
| All polish items (Recommended) | Mobile 375px check, 404 page, OG meta tags, Shiki check, full build verification | ✓ |
| Skip 404 + mobile check | OG meta tags, Shiki check, build verification only. Skip 404 and mobile check. | |

**User's choice:** All polish items (Recommended)
**Notes:** All 5 polish items included.

---

## Deferred Ideas

- Playground page (/playground) with terminal simulator — INTR-01 deferred from Phase 2
- Email/password auth — only GitHub OAuth in v1
- Progress bar in navigation — nice-to-have for v2

---
