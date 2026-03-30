---
phase: 01-foundation-content
plan: 03
type: execute
wave: 3
depends_on: ["01", "02"]
files_modified:
  - src/app/page.tsx
  - src/app/lessons/page.tsx
  - src/app/lessons/[slug]/page.tsx
  - src/app/cheat-sheet/page.tsx
  - src/components/ui/chapter-card.tsx
  - src/components/ui/cheat-card.tsx
  - src/components/ui/workflow-card.tsx
  - src/components/ui/lesson-nav.tsx
  - src/components/ui/section-renderer.tsx
  - src/components/ui/stats.tsx
autonomous: true
requirements:
  - PAGE-01
  - PAGE-02
  - PAGE-03
  - PAGE-05

must_haves:
  truths:
    - "Home page displays hero section with gradient heading, CTA buttons, and stats"
    - "Home page displays 8 lesson cards in a grid with chapter numbers and difficulty tags"
    - "Home page shows static agent loop diagram and 3 collapsible workflow guides"
    - "Lessons listing page shows all 8 lessons with descriptions and difficulty tags"
    - "Each lesson page renders all content sections with correct types"
    - "Lesson pages have Back to Lessons link and Previous/Next navigation"
    - "Cheat sheet page displays 6 categories in a responsive grid with key-description rows"
  artifacts:
    - path: "src/app/page.tsx"
      provides: "Home page with hero, lessons grid, agent loop, workflows"
      contains: "hero"
    - path: "src/app/lessons/page.tsx"
      provides: "Lessons listing page"
      contains: "lessons"
    - path: "src/app/lessons/[slug]/page.tsx"
      provides: "Individual lesson page with full content rendering"
      contains: "generateStaticParams"
    - path: "src/app/cheat-sheet/page.tsx"
      provides: "Cheat sheet page with 6 category cards"
      contains: "cheatSheetData"
    - path: "src/components/ui/section-renderer.tsx"
      provides: "Maps LessonSection types to components"
      exports: ["SectionRenderer"]
    - path: "src/components/ui/chapter-card.tsx"
      provides: "Lesson card for home page grid"
      exports: ["ChapterCard"]
    - path: "src/components/ui/lesson-nav.tsx"
      provides: "Previous/Next lesson navigation buttons"
      exports: ["LessonNav"]
  key_links:
    - from: "src/app/page.tsx"
      to: "src/data/lessons.ts"
      via: "lessons import"
      pattern: "import.*lessons"
    - from: "src/app/page.tsx"
      to: "src/components/ui/chapter-card.tsx"
      via: "ChapterCard component"
      pattern: "ChapterCard"
    - from: "src/app/lessons/[slug]/page.tsx"
      to: "src/components/ui/section-renderer.tsx"
      via: "SectionRenderer for content"
      pattern: "SectionRenderer"
    - from: "src/app/lessons/[slug]/page.tsx"
      to: "src/components/ui/lesson-nav.tsx"
      via: "LessonNav for prev/next"
      pattern: "LessonNav"
    - from: "src/components/ui/section-renderer.tsx"
      to: "src/components/content/code-block.tsx"
      via: "CodeBlock import"
      pattern: "CodeBlock"
    - from: "src/app/cheat-sheet/page.tsx"
      to: "src/data/cheat-sheet.ts"
      via: "cheatSheetData import"
      pattern: "cheatSheetData"
---

<objective>
Create all 4 pages: Home page with hero/lesson grid/agent loop/workflow guides, Lessons listing page, Individual lesson page with prev/next navigation, and Cheat sheet page with responsive grid.

Purpose: These pages compose the layout shell, content components, and data from Plans 01-02 into the complete reading experience. This is the final plan that makes the phase goal true: "Users can browse and read all learning content."
Output: 4 working pages accessible via URL routing, plus supporting UI components.
</objective>

<execution_context>
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/workflows/execute-plan.md
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-content/01-CONTEXT.md
@.planning/phases/01-foundation-content/01-01-SUMMARY.md
@.planning/phases/01-foundation-content/01-02-SUMMARY.md
@index.html

<interfaces>
<!-- Contracts from Plans 01-02 that this plan consumes. -->

From src/types/lesson.ts (Plan 01):
- Lesson: { slug, title, description, chapter, difficulty, label, sections: LessonSection[] }
- LessonSection discriminated union: "heading"|"paragraph"|"code"|"info-box"|"steps"|"table"|"tab-code"|"unorderedList"|"inlineCode"

From src/types/cheat-sheet.ts (Plan 01):
- CheatSheetCategory: { id, title, icon, iconBg, iconColor, rows: { key, description }[] }
- CheatSheetData: CheatSheetCategory[]

From src/data/lessons.ts (Plan 02):
- export const lessons: Lesson[] — 8 lessons with full content

From src/data/cheat-sheet.ts (Plan 02):
- export const cheatSheetData: CheatSheetData — 6 categories

From src/components/content/ (Plan 02):
- CodeBlock: async component, props { language, label, code }
- InfoBox: server component, props { variant, label, content }
- StepList: server component, props { items }
- TableWrap: server component, props { headers, rows }
- TabBar: client component, props { tabs: { label, language, code }[] }

From src/lib/utils.ts (Plan 01):
- cn(...inputs: ClassValue[]): string

From src/app/globals.css (Plan 01):
- Tailwind v4 @theme tokens matching prototype colors
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create home page and lessons listing page</name>
  <files>
    src/app/page.tsx,
    src/app/lessons/page.tsx,
    src/components/ui/chapter-card.tsx,
    src/components/ui/workflow-card.tsx,
    src/components/ui/stats.tsx
  </files>
  <read_first>
    index.html (lines 337-434 for home page HTML: hero, chapter-grid, agent-loop, workflows)
    index.html (lines 66-99 for CSS styles of hero, chapter cards, stats, agent loop, workflow cards)
    src/data/lessons.ts (lessons array from Plan 02)
    src/components/layout/navbar.tsx (from Plan 02, to understand spacing)
    src/app/globals.css (theme tokens from Plan 01)
  </read_first>
  <action>
1. **Create ChapterCard** in src/components/ui/chapter-card.tsx:
   - Server Component
   - Props: { lesson: Lesson } (import Lesson type)
   - Renders a card matching the prototype's .chapter-card style:
     - Background bg-bg-2, border border-border, rounded-2xl, padding 7-8, hover effect (border-accent, -translate-y-0.5, shadow)
     - Top: Chapter number in accent-2, uppercase, letter-spacing, small font (e.g., "Chapter 01")
     - Middle: Title (h3, bold, large), description (text-text-2, smaller)
     - Bottom: Difficulty tag (beginner=green, intermediate=blue, advanced=orange with appropriate bg colors)
     - Right arrow (using lucide-react ArrowRight icon or HTML entity)
   - Wrap entire card in Next.js Link to /lessons/[lesson.slug]
   - Per D-15: "Lesson grid uses card-based layout with chapter number, title, description, difficulty tag, and hover effects"

2. **Create WorkflowCard** in src/components/ui/workflow-card.tsx:
   - "use client" directive (expand/collapse toggle needs state)
   - Props: { title: string; steps: { title: string; description: string }[] }
   - Renders expandable card matching prototype's .workflow-card style:
     - Header with title and chevron icon (lucide-react ChevronDown, rotated when open)
     - Steps shown when expanded, each with purple numbered circle and title/description
     - Toggle on header click, smooth expand/collapse
   - Per D-14: "Workflow guides are collapsible cards with step-by-step instructions"

3. **Create Stats** in src/components/ui/stats.tsx:
   - Server Component
   - Renders the 3-stat row: "8 Lessons", "40+ Examples", "16 Quizzes" (from prototype lines 347-351)
   - Each stat: large gradient number + label
   - Grid: 3 columns, centered, max-width ~600px
   - Number uses gradient text (accent-2 to pink), matching prototype

4. **Create Home page** in src/app/page.tsx (replace placeholder from Plan 01):
   - Server Component (import lessons from data, no client state needed)
   - Structure per D-11 (all prototype sections):
     a. **Hero section** (per D-12 — "more unique, minimal, simple, and professional"):
        - Full viewport height, centered, text-align center
        - Badge: green dot + "Free and Open Source — 133K+ Stars"
        - Heading: "Master OpenCode" with gradient span (purple-pink-orange) + "From Zero to Hero"
        - Description paragraph
        - CTA buttons: "Start Learning" (primary, links to /lessons/what-is-opencode) + "Official Docs" (secondary, links to https://opencode.ai)
        - Stats component below buttons
        - Subtle radial gradient background glow (matching prototype's hero::before pulse)
     b. **Lessons section** ("Your Journey Starts Here"):
        - Section header: label, h2, description
        - Grid of 8 ChapterCard components using lessons data
        - Max-width ~900px, gap-4
     c. **Agent loop section** (per D-13 — static diagram, animation deferred):
        - Section header: "How It Works" / "The Agent Loop"
        - 5 nodes in a row: You, LLM, Tools, Codebase, Result, then back to LLM
        - Each node: bg-bg-2 card with emoji icon + label, hover effect
        - Arrows between nodes (using lucide-react ArrowRight or HTML entity)
        - Static display only (no animation — that's Phase 2)
        - Below: helper text "The loop continues until the task is complete..."
     d. **Workflow guides section** ("Real-World Workflows"):
        - 3 WorkflowCard components with data from prototype lines 407-433:
          1. "Add a New Feature" — 4 steps (Plan mode → Review → Build mode → Review and test)
          2. "Debug a Crash" — 3 steps (Paste error → Investigate → Apply fix)
          3. "Refactor Legacy Code" — 3 steps (Plan mode → Review plan → Execute)
        - Max-width ~700px, centered

5. **Create Lessons listing page** in src/app/lessons/page.tsx:
   - Server Component
   - Import lessons from data/lessons.ts
   - Section header: "Lessons" / "Your Learning Path" / description
   - Grid of 8 ChapterCard components (same as home page, but this is the dedicated listing)
   - Layout: padding-top for navbar clearance, max-width 900px, centered

  </action>
  <acceptance_criteria>
    - src/app/page.tsx imports lessons from @/data/lessons and renders ChapterCard components
    - src/app/page.tsx contains hero section with gradient heading text
    - src/app/page.tsx renders 3 WorkflowCard components with "Add a New Feature", "Debug a Crash", "Refactor Legacy Code" titles
    - src/app/page.tsx renders a static agent loop diagram with at least 5 nodes
    - src/app/page.tsx renders Stats component with "8 Lessons", "40+ Examples", "16 Quizzes"
    - src/components/ui/chapter-card.tsx links to /lessons/[slug] using Next.js Link
    - src/components/ui/chapter-card.tsx shows difficulty tags with different colors for beginner/intermediate/advanced
    - src/components/ui/workflow-card.tsx contains "use client" and "useState"
    - src/app/lessons/page.tsx renders all 8 lessons with chapter numbers and difficulty tags
    - Running npx tsc --noEmit exits with code 0
  </acceptance_criteria>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | tail -5 && echo "TYPECHECK_OK" || echo "TYPECHECK_FAIL"</automated>
  </verify>
  <done>
    Home page shows hero with gradient heading, 8 lesson cards, static agent loop diagram, and 3 collapsible workflow guides. Lessons listing page shows all 8 chapters. Both pages use shared ChapterCard component. TypeScript compiles cleanly.
  </done>
</task>

<task type="auto">
  <name>Task 2: Create lesson detail page, cheat sheet page, and section renderer</name>
  <files>
    src/app/lessons/[slug]/page.tsx,
    src/app/cheat-sheet/page.tsx,
    src/components/ui/section-renderer.tsx,
    src/components/ui/lesson-nav.tsx,
    src/components/ui/cheat-card.tsx
  </files>
  <read_first>
    index.html (lines 437-447 for lesson page HTML structure)
    index.html (lines 484-497 for cheat sheet page HTML structure)
    index.html (lines 112-157 for lesson content component CSS styles)
    src/data/lessons.ts (lessons array from Plan 02)
    src/data/cheat-sheet.ts (cheatSheetData from Plan 02)
    src/components/content/code-block.tsx (CodeBlock from Plan 02)
    src/components/content/info-box.tsx (InfoBox from Plan 02)
    src/components/content/step-list.tsx (StepList from Plan 02)
    src/components/content/table-wrap.tsx (TableWrap from Plan 02)
    src/components/content/tab-bar.tsx (TabBar from Plan 02)
  </read_first>
  <action>
1. **Create SectionRenderer** in src/components/ui/section-renderer.tsx:
   - Server Component (matches each LessonSection type to its rendering component)
   - Props: { section: LessonSection }
   - Switch on section.type:
     - "heading": render h3 with text, top border, margin-top/bottom, bold
     - "paragraph": render p with text-text-2 color. Support inline HTML (strong tags, code tags) via carefully handled rendering. Use dangerouslySetInnerHTML ONLY for trusted inline formatting (strong, code) — NOT for full user-generated content
     - "code": render CodeBlock component with section.language, section.label, section.code
     - "info-box": render InfoBox component with section.variant, section.label, section.content
     - "steps": render StepList component with section.items
     - "table": render TableWrap component with section.headers, section.rows
     - "tab-code": render TabBar component with section.tabs
     - "unorderedList": render ul with li items. Support strong tags in item text. Each item has margin-bottom
     - "inlineCode": render inline code span with monospace font, bg-bg-3, border, rounded, accent-2 color
   - This is the ONLY place where LessonSection types are mapped to components (per architecture "Anti-Pattern 5: Over-Abstracting into a Mega Renderer" — this is a simple render switch, not a mega component; each component is independently testable)
   - Export SectionRenderer as named export

2. **Create LessonNav** in src/components/ui/lesson-nav.tsx:
   - Server Component (just links, no state needed)
   - Props: { prevSlug: string | null; nextSlug: string | null; nextTitle: string | null }
   - Render flex row with justify-between, top border, padding-top
   - Previous button: secondary style, shows if prevSlug exists, links to /lessons/[prevSlug]
   - Next button: primary style, shows if nextSlug exists, links to /lessons/[nextSlug]. If no next (last lesson), show "Back to Lessons" linking to /lessons
   - Per D-08: "Lesson pages have Back to Lessons navigation and Previous/Next lesson buttons at bottom"

3. **Create lesson detail page** in src/app/lessons/[slug]/page.tsx:
   - Server Component (async function — RSC pattern per architecture)
   - Per D-08: Must include generateStaticParams() for SSG:
     - Export function that returns all lesson slugs from the lessons array
   - Page component receives { params }: { params: Promise<{ slug: string }> }
   - Await params, find lesson by slug, if not found call notFound()
   - Per D-08 structure:
     - "Back to Lessons" link at top (link to /lessons, left arrow + text)
     - Lesson header: label (accent-2, uppercase), title (h2, bold, large), description (text-text-2)
     - Lesson content: map over lesson.sections, render each with SectionRenderer
     - LessonNav at bottom with prev/next computed from lessons array index
   - Content area: max-width ~900px, centered, padding for navbar clearance
   - Generate metadata function for SEO: title and description from lesson data

4. **Create CheatCard** in src/components/ui/cheat-card.tsx:
   - Server Component
   - Props: { category: CheatSheetCategory }
   - Renders card matching prototype's .cheat-card style:
     - Background bg-bg-2, border, rounded-xl, padding 6
     - Header: icon in colored bg square + title (bold)
     - Rows: flex justify-between, border-bottom (except last), monospace key in bg-bg-3 rounded badge, description in text-text-2
   - Export CheatCard as named export

5. **Create cheat sheet page** in src/app/cheat-sheet/page.tsx:
   - Server Component
   - Import cheatSheetData from data/cheat-sheet.ts
   - Per D-16: "Cheat sheet page uses a responsive grid of 6 cards"
   - Page structure:
     - "Back to Lessons" link at top
     - Header: label "Quick Reference", title "Cheat Sheet", description
     - Responsive grid: grid with auto-fit, minmax(280px, 1fr), gap-4
     - Render CheatCard for each of the 6 categories
   - Per D-17: "Each cheat card has a header with icon, and rows of key-description pairs"
   - Layout: max-width ~1000px, centered, padding for navbar clearance
  </action>
  <acceptance_criteria>
    - src/components/ui/section-renderer.tsx imports and renders CodeBlock, InfoBox, StepList, TableWrap, TabBar
    - src/components/ui/section-renderer.tsx handles all 9 LessonSection type variants (heading, paragraph, code, info-box, steps, table, tab-code, unorderedList, inlineCode)
    - src/app/lessons/[slug]/page.tsx exports generateStaticParams returning 8 slug objects
    - src/app/lessons/[slug]/page.tsx calls notFound() when slug not found
    - src/app/lessons/[slug]/page.tsx renders SectionRenderer for each section
    - src/app/lessons/[slug]/page.tsx renders LessonNav with previous/next links
    - src/app/lessons/[slug]/page.tsx has "Back to Lessons" link at top
    - src/components/ui/lesson-nav.tsx shows Previous button when not first lesson and Next button when not last lesson
    - src/app/cheat-sheet/page.tsx imports cheatSheetData and renders 6 CheatCard components
    - src/components/ui/cheat-card.tsx renders key-description pairs with monospace key badges
    - Running npx tsc --noEmit exits with code 0
  </acceptance_criteria>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | tail -5 && echo "TYPECHECK_OK" || echo "TYPECHECK_FAIL"</automated>
  </verify>
  <done>
    Lesson pages render all content sections (code with Shiki highlighting, info boxes, steps, tables, tab bars, lists) with prev/next navigation. Cheat sheet page shows 6 categories in responsive grid. All 8 lesson pages are statically generated. SectionRenderer maps every LessonSection type to its component. TypeScript compiles cleanly.
  </done>
</task>

</tasks>

<verification>
- npx tsc --noEmit passes with zero errors
- Home page (/) shows hero, 8 lesson cards, agent loop, workflow guides
- /lessons shows all 8 lessons
- /lessons/what-is-opencode renders lesson content with all section types
- /lessons/configuration renders tables, code blocks, and info boxes
- /lessons/installation renders tab-code sections
- Previous/Next navigation works on lesson pages
- /cheat-sheet shows 6 categories in responsive grid
- All lesson pages have "Back to Lessons" link
</verification>

<success_criteria>
1. Home page renders hero section, 8 lesson cards, static agent loop, and 3 workflow guides
2. All 8 lesson pages accessible at /lessons/[slug] with full content
3. Code blocks show Shiki syntax highlighting with copy button
4. Lesson pages have prev/next navigation between lessons
5. Cheat sheet page shows all 6 categories in responsive grid
6. SectionRenderer correctly maps all 9 section types to components
7. generateStaticParams pre-renders all 8 lesson pages
8. TypeScript strict mode compiles cleanly
9. Full build succeeds: npx next build exits with code 0
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-content/01-03-SUMMARY.md`
</output>
