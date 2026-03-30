# Roadmap: Master OpenCode

## Overview

Build an interactive learning platform for OpenCode in three phases: first, deliver the complete reading experience (all lessons, cheat sheet, polished layout); second, add interactive learning features (terminal simulator, challenges, quiz, search); third, wire up authentication and persistent progress so users can save their work across sessions.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Content** - Scaffold the app, migrate all content from HTML prototype, deliver the complete reading experience
- [ ] **Phase 2: Interactive Learning** - Add terminal simulator, challenges, quiz, search, animations, and theme toggle
- [ ] **Phase 3: Auth & Persistent Progress** - Wire up Clerk auth, Supabase database, and cross-session progress persistence

## Phase Details

### Phase 1: Foundation & Content
**Goal**: Users can browse and read all learning content in a polished dark-themed interface
**Depends on**: Nothing (first phase)
**Requirements**: FND-01, FND-02, FND-03, FND-04, CONT-01, CONT-04, CONT-05, CONT-06, PAGE-01, PAGE-02, PAGE-03, PAGE-05, DOC-01
**Success Criteria** (what must be TRUE):
  1. All 8 lessons are accessible at /lessons/[slug] with full content rendered including code blocks, info boxes, tables, and step lists
  2. The cheat sheet displays all 6 categories in a responsive grid layout
  3. A dark-themed responsive layout with fixed navigation provides access to all sections (Lessons, Playground, Challenges, Cheat Sheet, Quiz)
  4. The home page displays a hero section and lesson grid linking to each chapter
  5. AGENTS.md documents the tech stack, folder structure, data schema, auth pattern, and conventions
**Plans**: TBD

### Phase 2: Interactive Learning
**Goal**: Users can test their knowledge through interactive challenges, quizzes, a terminal simulator, and search
**Depends on**: Phase 1
**Requirements**: INTR-01, INTR-02, INTR-03, INTR-04, INTR-05, INTR-06, CONT-02, CONT-03, PAGE-04, PAGE-06
**Success Criteria** (what must be TRUE):
  1. User can type commands in the terminal simulator on /playground and see predefined responses with typing animation
  2. User can complete all 6 scenario-based challenges, selecting answers and seeing correct/incorrect feedback with explanations
  3. User can take the 10-question quiz, see their scored result (7/10 to pass), and reset to try again
  4. User can toggle between dark and light themes and search all content using Ctrl+K
  5. The home page features an animated agent loop visualization cycling through the You → LLM → Tools → Codebase → Result stages
**Plans**: TBD
**UI hint**: yes

### Phase 3: Auth & Persistent Progress
**Goal**: Users can save their learning progress across sessions by signing in with GitHub
**Depends on**: Phase 2
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, DATA-01, DATA-02, DATA-03, DATA-04
**Success Criteria** (what must be TRUE):
  1. User can sign in with their GitHub account via Clerk from any page's navigation
  2. Authenticated user's progress (lesson completions, quiz scores, challenge results) persists to Supabase across browser sessions
  3. Unauthenticated user's progress is saved in localStorage as a seamless fallback
  4. The /progress route requires authentication; all learning content pages remain publicly accessible
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Content | 0/? | Not started | - |
| 2. Interactive Learning | 0/? | Not started | - |
| 3. Auth & Persistent Progress | 0/? | Not started | - |
