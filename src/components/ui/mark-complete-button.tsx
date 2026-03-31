"use client";

import { useState } from "react";
import { markLessonComplete } from "@/app/actions/progress";
import { markLessonComplete as markLocal } from "@/lib/progress-local";
import { useUser } from "@clerk/nextjs";

interface MarkCompleteButtonProps {
  slug: string;
  initialCompleted: boolean;
}

export function MarkCompleteButton({ slug, initialCompleted }: MarkCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const { isSignedIn } = useUser();

  const handleClick = async () => {
    if (isSignedIn) {
      await markLessonComplete(slug);
    } else {
      markLocal(slug);
    }
    setIsCompleted(true);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isCompleted}
      className={`mt-6 rounded-lg px-6 py-2.5 text-[.85rem] font-semibold transition-all ${
        isCompleted
          ? "bg-green/10 text-green border border-green/30 cursor-default"
          : "bg-accent text-white hover:bg-accent-2 cursor-pointer"
      }`}
    >
      {isCompleted ? "✓ Completed" : "Mark as Complete"}
    </button>
  );
}
