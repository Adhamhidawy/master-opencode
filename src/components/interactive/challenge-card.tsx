"use client";

import { useState } from "react";
import type { Challenge } from "@/types/challenge";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return; // Already answered
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === challenge.correctIndex;

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-bg-2">
      <div className="px-6 py-5">
        <h4 className="text-[1rem] font-bold text-text">
          🎯 {challenge.title}
        </h4>
        <div className="mt-3 text-[.88rem] text-text-2 leading-relaxed">
          {challenge.scenario}
        </div>
        <div className="mt-4 flex flex-col gap-1.5">
          {challenge.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === challenge.correctIndex;
            const hasAnswered = showResult;

            let buttonClass = "border border-border rounded-sm px-4 py-3 text-[.84rem] text-text-2 font-mono text-left cursor-pointer hover:border-accent hover:text-text transition-all";

            if (hasAnswered) {
              if (isCorrectAnswer) {
                buttonClass = "border-green bg-green/10 text-green-2 rounded-sm px-4 py-3 text-[.84rem] font-mono text-left transition-all";
              } else if (isSelected) {
                buttonClass = "border-red bg-red/10 text-red rounded-sm px-4 py-3 text-[.84rem] font-mono text-left transition-all";
              } else {
                buttonClass = "border border-border rounded-sm px-4 py-3 text-[.84rem] text-text-2 font-mono text-left cursor-pointer pointer-events-none opacity-60 transition-all";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={buttonClass}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>
        {showResult && (
          <div className={`mt-3 p-3 rounded-sm text-[.84rem] ${isCorrect ? "bg-green/10 text-green-2" : "bg-red/10 text-red"}`}>
            {isCorrect ? "Correct! " : "Not quite. "}
            {challenge.feedback}
          </div>
        )}
      </div>
    </div>
  );
}
