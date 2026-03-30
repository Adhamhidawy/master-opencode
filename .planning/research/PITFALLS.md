# Domain Pitfalls

**Domain:** Interactive Learning Platform (Next.js 15 + Clerk + Supabase)
**Researched:** 2026-03-30

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Using Clerk v6 API Patterns with v7
**What goes wrong:** Clerk v7 (7.0.7) has renamed/replaced several core APIs. Using old patterns causes runtime errors, not build errors.
**Why it happens:** Most tutorials and Stack Overflow answers reference Clerk v5/v6 APIs. The v7 breaking changes are recent.
**Consequences:** Auth middleware fails silently or crashes. Components render incorrectly. User sessions break.
**Prevention:**
- Use `clerkMiddleware()` from `@clerk/nextjs/server` — NOT `authMiddleware()`
- Use `<Show when="signed-in">` — NOT `<SignedIn>` or `<SignedOut>`
- Use `await auth()` from `@clerk/nextjs/server` — it's now async
- Import from `@clerk/nextjs/server` for server-side auth, `@clerk/nextjs` for client
**Detection:** Search codebase for `authMiddleware`, `<SignedIn>`, `<SignedOut>`, `currentUser` (deprecated).

### Pitfall 2: middleware.ts vs proxy.ts Confusion
**What goes wrong:** Clerk v7 docs reference `proxy.ts` as the middleware file. But Next.js 15 uses `middleware.ts`. Next.js 16 renamed it to `proxy.ts`.
**Why it happens:** Clerk's docs were updated for Next.js 16 conventions but support both versions. The docs don't clearly distinguish which file name to use per Next.js version.
**Consequences:** Auth middleware doesn't run. All routes are unprotected (or all are protected). Session refresh doesn't happen.
**Prevention:**
- For Next.js 15: Use `src/middleware.ts` (or `middleware.ts` at project root)
- For Next.js 16: Use `src/proxy.ts`
- This project uses Next.js 15 → use `middleware.ts`
**Detection:** Check that the middleware file is named correctly and the matcher pattern covers the right routes.

### Pitfall 3: Tailwind v3 Config Patterns with v4
**What goes wrong:** Creating `tailwind.config.js`, using `tailwind.config.ts`, or importing Tailwind via `@tailwind` directives. These don't work in v4.
**Why it happens:** Muscle memory from Tailwind v3 projects. Most tutorials and AI assistants default to v3 patterns.
**Consequences:** Custom theme values are ignored. Typography plugin doesn't load. Utilities don't generate.
**Prevention:**
- NO `tailwind.config.js` or `tailwind.config.ts` file
- Use `@import "tailwindcss"` in `globals.css`
- Use `@plugin "@tailwindcss/typography"` to load plugins
- Use `@theme { }` for custom design tokens
- Use `@utility` for custom utilities
**Detection:** Check for existence of `tailwind.config.*` files. Search for `module.exports` in config.

### Pitfall 4: Using Supabase getSession() for Auth Verification
**What goes wrong:** Using `supabase.auth.getSession()` to check if a user is authenticated on the server. The session is read from cookies without cryptographic verification.
**Why it happens:** getSession() is the most obvious method name. Older tutorials recommend it.
**Consequences:** A malicious client can craft cookies with a spoofed user ID. Auth bypass vulnerability.
**Prevention:**
- Use `supabase.auth.getClaims()` for auth verification (validates JWT signature)
- Use `supabase.auth.getUser()` when you need fresh user data from the server
- Only use `getSession()` for non-security purposes (e.g., displaying user info on the client where spoofing only affects the attacker's own experience)
**Detection:** Search server code for `getSession()`. Replace with `getClaims()`.

### Pitfall 5: TypeScript 6.x with Next.js 15
**What goes wrong:** Installing TypeScript 6.0.x (latest) with Next.js 15. Next.js 15 was built against TypeScript 5.8.x and doesn't officially support 6.x.
**Why it happens:** `npm install typescript` installs the latest (6.0.2 as of research date).
**Consequences:** Type checking errors, broken builds, incompatible type definitions.
**Prevention:**
- Pin TypeScript to `5.8.x`: `npm install -D typescript@5.8`
- Next.js 15.5.10 uses TypeScript 5.8.2 internally
**Detection:** Check `tsconfig.json` and `package.json` for TypeScript version > 5.x.

## Moderate Pitfalls

### Pitfall 6: Shiki in Client Components
**What goes wrong:** Importing Shiki in a Client Component (`"use client"`). Shiki uses Node.js APIs (fs, path) that don't exist in the browser.
**Prevention:** Run Shiki only in Server Components. Pre-highlight code at build/request time. Pass highlighted HTML to client components via `dangerouslySetInnerHTML`.
**Note:** Shiki v4 does have a browser-compatible WASM build, but server-side highlighting is still preferred for performance.

### Pitfall 7: Supabase ANON_KEY vs PUBLISHABLE_KEY
**What goes wrong:** Using `NEXT_PUBLIC_SUPABASE_ANON_KEY` when the project was set up with new-style keys, or vice versa.
**Prevention:** Check Supabase dashboard → Settings → API Keys. Use the key shown in the Connect dialog. Both conventions work, but be consistent. New projects may only have `PUBLISHABLE_KEY`.
**Detection:** Check `.env.local` matches what's in the Supabase dashboard.

### Pitfall 8: Zod v4 Breaking Changes
**What goes wrong:** Zod v4 (4.3.6) has subtle API differences from v3 that most tutorials reference. Core methods like `z.string()`, `z.object()` work the same, but advanced features differ.
**Prevention:**
- Default import (`import { z } from 'zod'`) gives v4 API
- If v3 compat needed: `import { z } from 'zod/v3'`
- For tree-shaking: `import { z } from 'zod/v4/mini'`
- Read Zod v4 migration guide if coming from v3 patterns
**Detection:** Check imports — if code uses `'zod/v3'`, it's using legacy API.

### Pitfall 9: Clerk Keyless Mode in Production
**What goes wrong:** Clerk's keyless mode generates temporary keys that expire. Deploying without real Clerk env vars means auth stops working after the temporary keys expire.
**Prevention:** Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in Vercel environment variables before deploying. Keyless mode is for development only.
**Detection:** Check Vercel environment variables. If Clerk keys are missing, auth will break in production.

### Pitfall 10: Framer Motion in Server Components
**What goes wrong:** Importing framer-motion in a Server Component. It uses React hooks and browser APIs.
**Prevention:** Mark components using framer-motion as `"use client"`. Create thin client wrapper components for animations that wrap server-rendered content.
**Example pattern:**
```tsx
// components/agent-loop.tsx ("use client")
"use client";
import { motion } from 'framer-motion';
// This component handles animation, receives data via props

// app/lessons/[slug]/page.tsx (Server Component)
import { AgentLoop } from '@/components/agent-loop';
// Data fetched server-side, passed to client animation component
```

## Minor Pitfalls

### Pitfall 11: Missing generateStaticParams for Lesson Pages
**What goes wrong:** Dynamic lesson pages (`/lessons/[slug]`) aren't pre-rendered at build time without `generateStaticParams`. Each first visit triggers server-side rendering.
**Prevention:** Export `generateStaticParams` from dynamic route pages to pre-render all lesson pages at build time.

### Pitfall 12: lucide-react Import Size
**What goes wrong:** Importing icons with `import { icons } from 'lucide-react'` ( barrel import) instead of named imports.
**Prevention:** Use named imports: `import { Terminal, ChevronRight } from 'lucide-react'`. Tree-shaking handles the rest, but explicit imports are clearer.

### Pitfall 13: Tailwind Typography Dark Mode
**What goes wrong:** Using `prose` without `dark:prose-invert` on content pages. Text appears dark-on-dark in dark mode.
**Prevention:** Always pair `prose` with `prose-invert` for dark mode: `className="prose prose-invert"`. Since dark mode is the default for this project, `prose-invert` should be on by default.

### Pitfall 14: CSS Class Ordering with Tailwind v4
**What goes wrong:** Tailwind v4 changed modifier stacking order from v3. In v4, the component modifier comes first, then the variant: `prose-a:text-blue-600 hover:prose-a:text-blue-500`. In v3, it was reversed.
**Prevention:** Use the Tailwind v4 order: component modifier before variant modifier.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup | Tailwind v3 config patterns | No tailwind.config.js, use CSS-first |
| Project setup | TypeScript 6.x incompatibility | Pin to 5.8.x |
| Clerk middleware | File named proxy.ts instead of middleware.ts | Use middleware.ts for Next.js 15 |
| Clerk integration | Deprecated v6 APIs (SignedIn, authMiddleware) | Use v7 APIs (Show, clerkMiddleware) |
| Supabase setup | getSession() for auth verification | Use getClaims() |
| Supabase setup | ANON_KEY vs PUBLISHABLE_KEY confusion | Check dashboard, be consistent |
| Content migration | Shiki import in client component | Server-side only, pass HTML |
| Content migration | Missing generateStaticParams | Pre-render all lesson slugs |
| Terminal simulator | Using xterm.js (overkill) | Custom CSS terminal, no real PTY |
| Animations | Framer Motion in Server Components | Wrap in "use client" components |
| Deployment | Clerk keyless mode in production | Set real env vars in Vercel |
| Deployment | Missing Clerk env vars | Verify all env vars before deploy |

## Sources

- Clerk v7 quickstart (clerk.com/docs/quickstarts/nextjs) — breaking changes documented
- Supabase SSR docs (supabase.com/docs/guides/auth/server-side/nextjs) — getSession warning
- Tailwind v4 typography (github.com/tailwindlabs/tailwindcss-typography) — CSS-first config
- npm registry version checks — all package versions verified 2026-03-30
- Next.js 15.5.10 package metadata — TypeScript 5.8.2 internal version
