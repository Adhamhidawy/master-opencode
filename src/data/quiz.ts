import type { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1-what-is-opencode",
    question: "What is OpenCode?",
    options: [
      "A chatbot like ChatGPT",
      "An open-source AI coding agent",
      "An IDE like VS Code",
      "A programming language",
    ],
    correctIndex: 1,
  },
  {
    id: "q2-switch-agents",
    question: "Which key switches between Build and Plan agents?",
    options: ["Ctrl+A", "Escape", "Tab", "Ctrl+X"],
    correctIndex: 2,
  },
  {
    id: "q3-init",
    question: "What does /init do?",
    options: [
      "Installs OpenCode",
      "Creates a new project",
      "Analyzes project and creates AGENTS.md",
      "Starts a new session",
    ],
    correctIndex: 2,
  },
  {
    id: "q4-config-file",
    question: "Which file stores project-specific config?",
    options: ["package.json", "tsconfig.json", "opencode.json", "config.yaml"],
    correctIndex: 2,
  },
  {
    id: "q5-plan-agent",
    question: "What does the Plan agent do differently?",
    options: [
      "Uses a different LLM",
      "Restricts edits and bash commands",
      "Only works in terminal",
      "Runs faster",
    ],
    correctIndex: 1,
  },
  {
    id: "q6-file-reference",
    question: "How do you reference a file in your prompt?",
    options: ["#filename", "@filename", "$filename", "!filename"],
    correctIndex: 1,
  },
  {
    id: "q7-permission-level",
    question: "Which permission level requires user approval?",
    options: ["allow", "auto", "ask", "deny"],
    correctIndex: 2,
  },
  {
    id: "q8-leader-key",
    question: "What is the default leader key?",
    options: ["Ctrl+A", "Ctrl+C", "Ctrl+X", "Ctrl+Z"],
    correctIndex: 2,
  },
  {
    id: "q9-explore-subagent",
    question: "How do you invoke the Explore subagent?",
    options: ["/explore", "@explore", "Tab + E", "Ctrl+X -> E"],
    correctIndex: 1,
  },
  {
    id: "q10-undo-action",
    question: "Which command undoes the last agent action?",
    options: ["/redo", "/undo", "/revert", "/rollback"],
    correctIndex: 1,
  },
];
