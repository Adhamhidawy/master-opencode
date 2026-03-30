import { lessons } from "@/data/lessons";
import { ChapterCard } from "@/components/ui/chapter-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lessons — Master OpenCode",
  description: "Follow 8 structured lessons from beginner to advanced.",
};

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-20">
      <div className="mb-16 text-center">
        <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
          Your Learning Path
        </div>
        <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
          Lessons
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-text-2">
          Follow the lessons in order, or jump to any topic. Each builds on the last.
        </p>
      </div>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <ChapterCard key={lesson.slug} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
