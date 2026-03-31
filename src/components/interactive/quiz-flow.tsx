"use client";

import { useReducer, useEffect } from "react";
import Link from "next/link";
import { quizQuestions } from "@/data/quiz";
import type { QuizQuestion } from "@/types/quiz";
import { cn } from "@/lib/utils";

type QuizState = {
  phase: "question" | "result";
  currentIndex: number;
  answers: (number | null)[];
  selectedAnswer: number | null;
  isAnswered: boolean;
  isAnimating: boolean;
};

type QuizAction =
  | { type: "SELECT_ANSWER"; index: number }
  | { type: "NEXT_QUESTION" }
  | { type: "SHOW_RESULTS" }
  | { type: "RESET" };

const initialState: QuizState = {
  phase: "question",
  currentIndex: 0,
  answers: Array(10).fill(null),
  selectedAnswer: null,
  isAnswered: false,
  isAnimating: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const newAnswers = [...state.answers];
      newAnswers[state.currentIndex] = action.index;
      return {
        ...state,
        answers: newAnswers,
        selectedAnswer: action.index,
        isAnswered: true,
      };
    }
    case "NEXT_QUESTION": {
      if (state.currentIndex < 9) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          selectedAnswer: null,
          isAnswered: false,
          isAnimating: false,
        };
      } else {
        return {
          ...state,
          phase: "result",
          isAnimating: false,
        };
      }
    }
    case "SHOW_RESULTS": {
      return {
        ...state,
        phase: "result",
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
}

export default function QuizFlow() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { phase, currentIndex, answers, selectedAnswer, isAnswered, isAnimating } =
    state;

  const currentQuestion: QuizQuestion = quizQuestions[currentIndex];
  const correctCount = answers.filter(
    (a, i) => a === quizQuestions[i].correctIndex
  ).length;

  function handleSelectAnswer(index: number) {
    if (!isAnswered) {
      dispatch({ type: "SELECT_ANSWER", index });
    }
  }

  function handleNext() {
    dispatch({ type: "NEXT_QUESTION" });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  // Handle animation: set animating true briefly, then dispatch next
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (phase === "result") {
    const passed = correctCount >= 7;
    return (
      <div className="flex flex-col items-center gap-8 py-12">
        <div className="text-center">
          <div className="text-[4rem] font-extrabold tracking-tight mb-2">
            Score: {correctCount}/10
          </div>
          {passed ? (
            <p className="text-green-2 text-xl font-semibold">
              Passed! You&apos;re ready to use OpenCode.
            </p>
          ) : (
            <p className="text-red text-xl font-semibold">
              Keep practicing! You need 7/10 to pass.
            </p>
          )}
        </div>
        <button
          onClick={handleReset}
          className="bg-accent text-white rounded-lg px-8 py-3 font-semibold hover:bg-accent-2 transition-colors"
        >
          Retry Quiz
        </button>
        <Link
          href="/"
          className="text-text-2 hover:text-accent transition-colors text-sm"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / 10) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress indicator */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-text-2">
          <span>
            Question {currentIndex + 1} of {quizQuestions.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-1 bg-bg-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className={cn(
          "bg-bg-2 border border-border rounded-lg p-8 transition-all duration-300",
          isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        )}
      >
        <h2 className="text-[1.05rem] font-bold leading-relaxed mb-6">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            const showCorrect = isAnswered && isCorrectOption;
            const showWrong = isAnswered && isSelected && !isCorrectOption;
            const showDimmed = isAnswered && !isCorrectOption && !isSelected;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  "border rounded-sm px-4 py-3.5 text-[.88rem] text-left cursor-pointer transition-all w-full bg-transparent",
                  showCorrect
                    ? "border-green bg-green/10 text-green-2 pointer-events-none"
                    : showWrong
                    ? "border-red bg-red/10 text-red pointer-events-none"
                    : showDimmed
                    ? "pointer-events-none opacity-60 border-border"
                    : "border-border hover:border-accent hover:text-text text-text-2"
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className="mt-4 text-sm">
            {isCorrect ? (
              <p className="text-green-2 font-medium">Correct!</p>
            ) : (
              <p className="text-red">
                Incorrect. The answer is:{" "}
                <span className="font-medium">
                  {currentQuestion.options[currentQuestion.correctIndex]}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-accent text-white rounded-lg px-6 py-2.5 font-semibold hover:bg-accent-2 transition-colors"
            >
              {currentIndex < 9 ? "Next" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
