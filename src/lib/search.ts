import Fuse from "fuse.js";
import { lessons } from "@/data/lessons";
import { cheatSheetData } from "@/data/cheat-sheet";
import { challenges } from "@/data/challenges";

export interface SearchResult {
  type: "lesson" | "cheat-sheet" | "challenge";
  title: string;
  description: string;
  href: string;
}

// Build searchable items from all data sources
const searchableItems: SearchResult[] = [
  // Lessons
  ...lessons.map((lesson) => ({
    type: "lesson" as const,
    title: lesson.title,
    description: lesson.description,
    href: `/lessons/${lesson.slug}`,
  })),
  // Cheat sheet entries
  ...cheatSheetData.flatMap((category) =>
    category.rows.map((row) => ({
      type: "cheat-sheet" as const,
      title: row.key,
      description: row.description,
      href: "/cheat-sheet",
    }))
  ),
  // Challenges
  ...challenges.map((challenge) => ({
    type: "challenge" as const,
    title: challenge.title,
    description: challenge.scenario,
    href: "/challenges",
  })),
];

// Create Fuse instance with fuzzy matching
const fuse = new Fuse(searchableItems, {
  keys: ["title", "description"],
  threshold: 0.4,
  includeScore: true,
});

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item).slice(0, 8);
}

export { searchableItems };
