import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import { getUserProgress } from "@/app/actions/progress";
import { CheckCircle2, Circle, ArrowRight, Trophy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Progress — Master OpenCode",
  description: "Track your learning progress across all lessons, quizzes, and challenges.",
};

export default async function ProgressPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const progress = await getUserProgress();
  const completedSet = new Set(progress.completedLessons);
  const completedCount = lessons.filter((l) => completedSet.has(l.slug)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);
  const nextLesson = lessons.find((l) => !completedSet.has(l.slug));

  return (
    <div className="mx-auto max-w-[900px] px-6 py-20">
      <div className="mb-16 text-center">
        <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
          Your Learning Journey
        </div>
        <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
          Progress
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-text-2">
          Track your progress across all 8 lessons.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 rounded-2xl border border-border bg-bg-2 p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[.9rem] font-semibold text-text">
            {completedCount}/{lessons.length} Lessons Complete
          </span>
          <span className="text-[.9rem] font-bold text-accent">{progressPercent}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-bg-3">
          <div
            className="h-full rounded-full bg-green transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {nextLesson && (
          <div className="mt-6">
            <Link
              href={`/lessons/${nextLesson.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-[.85rem] font-semibold text-white no-underline transition-all hover:bg-accent-2"
            >
              Continue Learning <ArrowRight size={16} />
            </Link>
          </div>
        )}
        {!nextLesson && completedCount === lessons.length && (
          <div className="mt-6 flex items-center gap-2 text-green">
            <Trophy size={20} />
            <span className="text-[.9rem] font-semibold">All lessons complete! You&apos;re an OpenCode master.</span>
          </div>
        )}
      </div>

      {/* Quiz Score */}
      {progress.quizScore !== null && (
        <div className="mb-12 rounded-2xl border border-border bg-bg-2 p-8">
          <h3 className="mb-3 text-[1.1rem] font-bold text-text">Quiz Score</h3>
          <div className="flex items-center gap-4">
            <span className="text-[2.5rem] font-extrabold text-text">
              {progress.quizScore}/10
            </span>
            <span className={`text-[.9rem] font-semibold ${progress.quizScore >= 7 ? "text-green" : "text-orange"}`}>
              {progress.quizScore >= 7 ? "Passed!" : "Keep practicing — 7/10 to pass"}
            </span>
          </div>
        </div>
      )}

      {/* Challenges */}
      {progress.challengeResults.length > 0 && (
        <div className="mb-12 rounded-2xl border border-border bg-bg-2 p-8">
          <h3 className="mb-3 text-[1.1rem] font-bold text-text">Challenges Completed</h3>
          <span className="text-[.9rem] text-text-2">
            {progress.challengeResults.length} challenge{progress.challengeResults.length !== 1 ? "s" : ""} completed
          </span>
        </div>
      )}

      {/* Lesson List */}
      <div className="grid gap-3">
        {lessons.map((lesson) => {
          const isCompleted = completedSet.has(lesson.slug);
          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-bg-2 px-6 py-5 no-underline transition-all hover:border-accent"
            >
              {isCompleted ? (
                <CheckCircle2 size={22} className="shrink-0 text-green" />
              ) : (
                <Circle size={22} className="shrink-0 text-text-3" />
              )}
              <div className="flex-1">
                <div className="text-[.7rem] font-bold uppercase tracking-[.12em] text-accent-2">
                  Chapter {String(lesson.chapter).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[.95rem] font-semibold text-text">{lesson.title}</div>
              </div>
              <ArrowRight size={16} className="shrink-0 text-text-3 transition-all group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
