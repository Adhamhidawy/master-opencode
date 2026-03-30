import { getHighlighter } from "@/lib/shiki";
import { CopyButton } from "@/components/content/copy-button";

export async function CodeBlock({ language, label, code }: { language: string; label: string; code: string }) {
  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code, { lang: language, theme: "github-dark" });

  return (
    <div className="relative my-5 overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-bg-3 px-4 py-2.5">
        <span className="text-[.72rem] font-semibold uppercase tracking-wider text-text-3">
          {label || language}
        </span>
        <CopyButton text={code} />
      </div>
      <div className="overflow-x-auto bg-bg-2 p-5">
        <div
          className="font-mono text-[.82rem] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
