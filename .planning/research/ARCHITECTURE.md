# Architecture Research

**Domain:** Interactive Learning Platform (Next.js 15 App Router)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐│
│  │  Home    │ │ Lessons  │ │ Quiz     │ │Challenge │ │Cheat   ││
│  │  Page    │ │ [slug]   │ │ Page     │ │ Page     │ │Sheet   ││
│  │ (RSC)    │ │ (RSC)    │ │ (Client) │ │ (Client) │ │(RSC)   ││
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘│
│       │             │            │             │            │     │
├───────┴─────────────┴────────────┴─────────────┴────────────┴─────┤
│                       Shared Component Layer                       │
│  ┌────────┐ ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌──────────┐ │
│  │Layout  │ │Sidebar  │ │CodeBlock │ │Terminal   │ │AgentLoop │ │
│  │(RSC)   │ │(Client) │ │(RSC+CL)  │ │Sim(Client)│ │(Client)  │ │
│  └────────┘ └─────────┘ └──────────┘ └───────────┘ └──────────┘ │
│  ┌────────┐ ┌─────────┐ ┌──────────┐ ┌───────────┐              │
│  │Navbar  │ │Search   │ │ThemeTog  │ │ProgressB  │              │
│  │(Client)│ │(Client) │ │(Client)  │ │(Client)   │              │
│  └────────┘ └─────────┘ └──────────┘ └───────────┘              │
├──────────────────────────────────────────────────────────────────┤
│                         Data Layer                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ TypeScript Data  │  │ Clerk Auth       │  │ Supabase      │  │
│  │ Files (Static)   │  │ (Server + Client)│  │ (Progress)    │  │
│  │ /src/data/       │  │ @clerk/nextjs    │  │ @supabase/ssr │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│                       Infrastructure Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │middleware.ts │  │ globals.css  │  │ Vercel Deployment      │  │
│  │ (Clerk)      │  │ (TW v4)      │  │ (SSR + Static)         │  │
│  └──────────────┘  └──────────────┘  └───────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| Root Layout | HTML shell, ClerkProvider, theme, fonts | Server Component (`app/layout.tsx`) |
| Navbar | Top navigation, search trigger, theme toggle, auth button | Client Component (interactive: theme toggle, sidebar toggle, search shortcut) |
| Sidebar | Lesson navigation, section links, active state | Client Component (toggle on mobile, active state via `usePathname`) |
| Home Page | Hero, chapter grid, agent loop, workflows | Server Component (static content from data files) |
| Lesson Page | Dynamic lesson rendering with code blocks | Server Component (`app/lessons/[slug]/page.tsx`) — fetches lesson data, renders RSC |
| Quiz Page | Interactive quiz with scoring | Client Component (user interaction: option selection, scoring, feedback) |
| Challenge Page | Scenario-based challenges with feedback | Client Component (user interaction: option selection, feedback reveal) |
| Cheat Sheet | Reference grid organized by category | Server Component (pure display from static data) |
| Playground | Terminal simulator with command history | Client Component (input handling, simulated responses, scroll behavior) |
| Progress Bar | Visual lesson completion percentage | Client Component (reads from localStorage + Supabase) |
| CodeBlock | Syntax-highlighted code with copy button | Server Component for highlight (Shiki), Client wrapper for copy interaction |
| Agent Loop | Animated node diagram cycling active step | Client Component (CSS/Framer Motion animation) |
| Search Modal | Full-text search across lessons (Ctrl+K) | Client Component (overlay, input, results list) |

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout: ClerkProvider, theme, fonts, Navbar
│   ├── page.tsx                  # Home page: hero, chapter grid, agent loop, workflows
│   ├── globals.css               # Tailwind v4 CSS-first config + custom properties
│   ├── lessons/
│   │   ├── page.tsx              # Lesson list / redirect to first lesson
│   │   └── [slug]/
│   │       └── page.tsx          # Individual lesson page (RSC)
│   ├── challenges/
│   │   └── page.tsx              # Challenges page (Client Component)
│   ├── quiz/
│   │   └── page.tsx              # Quiz page (Client Component)
│   ├── cheat-sheet/
│   │   └── page.tsx              # Cheat sheet page (RSC)
│   ├── playground/
│   │   └── page.tsx              # Terminal simulator (Client Component)
│   └── progress/
│       └── page.tsx              # Progress dashboard (auth-protected)
│
├── components/                   # Shared React components
│   ├── layout/
│   │   ├── navbar.tsx            # Top navigation bar
│   │   ├── sidebar.tsx           # Side navigation with lesson links
│   │   └── footer.tsx            # Site footer
│   ├── content/
│   │   ├── code-block.tsx        # Syntax-highlighted code with copy (Shiki + client wrapper)
│   │   ├── info-box.tsx          # Tip/Warning/Success callouts
│   │   ├── step-list.tsx         # Numbered step list
│   │   ├── tab-bar.tsx           # Tab switcher for code examples
│   │   └── table-wrap.tsx        # Responsive table wrapper
│   ├── interactive/
│   │   ├── terminal-sim.tsx      # Terminal simulator component
│   │   ├── agent-loop.tsx        # Animated agent loop diagram
│   │   ├── quiz-card.tsx         # Single quiz question card
│   │   ├── challenge-card.tsx    # Single challenge scenario card
│   │   └── search-modal.tsx      # Ctrl+K search overlay
│   ├── ui/
│   │   ├── button.tsx            # Button variants (primary, secondary, sm)
│   │   ├── badge.tsx             # Difficulty tags (beginner, intermediate, advanced)
│   │   ├── chapter-card.tsx      # Lesson card for home page grid
│   │   ├── cheat-card.tsx        # Cheat sheet category card
│   │   ├── workflow-card.tsx     # Expandable workflow guide
│   │   └── progress-bar.tsx      # Completion progress bar
│   └── providers/
│       └── theme-provider.tsx    # Theme context (dark/light toggle)
│
├── data/                         # Static content as TypeScript data files
│   ├── lessons.ts                # All 8 lessons with structured content
│   ├── challenges.ts             # All 6 challenges with scenarios/options
│   ├── quiz.ts                   # All 10 quiz questions with answers
│   └── cheat-sheet.ts            # All 6 cheat sheet categories
│
├── lib/                          # Utility functions and configurations
│   ├── supabase/
│   │   ├── server.ts             # createServerClient for Server Components
│   │   └── browser.ts            # createBrowserClient for Client Components
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── shiki.ts                  # Shiki highlighter singleton (server-only)
│   └── search.ts                 # Client-side search index builder
│
├── types/                        # TypeScript type definitions
│   ├── lesson.ts                 # Lesson, LessonContent types
│   ├── challenge.ts              # Challenge, ChallengeOption types
│   ├── quiz.ts                   # QuizQuestion, QuizAnswer types
│   └── progress.ts               # UserProgress, ProgressEntry types
│
├── actions/                      # Server Actions (for mutations)
│   └── progress.ts               # Save/load progress via Supabase
│
middleware.ts                      # Clerk middleware (auth protection for /progress)
```

### Structure Rationale

- **`app/`**: Follows Next.js App Router convention exactly. Each route segment maps to a URL. No nesting deeper than one dynamic segment (`[slug]`). Flat route structure reflects the HTML prototype's page structure (home, playground, challenges, cheatsheet, quiz).
- **`components/`**: Organized by role, not by route. `content/` for RSC content rendering, `interactive/` for Client Components with user interaction, `ui/` for reusable design primitives, `layout/` for structural components. This prevents duplication when components are shared across pages.
- **`data/`**: All content lives here as typed TypeScript files. This is the single source of truth for lesson content, quiz data, challenge data, and cheat sheet data. No database reads for content — it's compiled at build time. This matches the project constraint: "Content as TypeScript data files."
- **`lib/`**: Infrastructure code. Supabase client creation follows the official `@supabase/ssr` pattern (separate server/browser clients). `shiki.ts` initializes the highlighter as a singleton (expensive operation, do once). `utils.ts` holds the `cn()` utility.
- **`types/`**: Shared TypeScript interfaces. Data files import from here. Components accept these types as props. This is the contract between data and presentation.
- **`actions/`**: Server Actions for mutations (progress updates). Separate from `lib/` because Next.js Server Actions are a distinct pattern with specific constraints (must be async, must use `"use server"` directive).

## Architectural Patterns

### Pattern 1: Server Components for Content, Client Components for Interaction

**What:** The most critical architectural decision in this project. Lessons, cheat sheet, and the home page are Server Components — they render static content at build/request time with zero client JavaScript. Quiz, challenges, playground, search, and theme toggle are Client Components — they need browser APIs for user interaction.

**When to use:** Apply this split everywhere. If a component only displays data from data files and has no user interaction (click handlers, state, effects), make it a Server Component. If it has `onClick`, `useState`, `useEffect`, or browser event listeners, it must be a Client Component.

**Trade-offs:** Server Components can't have interactivity. Client Components lose RSC benefits (no streaming, adds to JS bundle). The boundary must be at the right level — too granular and you get prop-drilling; too coarse and you ship unnecessary JS.

**Example:**
```typescript
// app/lessons/[slug]/page.tsx — SERVER COMPONENT (default)
import { lessons } from "@/data/lessons";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();

  return (
    <article>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      {lesson.sections.map((section) => (
        <LessonSection key={section.id} section={section} />
      ))}
    </article>
  );
}
```

```typescript
// components/interactive/quiz-card.tsx — CLIENT COMPONENT
"use client";
import { useState } from "react";

export function QuizCard({ question, options, correctAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  // ... interactive logic (selection, scoring, feedback)
}
```

### Pattern 2: Content-as-Structured-Data (Not HTML Strings)

**What:** The HTML prototype stores lesson content as raw HTML strings in JavaScript. The Next.js version must restructure this content into typed data objects. Each lesson is an array of typed sections (paragraphs, code blocks, info boxes, tables, step lists) rather than a single HTML blob.

**When to use:** For all content types (lessons, challenges, quizzes, cheat sheet). This enables Shiki syntax highlighting at build time, type-safe rendering, and future content transformations (search indexing, accessibility, print layout).

**Trade-offs:** More upfront work to migrate content from HTML to structured data. But the payoff is significant: no `dangerouslySetInnerHTML`, type-safe content, proper code highlighting, and searchability. The HTML prototype's content is the migration source, not the pattern to replicate.

**Example:**
```typescript
// types/lesson.ts
export interface Lesson {
  slug: string;
  title: string;
  description: string;
  chapter: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  sections: LessonSection[];
}

export type LessonSection =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; label: string; code: string }
  | { type: "info-box"; variant: "tip" | "warning" | "success"; label: string; content: string }
  | { type: "steps"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "tab-code"; tabs: { label: string; language: string; code: string }[] };
```

### Pattern 3: Dual-Source Progress (localStorage + Supabase)

**What:** Progress tracking works without authentication using localStorage. When a user signs in (Clerk), their localStorage progress syncs to Supabase. Subsequent visits on authenticated devices read from Supabase. The `/progress` page specifically requires auth; everything else works anonymously.

**When to use:** This pattern means the entire learning experience works without login. Auth is additive, not blocking. This is a deliberate product decision — users should learn first, sign up later.

**Trade-offs:** Two sources of truth for progress data. The sync logic must handle conflicts (Supabase wins on merge). But the UX benefit is enormous — zero-friction onboarding.

**Example:**
```typescript
// Simplified progress sync logic
"use client";
import { useEffect, useState } from "react";

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Read from localStorage immediately (fast, no network)
    const stored = localStorage.getItem("oc_progress");
    if (stored) setCompletedLessons(new Set(JSON.parse(stored)));
    // If authenticated, merge from Supabase (authoritative, deferred)
  }, []);

  const markComplete = (slug: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(slug);
      localStorage.setItem("oc_progress", JSON.stringify([...next]));
      // Server Action: sync to Supabase if authenticated
      return next;
    });
  };

  return { completedLessons, markComplete };
}
```

### Pattern 4: Colocated Supabase Clients (Server vs Browser)

**What:** Two separate Supabase client creation functions following the official `@supabase/ssr` pattern. `lib/supabase/server.ts` creates a request-scoped server client. `lib/supabase/browser.ts` creates a singleton browser client. Never import one from the other's context.

**When to use:** Server Components, Server Actions, and Route Handlers use the server client. Client Components that need direct DB access use the browser client. For this project, almost all Supabase access goes through Server Actions (not directly from Client Components).

**Trade-offs:** Two files to maintain. But this is the official Supabase pattern for Next.js SSR, and mixing them causes subtle auth bugs (missing cookies on server, stale tokens on client).

**Example:**
```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies — middleware handles this
          }
        },
      },
    }
  );
}
```

```typescript
// lib/supabase/browser.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

### Pattern 5: Clerk Middleware with Targeted Route Protection

**What:** Clerk middleware runs on all routes (for auth state propagation), but route protection is applied only to `/progress`. All other routes are publicly accessible. The middleware file is `middleware.ts` (NOT `proxy.ts` — that's Next.js 16 only).

**When to use:** The entire learning platform is public. Only the `/progress` dashboard needs authentication. Clerk's `auth()` is available in all Server Components for conditional UI (show/hide sign-in button), but it never blocks access.

**Trade-offs:** Clerk middleware adds a small overhead to every request. But Clerk is optimized for this — the overhead is negligible, and it enables `auth()` in every Server Component without explicit setup.

**Example:**
```typescript
// middleware.ts (project root, NOT in src/)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/progress(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### Pattern 6: cn() Utility for Class Composition

**What:** Single utility combining clsx + tailwind-merge for conditional, conflict-free Tailwind classes.

**When to use:** Every component that accepts a `className` prop or has conditional classes.

**Trade-offs:** Adds two small dependencies (clsx + tailwind-merge). But they're tiny (~300B + ~7KB) and eliminate the single most common Tailwind bug (class conflicts from prop overrides).

**Example:**
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage:
<div className={cn("prose prose-invert", isActive && "border-l-2 border-purple-500")} />
```

## Data Flow

### Content Delivery Flow (Static, No Auth)

```
User navigates to /lessons/installation
    ↓
Next.js matches app/lessons/[slug]/page.tsx
    ↓
Server Component: params resolved → { slug: "installation" }
    ↓
Import from data/lessons.ts → find lesson by slug
    ↓
Render lesson sections:
  - paragraphs → <p> with prose styling
  - code blocks → Shiki highlight (server-side) → <pre><code> with tokens
  - info boxes → <InfoBox> component
  - tables → <table> with responsive wrapper
  - steps → <StepList> component
    ↓
Static HTML streamed to browser (no client JS for content)
    ↓
Client hydrates only interactive islands (copy button, theme toggle)
```

### Progress Tracking Flow (Dual-Source)

```
User completes a lesson (navigates to /lessons/[slug])
    ↓
Client Component: markLessonComplete(slug)
    ↓
Save to localStorage (immediate, synchronous)
    ↓ (if authenticated)
Server Action: syncProgressToSupabase(slug, clerkUserId)
    ↓
Supabase: UPSERT into user_progress table
    ↓
Progress bar updates (reads localStorage → shows immediately)
```

### Auth Flow (Clerk → Supabase)

```
User clicks "Sign in with GitHub"
    ↓
Clerk handles OAuth flow (redirect to GitHub → callback)
    ↓
Clerk sets session cookies (httpOnly, secure)
    ↓
middleware.ts: clerkMiddleware() runs on every request
    ↓                                    ↓
Public routes: no protection        /progress: auth.protect() enforces sign-in
    ↓
Server Component: const { userId } = await auth()
    ↓
Use userId as clerk_user_id in Supabase queries
    ↓
Supabase: SELECT * FROM user_progress WHERE clerk_user_id = userId
```

### Search Flow (Client-Side)

```
User presses Ctrl+K
    ↓
Search Modal (Client Component) opens
    ↓
User types query
    ↓
Client-side search against pre-loaded lesson data (bundled at build time)
    ↓
Results displayed with highlighted matches
    ↓
User clicks result → navigate to /lessons/[slug]
```

### State Management

```
┌─────────────────────────────────────────────────────┐
│                   Client State                       │
│                                                      │
│  Theme State (theme-provider.tsx)                    │
│    ↓ localStorage("oc_theme")                        │
│    ↓ context provides theme + toggle                 │
│                                                      │
│  Progress State (localStorage)                       │
│    ↓ localStorage("oc_progress")                     │
│    ↓ read by: progress-bar, chapter-cards            │
│    ↓ written by: lesson navigation                   │
│                                                      │
│  Quiz State (per-page, ephemeral)                    │
│    ↓ useState within quiz page                       │
│    ↓ answers: Record<number, number>                 │
│    ↓ reset on page unmount                           │
│                                                      │
│  Challenge State (per-page, ephemeral)               │
│    ↓ useState within challenge page                  │
│    ↓ answers: Record<number, number>                 │
│    ↓ reset on page unmount                           │
│                                                      │
│  Terminal State (per-page, ephemeral)                │
│    ↓ useState within playground page                 │
│    ↓ history: string[], scroll position              │
│    ↓ reset on page unmount                           │
│                                                      │
│  Search State (per-modal, ephemeral)                 │
│    ↓ useState within search modal                    │
│    ↓ query string, results array, focused index      │
│    ↓ reset on modal close                            │
│                                                      │
│  No global state management library needed.          │
│  No Zustand, no Jotai, no Redux.                     │
│  React context for theme only.                       │
│  Everything else is local useState + localStorage.   │
└─────────────────────────────────────────────────────┘
```

### Key Data Flows

1. **Content rendering:** TypeScript data files → Server Component → Static HTML (zero client JS). This is the highest-traffic flow and the most optimized — it's pure SSR/SSG with no database, no auth, no client state.

2. **Progress persistence:** localStorage (primary, always available) → Server Action → Supabase (secondary, auth-gated). The sync is one-directional on write (localStorage → Supabase). On read, Supabase is authoritative for authenticated users but localStorage renders first (optimistic UI).

3. **Auth identity propagation:** Clerk session → `auth()` in Server Components → `clerk_user_id` in Supabase queries. Clerk is the identity provider; Supabase stores data against Clerk user IDs. There is no Supabase Auth — only data storage.

4. **Client-side search:** Data files are imported into the search module (bundled at build time). Search runs entirely in the browser — no API calls, no server round-trips. Zero latency, works offline.

## Component Boundary Decisions

### Server vs Client Component Split

| Component | Rendering | Why |
|-----------|-----------|-----|
| Root Layout | Server | No interactivity, wraps ClerkProvider |
| Navbar | Client | Theme toggle, search shortcut, sidebar toggle all need event handlers |
| Sidebar | Client | Toggle on mobile, active state from `usePathname()` |
| Home Page | Server | Static content from data files |
| Chapter Cards | Client | onClick navigation, completion checkmark state |
| Lesson Page | Server | Static content, SEO-critical, no user interaction |
| Code Block (display) | Server | Shiki highlighting runs server-side |
| Code Block (copy button) | Client | `navigator.clipboard` is a browser API |
| Info Box | Server | Pure display, no interaction |
| Step List | Server | Pure display, no interaction |
| Tab Bar | Client | Tab switching needs onClick + useState |
| Quiz Page | Client | Option selection, scoring, feedback — all interactive |
| Challenge Page | Client | Option selection, feedback reveal — all interactive |
| Cheat Sheet | Server | Pure display grid, no interaction |
| Playground/Terminal | Client | Input handling, command history, scroll — all interactive |
| Agent Loop | Client | Animated cycling of active node — needs animation loop |
| Search Modal | Client | Overlay, input, keyboard navigation — all interactive |
| Progress Bar | Client | Reads localStorage, updates on navigation |
| Theme Provider | Client | React context + localStorage persistence |
| Workflow Cards | Client | Expand/collapse toggle |
| Footer | Server | Pure display, no interaction |

### Component Communication Map

```
Root Layout (Server)
  ├── ClerkProvider (wraps entire app)
  ├── ThemeProvider (provides theme context)
  └── Navbar (Client)
        ├── SearchModal (Client) — triggered by Ctrl+K
        ├── ThemeToggle (Client) — consumed from ThemeProvider
        └── Sidebar (Client) — toggle on mobile

Home Page (Server)
  ├── ChapterCard[] (Client) — each has onClick navigation
  ├── AgentLoop (Client) — self-contained animation
  └── WorkflowCard[] (Client) — expand/collapse

Lesson Page (Server) — app/lessons/[slug]/page.tsx
  ├── CodeBlock[] (Server renders highlight, Client copy wrapper)
  ├── InfoBox[] (Server)
  ├── StepList[] (Server)
  ├── TabBar (Client) — for tabbed code examples
  └── LessonNav (Client) — prev/next buttons

Quiz Page (Client)
  └── QuizCard[] (Client) — each manages own answer state

Challenge Page (Client)
  └── ChallengeCard[] (Client) — each manages own answer state

Cheat Sheet (Server)
  └── CheatCard[] (Server) — pure display

Playground (Client)
  └── TerminalSim (Client) — self-contained terminal state
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Clerk Auth | `@clerk/nextjs` v7 + `middleware.ts` | Handles GitHub OAuth, session cookies, user identity. Use `<Show when="signed-in">` NOT deprecated `<SignedIn>`. `auth()` is async in v7 — always `await auth()`. File is `middleware.ts` for Next.js 15 (Clerk docs reference `proxy.ts` which is Next.js 16 only). |
| Supabase | `@supabase/ssr` 0.10.0 + Server Actions | Data-only (no Supabase Auth). Two clients: server (for Server Components/Actions) and browser (for Client Components if needed). Use `PUBLISHABLE_KEY` not `ANON_KEY`. |
| Shiki | Server-side singleton | Initialize once, reuse across requests. Expensive to create (loads grammars/themes). Store in module-level variable. |
| Vercel | `next build` + `vercel deploy` | App Router SSR + SSG. Lessons use `generateStaticParams()` for static generation. Progress page is dynamically rendered (auth-dependent). |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Data files ↔ Pages | Direct ES module import | Synchronous, compile-time. No API layer needed. Data files export typed arrays. |
| Pages ↔ Components | Props (React) | Server Components pass data to child components via props. Client Components receive serializable props only (no functions, no class instances). |
| Client Components ↔ localStorage | Direct browser API | `localStorage.getItem/setItem` for theme and progress. No abstraction layer — usage is simple and localized to a few components. |
| Client Components ↔ Server Actions | Server Action invocation | Progress mutations go through Server Actions. Server Actions have access to `auth()` and Supabase server client. |
| Clerk ↔ Supabase | Clerk user ID as foreign key | `user_progress.clerk_user_id` (text) references Clerk's `userId`. No webhook needed — the FK is set on first progress write via Server Action. No Supabase Auth users table to sync. |

### Database Schema

```sql
-- Supabase migration: user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,           -- Clerk's userId (NOT Supabase Auth)
  lesson_slug TEXT NOT NULL,             -- e.g., "installation", "configuration"
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clerk_user_id, lesson_slug)     -- One completion record per user per lesson
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
```

**RLS with Clerk (important):** Since this project uses Clerk (not Supabase Auth), there is no `auth.uid()` in Supabase. The recommended approach:

1. **Service role key in Server Actions** (recommended): Server Actions use the Supabase service role key to bypass RLS. Auth is enforced at the application layer — the Server Action checks `await auth()` from Clerk and only writes the authenticated user's ID. Simple, secure, standard pattern for single-table Clerk+Supabase apps.

2. ~~Custom RLS with Clerk JWT~~: Overkill. Requires Supabase webhook configuration and JWT verification setup. Not worth the complexity for a single-table app.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1K users | Monolithic Next.js on Vercel free tier. All static content is SSG via `generateStaticParams()`. Supabase free tier handles progress tracking. This is the launch architecture. |
| 1K-100K users | Add ISR for lesson pages (revalidate every 24h). Consider Cloudflare CDN for static assets. Supabase Pro tier for connection pooling. Search might need Pagefind if content grows significantly. |
| 100K+ users | Add Vercel Edge Functions for progress API routes. Consider Redis caching for frequently-read progress data. Content remains SSG — it scales to any traffic level inherently. |

### Scaling Priorities

1. **First bottleneck: Supabase connections.** Each Server Action opens a Supabase connection. At ~1K concurrent users saving progress, connection limits kick in. Fix: Supabase connection pooling (PgBouncer), available on Pro tier.

2. **Second bottleneck: Search performance.** Client-side search works fine with 8 lessons. If content grows to 50+ lessons, the search index becomes large. Fix: Move to Pagefind (builds a static search index) or server-side search with Supabase `pg_trgm`.

3. **Never a bottleneck: Content delivery.** Lessons are static TypeScript → SSG HTML. This scales infinitely on Vercel's CDN. No database reads, no server computation per request.

## Anti-Patterns

### Anti-Pattern 1: dangerouslySetInnerHTML for Lesson Content

**What people do:** Store lesson content as raw HTML strings (like the prototype does) and render with `dangerouslySetInnerHTML`.
**Why it's wrong:** No syntax highlighting (Shiki runs server-side on structured data, not on raw HTML). No type safety. XSS risk. Breaks search indexing (can't parse structured data from HTML strings). No accessibility tree. Can't transform content for different views (print, mobile summary).
**Do this instead:** Parse the HTML prototype content into structured TypeScript data objects. Each content section is a typed discriminated union (`LessonSection`). Render with React components. More upfront work but enables every downstream feature (search, highlighting, accessibility, print).

### Anti-Pattern 2: Fetching Static Content from an API

**What people do:** Create API routes (`/api/lessons/[slug]`) that return lesson data, then fetch from Client Components.
**Why it's wrong:** Adds network latency for data available at build time. Creates a server round-trip for every page load. Defeats the purpose of RSC. Adds unnecessary API route maintenance.
**Do this instead:** Import data files directly in Server Components. They're bundled at build time. Zero network overhead. This is the whole point of React Server Components.

### Anti-Pattern 3: Using Supabase Auth Alongside Clerk

**What people do:** Set up both Clerk Auth and Supabase Auth, trying to sync users between them.
**Why it's wrong:** Two auth systems = two sources of truth for identity. Syncing is fragile and error-prone. Clerk handles authentication (who are you). Supabase handles data storage (what you've done). They don't need to agree on auth — Supabase just stores a `clerk_user_id` text field.
**Do this instead:** Use Clerk exclusively for auth. Supabase stores `clerk_user_id` as a plain text field. No Supabase Auth. No webhook syncing. No JWT exchange. Just a foreign key in the data table.

### Anti-Pattern 4: Making Entire Pages Client Components for Tiny Interactions

**What people do:** Make the entire lesson page a Client Component because "I need the copy button to work."
**Why it's wrong:** Ships the entire lesson content as client JavaScript. No SSR benefits. No streaming. Bad SEO. Slow initial load. The copy button is a tiny interactive island in a sea of static content.
**Do this instead:** Keep the lesson page as a Server Component. Extract only the copy button as a small Client Component (`"use client"` at the component level). The Server Component renders the highlighted code; the Client Component handles the copy interaction. This is the "islands architecture" RSC was designed for.

### Anti-Pattern 5: Over-Abstracting into a Mega Renderer

**What people do:** Create a generic `<ContentRenderer section={section} />` that handles every section type in one giant switch statement.
**Why it's wrong:** Mega-components are hard to maintain, test, and style. Each section type has unique rendering needs (code blocks need Shiki, tables need responsive wrappers, info boxes have color variants).
**Do this instead:** Create focused components for each section type (`CodeBlock`, `InfoBox`, `StepList`, `TableWrap`, `TabBar`). Use a simple render function in the lesson page that maps section types to components. Each component is independently testable and stylable.

### Anti-Pattern 6: Tailwind v3 Configuration Patterns

**What people do:** Create a `tailwind.config.js` file with theme extensions.
**Why it's wrong:** This project uses Tailwind v4 with CSS-first configuration. There is no `tailwind.config.js`. All customization goes in `globals.css` via `@theme { }` blocks. Plugins use `@plugin` directives.
**Do this instead:** Use `globals.css` for all Tailwind configuration. Custom colors, spacing, and typography go in `@theme { }`. The `@tailwindcss/typography` plugin is registered with `@plugin "@tailwindcss/typography"`.

### Anti-Pattern 7: Next.js 16 File Naming on Next.js 15

**What people do:** Name the middleware file `proxy.ts` because Clerk's docs mention it.
**Why it's wrong:** `proxy.ts` is a Next.js 16 convention. This project uses Next.js 15, where the file is `middleware.ts`. Using the wrong filename means Clerk middleware never runs, and auth protection silently fails.
**Do this instead:** Use `middleware.ts` at the project root for Next.js 15. Only rename to `proxy.ts` if upgrading to Next.js 16.

## Build Order Implications

### Dependency Chain (What Must Be Built First)

```
1. Project Foundation
   └── Next.js 15 + TypeScript + Tailwind v4 + ESLint
       └── 2. Data Types & Content Migration
           └── types/ + data/ files (migrate from index.html)
               └── 3. Layout & Navigation Shell
                   └── Root Layout + Navbar + Sidebar + Footer
                       └── 4. Content Components (RSC)
                           └── CodeBlock + InfoBox + StepList + TableWrap
                               └── 5. Page Routes (RSC)
                                   └── Home + Lessons + Cheat Sheet
                                       └── 6. Interactive Components (Client)
                                           └── Quiz + Challenges + Terminal + Agent Loop
                                               └── 7. Theme & Local Progress
                                                   └── ThemeProvider + ProgressBar + localStorage
                                                       └── 8. Auth & Database
                                                           └── Clerk + middleware.ts + Supabase
                                                               └── 9. Protected Routes
                                                                   └── /progress page
                                                                       └── 10. Polish
                                                                           └── Search + Responsive + Animations
```

### Build Order Rationale

| Order | Layer | Why This Order |
|-------|-------|----------------|
| 1 | Foundation | Everything depends on the project being initialized with correct versions |
| 2 | Data Types & Content | Components need types before they can accept props; data files need types for structure. Content migration from `index.html` is the largest single task. |
| 3 | Layout Shell | Pages need a shell (navbar, sidebar, footer) to render within. Without layout, pages have no navigation. |
| 4 | Content Components | Pages compose these components — they must exist before pages can render. CodeBlock (with Shiki) is the most complex. |
| 5 | Page Routes (RSC) | Server-rendered pages are the core value; they work without auth or interaction. This is the first "visible" milestone. |
| 6 | Interactive Components | Client Components add engagement on top of working pages. Each is self-contained and can be built in parallel. |
| 7 | Theme & Local Progress | These enhance existing pages but aren't blocking for basic functionality. localStorage-based progress works without auth. |
| 8 | Auth & Database | Clerk + Supabase are additive — the platform works without them for anonymous users. Most complex integration. |
| 9 | Protected Routes | Depends on auth being wired up. Small scope (single `/progress` page). |
| 10 | Polish | Search, responsive refinement, animations are final touches. Can be deferred without impacting core functionality. |

### Critical Path for MVP

The fastest path to a working product (content accessible in browser):

```
Foundation → Types + Data Migration → Layout → Content Components → Lesson Pages → Done (MVP)
```

Everything after lesson pages (interactive components, auth, progress, search) is enhancement. This means:

- **Phase 1 should deliver**: Foundation + Types + Content Migration + Layout + Content Components + All RSC Pages (Home, Lessons, Cheat Sheet)
- **Phase 2 should deliver**: Interactive Components (Quiz, Challenges, Terminal Simulator, Agent Loop) + Theme + Local Progress
- **Phase 3 should deliver**: Auth (Clerk) + Database (Supabase) + Progress Tracking + Protected Routes
- **Phase 4 should deliver**: Polish (Search, Responsive refinement, Animations, Deployment)

### Parallelization Opportunities

These can be built in parallel within a phase:

| Parallel Group | Components | Why |
|----------------|------------|-----|
| Data files | `lessons.ts`, `challenges.ts`, `quiz.ts`, `cheat-sheet.ts` | No dependencies between them. Different developers can migrate different content simultaneously. |
| Interactive components | Quiz, Challenges, Terminal, Agent Loop | Each is self-contained. They share no state. |
| Auth + Database | Clerk setup, Supabase client, middleware, schema | Tightly coupled but independent of content components. |

## Sources

- **Next.js 15 App Router:** Official docs — `nextjs.org/docs/app/getting-started/layouts-and-pages` — File-system routing, layouts, pages, dynamic segments, `generateStaticParams`, `params` as Promise (async). **HIGH confidence.**
- **Clerk + Next.js:** Official quickstart — `clerk.com/docs/quickstarts/nextjs` — `clerkMiddleware()`, `<Show>` component (replaces deprecated `<SignedIn>`/`<SignedOut>`), `ClerkProvider`, auth-protected routes, `auth()` is async. **HIGH confidence.**
- **Supabase SSR + Next.js:** Official docs — `supabase.com/docs/guides/auth/server-side/nextjs` — Server client, browser client, cookie handling, `@supabase/ssr` patterns, `PUBLISHABLE_KEY` naming. **HIGH confidence.**
- **HTML Prototype Analysis:** `index.html` (816 lines) — Complete content structure: 8 lessons as HTML string blobs with inline CSS classes, 10 quiz questions as `{q, opts, ans}`, 6 challenges as `{title, scenario, opts, ans, feedback}`, 6 cheat sheet categories as static HTML, terminal simulator with 9 predefined command responses, localStorage-based progress (`oc_progress`), CSS-animated agent loop, full-text search implementation. **HIGH confidence.**
- **Tailwind CSS v4:** Official docs — CSS-first config with `@theme { }` blocks, `@plugin` directive, no `tailwind.config.js`. Verified against npm registry v4.2.2. **HIGH confidence.**
- **Shiki:** npm registry v4.0.2 — Server-side syntax highlighting, compatible with RSC (no browser APIs needed). **HIGH confidence.**
- **STACK.md research:** Comprehensive version verification for all dependencies from npm registry (2026-03-30). **HIGH confidence.**
- **FEATURES.md research:** Feature landscape analysis including competitor comparison, feature dependencies, and MVP definition. **HIGH confidence.**

---
*Architecture research for: Interactive Learning Platform (Master OpenCode)*
*Researched: 2026-03-30*
