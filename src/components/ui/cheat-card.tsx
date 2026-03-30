import type { CheatSheetCategory } from "@/types/cheat-sheet";

export function CheatCard({ category }: { category: CheatSheetCategory }) {
  return (
    <div className="rounded-xl border border-border bg-bg-2 p-6">
      <h4 className="mb-3.5 flex items-center gap-2 text-[.9rem] font-bold text-text">
        <span className={`inline-flex h-5 w-5 items-center justify-center rounded text-[.7rem] ${category.iconBg} ${category.iconColor}`}>
          {category.icon}
        </span>
        {category.title}
      </h4>
      {category.rows.map((row, i) => (
        <div
          key={i}
          className={`flex items-center justify-between py-1.5 text-[.82rem] ${i < category.rows.length - 1 ? "border-b border-border" : ""}`}
        >
          <span className="rounded bg-bg-3 px-2 py-0.5 font-mono text-[.78rem] text-accent-2">
            {row.key}
          </span>
          <span className="text-text-2">{row.description}</span>
        </div>
      ))}
    </div>
  );
}
