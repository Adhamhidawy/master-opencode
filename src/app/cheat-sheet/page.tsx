import Link from "next/link";
import { cheatSheetData } from "@/data/cheat-sheet";
import { CheatCard } from "@/components/ui/cheat-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheat Sheet — Master OpenCode",
  description: "Quick reference for everyday OpenCode usage.",
};

export default function CheatSheetPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-6 pb-20 pt-28">
      <Link
        href="/lessons"
        className="mb-8 inline-flex items-center gap-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-colors hover:text-accent"
      >
        &larr; Back to Lessons
      </Link>
      <div className="mb-10">
        <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
          Quick Reference
        </div>
        <h2 className="mt-3 text-4xl font-extrabold tracking-[-.02em]">Cheat Sheet</h2>
        <p className="mt-3 text-text-2">Your go-to reference for everyday OpenCode usage.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {cheatSheetData.map((cat) => (
          <CheatCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
