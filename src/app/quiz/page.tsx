import QuizFlow from "@/components/interactive/quiz-flow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz — Master OpenCode",
  description: "Test your OpenCode knowledge. Score 7/10 or higher to pass.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-[700px] px-6 py-20 pt-28">
      <div className="mb-12 text-center">
        <div className="text-[.75rem] font-bold uppercase tracking-[.15em] text-accent-2">
          Knowledge Check
        </div>
        <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-.02em]">
          Quiz
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-text-2">
          Test your OpenCode knowledge. Score 7/10 or higher to pass.
        </p>
      </div>
      <QuizFlow />
    </div>
  );
}
