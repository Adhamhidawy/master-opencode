import Link from "next/link";
import { lessons } from "@/data/lessons";
import { ChapterCard } from "@/components/ui/chapter-card";
import { WorkflowCard } from "@/components/ui/workflow-card";
import { Stats } from "@/components/ui/stats";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.08)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-[800px]">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-3 px-4.5 py-2 text-[.8rem] font-medium text-text-2">
            <span className="h-2 w-2 rounded-full bg-green" />
            Free &amp; Open Source &mdash; 133K+ Stars
          </div>
          <h1 className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-[-.03em]">
            Master{" "}
            <span className="bg-gradient-to-br from-accent-2 via-pink to-orange bg-clip-text text-transparent">
              OpenCode
            </span>
            <br />
            From Zero to Hero
          </h1>
          <p className="mx-auto mb-10 max-w-[560px] text-[1.15rem] leading-relaxed text-text-2">
            An interactive, hands-on guide to the most powerful open-source AI coding agent. Learn by
            doing, one concept at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/lessons/what-is-opencode"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-[.9rem] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-accent-2 hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)]"
            >
              Start Learning &rarr;
            </Link>
            <a
              href="https://opencode.ai"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-3 px-7 py-3 text-[.9rem] font-semibold text-text no-underline transition-all hover:bg-bg-4 hover:border-border-2"
            >
              Official Docs
            </a>
          </div>
          <Stats />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
              Learning Path
            </div>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
              Your Journey Starts Here
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-text-2">
              Follow the lessons in order, or jump to any topic. Each builds on the last.
            </p>
          </div>
          <div className="mx-auto grid max-w-[900px] gap-4">
            {lessons.map((lesson) => (
              <ChapterCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
              How It Works
            </div>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
              The Agent Loop
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-text-2">
              OpenCode follows an agentic loop &mdash; autonomously executing multi-step plans using
              tools.
            </p>
          </div>
          <div className="mx-auto flex max-w-[800px] flex-nowrap items-center justify-center gap-0">
            {[
              { icon: "\uD83D\uDC64", label: "You" },
              { icon: "\uD83E\uDD16", label: "LLM" },
              { icon: "\uD83D\uDD27", label: "Tools" },
              { icon: "\uD83D\uDCC4", label: "Codebase" },
              { icon: "\uD83D\uDD04", label: "Result" },
              { icon: "\uD83E\uDD16", label: "LLM" },
            ].map((node, i, arr) => (
              <span key={i} className="flex items-center">
                <div className="rounded-xl border border-border bg-bg-2 px-6 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-accent">
                  <div className="mb-1.5 text-[1.5rem]">{node.icon}</div>
                  <div className="text-[.75rem] font-bold uppercase tracking-[.08em] text-text-2">
                    {node.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span className="px-2 text-[1.2rem] text-text-3">&rarr;</span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-[.82rem] text-text-3">
            The loop continues until the task is complete or you press Escape to interrupt.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
              Practical Guides
            </div>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
              Real-World Workflows
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-text-2">
              Step-by-step guides for common OpenCode use cases.
            </p>
          </div>
          <div className="mx-auto max-w-[700px]">
            <WorkflowCard
              title="\uD83D\uDE80 Add a New Feature"
              steps={[
                {
                  title: "Switch to Plan mode (Tab)",
                  description:
                    'Describe what you want: "When a user deletes a note, flag it as deleted. Create a screen showing recently deleted notes."',
                },
                {
                  title: "Review the plan",
                  description:
                    "OpenCode analyzes your codebase and proposes an implementation plan. Iterate until you're satisfied.",
                },
                {
                  title: "Switch to Build mode (Tab)",
                  description:
                    'Say "Sounds good, go ahead!" and OpenCode implements the changes across multiple files.',
                },
                {
                  title: "Review & test",
                  description:
                    "Check the changes. If wrong, run /undo to revert and try again with a refined prompt.",
                },
              ]}
            />
            <WorkflowCard
              title="\uD83D\uDC1B Debug a Crash"
              steps={[
                {
                  title: "Paste the error",
                  description:
                    '"I\'m getting TypeError: Cannot read properties of undefined at @src/api/users.ts:42"',
                },
                {
                  title: "Let OpenCode investigate",
                  description:
                    "It reads the file, traces the call stack, checks related types, and identifies the root cause.",
                },
                {
                  title: "Apply the fix",
                  description:
                    "OpenCode suggests a fix and applies it. Run the tests to verify with bash.",
                },
              ]}
            />
            <WorkflowCard
              title="\uD83D\uDD04 Refactor Legacy Code"
              steps={[
                {
                  title: "Start in Plan mode",
                  description:
                    '"Refactor @src/utils/helpers.js to TypeScript with proper types. Split into separate modules."',
                },
                {
                  title: "Review the plan carefully",
                  description:
                    "Refactoring is risky. Review every file OpenCode plans to change and give feedback.",
                },
                {
                  title: "Execute in Build mode",
                  description:
                    '"Go ahead. Make sure all existing tests still pass after the refactor."',
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
