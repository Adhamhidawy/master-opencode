export function StepList({ items }: { items: string[] }) {
  return (
    <ol className="my-5 list-none">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative mb-2 rounded-lg border border-border bg-bg-2 px-5 py-4 pl-14 text-[.88rem] leading-relaxed text-text-2"
        >
          <span className="absolute left-4 top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[.75rem] font-bold text-white">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  );
}
