import Link from "next/link";
import type { Lesson } from "@/types/lesson";
import { cn } from "@/lib/utils";
import { LessonProgressBadge } from "./lesson-progress";

const difficultyStyles = {
  beginner: "bg-green/10 text-green",
  intermediate: "bg-blue/10 text-blue",
  advanced: "bg-orange/10 text-orange",
};

export function ChapterCard({ lesson, completed }: { lesson: Lesson; completed?: boolean }) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group relative block rounded-2xl border border-border bg-bg-2 px-8 py-7 no-underline transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]"
    >
      <div className="text-[.7rem] font-bold uppercase tracking-[.12em] text-accent-2">
        Chapter {String(lesson.chapter).padStart(2, "0")}
      </div>
      <h3 className="mb-1.5 mt-2 text-[1.15rem] font-bold text-text">{lesson.title}</h3>
      <p className="text-[.88rem] leading-relaxed text-text-2">{lesson.description}</p>
      <span
        className={cn(
          "mt-3 inline-block rounded-full px-2.5 py-0.5 text-[.7rem] font-semibold",
          difficultyStyles[lesson.difficulty]
        )}
      >
        {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
      </span>
      <LessonProgressBadge slug={lesson.slug} serverCompleted={completed ?? false} />
      <span className="absolute right-7 top-1/2 -translate-y-1/2 text-text-3 transition-all group-hover:translate-x-1 group-hover:text-accent">
        &rarr;
      </span>
    </Link>
  );
}
