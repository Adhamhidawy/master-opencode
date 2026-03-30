import { notFound } from "next/navigation";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import { SectionRenderer } from "@/components/ui/section-renderer";
import { LessonNav } from "@/components/ui/lesson-nav";
import type { Metadata } from "next";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} — Master OpenCode`,
    description: lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = lessons.findIndex((l) => l.slug === slug);
  if (idx === -1) notFound();

  const lesson = lessons[idx];
  const prevSlug = idx > 0 ? lessons[idx - 1].slug : null;
  const nextSlug = idx < lessons.length - 1 ? lessons[idx + 1].slug : null;
  return (
    <div className="mx-auto max-w-[900px] px-6 pb-20 pt-28">
      <Link
        href="/lessons"
        className="mb-8 inline-flex items-center gap-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-colors hover:text-accent"
      >
        &larr; Back to Lessons
      </Link>
      <div className="mb-10">
        <div className="text-[.7rem] font-bold uppercase tracking-[.12em] text-accent-2">
          {lesson.label}
        </div>
        <h2 className="mt-2 text-4xl font-extrabold tracking-[-.02em]">{lesson.title}</h2>
        <p className="mt-3 text-[.95rem] leading-relaxed text-text-2">{lesson.description}</p>
      </div>
      <div>
        {lesson.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>
      <LessonNav prevSlug={prevSlug} nextSlug={nextSlug} />
    </div>
  );
}
