import Link from "next/link";

interface LessonNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function LessonNav({ prevSlug, nextSlug }: LessonNavProps) {
  return (
    <div className="mt-12 flex justify-between border-t border-border pt-6">
      {prevSlug ? (
        <Link
          href={`/lessons/${prevSlug}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-3 px-4 py-2 text-[.82rem] font-semibold text-text no-underline transition-all hover:border-border-2 hover:bg-bg-4"
        >
          &larr; Previous
        </Link>
      ) : (
        <div />
      )}
      {nextSlug ? (
        <Link
          href={`/lessons/${nextSlug}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[.82rem] font-semibold text-white no-underline transition-all hover:bg-accent-2"
        >
          Next &rarr;
        </Link>
      ) : (
        <Link
          href="/lessons"
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[.82rem] font-semibold text-white no-underline transition-all hover:bg-accent-2"
        >
          Back to Lessons
        </Link>
      )}
    </div>
  );
}
