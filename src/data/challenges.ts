import type { Challenge } from "@/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "add-a-feature",
    title: "Add a Feature",
    scenario: "You want OpenCode to implement soft-delete for notes and create a new trash screen. You're not sure how it should work yet. What's the best approach?",
    options: [
      "Just tell Build agent to do it",
      "Switch to Plan mode, describe the feature, review the plan, then switch to Build",
      "Use @explore to find all note files, then edit them manually",
      "Run opencode run with a long prompt"
    ],
    correctIndex: 1,
    feedback: "Plan first, then Build. This lets you review the strategy before any code changes."
  },
  {
    id: "debug-an-error",
    title: "Debug an Error",
    scenario: "Your app crashes with 'TypeError: Cannot read properties of undefined (reading map)' at line 42 of users.ts. What's the best prompt?",
    options: [
      "Fix the bug",
      "I'm getting TypeError: Cannot read properties of undefined (reading map) at @src/api/users.ts:42",
      "@general find the bug",
      "Run /help first"
    ],
    correctIndex: 1,
    feedback: "Specific error + file reference = fast, accurate diagnosis. Always include the file path with @."
  },
  {
    id: "quick-one-shot",
    title: "Quick One-Shot",
    scenario: "You need a quick commit message for staged changes without launching the full TUI. Which command?",
    options: [
      "opencode /commit",
      'opencode run "Create a git commit for staged changes"',
      "git commit --ai",
      "opencode commit"
    ],
    correctIndex: 1,
    feedback: "opencode run lets you send a one-shot prompt without entering the TUI."
  },
  {
    id: "read-only-review",
    title: "Read-Only Review",
    scenario: "You want OpenCode to review your code without making any changes. What do you do?",
    options: [
      "Set permission edit to deny globally",
      "Switch to Plan mode or use @explore",
      "Just ask nicely in Build mode",
      "Create a new agent each time"
    ],
    correctIndex: 1,
    feedback: "Plan mode is read-only by default. @explore is also read-only. Both prevent unwanted changes."
  },
  {
    id: "custom-workflow",
    title: "Custom Workflow",
    scenario: "Your team runs the same code review checklist every PR. How do you automate this?",
    options: [
      "Type the checklist every time",
      "Create a /review command in .opencode/commands/review.md with your checklist as the template",
      "Use a shell alias",
      "There's no way to do this"
    ],
    correctIndex: 1,
    feedback: "Custom commands are reusable prompts. Create once, run with /command-name forever."
  },
  {
    id: "control-permissions",
    title: "Control Permissions",
    scenario: "You want OpenCode to auto-approve git commands but ask before any npm/publish commands. How?",
    options: [
      "You can't do this",
      "Set bash permission to '*' with specific overrides: '*': allow, 'npm *': ask",
      "Disable the bash tool",
      "Use Plan mode only"
    ],
    correctIndex: 1,
    feedback: "Bash permissions support glob patterns. Last matching rule wins, so put broad rules first."
  }
];
