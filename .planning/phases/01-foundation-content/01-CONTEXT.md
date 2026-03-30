# Phase 1: Foundation & Content - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 15 project, migrate all 8 lessons and cheat sheet content from the HTML prototype into structured TypeScript data files, and deliver the complete reading experience with dark-themed layout. Interactive features (quiz, challenges, terminal simulator, search) are Phase 2. Auth/Supabase is Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Content data structure
- **D-01:** Lesson content uses structured TypeScript discriminated unions (not raw HTML strings). Each lesson is a typed object with `slug`, `title`, `description`, `difficulty`, `label`, and an array of typed content blocks.
- **D-02:** Content block types include: `heading` (h3), `paragraph` (with inline code support), `codeBlock` (with language label + copy button), `infoBox` (tip/warning/success), `stepList` (numbered steps 1-N), `table` (headers + rows), `tabBar` (tab labels + tab content blocks), `unorderedList` (bullet points with strong text support).
- **D-03:** Tab bars store multiple code blocks, one per tab. Each tab has a label and an array of content blocks. The active tab is managed via client component state.
- **D-04:** Code within paragraphs and list items supports inline code spans (backtick notation or explicit `inlineCode` type).

### Code highlighting
- **D-05:** Use Shiki for server-side syntax highlighting in React Server Components. Zero client JS overhead.
- **D-06:** Create a custom Shiki theme or CSS variable overrides that match the prototype's syntax colors (green prompts, purple commands, orange flags, green strings, blue keys, muted comments).

### Navigation & layout
- **D-07:** Fixed top navigation bar matching the prototype: logo (SVG + gradient text), nav links (Lessons, Playground, Challenges, Cheat Sheet, Quiz), search button (Ctrl+K), theme toggle. All links present from Phase 1 even if target pages are Phase 2.
- **D-08:** Lesson pages have "Back to Lessons" navigation and Previous/Next lesson buttons at bottom.
- **D-09:** Responsive layout following the prototype's breakpoints. Mobile: simplified nav with hamburger toggle to sidebar.
- **D-10:** Dark mode is the default. Light mode supported via CSS variable transitions. Theme stored in localStorage.

### Home page
- **D-11:** Home page includes all prototype sections: hero (badge, gradient heading, description, CTA buttons, stats), lesson grid (8 chapter cards with difficulty tags), agent loop visualization, and workflow guides.
- **D-12:** Design should match the prototype structure but feel more unique, minimal, simple, and professional — elevate the aesthetic beyond a direct copy.
- **D-13:** Agent loop visualization is a static diagram in Phase 1 (animation deferred to Phase 2).
- **D-14:** Workflow guides are collapsible cards (matching the prototype's expand/collapse behavior) with step-by-step instructions.
- **D-15:** Lesson grid uses card-based layout with chapter number, title, description, difficulty tag (Beginner/Intermediate/Advanced), and hover effects.

### Cheat sheet
- **D-16:** Cheat sheet page uses a responsive grid of 6 cards matching the prototype's categories: CLI Commands, Slash Commands, Keybinds, Special Syntax, Install Methods, Config Files.
- **D-17:** Each cheat card has a header with icon, and rows of key-description pairs.

### Documentation
- **D-18:** AGENTS.md documents tech stack, folder structure, data schema, auth pattern, conventions, and Phase 2 scope.

### the agent's Discretion
- Exact spacing, border-radius, and typography values
- Shiki theme color mapping details
- Mobile sidebar slide-in animation approach
- Loading states and error handling for pages
- Exact folder structure within /src/data/ for content files

</decisions>

<specifics>
## Specific Ideas

- "Make it like the prototype but with creativity — more unique, minimal, simple, and professional"
- Hero gradient text effect should be preserved (purple → pink → orange)
- Info boxes use distinct colored backgrounds: blue for tip, orange for warning, green for success/best-practice
- Code block headers show language label and Copy button
- Step list items have purple numbered circles (1, 2, 3...)
- Lesson cards have subtle hover effects (border color change, slight translateY)

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Content source
- `index.html` — Source of truth for all content (8 lessons, cheat sheet, layout, CSS variables, navigation structure). Read lines 514-636 for lesson data, lines 488-496 for cheat sheet HTML, lines 16-287 for CSS/design tokens.

### Project constraints
- `.planning/PROJECT.md` — Tech stack constraints (Next.js 15, Tailwind v4 CSS-first, TypeScript strict, no tailwind.config.js)
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: FND-01–04, CONT-01/04–06, PAGE-01–03/05, DOC-01

### Research
- `.planning/research/STACK.md` — Verified versions: Shiki 4.0.2, Tailwind CSS v4.2.2 with @theme/@plugin directives
- `.planning/research/ARCHITECTURE.md` — RSC/Client component boundary recommendations, content migration approach

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `index.html` CSS variables (lines 18-42): Complete color palette (--bg, --bg-2, --accent, --green, --blue, --orange, etc.), radius values, shadow definitions, transition timing. These map directly to Tailwind v4 @theme tokens.
- `index.html` lesson data (lines 514-613): All 8 lessons with full content as HTML strings — the content to be parsed into structured blocks.
- `index.html` cheat sheet HTML (lines 488-496): 6 cheat card categories with key/description pairs.

### Established Patterns
- Greenfield project — no existing Next.js patterns established yet
- Tailwind v4 CSS-first config required — all theme tokens go in globals.css via @theme directive
- CSS variable theming from the prototype provides a proven color system to port

### Integration Points
- App Router layout.tsx — global nav bar, theme provider, footer
- /src/data/ — content data files consumed by RSC page components
- /src/components/ — shared content rendering components (CodeBlock, InfoBox, StepList, etc.)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-content*
*Context gathered: 2026-03-30*
