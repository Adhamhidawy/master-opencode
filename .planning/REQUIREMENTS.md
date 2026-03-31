# Requirements: Master OpenCode

**Defined:** 2026-03-30
**Core Value:** Users can learn OpenCode from zero to hero through interactive, hands-on lessons with real-time feedback and progress tracking

## v1 Requirements

### Content Migration

- [ ] **CONT-01**: All 8 lessons (What is OpenCode, Installation, Configuration, Core Concepts, Working with Agents, Tools Deep Dive, Commands & Automation, Advanced Setup) are migrated from index.html to structured TypeScript data files under /src/data/
- [x] **CONT-02**: All 6 challenges with titles, scenarios, answer options, correct answers, and feedback explanations are migrated to structured TypeScript data
- [x] **CONT-03**: All 10 quiz questions with question text, answer options, correct answer index, and scoring logic are migrated to structured TypeScript data
- [ ] **CONT-04**: Cheat sheet with 6 categories (CLI Commands, Slash Commands, Keybinds, Special Syntax, Install Methods, Config Files) is migrated to structured TypeScript data
- [ ] **CONT-05**: Lesson content preserves code blocks with syntax highlighting, info boxes (tip/warning/success), step lists, tables, tab bars, and inline code styling
- [ ] **CONT-06**: Content data files are type-safe with discriminated unions for different content block types

### Pages & Routing

- [ ] **PAGE-01**: Home page (/) displays hero section, lesson grid (8 chapters), agent loop visualization, and workflow guides
- [ ] **PAGE-02**: Lessons listing page (/lessons) shows all 8 lessons with chapter numbers, difficulty tags, and descriptions
- [ ] **PAGE-03**: Individual lesson page (/lessons/[slug]) renders full lesson content with previous/next navigation
- [x] **PAGE-04**: Challenges page (/challenges) presents all 6 interactive challenges with scenario-based multiple choice
- [ ] **PAGE-05**: Cheat sheet page (/cheat-sheet) displays quick reference cards in a responsive grid
- [x] **PAGE-06**: Quiz page (/quiz) presents all 10 quiz questions with scoring (7/10 to pass) and reset functionality

### Foundation & Layout

- [ ] **FND-01**: Next.js 15 project scaffolded with App Router, TypeScript strict mode, and Tailwind CSS v4 using CSS-first config (@theme in globals.css, NO tailwind.config.js)
- [ ] **FND-02**: Dark mode is the default theme, matching the HTML prototype aesthetic
- [ ] **FND-03**: Global layout with fixed navigation bar featuring logo, nav links (Lessons, Playground, Challenges, Cheat Sheet, Quiz), and theme toggle
- [ ] **FND-04**: Responsive design that works on mobile and desktop, matching the prototype's media query breakpoints

### Interactive Features

- [ ] **INTR-01**: Terminal simulator on /playground page replicates the HTML prototype's command input/output experience with predefined command responses
- [ ] **INTR-02**: Agent loop animation visualizes the You → LLM → Tools → Codebase → Result → LLM cycle
- [ ] **INTR-03**: Theme toggle switches between dark and light modes with CSS variable transitions
- [ ] **INTR-04**: Search overlay (Ctrl+K) searches across all lesson titles and content
- [x] **INTR-05**: Challenge cards accept user answer selection, show correct/incorrect feedback with explanation
- [x] **INTR-06**: Quiz cards accept answer selection, show correct/incorrect feedback, track score, and display pass/fail result

### Authentication

- [x] **AUTH-01**: User can sign in with GitHub OAuth via Clerk
- [ ] **AUTH-02**: Sign-in page is accessible from navigation when user is not authenticated
- [x] **AUTH-03**: Auth middleware protects only the /progress route (all other pages are public)
- [ ] **AUTH-04**: Clerk user ID is available as a typed property for database operations

### Database & Progress

- [x] **DATA-01**: Supabase client setup using @supabase/ssr package with both server and browser clients
- [x] **DATA-02**: SQL migration file defines user_progress table with clerk_user_id (text, FK), lesson completions, quiz scores, and challenge completions
- [x] **DATA-03**: Clerk user ID (clerk_user_id text field) is the foreign key in the user_progress table (not Supabase Auth)
- [ ] **DATA-04**: Progress data is persisted to Supabase when user is authenticated, falls back to localStorage for anonymous users

### Documentation

- [ ] **DOC-01**: AGENTS.md in project root documents tech stack, folder structure, data schema, auth pattern, conventions, and what Phase 2 will build

## v2 Requirements

### Progress Tracking UI

- **PROG-01**: User can view their learning progress on a dedicated /progress page showing completed lessons, quiz scores, and challenge results
- **PROG-02**: Progress bar in navigation shows overall completion percentage
- **PROG-03**: Lesson cards show completion checkmarks for finished lessons

### Enhanced Content

- **ENHC-01**: Expandable workflow guide cards on home page (Add a Feature, Debug a Crash, Refactor Legacy Code)
- **ENHC-02**: Mobile sidebar navigation matching the prototype's hamburger menu behavior

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mobile native app | Web-first, responsive is sufficient |
| User-generated content | Content is curated from the HTML prototype |
| Payment/monetization | Platform is free for everyone |
| CMS or admin panel | Content lives in code as TypeScript data files |
| Social features (comments, sharing) | Not core to the learning value |
| In-browser code editor/sandbox | This is a tool-learning platform, not a coding exercise platform |
| Real PTY terminal connection | Simulator is purely visual, xterm.js not needed |
| Multi-language content | English only for v1 |
| Email notifications | Not applicable for this type of platform |
| Analytics/tracking beyond progress | Not needed for v1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| CONT-01 | Phase 1 | Pending |
| CONT-04 | Phase 1 | Pending |
| CONT-05 | Phase 1 | Pending |
| CONT-06 | Phase 1 | Pending |
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| PAGE-05 | Phase 1 | Pending |
| DOC-01 | Phase 1 | Pending |
| INTR-01 | Phase 2 | Pending |
| INTR-02 | Phase 2 | Pending |
| INTR-03 | Phase 2 | Pending |
| INTR-04 | Phase 2 | Pending |
| INTR-05 | Phase 2 | Complete |
| INTR-06 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| PAGE-04 | Phase 2 | Complete |
| PAGE-06 | Phase 2 | Complete |
| AUTH-01 | Phase 3 | Complete |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Complete |
| AUTH-04 | Phase 3 | Pending |
| DATA-01 | Phase 3 | Complete |
| DATA-02 | Phase 3 | Complete |
| DATA-03 | Phase 3 | Complete |
| DATA-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-30*
*Last updated: 2026-03-30 after roadmap creation*
