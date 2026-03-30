# Feature Landscape

**Domain:** Interactive Learning Platform
**Researched:** 2026-03-30

## Table Stakes

Features users expect from a learning platform. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Structured lessons (8) | Core value proposition — users come to learn | Low | Static TypeScript data files, rendered via Server Components |
| Lesson navigation (prev/next + sidebar) | Standard in all tutorial platforms (Next.js Learn, Svelte Tutorial) | Low | Slug-based routing (`/lessons/[slug]`), sidebar with lesson links |
| Code blocks with copy button | Developer tool content is unusable without copyable code | Low | Standard pattern: header + language label + copy button |
| Interactive challenges (6) | Hands-on practice is expected in coding tutorials | Medium | Scenario-based multiple-choice with feedback explanations |
| Quiz system (10 questions) | Self-assessment is standard in learning platforms | Medium | Options, scoring (7/10 to pass), immediate feedback per question |
| Cheat sheet (6 categories) | Quick reference is standard for developer tools | Low | CLI Commands, Slash Commands, Keybinds, Special Syntax, Install Methods, Config Files |
| Dark mode (default) | Developer audience expects dark theme | Low | Tailwind `dark:` classes, default to dark. Light mode via toggle. |
| Responsive design | Users access from various devices | Low | Tailwind breakpoints, content already responsive in prototype |
| Progress tracking (visual) | Users want to see how far they've come | Medium | localStorage first, Supabase persistence in Phase 2 |
| Search functionality | Ctrl+K search is standard in developer docs | Medium | Full-text search across lessons, challenges, cheat sheet |
| Code syntax highlighting | Developer learning content requires readable code | Low | Shiki (server-side), zero runtime cost |

## Differentiators

Features that set Master OpenCode apart from generic learning platforms.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Terminal simulator / playground | No other learning platform for a CLI tool simulates the terminal experience. Users practice commands without installing anything. | High | Custom CSS terminal with typing animations, command history, 9 predefined responses. NOT xterm.js — that's for real PTY connections. |
| Scenario-based challenges | Real-world scenarios ("Debug a crash", "Add a feature") test judgment, not syntax. Unique to this platform. | Medium | 6 challenges already exist in prototype. Content is the differentiator. |
| Animated agent loop visualization | Visual, animated diagram showing the agent loop (You → LLM → Tools → Codebase → Result). Makes abstract AI agent concepts concrete. | Medium | Framer Motion for multi-step animation with cycling active node. |
| Workflow guides | Step-by-step real-world workflows with collapsible steps. Teaches process, not just commands. | Low | 3 workflow cards from prototype. Simple accordion pattern. |
| Free, no paywall, no auth required for content | Most learning platforms require auth or payment. Content is freely accessible. Auth only needed for cross-device progress. | Low | Clerk auth protects only `/progress` route per PROJECT.md. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Real terminal / sandbox execution | Security risk, infrastructure complexity, out of scope. This teaches commands, not general programming. | Simulated terminal with pre-scripted outputs |
| In-browser code editor (Monaco/CodeMirror) | Users learn CLI commands, not write code. An editor adds massive complexity for near-zero educational value. | Terminal simulator is the primary interactive element |
| User-generated content | Curation is the value — user content dilutes quality. Moderation becomes a full-time job. | Content lives in TypeScript data files. Accept PRs via GitHub. |
| CMS / admin panel | Adds a full second application. Technical content benefits from version control and type safety. | Git-based content management, PR review process |
| Gamification (badges, streaks, leaderboards) | Feels patronizing to developer audience. Intrinsic motivation (learning a useful tool) is stronger. | Simple progress tracking (lessons completed, quiz score) |
| Social features (comments, sharing) | Scope creep, moderation burden. Explicitly out of scope per PROJECT.md. | Focus on individual learning experience |
| Video content | Hosting costs, not searchable, can't be copy-pasted, gets outdated quickly. | Animated visualizations + text + interactive terminal |
| AI-powered chat assistant | Requires LLM integration, guardrails, cost management. Content should answer questions directly. | Comprehensive search + well-structured cheat sheet |
| Mobile native app | Web-first is sufficient. Responsive design covers mobile. Explicitly out of scope. | Responsive web design with Tailwind |
| Payment / monetization | Project is free for everyone. Explicitly out of scope. | No Stripe, no paywalls, no ads |
| Email notifications | Requires email service, compliance, preference management. Developers return when they need it. | Zero notification infrastructure. Progress persistence for returning users. |

## Feature Dependencies

```
Structured Lessons (content migration)
    |
    +--requires--> Lesson Navigation (prev/next + sidebar)
    |
    +--requires--> Code Blocks (copy, syntax highlighting via Shiki)
    |
    +--enhances--> Progress Tracking (marks lessons as complete)
    |                  |
    |                  +--requires [auth]--> Clerk Auth Setup
    |                                       |
    |                                       +--requires--> Supabase user_progress table
    |
    +--enhances--> Search (indexes lesson content)
    |
    +--enhances--> Quiz (tests lesson knowledge)
    |
    +--enhances--> Challenges (applies lesson concepts)

Terminal Simulator (standalone)
    |
    +--enhances--> Lessons (referenced in lesson content)
    +--standalone--> Independent playground page

Cheat Sheet (fully standalone, no dependencies)

Agent Loop Visualization (standalone)
    |
    +--enhances--> Core Concepts lesson (explains the agent loop)

Dark/Light Theme + Responsive Design
    |
    +--required-by--> All pages (global layout)
```

## MVP Recommendation

Prioritize (P1 — launch blockers):
1. **Structured lessons (all 8)** — Core value, content migration from HTML prototype
2. **Lesson navigation + sidebar** — Users can't move through content without it
3. **Code blocks with copy** — Developer tool content is unusable without copyable code
4. **Challenges (all 6)** — Key differentiator, tests real-world judgment
5. **Quiz (all 10 questions)** — Standard self-assessment, validates learning
6. **Cheat sheet (all 6 categories)** — High value, low effort
7. **Dark mode default + light toggle** — Developer expectation
8. **Terminal simulator** — The killer feature
9. **Agent loop visualization** — Low effort, high impact for understanding
10. **Progress bar (localStorage)** — Visual feedback, no auth needed initially

Defer (P2 — add after core works):
- **Search (Ctrl+K)**: Medium effort, users can navigate via sidebar initially
- **Workflow guides**: 3 cards from prototype, low effort but not launch-critical
- **Persistent progress (Clerk + Supabase)**: High effort, auth + database setup. localStorage first.
- **Auth-protected /progress route**: Depends on Clerk + Supabase

## Competitor Comparison

| Feature | Codecademy | Next.js Learn | learn.svelte.dev | Our Approach |
|---------|-----------|---------------|------------------|--------------|
| Interactive lessons | In-browser editor | Text + code examples | Live editor + output | Text + terminal simulator |
| Code execution | Real sandbox | No (local dev) | In-browser compile | Simulated terminal |
| Progress tracking | Account-based | Account-synced | Browser-based | localStorage → Supabase |
| Auth required | Yes | Yes (for sync) | No | Optional (only /progress) |
| Pricing | Freemium ($20/mo) | Free | Free | Free |
| Terminal simulation | No | No | No | Yes (unique) |
| Agent visualization | No | No | No | Yes (unique) |

## Sources

- Project requirements from `.planning/PROJECT.md`
- HTML prototype analysis (`index.html` — 816 lines, source of truth)
- Competitor analysis: Codecademy, Next.js Learn, learn.svelte.dev, Exercism, javascript.info, learngitbranching.js.org
