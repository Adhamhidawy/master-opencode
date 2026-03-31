"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NODES = [
  { icon: "\uD83D\uDC64", label: "You" },
  { icon: "\uD83E\uDD16", label: "LLM" },
  { icon: "\uD83D\uDD27", label: "Tools" },
  { icon: "\uD83D\uDCC4", label: "Codebase" },
  { icon: "\uD83D\uDD04", label: "Result" },
  { icon: "\uD83E\uDD16", label: "LLM" },
];

export function AgentLoop() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex max-w-[800px] flex-nowrap items-center justify-center gap-0">
      {NODES.map((node, i, arr) => (
        <span key={i} className="flex items-center">
          <div
            className={cn(
              "rounded-xl border border-border bg-bg-2 px-6 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-accent",
              activeNode === i && "loop-node-active"
            )}
          >
            <div className="mb-1.5 text-[1.5rem]">{node.icon}</div>
            <div className="text-[.75rem] font-bold uppercase tracking-[.08em] text-text-2">
              {node.label}
            </div>
          </div>
          {i < arr.length - 1 && (
            <span className={cn("px-2 text-[1.2rem] text-text-3", activeNode === i && "loop-arrow-active")}>
              &rarr;
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
