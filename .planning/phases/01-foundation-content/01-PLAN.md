---
phase: 01-foundation-content
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - src/app/globals.css
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/lib/utils.ts
  - src/lib/shiki.ts
  - src/types/lesson.ts
  - src/types/cheat-sheet.ts
  - AGENTS.md
autonomous: true
requirements:
  - FND-01
  - FND-02
  - CONT-06
  - DOC-01

must_haves:
  truths:
    - "Next.js 15 dev server starts without errors using App Router"
    - "Tailwind v4 CSS-first config works — no tailwind.config.js exists"
    - "Dark mode is the default theme with all prototype color tokens available as Tailwind classes"
    - "TypeScript strict mode is enabled and compiles without errors"
    - "Lesson content types use discriminated unions with exhaustive type checking"
    - "Shiki highlighter is importable and works server-side"
  artifacts:
    - path: "package.json"
      provides: "Project dependencies with correct versions"
      contains: "next"
    - path: "src/app/globals.css"
      provides: "Tailwind v4 theme tokens matching prototype"
      contains: "@theme"
    - path: "src/types/lesson.ts"
      provides: "Lesson and LessonSection types"
      exports: ["Lesson", "LessonSection"]
    - path: "src/types/cheat-sheet.ts"
      provides: "CheatSheetCategory type"
      exports: ["CheatSheetCategory", "CheatSheetData"]
    - path: "src/lib/shiki.ts"
      provides: "Shiki highlighter singleton"
      exports: ["getHighlighter"]
    - path: "AGENTS.md"
      provides: "Project documentation"
      contains: "Tech Stack"
  key_links:
    - from: "src/types/lesson.ts"
      to: "src/data/lessons.ts"
      via: "type imports"
      pattern: "import.*Lesson.*from.*types/lesson"
    - from: "src/app/globals.css"
      to: "src/app/layout.tsx"
      via: "CSS import"
      pattern: "import.*globals.css"
---

<objective>
Scaffold the Next.js 15 project with correct dependency versions, establish the Tailwind v4 CSS-first design system from the prototype's color tokens, define all content type contracts, and document the project.

Purpose: Every downstream plan depends on this foundation — the project must build, the types must be correct, and the design tokens must match the prototype.
Output: A working Next.js 15 dev server, complete type definitions, Tailwind v4 theme, Shiki highlighter, and AGENTS.md.
</objective>

<execution_context>
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/workflows/execute-plan.md
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation-content/01-CONTEXT.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@index.html

<interfaces>
<!-- These are the interfaces this plan CREATES for downstream plans to consume. -->

This plan defines the following contracts used by Plans 02 and 03:

From src/types/lesson.ts (this plan creates):
- `Lesson` interface — { slug, title, description, chapter, difficulty, label, sections }
- `LessonSection` discriminated union — "heading" | "paragraph" | "code" | "info-box" | "steps" | "table" | "tab-code" | "unorderedList" | "inlineCode"
- Each variant has its own props (e.g., "code" has language, label, code; "info-box" has variant, label, content)

From src/types/cheat-sheet.ts (this plan creates):
- `CheatSheetCategory` — { id, title, icon, iconBg, iconColor, rows: { key, description }[] }
- `CheatSheetData` — CheatSheetCategory[]

From src/app/globals.css (this plan creates):
- Tailwind v4 @theme tokens mapping prototype CSS variables (--bg → --color-bg, etc.)
- Dark/light mode via CSS variables on :root and [data-theme="light"]

From src/lib/shiki.ts (this plan creates):
- `getHighlighter()` — async function returning a Shiki highlighter with a custom dark theme
- Returns HTML string with syntax token spans
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Next.js 15 project with Tailwind v4, types, and Shiki</name>
  <files>
    package.json, tsconfig.json, next.config.ts, src/app/globals.css,
    src/app/layout.tsx, src/app/page.tsx, src/lib/utils.ts, src/lib/shiki.ts,
    src/types/lesson.ts, src/types/cheat-sheet.ts
  </files>
  <read_first>
    index.html (lines 16-42 for CSS variables/color tokens)
    .planning/research/STACK.md (exact package versions)
    .planning/research/ARCHITECTURE.md (project structure and component patterns)
    .planning/phases/01-foundation-content/01-CONTEXT.md (decisions D-01 through D-06)
  </read_first>
  <action>
1. **Initialize Next.js 15 project** in the current directory (it's greenfield — no src/ exists yet):
   - Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack` to scaffold
   - If prompts appear, accept defaults

2. **Pin dependency versions** in package.json:
   - next: 15.5.10 (MUST be 15.x, NOT 16.x)
   - react: 19.1.0, react-dom: 19.1.0
   - typescript: 5.8.x (NOT 6.x — incompatible with Next.js 15)
   - @types/react: 19.x, @types/react-dom: 19.x
   - tailwindcss: 4.2.2
   - Install Phase 1 dependencies:
     - shiki@4.0.2 (server-side syntax highlighting)
     - clsx@2.1.1 (className utility)
     - tailwind-merge@3.5.0 (merge Tailwind classes)
     - lucide-react@1.7.0 (icons)
     - @tailwindcss/typography@0.5.19 (prose styling, registered via @plugin in CSS)
   - Run `npm install` to update lockfile

3. **Configure TypeScript strict mode** in tsconfig.json:
   - Ensure `"strict": true`
   - Ensure `"paths": { "@/*": ["./src/*"] }` alias is set

4. **Set up Tailwind v4 CSS-first config** in src/app/globals.css per D-01/D-02:
   - Replace the scaffolded globals.css content entirely
   - Start with `@import "tailwindcss";`
   - Register typography plugin: `@plugin "@tailwindcss/typography";`
   - Define `@theme { }` block mapping prototype CSS variables to Tailwind custom properties:
     - Colors: --color-bg, --color-bg-2, --color-bg-3, --color-bg-4, --color-border, --color-border-2, --color-text, --color-text-2, --color-text-3, --color-accent, --color-accent-2, --color-accent-3, --color-green, --color-green-2, --color-blue, --color-blue-2, --color-orange, --color-red, --color-pink
     - Values come from index.html lines 18-27 (dark theme :root variables)
   - Define dark mode as default: Set CSS variables on `:root` with dark values
   - Define light mode: `[data-theme="light"]` selector with light values from index.html lines 34-42
   - Add body base styles: font-family Inter, background var(--color-bg), color var(--color-text), smooth scrolling, thin scrollbar
   - Add transition on body for theme switching: `transition: background 0.3s, color 0.3s`
   - DO NOT create tailwind.config.js — Tailwind v4 uses CSS-first config exclusively

5. **Create cn() utility** in src/lib/utils.ts:
   ```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

6. **Set up Shiki singleton** in src/lib/shiki.ts:
   - Import `createHighlighter` from `shiki`
   - Create a `getHighlighter()` async function that lazily initializes and caches the highlighter
   - Use `'github-dark'` as the base theme (closest to prototype aesthetic)
   - Load languages: `bash`, `typescript`, `json`, `powershell`, `markdown`
   - Store highlighter in a module-level variable (singleton pattern — expensive to create, reuse across requests)
   - Export `getHighlighter()` for use in CodeBlock component

7. **Create minimal root layout** in src/app/layout.tsx:
   - Import Inter font from next/font/google with subsets: ['latin']
   - Import globals.css
   - Set `<html lang="en" data-theme="dark">` (dark mode default per D-10)
   - Set body with Inter font className
   - Export metadata: title "Master OpenCode", description from prototype meta tag
   - Render `{children}` inside a simple wrapper div

8. **Create placeholder home page** in src/app/page.tsx:
   - Simple "Master OpenCode" heading with a message like "Content loading..."
   - This will be replaced in Plan 03

9. **Define Lesson types** in src/types/lesson.ts per D-01, D-02:
   ```typescript
   export interface Lesson {
     slug: string;
     title: string;
     description: string;
     chapter: number;
     difficulty: "beginner" | "intermediate" | "advanced";
     label: string;
     sections: LessonSection[];
   }

   export type LessonSection =
     | { type: "heading"; text: string }
     | { type: "paragraph"; text: string }
     | { type: "code"; language: string; label: string; code: string }
     | { type: "info-box"; variant: "tip" | "warning" | "success"; label: string; content: string }
     | { type: "steps"; items: string[] }
     | { type: "table"; headers: string[]; rows: string[][] }
     | { type: "tab-code"; tabs: { label: string; language: string; code: string }[] }
     | { type: "unorderedList"; items: string[] }
     | { type: "inlineCode"; text: string };
   ```
   - Paragraph text supports inline `<code>` HTML via rendering (not a separate type for inline code within paragraphs — that's handled at render level)
   - The "heading" type renders as h3 (per prototype pattern)
   - "tab-code" stores multiple code blocks, one per tab (per D-03)

10. **Define CheatSheet types** in src/types/cheat-sheet.ts:
    ```typescript
    export interface CheatSheetCategory {
      id: string;
      title: string;
      icon: string;
      iconBg: string;
      iconColor: string;
      rows: { key: string; description: string }[];
    }

    export type CheatSheetData = CheatSheetCategory[];
    ```
  </action>
  <acceptance_criteria>
    - `package.json` contains "next": version starting with "15." and "tailwindcss": version starting with "4."
    - `package.json` does NOT contain any version of typescript starting with "6."
    - NO file named `tailwind.config.js` or `tailwind.config.ts` exists in the project root or src/
    - `src/app/globals.css` contains `@import "tailwindcss"` and `@theme` and `@plugin "@tailwindcss/typography"`
    - `src/app/globals.css` contains `[data-theme="light"]` selector with light mode color overrides
    - `src/types/lesson.ts` exports `Lesson` and `LessonSection` types
    - `LessonSection` is a discriminated union with at least 7 type variants including "heading", "paragraph", "code", "info-box", "steps", "table", "tab-code"
    - `src/types/cheat-sheet.ts` exports `CheatSheetCategory` and `CheatSheetData`
    - `src/lib/shiki.ts` exports `getHighlighter` function
    - `src/lib/utils.ts` exports `cn` function
    - `src/app/layout.tsx` contains `data-theme="dark"` on the html element
    - `tsconfig.json` contains `"strict": true`
    - Running `npx next build` exits with code 0 (or at minimum `npx tsc --noEmit` exits 0)
  </acceptance_criteria>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | tail -5 && echo "BUILD_OK" || echo "BUILD_FAIL"</automated>
  </verify>
  <done>
    Next.js 15 project builds without TypeScript errors. Tailwind v4 CSS-first config has dark/light theme tokens. All content types defined with discriminated unions. Shiki singleton ready for server-side highlighting. cn() utility available.
  </done>
</task>

<task type="auto">
  <name>Task 2: Write AGENTS.md documentation</name>
  <files>AGENTS.md</files>
  <read_first>
    .planning/PROJECT.md
    .planning/ROADMAP.md
    .planning/STATE.md
    .planning/research/ARCHITECTURE.md (project structure section)
    src/types/lesson.ts (created in Task 1)
    src/types/cheat-sheet.ts (created in Task 1)
  </read_first>
  <action>
Create AGENTS.md at the project root documenting the project for AI coding agents. This is the file that OpenCode reads to understand the project context. Write it as a clear reference document.

Structure it with these sections:

1. **Project**: "Master OpenCode — Interactive Learning Platform" with core value and one-line description.

2. **Tech Stack**: List exact versions — Next.js 15.5.10 (App Router + RSC), React 19.1.0, TypeScript 5.8.x (strict), Tailwind CSS 4.2.2 (CSS-first config, NO tailwind.config.js), Shiki 4.0.2 (server-side highlighting), lucide-react (icons), Clerk v7 (auth, Phase 3), Supabase (data, Phase 3). Note: TypeScript MUST be 5.8.x, NOT 6.x.

3. **Folder Structure**: Document the src/ layout — app/ (pages), components/ (content/, interactive/, ui/, layout/, providers/), data/ (lessons.ts, cheat-sheet.ts), lib/ (utils.ts, shiki.ts), types/ (lesson.ts, cheat-sheet.ts). Reference ARCHITECTURE.md for the full tree.

4. **Data Schema**: Document the Lesson type (slug, title, description, chapter, difficulty, label, sections array) and LessonSection discriminated union types. Document CheatSheetCategory. Explain that content is in TypeScript data files, NOT raw HTML strings, and NOT dangerouslySetInnerHTML.

5. **Auth Pattern**: Note that Clerk is Phase 3. Phase 1-2 have no auth. When Clerk is added: use clerkMiddleware() (NOT authMiddleware()), file is middleware.ts (NOT proxy.ts), auth() is async, use <Show when="signed-in"> (NOT deprecated <SignedIn>).

6. **Key Conventions**:
   - Content components are Server Components (RSC). Interactive components are Client Components ("use client").
   - Tailwind v4: All theme tokens in globals.css via @theme {}. No tailwind.config.js.
   - Use cn() from lib/utils for conditional classes.
   - Shiki runs server-side only. Never import shiki in Client Components.
   - Dark mode is default. Theme stored in localStorage.

7. **Phase 2 Scope**: Terminal simulator, challenges page, quiz page, animated agent loop, search (Ctrl+K), theme toggle, workflow guides. These use Client Components with useState. Per D-13, agent loop visualization is static in Phase 1, animated in Phase 2.
  </action>
  <acceptance_criteria>
    - AGENTS.md exists in project root
    - Contains section "Tech Stack" listing Next.js, React, TypeScript, Tailwind versions
    - Contains section "Data Schema" mentioning Lesson and LessonSection types
    - Contains "NO tailwind.config.js" warning
    - Contains "TypeScript MUST be 5.8.x, NOT 6.x" warning
    - Contains section about "Phase 2 Scope"
  </acceptance_criteria>
  <verify>
    <automated>grep -c "Tech Stack\|Data Schema\|NO tailwind.config\|5.8.x\|Phase 2" AGENTS.md</automated>
  </verify>
  <done>
    AGENTS.md exists with tech stack, folder structure, data schema, auth pattern, conventions, and Phase 2 scope documented.
  </done>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` passes with zero errors
- `grep "@theme" src/app/globals.css` confirms Tailwind v4 theme config
- `grep "discrimin" src/types/lesson.ts` confirms union types (or visual inspection of type structure)
- All required files exist: package.json, globals.css, layout.tsx, utils.ts, shiki.ts, lesson.ts, cheat-sheet.ts, AGENTS.md
</verification>

<success_criteria>
1. Next.js 15 dev server starts with `npm run dev` without errors
2. No tailwind.config.js exists anywhere in the project
3. TypeScript strict mode compiles cleanly
4. All 9 LessonSection type variants are defined as discriminated union
5. Shiki highlighter can be imported and called from a server context
6. AGENTS.md documents the full project context
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-content/01-01-SUMMARY.md`
</output>
