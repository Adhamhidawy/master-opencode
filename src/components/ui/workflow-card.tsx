"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface WorkflowCardProps {
  title: string;
  steps: { title: string; description: string }[];
}

export function WorkflowCard({ title, steps }: WorkflowCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-bg-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-all hover:bg-bg-3"
      >
        <h4 className="text-[.95rem] font-bold text-text">{title}</h4>
        <ChevronDown
          size={18}
          className={`text-text-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex gap-3 py-3 ${i < steps.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[.72rem] font-bold text-white">
                {i + 1}
              </span>
              <div>
                <div className="text-[.85rem] font-semibold text-text">{step.title}</div>
                <p className="mt-1 text-[.82rem] leading-relaxed text-text-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
