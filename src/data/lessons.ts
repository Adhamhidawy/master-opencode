import type { Lesson } from "@/types/lesson";

export const lessons: Lesson[] = [
  {
    slug: "what-is-opencode",
    title: "What is OpenCode?",
    description:
      "OpenCode is the open-source AI coding agent built for the terminal, desktop, and IDE. It helps you write, refactor, debug, and understand code using any LLM provider.",
    chapter: 1,
    difficulty: "beginner",
    label: "Chapter 01 · Beginner",
    sections: [
      { type: "heading", text: "The Big Picture" },
      {
        type: "paragraph",
        text: 'OpenCode is an <strong>AI coding agent</strong> — not just a chatbot. It can read your codebase, edit files, run terminal commands, and execute multi-step plans autonomously. Think of it as a senior developer pair-programming with you 24/7.',
      },
      {
        type: "paragraph",
        text: 'With over <strong>133,000 GitHub stars</strong>, <strong>800+ contributors</strong>, and <strong>5 million monthly users</strong>, it\'s the most popular open-source coding agent in the world.',
      },
      { type: "heading", text: "What Makes OpenCode Different?" },
      {
        type: "unorderedList",
        items: [
          "<strong>100% Open Source</strong> — Full transparency, community-driven",
          "<strong>Provider-Agnostic</strong> — Use Claude, GPT, Gemini, local models, or 75+ providers",
          "<strong>LSP Enabled</strong> — Automatically loads language servers for code intelligence",
          "<strong>Multi-Session</strong> — Run multiple agents in parallel on the same project",
          "<strong>Client/Server Architecture</strong> — Run the engine remotely, connect from any device",
          "<strong>Privacy First</strong> — No code or context data is stored by OpenCode",
        ],
      },
      { type: "heading", text: "Available Interfaces" },
      {
        type: "unorderedList",
        items: [
          "<strong>Terminal (TUI)</strong> — The primary interface, built by Neovim users",
          "<strong>Desktop App</strong> — macOS, Windows, and Linux (beta)",
          "<strong>IDE Extension</strong> — Integrated into your favorite editor",
          '<strong>CLI</strong> — One-shot: <code class="inline">opencode run "prompt"</code>',
          '<strong>Web</strong> — Browser-based via <code class="inline">opencode serve</code>',
        ],
      },
      {
        type: "info-box",
        variant: "tip",
        label: "Tip",
        content:
          "OpenCode is similar to Claude Code but open source, supports any provider, and has built-in LSP support. You can even use your GitHub Copilot or ChatGPT Plus subscription!",
      },
      { type: "heading", text: "How It Works" },
      {
        type: "paragraph",
        text: "OpenCode follows an <strong>agent loop</strong>:",
      },
      {
        type: "steps",
        items: [
          "You send a message (a question, task, or instruction)",
          "The LLM analyzes the request and decides which tools to use",
          "Tools execute actions: read files, run commands, edit code",
          "Results are fed back to the LLM for the next step",
          "The loop continues until the task is complete or you interrupt",
        ],
      },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    description:
      "Getting OpenCode installed takes less than a minute. Choose the method that works best for you.",
    chapter: 2,
    difficulty: "beginner",
    label: "Chapter 02 · Beginner",
    sections: [
      { type: "heading", text: "One-Line Install (Recommended)" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: "$ curl -fsSL https://opencode.ai/install | bash",
      },
      { type: "heading", text: "Install via Package Managers" },
      {
        type: "tab-code",
        tabs: [
          {
            label: "npm",
            language: "bash",
            code: `$ npm install -g opencode-ai@latest
# or with bun, pnpm, yarn
$ bun install -g opencode-ai`,
          },
          {
            label: "Homebrew",
            language: "bash",
            code: `# Recommended tap (always up to date)
$ brew install anomalyco/tap/opencode
# Or the official formula
$ brew install opencode`,
          },
          {
            label: "Arch",
            language: "bash",
            code: `# Arch Linux (Stable)
$ sudo pacman -S opencode
# Arch Linux (Latest from AUR)
$ paru -S opencode-bin`,
          },
          {
            label: "Windows",
            language: "powershell",
            code: `# Using Scoop
> scoop install opencode
# Using Chocolatey
> choco install opencode`,
          },
        ],
      },
      { type: "heading", text: "Desktop App (Beta)" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: `# macOS
$ brew install --cask opencode-desktop
# Windows
> scoop bucket add extras ; scoop install extras/opencode-desktop`,
      },
      {
        type: "info-box",
        variant: "tip",
        label: "Prerequisites",
        content:
          "You'll need a modern terminal like <strong>WezTerm</strong>, <strong>Alacritty</strong>, <strong>Ghostty</strong>, or <strong>Kitty</strong>. On Windows, use WSL.",
      },
      { type: "heading", text: "Verify Installation" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: `$ opencode --version
opencode v1.3.7`,
      },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration",
    description:
      "Connect your preferred AI provider and configure OpenCode to work with your workflow.",
    chapter: 3,
    difficulty: "beginner",
    label: "Chapter 03 · Beginner",
    sections: [
      { type: "heading", text: "Quick Setup with Zen (Recommended)" },
      {
        type: "paragraph",
        text: "Use <strong>OpenCode Zen</strong> — curated models tested for coding agents:",
      },
      {
        type: "steps",
        items: [
          'Run <code class="inline">/connect</code>, select <strong>opencode</strong>',
          "Sign in at opencode.ai/auth",
          "Copy your API key and paste it",
        ],
      },
      { type: "heading", text: "Using Other Providers" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: `# Anthropic (Claude)
$ export ANTHROPIC_API_KEY=sk-ant-...
# OpenAI (GPT)
$ export OPENAI_API_KEY=sk-...
# Google (Gemini)
$ export GOOGLE_API_KEY=AIza...`,
      },
      { type: "heading", text: "Config File Structure" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: `{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-20250514",
  "provider": {
    "anthropic": {
      "options": { "apiKey": "{env:ANTHROPIC_API_KEY}" }
    }
  }
}`,
      },
      { type: "heading", text: "Config Locations (Precedence Order)" },
      {
        type: "table",
        headers: ["Priority", "Location", "Purpose"],
        rows: [
          [
            "1 (lowest)",
            '<code class="inline">.well-known/opencode</code>',
            "Org defaults",
          ],
          [
            "2",
            '<code class="inline">~/.config/opencode/opencode.json</code>',
            "User prefs",
          ],
          [
            "3",
            '<code class="inline">OPENCODE_CONFIG</code> env',
            "Custom overrides",
          ],
          [
            "4 (highest)",
            '<code class="inline">opencode.json</code> in project',
            "Project settings",
          ],
        ],
      },
      {
        type: "info-box",
        variant: "tip",
        label: "Tip",
        content:
          'Configs are <strong>merged</strong>, not replaced. Use <code class="inline">{env:VAR}</code> and <code class="inline">{file:path}</code> for variable substitution.',
      },
      { type: "heading", text: "Initialize Your Project" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: `$ cd /path/to/project
$ opencode
# Inside TUI:
> /init`,
      },
      {
        type: "paragraph",
        text: 'The <code class="inline">/init</code> command creates an <code class="inline">AGENTS.md</code> file. <strong>Commit it to Git.</strong>',
      },
    ],
  },
  {
    slug: "core-concepts",
    title: "Core Concepts",
    description:
      "Understand the fundamental building blocks: sessions, agents, tools, and the agent loop.",
    chapter: 4,
    difficulty: "beginner",
    label: "Chapter 04 · Beginner",
    sections: [
      { type: "heading", text: "Sessions" },
      {
        type: "paragraph",
        text: 'A <strong>session</strong> is a conversation with OpenCode containing messages, tool calls, and snapshots for undo/redo. Run multiple sessions with <code class="inline">Ctrl+X → N</code>.',
      },
      { type: "heading", text: "Agents" },
      {
        type: "table",
        headers: ["Agent", "Mode", "Purpose"],
        rows: [
          ["<strong>Build</strong>", "Full access", "Default for all development work"],
          ["<strong>Plan</strong>", "Read-only + Ask", "Analysis and planning"],
        ],
      },
      {
        type: "paragraph",
        text: 'Switch with <code class="inline">Tab</code>. Current agent shown in lower-right.',
      },
      { type: "heading", text: "The Agent Loop" },
      {
        type: "steps",
        items: [
          "<strong>User sends a message</strong>",
          "<strong>LLM plans</strong> which files to read, tools to use",
          '<strong>Agent reads files</strong> with <code class="inline">read</code>/<code class="inline">glob</code>',
          '<strong>Agent edits</strong> with <code class="inline">edit</code> tool',
          '<strong>Agent runs commands</strong> with <code class="inline">bash</code>',
          "<strong>Agent responds</strong> with summary",
        ],
      },
      { type: "heading", text: "Tools Overview" },
      {
        type: "table",
        headers: ["Tool", "Description"],
        rows: [
          ['<code class="inline">bash</code>', "Execute shell commands"],
          ['<code class="inline">read</code>', "Read file contents"],
          ['<code class="inline">edit</code>', "Edit files with string replacement"],
          ['<code class="inline">write</code>', "Create/overwrite files"],
          ['<code class="inline">glob</code>', "Find files by pattern"],
          ['<code class="inline">grep</code>', "Search content with regex"],
          ['<code class="inline">webfetch</code>', "Fetch web content"],
          ['<code class="inline">websearch</code>', "Search the web"],
          ['<code class="inline">question</code>', "Ask user for input"],
          ['<code class="inline">todowrite</code>', "Manage task lists"],
        ],
      },
      {
        type: "info-box",
        variant: "success",
        label: "Best Practice",
        content:
          "Use <strong>Plan mode</strong> first to get a strategy, then <strong>Build mode</strong> to execute.",
      },
    ],
  },
  {
    slug: "working-with-agents",
    title: "Working with Agents",
    description:
      "Master the agent system: Build vs Plan, custom agents, and subagents.",
    chapter: 5,
    difficulty: "intermediate",
    label: "Chapter 05 · Intermediate",
    sections: [
      { type: "heading", text: "Primary Agents: Build & Plan" },
      {
        type: "paragraph",
        text: "<strong>Build</strong> has full access to all tools. <strong>Plan</strong> requires approval for edits and bash commands.",
      },
      {
        type: "info-box",
        variant: "tip",
        label: "Workflow",
        content:
          'Start in Plan → review → switch to Build → "Go ahead."',
      },
      { type: "heading", text: "Subagents" },
      {
        type: "table",
        headers: ["Subagent", "Purpose", "Invoke"],
        rows: [
          [
            "<strong>General</strong>",
            "Complex research & multi-step tasks",
            '<code class="inline">@general</code>',
          ],
          [
            "<strong>Explore</strong>",
            "Fast, read-only codebase exploration",
            '<code class="inline">@explore</code>',
          ],
        ],
      },
      { type: "heading", text: "Creating Custom Agents" },
      {
        type: "code",
        language: "markdown",
        label: "~/.config/opencode/agents/review.md",
        code: `---
description: Reviews code for quality
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
permission:
  edit: deny
  bash:
    "*": ask
    "git diff": allow
---
You are a code reviewer. Focus on:
- Code quality and best practices
- Potential bugs and edge cases
- Performance and security`,
      },
      {
        type: "paragraph",
        text: 'Or use: <code class="inline">opencode agent create</code>',
      },
      { type: "heading", text: "Agent Options" },
      {
        type: "table",
        headers: ["Option", "Description"],
        rows: [
          ['<code class="inline">description</code>', "What it does (required)"],
          ['<code class="inline">mode</code>', "primary / subagent / all"],
          ['<code class="inline">model</code>', "Override model"],
          ['<code class="inline">temperature</code>', "0.0 (focused) to 1.0 (creative)"],
          ['<code class="inline">steps</code>', "Max iterations"],
          ['<code class="inline">permission</code>', "Fine-grained tool access"],
        ],
      },
    ],
  },
  {
    slug: "tools-deep-dive",
    title: "Tools Deep Dive",
    description:
      "Every built-in tool explained with practical examples.",
    chapter: 6,
    difficulty: "intermediate",
    label: "Chapter 06 · Intermediate",
    sections: [
      { type: "heading", text: "File Operations" },
      {
        type: "code",
        language: "bash",
        label: "Example Prompts",
        code: `> How is auth handled in @src/middleware/auth.ts
> Show me lines 50-100 of @src/index.ts
> Find all TypeScript files in src/components
> Search for all TODO comments`,
      },
      { type: "heading", text: "Editing Files" },
      {
        type: "paragraph",
        text: 'The <code class="inline">edit</code> tool uses <strong>exact string replacement</strong> for precise, predictable changes.',
      },
      { type: "heading", text: "Permissions System" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: `{
  "permission": {
    "edit": "ask",
    "bash": {
      "*": "ask",
      "git status *": "allow",
      "git diff *": "allow"
    },
    "webfetch": "allow"
  }
}`,
      },
      { type: "heading", text: "Tool Reference" },
      {
        type: "table",
        headers: ["Tool", "Key", "What It Does"],
        rows: [
          ['<code class="inline">bash</code>', '<code class="inline">bash</code>', "Run shell commands"],
          ['<code class="inline">edit</code>', '<code class="inline">edit</code>', "Replace strings in files"],
          ['<code class="inline">write</code>', '<code class="inline">edit</code>', "Create/overwrite files"],
          ['<code class="inline">read</code>', '<code class="inline">read</code>', "Read file contents"],
          ['<code class="inline">grep</code>', '<code class="inline">grep</code>', "Search content with regex"],
          ['<code class="inline">glob</code>', '<code class="inline">glob</code>', "Find files by pattern"],
          ['<code class="inline">webfetch</code>', '<code class="inline">webfetch</code>', "Fetch URLs"],
          ['<code class="inline">websearch</code>', '<code class="inline">websearch</code>', "Search the web"],
          ['<code class="inline">question</code>', '<code class="inline">question</code>', "Ask user questions"],
          ['<code class="inline">todowrite</code>', '<code class="inline">todowrite</code>', "Manage tasks"],
          ['<code class="inline">lsp</code>', '<code class="inline">lsp</code>', "LSP operations (experimental)"],
        ],
      },
      {
        type: "info-box",
        variant: "tip",
        label: "Tip",
        content:
          "Glob patterns in bash permissions: the <strong>last matching rule wins</strong>. Put broad rules first, specific ones after.",
      },
    ],
  },
  {
    slug: "commands-and-automation",
    title: "Commands & Automation",
    description:
      "Create custom commands to automate repetitive tasks.",
    chapter: 7,
    difficulty: "intermediate",
    label: "Chapter 07 · Intermediate",
    sections: [
      { type: "heading", text: "Creating Commands" },
      {
        type: "code",
        language: "markdown",
        label: ".opencode/commands/test.md",
        code: `---
description: Run tests with coverage
agent: build
---
Run the full test suite with coverage report.
Focus on failing tests and suggest fixes.`,
      },
      {
        type: "paragraph",
        text: 'Run with <code class="inline">/test</code> inside OpenCode.',
      },
      { type: "heading", text: "Commands with Arguments" },
      {
        type: "code",
        language: "markdown",
        label: ".opencode/commands/component.md",
        code: `---
description: Create a new React component
---
Create a new React component named $ARGUMENTS with TypeScript.
Include proper typing and basic structure.
Use patterns from @src/components/Button.tsx as reference.`,
      },
      {
        type: "paragraph",
        text: 'Usage: <code class="inline">/component UserProfile</code>. Positional args: <code class="inline">$1</code>, <code class="inline">$2</code>, <code class="inline">$3</code>...',
      },
      { type: "heading", text: "Shell Output in Commands" },
      {
        type: "code",
        language: "markdown",
        label: ".opencode/commands/review-changes.md",
        code: `---
description: Review recent changes
---
Recent commits:
!\`git log --oneline -10\`
Review and suggest improvements.`,
      },
      { type: "heading", text: "Command Options" },
      {
        type: "table",
        headers: ["Option", "Description"],
        rows: [
          ['<code class="inline">template</code>', "Prompt template (required)"],
          ['<code class="inline">description</code>', "Shown in command list"],
          ['<code class="inline">agent</code>', "Which agent executes it"],
          ['<code class="inline">model</code>', "Override model"],
          ['<code class="inline">subtask</code>', "Run as subagent to keep context clean"],
        ],
      },
      {
        type: "info-box",
        variant: "success",
        label: "Best Practice",
        content:
          'Build a command library: <code class="inline">/test</code>, <code class="inline">/review</code>, <code class="inline">/deploy-check</code>. Commit to Git for the whole team.',
      },
    ],
  },
  {
    slug: "advanced-setup",
    title: "Advanced Setup",
    description:
      "MCP servers, LSP integration, plugins, and enterprise features.",
    chapter: 8,
    difficulty: "advanced",
    label: "Chapter 08 · Advanced",
    sections: [
      { type: "heading", text: "MCP Servers" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: `{
  "mcp": {
    "my-database": {
      "type": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-postgres"]
    }
  }
}`,
      },
      { type: "heading", text: "LSP Integration (Experimental)" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: "$ OPENCODE_EXPERIMENTAL_LSP_TOOL=true opencode",
      },
      { type: "heading", text: "Plugins" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: '{ "plugin": ["opencode-helicone-session"] }',
      },
      { type: "heading", text: "Compaction & Context" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: `{
  "compaction": {
    "auto": true,
    "prune": true,
    "reserved": 10000
  }
}`,
      },
      {
        type: "paragraph",
        text: 'Manual: <code class="inline">Ctrl+X → C</code>',
      },
      { type: "heading", text: "Formatters" },
      {
        type: "code",
        language: "json",
        label: "opencode.json",
        code: `{
  "formatter": {
    "prettier": {
      "command": ["npx","prettier","--write","$FILE"],
      "extensions": [".js",".ts",".tsx"]
    }
  }
}`,
      },
      { type: "heading", text: "Sharing Sessions" },
      {
        type: "code",
        language: "bash",
        label: "bash",
        code: "> /share  # Creates shareable link",
      },
      {
        type: "info-box",
        variant: "warning",
        label: "Enterprise",
        content:
          "OpenCode stores <strong>no code or context data</strong>. Safe for privacy-sensitive environments.",
      },
    ],
  },
];
