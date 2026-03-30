# Master OpenCode — Interactive Learning Platform

**Core value:** Users learn OpenCode from zero to hero through interactive, hands-on lessons with real-time feedback and progress tracking.

## Tech Stack

- **Next.js 15.5.10** — App Router + React Server Components
- **React 19.1.0** — UI library
- **TypeScript 5.8.x (strict)** — MUST be 5.8.x, NOT 6.x (incompatible with Next.js 15)
- **Tailwind CSS 4.2.2** — CSS-first config via `@theme` in `globals.css`. **NO `tailwind.config.js`**
- **Shiki 4.0.2** — Server-side syntax highlighting (RSC-compatible)
- **lucide-react** — Icons
- **Clerk v7** — Auth (Phase 3)
- **Supabase** — Data/progress (Phase 3)

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Tailwind v4 theme tokens
│   ├── lessons/
│   │   ├── page.tsx        # Lessons listing
│   │   └── [slug]/page.tsx # Individual lesson
│   └── cheat-sheet/
│       └── page.tsx        # Cheat sheet page
├── components/
│   ├── content/            # Content rendering (Server Components)
│   ├── interactive/        # Interactive widgets (Client Components)
│   ├── ui/                 # Shared UI components
│   ├── layout/             # Navbar, Sidebar, Footer
│   └── providers/          # ThemeProvider
├── data/
│   ├── lessons.ts          # 8 lessons as structured TypeScript
│   └── cheat-sheet.ts      # 6 cheat sheet categories
├── lib/
│   ├── utils.ts            # cn() utility
│   └── shiki.ts            # Shiki highlighter singleton
└── types/
    ├── lesson.ts           # Lesson + LessonSection types
    └── cheat-sheet.ts      # CheatSheetCategory + CheatSheetData
```

## Data Schema

### Lesson

```typescript
interface Lesson {
  slug: string;
  title: string;
  description: string;
  chapter: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  label: string;
  sections: LessonSection[];
}
```

### LessonSection (discriminated union)

Each section has a `type` field that determines its shape:
- `heading` — Section heading (h3)
- `paragraph` — Text with inline HTML support (strong, code)
- `code` — Syntax-highlighted code block (language + label + code)
- `info-box` — Callout box (tip/warning/success)
- `steps` — Numbered step list
- `table` — Data table (headers + rows)
- `tab-code` — Tabbed code blocks
- `unorderedList` — Bullet list
- `inlineCode` — Inline code snippet

### CheatSheetCategory

```typescript
interface CheatSheetCategory {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  rows: { key: string; description: string }[];
}
```

**Content is stored as TypeScript data files, NOT raw HTML strings. Never use `dangerouslySetInnerHTML` except for Shiki-highlighted code blocks and trusted inline formatting (strong/code tags in paragraphs).**

## Auth Pattern (Phase 3)

- Use `clerkMiddleware()` (NOT deprecated `authMiddleware()`)
- File is `middleware.ts` (NOT `proxy.ts` — that's Next.js 16)
- `auth()` is async — always `await auth()`
- Use `<Show when="signed-in">` (NOT deprecated `<SignedIn>`)
- Clerk user ID (`clerk_user_id` text) is the foreign key in Supabase

## Key Conventions

- **Server Components** for content rendering. **Client Components** (`"use client"`) only for interactive state (tabs, sidebar, theme toggle, copy button)
- **Tailwind v4**: All theme tokens in `globals.css` via `@theme {}`. No `tailwind.config.js`.
- Use `cn()` from `lib/utils` for conditional className composition
- **Shiki runs server-side only.** Never import shiki in Client Components.
- **Dark mode is default.** Theme persisted to `localStorage` key `oc_theme`.
- CSS custom properties map to Tailwind classes: `--color-bg` → `bg-bg`, `--color-accent` → `text-accent`, etc.

## Phase 2 Scope

Terminal simulator, challenges page, quiz page, animated agent loop, search (Ctrl+K), theme toggle, workflow guides. These use Client Components with `useState`. Agent loop visualization is static in Phase 1, animated in Phase 2.
