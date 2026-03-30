---
status: partial
phase: 01-foundation-content
source: ROADMAP.md success criteria, 01-PLAN.md, 02-PLAN.md, 03-PLAN.md
started: 2026-03-30T20:40:00Z
updated: 2026-03-30T20:55:00Z
---

## Current Test

[testing complete]
expected: |
  Navigate to /lessons/configuration. Scroll to "Config Locations (Precedence Order)". A table renders with headers (Priority, Location, Purpose) and 4 data rows. Cells with inline code show monospace styled text. On narrow screens the table scrolls horizontally.
awaiting: user response
expected: |
  Navigate to /lessons/what-is-opencode. Page shows "← Back to Lessons" link at top, chapter label "Chapter 01 · Beginner", title "What is OpenCode?", and the lesson content below. Content includes section headings (h3 with top border), paragraphs, bullet lists, a blue "Tip" info box, and numbered steps with purple circles.
awaiting: user response

## Tests

### 1. Cold Start Smoke Test
expected: Run `npm run dev`. The dev server starts without errors. Open http://localhost:3000 — the page loads showing "Master OpenCode" heading with a gradient, not a blank or error page.
result: pass

### 2. Home Page Hero Section
expected: The home page shows a green dot badge "Free & Open Source — 133K+ Stars", a large gradient heading "Master OpenCode / From Zero to Hero", two CTA buttons ("Start Learning" and "Official Docs"), and a stats row showing "8 Lessons / 40+ Examples / 16 Quizzes".
result: pass

### 3. Home Page Lesson Grid
expected: Scrolling down reveals "Your Journey Starts Here" section with 8 lesson cards. Each card shows a chapter number (Chapter 01–08), title, description, and a difficulty tag (Beginner/Intermediate/Advanced). Clicking a card navigates to /lessons/[slug].
result: pass

### 4. Home Page Agent Loop Diagram
expected: "The Agent Loop" section shows 6 nodes in a row: You → LLM → Tools → Codebase → Result → LLM, each with an emoji icon and label. Arrows connect the nodes. Below it reads "The loop continues until the task is complete or you press Escape to interrupt."
result: issue
reported: "6 nodes should be on one line on full screen but the 6th node wraps to a new line below"
severity: minor

### 5. Home Page Workflow Guides
expected: "Real-World Workflows" section shows 3 expandable cards: "Add a New Feature", "Debug a Crash", "Refactor Legacy Code". Clicking a card header expands it to reveal numbered steps. Clicking again collapses it.
result: pass

### 6. Fixed Navigation Bar
expected: A fixed top navbar shows the Master OpenCode logo (4 purple squares + gradient text), 5 nav links (Lessons, Playground, Challenges, Cheat Sheet, Quiz), a Search button with "Ctrl K" hint, and a moon/sun icon for theme toggle. On mobile (< 768px), links are hidden and a hamburger icon appears.
result: pass

### 7. Lessons Listing Page
expected: Navigate to /lessons. The page shows a "Your Learning Path" heading and renders all 8 lesson cards in a grid, each with chapter number, title, description, and difficulty tag. Clicking any card navigates to that lesson.
result: pass

### 8. Lesson Detail — Content Rendering
expected: |
  Navigate to /lessons/what-is-opencode. Page shows "← Back to Lessons" link at top, chapter label "Chapter 01 · Beginner", title "What is OpenCode?", and the lesson content below. Content includes section headings (h3 with top border), paragraphs, bullet lists, a blue "Tip" info box, and numbered steps with purple circles.
result: pass

### 9. Lesson Detail — Code Blocks
expected: Code blocks throughout lessons display syntax-highlighted code (colored tokens, not plain text). Each code block has a header bar showing the language name (e.g., "bash", "json") and a "Copy" button. Clicking "Copy" changes to "Copied!" briefly and copies code to clipboard.
result: pass

### 10. Lesson Detail — Tabbed Code
expected: Navigate to /lessons/installation. The "Install via Package Managers" section shows a tab bar with buttons (npm, Homebrew, Arch, Windows). Clicking each tab switches the displayed code block content.
result: pass

### 11. Lesson Detail — Tables
expected: Navigate to /lessons/configuration. Scroll to "Config Locations (Precedence Order)". A table renders with headers (Priority, Location, Purpose) and 4 data rows. Cells with inline code show monospace styled text. On narrow screens the table scrolls horizontally.
result: pass

### 12. Lesson Navigation — Prev/Next
expected: |
  On /lessons/what-is-opencode (first lesson), only a "Next →" button is visible at the bottom. On /lessons/installation (middle lesson), both "← Previous" and "Next →" buttons are visible. On /lessons/advanced-setup (last lesson), only "Back to Lessons" button is visible. Clicking each navigates correctly.
result: pass

### 13. Cheat Sheet Page
expected: Navigate to /cheat-sheet. Page shows "Quick Reference" label, "Cheat Sheet" heading, and 6 category cards in a responsive grid: CLI Commands, Slash Commands, Keybinds, Special Syntax, Install Methods, Config Files. Each card has an icon, title, and rows of key-description pairs where keys are monospace-styled.
result: pass

### 14. Dark/Light Theme Toggle
expected: |
  Click the moon icon in the navbar. The entire page switches to light theme — white/light background, dark text. Click the sun icon (now shown). The page switches back to dark theme. Reload the page — the chosen theme persists (not resetting to dark).
result: pass

### 15. Mobile Sidebar
expected: |
  On a narrow viewport (< 768px), the navbar shows a hamburger icon instead of nav links. Tap the hamburger icon — a sidebar slides in from the left showing Home and all 8 lesson links. Tap any link to navigate. Tap the backdrop overlay to close the sidebar.
result: pass

### 16. Footer
expected: |
  Scroll to the bottom of any page. Footer shows "Built for the community — Not affiliated with Anomaly / OpenCode" with GitHub, Docs, and Discord links.
result: pass

## Summary

## Summary

total: 16
passed: 15
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "6 agent loop nodes display on a single horizontal line on full screen"
  status: failed
  reason: "User reported: 6th node wraps to a new line even on full screen"
  severity: minor
  test: 4
  artifacts: []  # Filled by diagnosis
  missing: []    # Filled by diagnosis
  debug_session: ""

- truth: "Tabbed code blocks in lesson content switch tabs client-side without errors"
  status: failed
  reason: "User reported: Clicking Homebrew/Arch/Windows tab produces error 'CodeBlock is an async Client Component. Only Server Components can be async'"
  severity: blocker
  test: 10
  artifacts:
    - path: "src/components/content/tab-bar.tsx"
      issue: "Client Component (useState) renders async Server Component CodeBlock"
  missing:
    - "Extract CodeBlock rendering into a Server Component (TabCodeRenderer)"
    - "TabBar client component renders only tab buttons and passes active index to TabCodeRenderer"
    - "SectionRenderer composes TabBar (client) + TabCodeRenderer (server)"
  debug_session: ""
