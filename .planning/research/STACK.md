# Technology Stack

**Project:** Master OpenCode — Interactive Learning Platform
**Researched:** 2026-03-30
**Mode:** Ecosystem (Stack Dimension)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 15.5.10 | App Router + RSC framework | Project constraint (non-negotiable). Latest stable 15.x. Supports React 19, async server components, streaming. Note: Next.js 16.2.1 exists but project is pinned to 15. | HIGH — npm registry verified |
| React | 19.1.0 | UI library | Required by Next.js 15.5.x. Stable release, not RC. | HIGH — npm registry verified |
| React DOM | 19.1.0 | DOM rendering | Paired with React 19.1.0. | HIGH — npm registry verified |
| TypeScript | 5.8.x | Type safety | Matches Next.js 15.5.10's internal TypeScript (5.8.2). Do NOT use TypeScript 6.x — it's too new and Next.js 15 doesn't officially support it. | HIGH — Next.js 15 devDependencies verified |
| Tailwind CSS | 4.2.2 | Utility-first CSS | Project constraint. Stable v4 with CSS-first config, no tailwind.config.js needed. | HIGH — npm registry verified |

### Authentication

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @clerk/nextjs | 7.0.7 | Auth provider (GitHub OAuth) | Project constraint. Latest v7 supports Next.js 15 + 16. Uses `clerkMiddleware()` (not deprecated `authMiddleware()`). Keyless mode available for development. | HIGH — npm registry + official docs verified |

### Database

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @supabase/supabase-js | 2.100.1 | Supabase client | Project constraint. Latest v2. | HIGH — npm registry verified |
| @supabase/ssr | 0.10.0 | SSR cookie management | Replaces deprecated `@supabase/auth-helpers-*`. Provides `createServerClient` and `createBrowserClient` for Next.js SSR. | HIGH — npm registry + official docs verified |

### Icons & Typography

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| lucide-react | 1.7.0 | Icon library | Project constraint. Tree-shakeable, React 19 compatible. | HIGH — npm registry verified |
| @tailwindcss/typography | 0.5.19 | Prose styling for content | Official Tailwind plugin. Supports TW v4 via `@plugin` directive in CSS. Provides `prose` classes for lesson content rendering. Dark mode support via `prose-invert`. | HIGH — npm registry + official docs verified |

### Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| shiki | 4.0.2 | Syntax highlighting | For code blocks in lessons, CLI commands, config file examples. Supports hundreds of languages, VS Code-quality highlighting. Works server-side (RSC-compatible). | HIGH — npm registry verified |
| clsx | 2.1.1 | Conditional className utility | Throughout all components for clean class composition. Tiny (239B), no dependencies. | HIGH — npm registry verified |
| tailwind-merge | 3.5.0 | Merge Tailwind classes without conflicts | In any component that accepts className overrides. Prevents `p-4 p-2` conflicts. Pair with clsx via a `cn()` utility. | HIGH — npm registry verified |
| framer-motion | 12.38.0 | Animation library | For the agent loop visualization, lesson transitions, challenge feedback animations. React 19 compatible. | MEDIUM — npm verified, React 19 compat not explicitly documented but peer dep allows it |
| zod | 4.3.6 | Schema validation | For validating quiz answers, challenge submissions, and data file structures at build time. | HIGH — npm registry verified |

### Development Tools

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| eslint-config-next | 15.5.10 | ESLint config for Next.js | Must match Next.js version. Provides React, import, JSX a11y, and hooks rules. |
| @types/react | 19.x | React type definitions | Match React 19.1.0. Next.js 15.5.10 uses `@types/react@19.0.8`. |
| @types/react-dom | 19.x | React DOM type definitions | Match React 19.1.0. Next.js 15.5.10 uses `@types/react-dom@19.0.3`. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Syntax highlighting | shiki | Prism.js | Shiki works server-side (RSC-compatible), Prism is client-only. Shiki produces AST-highlighted HTML at build time — zero runtime cost. |
| Syntax highlighting | shiki | highlight.js | Same reason — Shiki is SSR-first, highlight.js needs client JS. Shiki also has better theme support. |
| Animation | framer-motion | CSS-only animations | Agent loop visualization has complex multi-step state transitions that benefit from Framer Motion's orchestration. Simple fades/transitions use CSS. |
| Animation | framer-motion | @formkit/motion | Framer Motion has vastly larger ecosystem, better docs, and battle-tested React integration. |
| Terminal emulator | Custom CSS terminal | @xterm/xterm (v6) | xterm.js is for real terminal emulation (PTY connections). Our terminal is purely visual/simulated — no need for a 600KB+ dependency. Build a lightweight CSS-based terminal display. |
| Component library | Custom components | shadcn/ui | Project has an existing HTML prototype with its own design system. Adding shadcn would conflict with the prototype aesthetic and add unnecessary dependencies. |
| Component library | Custom components | Radix UI | Overkill for this project. The interactive elements (quiz, challenges) are custom enough that headless primitives don't save much. |
| State management | React state + URL | Zustand, Jotai | Only progress tracking needs persistence (Supabase). Quiz/challenge state is ephemeral per-page. No global state management needed. |
| Content management | TypeScript data files | MDX | Project constraint specifies TypeScript data files. Content is curated, not user-generated. No need for MDX compilation overhead. |
| API layer | Direct Supabase client | tRPC, Server Actions | Single `user_progress` table. Direct Supabase queries are simpler than an API layer. Use Server Actions only for mutations if needed. |

## Installation

```bash
# Core framework
npm install next@15.5.10 react@19.1.0 react-dom@19.1.0

# Tailwind CSS v4 (no PostCSS config needed)
npm install tailwindcss@4.2.2 @tailwindcss/typography@0.5.19

# Authentication
npm install @clerk/nextjs@7.0.7

# Database
npm install @supabase/supabase-js@2.100.1 @supabase/ssr@0.10.0

# Icons
npm install lucide-react@1.7.0

# Syntax highlighting (server-side)
npm install shiki@4.0.2

# Utilities
npm install clsx@2.1.1 tailwind-merge@3.5.0 zod@4.3.6

# Animations (client components only)
npm install framer-motion@12.38.0

# Dev dependencies
npm install -D typescript@5.8 eslint-config-next@15 @types/react@19 @types/react-dom@19 @types/node
```

## Critical Version Notes

### Next.js 15 vs 16

Next.js 16.2.1 is the latest stable, but the project is pinned to 15. **Key difference**: Next.js 16 renames `middleware.ts` → `proxy.ts`. For this project (Next.js 15), use `middleware.ts` as the Clerk middleware file. If upgrading to Next.js 16 later, rename to `proxy.ts`.

### Clerk v7 Breaking Changes

Clerk v7 (7.0.7) has significant API changes from earlier versions:

- `clerkMiddleware()` replaces deprecated `authMiddleware()`
- `<Show when="signed-in">` replaces deprecated `<SignedIn>`
- `<Show when="signed-out">` replaces deprecated `<SignedOut>`
- Import `auth()` from `@clerk/nextjs/server` (async, use with `await`)
- File is `middleware.ts` for Next.js 15 (Clerk docs say `proxy.ts` for Next.js 16)

### Tailwind CSS v4 Configuration

No `tailwind.config.js` file. Everything is CSS-first:

```css
/* globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Custom theme tokens go here */
  --color-primary: #your-color;
}
```

### Supabase SSR Key Naming

Supabase is transitioning from `ANON_KEY` to `PUBLISHABLE_KEY`:

```bash
# New convention (recommended)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx

# Legacy convention (still works)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Supabase Auth Methods

- `getClaims()` — **Use for auth verification**. Validates JWT signature against JWKS endpoint.
- `getUser()` — Use when you need fresh user data from the Auth server.
- `getSession()` — **Never use for auth decisions**. Reads from cookies without verification. Vulnerable to spoofing.

### Zod v4

Zod v4 (4.3.6) is a major version bump from v3. Key changes:
- `z.string()` syntax is largely the same
- New `.check()` method for validation
- Tree-shakeable mini import: `import { z } from 'zod/v4/mini'`
- Backward-compatible v3 import: `import { z } from 'zod/v3'`

For this project, use the default import (`import { z } from 'zod'`) which gives v4 API.

## Sources

- Next.js version: npm registry (`registry.npmjs.org/next/latest`, `registry.npmjs.org/next/15.5.10`) — **2026-03-30**
- @clerk/nextjs version: npm registry (`registry.npmjs.org/@clerk/nextjs/latest`) + official quickstart (`clerk.com/docs/quickstarts/nextjs`) — **2026-03-30**
- Tailwind CSS version: npm registry (`registry.npmjs.org/tailwindcss/latest`) — **2026-03-30**
- @tailwindcss/typography: npm registry + GitHub README (`github.com/tailwindlabs/tailwindcss-typography`) — **2026-03-30**
- Supabase SSR: npm registry (`registry.npmjs.org/@supabase/ssr/latest`) + official docs (`supabase.com/docs/guides/auth/server-side/nextjs`) — **2026-03-30**
- @supabase/supabase-js: npm registry (`registry.npmjs.org/@supabase/supabase-js/latest`) — **2026-03-30**
- lucide-react: npm registry (`registry.npmjs.org/lucide-react/latest`) — **2026-03-30**
- shiki: npm registry (`registry.npmjs.org/shiki/latest`) — **2026-03-30**
- framer-motion: npm registry (`registry.npmjs.org/framer-motion/latest`) — **2026-03-30**
- clsx: npm registry (`registry.npmjs.org/clsx/latest`) — **2026-03-30**
- tailwind-merge: npm registry (`registry.npmjs.org/tailwind-merge/latest`) — **2026-03-30**
- zod: npm registry (`registry.npmjs.org/zod/latest`) — **2026-03-30**
- TypeScript: npm registry (`registry.npmjs.org/typescript/latest`) — **2026-03-30**
