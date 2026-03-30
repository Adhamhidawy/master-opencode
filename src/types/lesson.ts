export interface Lesson {
  slug: string;
  title: string;
  description: string;
  chapter: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  label: string;
  sections: LessonSection[];
}

export type LessonSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; label: string; code: string }
  | { type: "info-box"; variant: "tip" | "warning" | "success"; label: string; content: string }
  | { type: "steps"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "tab-code"; tabs: { label: string; language: string; code: string }[] }
  | { type: "unorderedList"; items: string[] }
  | { type: "inlineCode"; text: string };
