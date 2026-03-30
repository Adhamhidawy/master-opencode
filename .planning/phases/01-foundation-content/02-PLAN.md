---
phase: 01-foundation-content
plan: 02
type: execute
wave: 2
depends_on: ["01"]
files_modified:
  - src/components/providers/theme-provider.tsx
  - src/components/layout/navbar.tsx
  - src/components/layout/sidebar.tsx
  - src/components/layout/footer.tsx
  - src/components/content/code-block.tsx
  - src/components/content/info-box.tsx
  - src/components/content/step-list.tsx
  - src/components/content/table-wrap.tsx
  - src/components/content/tab-bar.tsx
  - src/data/lessons.ts
  - src/data/cheat-sheet.ts
  - src/app/layout.tsx
autonomous: true
requirements:
  - FND-03
  - FND-04
  - CONT-01
  - CONT-04
  - CONT-05

must_haves:
  truths:
    - "Fixed top navigation bar shows logo, nav links, and theme toggle"
    - "Mobile view shows hamburger menu that opens a sidebar with all lesson links"
    - "Code blocks render with syntax highlighting via Shiki and have a Copy button"
    - "Info boxes render in blue (tip), orange (warning), and green (success) variants"
    - "Step lists show numbered purple circles (1, 2, 3...)"
    - "Tables render with responsive horizontal scroll wrapper"
    - "Tab bars switch between code blocks on click"
    - "All 8 lessons are available as structured TypeScript data"
    - "Cheat sheet data has 6 categories with key-description pairs"
  artifacts:
    - path: "src/components/layout/navbar.tsx"
      provides: "Fixed top navigation bar"
      contains: "use client"
    - path: "src/components/layout/sidebar.tsx"
      provides: "Mobile sidebar navigation"
      contains: "usePathname"
    - path: "src/components/content/code-block.tsx"
      provides: "Syntax-highlighted code with copy button"
      exports: ["CodeBlock"]
    - path: "src/components/content/info-box.tsx"
      provides: "Tip/Warning/Success callout boxes"
      exports: ["InfoBox"]
    - path: "src/components/content/step-list.tsx"
      provides: "Numbered step list with purple circles"
      exports: ["StepList"]
    - path: "src/data/lessons.ts"
      provides: "All 8 lessons as structured data"
      exports: ["lessons"]
      min_lines: 200
    - path: "src/data/cheat-sheet.ts"
      provides: "6 cheat sheet categories"
      exports: ["cheatSheetData"]
      min_lines: 60
  key_links:
    - from: "src/components/content/code-block.tsx"
      to: "src/lib/shiki.ts"
      via: "getHighlighter import"
      pattern: "getHighlighter"
    - from: "src/components/content/code-block.tsx"
      to: "src/types/lesson.ts"
      via: "LessonSection type"
      pattern: "LessonSection|code.*language"
    - from: "src/data/lessons.ts"
      to: "src/types/lesson.ts"
      via: "Lesson type import"
      pattern: "import.*Lesson.*from"
    - from: "src/app/layout.tsx"
      to: "src/components/layout/navbar.tsx"
      via: "component import"
      pattern: "import.*Navbar"
---

<objective>
Build the layout shell (navbar, sidebar, footer) with responsive behavior and theme toggle, create all content rendering components (CodeBlock, InfoBox, StepList, TableWrap, TabBar), and migrate all 8 lessons plus the cheat sheet from the HTML prototype to structured TypeScript data files.

Purpose: This plan creates the reusable presentation layer and content data that all pages in Plan 03 will compose. The components must match the prototype's visual design; the data must faithfully represent all 8 lessons.
Output: Layout components, 5 content components, ThemeProvider, 8 lessons data, and cheat sheet data.
</objective>

<execution_context>
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/workflows/execute-plan.md
@/Users/user1/Projects/master-opencode/.opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-foundation-content/01-CONTEXT.md
@.planning/phases/01-foundation-content/01-01-SUMMARY.md
@index.html

<interfaces>
<!-- Contracts from Plan 01 that this plan consumes. -->

From src/types/lesson.ts (Plan 01 created):
- Lesson interface: { slug, title, description, chapter, difficulty, label, sections }
- LessonSection discriminated union: "heading" | "paragraph" | "code" | "info-box" | "steps" | "table" | "tab-code" | "unorderedList" | "inlineCode"
- Each variant has specific fields (e.g., "code" has language/label/code, "info-box" has variant/label/content)

From src/types/cheat-sheet.ts (Plan 01 created):
- CheatSheetCategory: { id, title, icon, iconBg, iconColor, rows: { key, description }[] }
- CheatSheetData: CheatSheetCategory[]

From src/lib/shiki.ts (Plan 01 created):
- getHighlighter() -- returns Promise of ShikiHighlighter, use .codeToHtml(code, lang, theme) to get highlighted HTML

From src/lib/utils.ts (Plan 01 created):
- cn(...inputs: ClassValue[]) -- conditional className utility

From src/app/globals.css (Plan 01 created):
- Tailwind v4 @theme tokens: --color-bg, --color-bg-2, --color-accent, etc.
- CSS variables available as Tailwind classes: bg-bg, bg-bg-2, text-accent, etc.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create layout shell and content rendering components</name>
  <files>
    src/components/providers/theme-provider.tsx,
    src/components/layout/navbar.tsx,
    src/components/layout/sidebar.tsx,
    src/components/layout/footer.tsx,
    src/components/content/code-block.tsx,
    src/components/content/info-box.tsx,
    src/components/content/step-list.tsx,
    src/components/content/table-wrap.tsx,
    src/components/content/tab-bar.tsx,
    src/app/layout.tsx
  </files>
  <read_first>
    index.html (lines 51-63 for nav CSS, lines 204-208 for sidebar CSS, lines 127-156 for content component CSS, lines 289-335 for nav HTML structure, lines 337-434 for home page structure, lines 508-511 for footer)
    src/app/globals.css (theme tokens from Plan 01)
    src/lib/utils.ts (cn utility from Plan 01)
    src/lib/shiki.ts (getHighlighter from Plan 01)
    src/types/lesson.ts (LessonSection types from Plan 01)
    src/app/layout.tsx (current root layout from Plan 01 — will be updated)
  </read_first>
  <action>
1. **Create ThemeProvider** in src/components/providers/theme-provider.tsx (per D-10):
   - "use client" directive
   - React context providing theme ("dark" or "light") and toggleTheme function
   - On mount: read localStorage.getItem("oc_theme") or default to "dark"
   - On toggle: set new theme, update document.documentElement.setAttribute("data-theme", theme), persist to localStorage with key "oc_theme"
   - Export ThemeProvider component wrapping children, and useTheme hook for consuming components

2. **Create Navbar** in src/components/layout/navbar.tsx (per D-07):
   - "use client" directive
   - Fixed position top bar (position: fixed, top: 0, full width, z-index: 100) with backdrop blur and border-bottom
   - Max width 1200px centered inner container, height 64px, flex between
   - Left side: Logo SVG (copy the 4-square grid SVG from index.html line 294 — four purple rectangles with varying opacity) + "Master OpenCode" text with gradient (purple to pink via CSS background-clip: text). Wrap in Next.js Link to "/"
   - Right side (flex, gap, items-center):
     - Nav links using Next.js Link: Lessons (/lessons), Playground (/playground), Challenges (/challenges), Cheat Sheet (/cheat-sheet), Quiz (/quiz). These are present from Phase 1 even though Playground/Challenges/Quiz pages are Phase 2
     - Search button (non-functional placeholder): magnifying glass icon + "Search" + kbd with "Ctrl K". Styled with border, rounded, muted text
     - Theme toggle button: uses useTheme() hook, shows Sun or Moon icon from lucide-react, toggles theme on click
     - Hamburger button: lucide-react Menu icon, visible only on mobile (md:hidden), triggers sidebar toggle
   - Nav links hidden on mobile (use hidden md:flex pattern per D-09)
   - Background: rgba background with backdrop-blur (matching prototype line 51-52)

3. **Create Sidebar** in src/components/layout/sidebar.tsx (per D-09):
   - "use client" directive
   - Fixed left sidebar: position fixed, left 0, top 64px (below navbar), bottom 0, width 260px
   - Background bg-bg-2, border-right, padding-y, overflow-y auto, z-index 50
   - Props: isOpen boolean, onClose callback
   - Contains links: Home, then 8 lesson links with chapter number + title
   - Lesson links use Next.js Link to /lessons/[slug]
   - Active state via usePathname() — highlight current lesson with accent color left border
   - Transform: translateX(-100%) when closed, translateX(0) when open, smooth transition
   - Backdrop overlay when open (semi-transparent, click to close)
   - Desktop: always hidden (this is mobile-only in Phase 1 per D-09)
   - Import lessons array from @/data/lessons for link generation

4. **Create Footer** in src/components/layout/footer.tsx:
   - Server Component (no "use client")
   - Centered text: "Built for the community — Not affiliated with Anomaly / OpenCode"
   - Links: GitHub (https://github.com/anomalyco/opencode), Docs (https://opencode.ai/docs), Discord (https://discord.gg/opencode)
   - Top border (border-t), muted text (text-text-3), padding 48px vertical, text size sm

5. **Create CodeBlock** in src/components/content/code-block.tsx (per D-05, D-06):
   - This needs TWO parts: a Server Component for highlighting + a Client Component for copy
   - **Server Component part (CodeBlock):**
     - Async function component accepting { language: string; label: string; code: string }
     - Call await getHighlighter() then highlighter.codeToHtml(code, { lang: language, theme: "github-dark" })
     - Render outer div: relative, border, rounded-xl, overflow-hidden
     - Header div: flex between, bg-bg-3 background, border-bottom, padding 10px-16px
       - Left: language label in uppercase, small font, muted, tracking-wide
       - Right: CopyButton client component (pass code text as prop)
     - Content div: padding 20px, overflow-x auto, bg-bg-2 background
       - Use dangerouslySetInnerHTML with the highlighted HTML from Shiki
       - Font: font-mono (JetBrains Mono or monospace fallback), text-sm, leading-relaxed
   - **Client Component part (CopyButton):**
     - "use client" directive
     - Button that calls navigator.clipboard.writeText(text) on click
     - State: isCopied boolean (false by default)
     - On click: copy, set isCopied true, setTimeout 1500ms to reset
     - Shows "Copy" normally, "Copied!" when isCopied
     - Styled: small border, rounded, muted text, hover effect

6. **Create InfoBox** in src/components/content/info-box.tsx:
   - Server Component (no "use client")
   - Props: { variant: "tip" | "warning" | "success"; label: string; content: string }
   - Container: padding 20px-24px, rounded-xl, margin-y 20px, text-sm
   - Variant colors matching prototype (lines 141-144):
     - tip: bg-blue/10 background, blue border, text-blue-2
     - warning: bg-orange/10 background, orange border, text-orange
     - success: bg-green/10 background, green border, text-green-2
   - Label: uppercase, bold, text-xs, tracking-wide, margin-bottom 6px
   - Content: variant-colored text, leading-relaxed
   - Use cn() utility for conditional variant classes

7. **Create StepList** in src/components/content/step-list.tsx:
   - Server Component
   - Props: { items: string[] }
   - Render as ordered list with list-style none, margin-y 20px
   - Each item: relative, padding 16px-20px 16px-56px, margin-bottom 8px, bg-bg-2, border, rounded-lg
   - Number circle: absolute, left 16px, top 14px, 28x28px, bg-accent, text-white, rounded-full, flex center, text-xs, font-bold
   - Use CSS counter or explicit item index for numbering (1, 2, 3...)
   - Item text: text-text-2, text-sm, leading-relaxed

8. **Create TableWrap** in src/components/content/table-wrap.tsx:
   - Server Component
   - Props: { headers: string[]; rows: string[][] }
   - Outer div: overflow-x-auto, margin-y 20px, border, rounded-xl
   - Table: w-full, border-collapse
   - Header row: bg-bg-3 background, th with text-left, padding, font-semibold, whitespace-nowrap, border-bottom
   - Data rows: td with padding, border-bottom (except last row), text-text-2, text-sm
   - Support inline code in cell text (wrap code text in span with font-mono, bg-bg-3, padding, rounded, border, text-accent-2 styling)

9. **Create TabBar** in src/components/content/tab-bar.tsx (per D-03):
   - "use client" directive (tab switching needs useState)
   - Props: { tabs: { label: string; language: string; code: string }[] }
   - Tab button row: flex, gap-1, padding, bg-bg-3, rounded-lg, margin-y 20px, border
   - Each tab button: flex-1, text-center, text-sm, font-semibold, padding, rounded-md, transition
   - Active tab: bg-accent, text-white. Inactive: text-text-3, hover:text-text
   - useState(0) for active tab index, onClick updates index
   - Below tab row: render CodeBlock component with active tab's language/code/label
   - Import CodeBlock from ./code-block

10. **Update root layout** in src/app/layout.tsx:
    - Read current layout.tsx first (created by Plan 01)
    - Wrap body children with ThemeProvider
    - Add Navbar component at top of body
    - Add Footer component at bottom
    - Add Sidebar with state management (need a small client wrapper or manage sidebar state in navbar)
    - Structure: ThemeProvider wrapping everything, inside: div(min-h-screen, flex, flex-col) containing Navbar, then main(flex-1) with children, then Footer
    - Sidebar managed via Navbar state — may need a LayoutShell client component that holds sidebar open/close state and passes toggle to Navbar
    - Import lessons from @/data/lessons for Sidebar (this file is created in Task 2 below; if needed, create a temporary empty export first)

  **Implementation note on Sidebar state:** Create a small client component LayoutShell in src/components/layout/layout-shell.tsx that manages sidebar isOpen state, renders Navbar (with onToggleSidebar callback), Sidebar, main content, and Footer. The root layout renders ThemeProvider > LayoutShell > children.
  </action>
  <acceptance_criteria>
    - src/components/providers/theme-provider.tsx contains "use client" and exports ThemeProvider and useTheme
    - src/components/layout/navbar.tsx contains "use client" and has Link components to /lessons, /cheat-sheet, /challenges, /playground, /quiz
    - src/components/layout/navbar.tsx imports and uses useTheme from theme-provider
    - src/components/layout/sidebar.tsx contains "usePathname" and has lesson links
    - src/components/content/code-block.tsx imports getHighlighter from @/lib/shiki
    - src/components/content/code-block.tsx has a CopyButton that calls navigator.clipboard.writeText
    - src/components/content/info-box.tsx has conditional classes for tip, warning, success variants
    - src/components/content/step-list.tsx renders numbered steps with index-based circles
    - src/components/content/tab-bar.tsx contains "useState" for active tab management
    - src/app/layout.tsx imports Navbar, Footer, and ThemeProvider
    - Running npx tsc --noEmit exits with code 0
  </acceptance_criteria>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | tail -5 && echo "TYPECHECK_OK" || echo "TYPECHECK_FAIL"</automated>
  </verify>
  <done>
    Layout shell renders with fixed navbar, responsive sidebar, and footer. ThemeProvider enables dark/light mode toggle. All 5 content components (CodeBlock, InfoBox, StepList, TableWrap, TabBar) render their respective LessonSection types with Shiki syntax highlighting and copy-to-clipboard.
  </done>
</task>

<task type="auto">
  <name>Task 2: Migrate all 8 lessons and cheat sheet to structured TypeScript data</name>
  <files>src/data/lessons.ts, src/data/cheat-sheet.ts</files>
  <read_first>
    index.html (lines 514-636 for all lesson data and cheat sheet HTML — this is the SOURCE OF TRUTH for content)
    src/types/lesson.ts (Lesson and LessonSection types from Plan 01)
    src/types/cheat-sheet.ts (CheatSheetCategory type from Plan 01)
  </read_first>
  <action>
1. **Create lessons data** in src/data/lessons.ts:
   - Import Lesson type from @/types/lesson
   - Export const lessons: Lesson[] containing all 8 lessons
   - Parse from index.html lines 514-613 (the lessons JavaScript array)

   For each of the 8 lessons, extract:
   - slug: Generate from title, lowercase, hyphenated:
     - "What is OpenCode?" to "what-is-opencode"
     - "Installation" to "installation"
     - "Configuration" to "configuration"
     - "Core Concepts" to "core-concepts"
     - "Working with Agents" to "working-with-agents"
     - "Tools Deep Dive" to "tools-deep-dive"
     - "Commands and Automation" to "commands-and-automation"
     - "Advanced Setup" to "advanced-setup"
   - title: From lesson object title field
   - description: From lesson object desc field
   - chapter: 1 through 8 (matching array index + 1)
   - difficulty: From the label field — "Beginner" maps to "beginner", "Intermediate" maps to "intermediate", "Advanced" maps to "advanced"
   - label: From lesson object label field (e.g., "Chapter 01 - Beginner")
   - sections: Parse the HTML content string into LessonSection array

   **Parse each lesson's HTML content into LessonSection[]:**
   - h3 tags become: { type: "heading", text: "heading text" }
   - p tags become: { type: "paragraph", text: "paragraph text with inline HTML preserved for strong and code elements" }
   - ul/li tags become: { type: "unorderedList", items: ["item 1", "item 2", ...] }
   - ol.step-list/li tags become: { type: "steps", items: ["step 1 text", "step 2 text", ...] }
   - div.code-block becomes: { type: "code", language: "bash" or "typescript" or "json" or "powershell" or "markdown", label: from .lang span text, code: "plain text code content" }
   - div.info-box.tip/warning/success becomes: { type: "info-box", variant: "tip" or "warning" or "success", label: from .info-label text, content: "text content" }
   - div.table-wrap/table becomes: { type: "table", headers: ["col1", "col2", ...], rows: [["cell1", "cell2", ...], ...] }
   - div.tab-bar with tab content divs becomes: { type: "tab-code", tabs: [{ label: "npm", language: "bash", code: "..." }, ...] }

   **CRITICAL RULES for code block content:**
   - Strip ALL syntax-highlighting HTML spans. Remove span tags with classes: prompt, cmd, flag, str, comment, key. Keep ONLY the inner text content.
   - Convert HTML entities: andamp; to and, andlt; to <, andgt; to >, andquot; to "
   - Store plain text only in the code field. Shiki handles highlighting at render time.
   - Preserve the actual text content faithfully — do NOT truncate or summarize any lesson.
   - Escape backticks in code strings using backslash escaping or regular string concatenation.

   **Expected section counts per lesson (approximate):**
   - Ch01 (What is OpenCode): ~10 sections (headings, paragraphs, lists, info-box, steps)
   - Ch02 (Installation): ~10 sections (headings, code blocks, tab-code, info-box)
   - Ch03 (Configuration): ~10 sections (headings, paragraphs, code blocks, table, info-box, steps)
   - Ch04 (Core Concepts): ~8 sections (headings, paragraphs, tables, steps, info-box)
   - Ch05 (Working with Agents): ~8 sections (headings, paragraphs, tables, code blocks, info-box)
   - Ch06 (Tools Deep Dive): ~8 sections (headings, paragraphs, code blocks, tables, info-box)
   - Ch07 (Commands and Automation): ~8 sections (headings, paragraphs, code blocks, tables, info-box)
   - Ch08 (Advanced Setup): ~10 sections (headings, code blocks, info-box, paragraphs)

2. **Create cheat sheet data** in src/data/cheat-sheet.ts:
   - Import CheatSheetData from @/types/cheat-sheet
   - Export const cheatSheetData: CheatSheetData containing 6 categories
   - Parse from index.html lines 488-496 (the .cheat-grid section with 6 .cheat-card elements)

   Category 1 — CLI Commands:
     id: "cli-commands", title: "CLI Commands"
     icon: "$", iconBg: "bg-green/10" (matching prototype green-bg), iconColor: "text-green"
     rows: opencode/Start TUI, opencode run "msg"/One-shot prompt, opencode models/List models, opencode serve/Start server, opencode agent create/Create agent

   Category 2 — Slash Commands:
     id: "slash-commands", title: "Slash Commands"
     icon: "/", iconBg: "bg-blue/10", iconColor: "text-blue"
     rows: /init/Initialize project, /help/Show help, /undo/Undo last change, /redo/Redo change, /share/Share session, /connect/Configure provider

   Category 3 — Keybinds:
     id: "keybinds", title: "Keybinds"
     icon: "house" (using the house entity from prototype), iconBg: "bg-orange/10", iconColor: "text-orange"
     rows: Tab/Switch agent, Ctrl+X/Leader key, Ctrl+X then N/New session, Ctrl+X then E/Open editor, Ctrl+X then M/Switch model, Escape/Interrupt agent

   Category 4 — Special Syntax:
     id: "special-syntax", title: "Special Syntax"
     icon: "@", iconBg: "bg-accent/10", iconColor: "text-accent-2"
     rows: @filename/Reference file, @agent-name/Invoke subagent, $ARGUMENTS/Command args, backtick-cmd/Shell in prompt, {env:VAR}/Env variable, {file:path}/File contents

   Category 5 — Install Methods:
     id: "install-methods", title: "Install Methods"
     icon: "down-arrow", iconBg: "bg-green/10", iconColor: "text-green"
     rows: curl install script/Universal, npm i -g opencode-ai/Node.js, brew install opencode/macOS and Linux, scoop install opencode/Windows, paru -S opencode-bin/Arch Linux

   Category 6 — Config Files:
     id: "config-files", title: "Config Files"
     icon: "?", iconBg: "bg-red/10", iconColor: "text-red"
     rows: opencode.json/Project config, ~/.config/opencode//Global config, tui.json/TUI settings, AGENTS.md/Project context, .opencode/agents//Custom agents, .opencode/commands//Custom commands
  </action>
  <acceptance_criteria>
    - src/data/lessons.ts exports lessons array with exactly 8 items
    - Lesson slugs are: "what-is-opencode", "installation", "configuration", "core-concepts", "working-with-agents", "tools-deep-dive", "commands-and-automation", "advanced-setup"
    - Every lesson has a sections array with at least 3 items
    - No lesson section code field contains HTML span tags with classes "prompt", "cmd", "flag", "str" — only plain text
    - Code block sections have language and code fields with plain text content
    - Tab-code sections have tabs array with label, language, and code for each tab variant
    - src/data/cheat-sheet.ts exports cheatSheetData array with exactly 6 categories
    - Cheat sheet categories have IDs: cli-commands, slash-commands, keybinds, special-syntax, install-methods, config-files
    - Running npx tsc --noEmit exits with code 0
  </acceptance_criteria>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | tail -5 && echo "TYPECHECK_OK" || echo "TYPECHECK_FAIL"</automated>
  </verify>
  <done>
    All 8 lessons migrated as structured TypeScript data with correct slugs, difficulty levels, and fully parsed content sections (headings, paragraphs, code blocks, info boxes, tables, steps, tab-code, unordered lists). Cheat sheet has 6 categories with all key-description pairs. No raw HTML syntax highlighting spans in code data. TypeScript compiles cleanly.
  </done>
</task>

</tasks>

<verification>
- npx tsc --noEmit passes with zero errors
- Navbar renders with all 5 nav links and theme toggle
- Sidebar has 8 lesson links with active state detection
- CodeBlock shows syntax-highlighted code with working copy button
- InfoBox renders 3 variants with correct colors (blue/orange/green)
- StepList shows numbered steps with purple circles
- TableWrap renders tables with responsive scroll
- TabBar switches between code blocks on click
- lessons array has 8 items with correct slugs
- cheatSheetData has 6 categories with correct key-description pairs
</verification>

<success_criteria>
1. Layout shell renders: fixed navbar with logo, 5 nav links, theme toggle; mobile sidebar; footer
2. ThemeProvider enables dark/light switching persisted to localStorage
3. All 5 content components render their respective LessonSection types
4. CodeBlock uses Shiki for server-side syntax highlighting with copy-to-clipboard
5. All 8 lessons migrated with faithful content (no truncation, no summarization)
6. Cheat sheet has all 6 categories with correct key-description pairs
7. No syntax-highlighting HTML spans in code block data (plain text only for Shiki)
8. TypeScript strict mode compiles cleanly
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-content/01-02-SUMMARY.md`
</output>
