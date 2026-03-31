"use client";

import { useState, useEffect } from "react";
import { isLessonComplete } from "@/lib/progress-local";
import { CheckCircle2 } from "lucide-react";

interface LessonProgressBadgeProps {
  slug: string;
  serverCompleted: boolean;
}

export function LessonProgressBadge({ slug, serverCompleted }: LessonProgressBadgeProps) {
  const [clientCompleted, setClientCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!serverCompleted) {
      setClientCompleted(isLessonComplete(slug));
    }
  }, [slug, serverCompleted]);

  const showCheck = serverCompleted || (mounted && clientCompleted);

  if (!showCheck) return null;

  return (
    <span className="absolute right-12 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-green/20">
      <CheckCircle2 size={18} className="text-green" />
    </span>
  );
}
