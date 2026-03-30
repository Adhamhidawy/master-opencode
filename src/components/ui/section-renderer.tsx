import { getHighlighter } from "@/lib/shiki";
import { CodeBlock } from "@/components/content/code-block";
import { InfoBox } from "@/components/content/info-box";
import { StepList } from "@/components/content/step-list";
import { TableWrap } from "@/components/content/table-wrap";
import { TabBar } from "@/components/content/tab-bar";
import type { LessonSection } from "@/types/lesson";

export async function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h3 className="mb-4 mt-8 border-t border-border pt-4 text-[1.2rem] font-bold">
          {section.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          className="mb-4 text-[.92rem] leading-relaxed text-text-2"
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      );
    case "code":
      return <CodeBlock language={section.language} label={section.label} code={section.code} />;
    case "info-box":
      return <InfoBox variant={section.variant} label={section.label} content={section.content} />;
    case "steps":
      return <StepList items={section.items} />;
    case "table":
      return <TableWrap headers={section.headers} rows={section.rows} />;
    case "tab-code": {
      const highlighter = await getHighlighter();
      const highlightedTabs = section.tabs.map((tab) => ({
        label: tab.label,
        html: highlighter.codeToHtml(tab.code, { lang: tab.language, theme: "github-dark" }),
      }));
      return <TabBar tabs={highlightedTabs} />;
    }
    case "unorderedList":
      return (
        <ul className="mb-4 list-disc pl-5 text-text-2">
          {section.items.map((item, i) => (
            <li key={i} className="mb-2 text-[.92rem]" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "inlineCode":
      return (
        <code className="rounded border border-border bg-bg-3 px-2 py-0.5 font-mono text-[.8rem] text-accent-2">
          {section.text}
        </code>
      );
  }
}
