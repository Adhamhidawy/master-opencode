"use client";

import { useState } from "react";

interface TabBarProps {
  tabs: { label: string; html: string }[];
}

export function TabBar({ tabs }: TabBarProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="my-5 flex gap-1 rounded-lg border border-border bg-bg-3 p-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-md px-2.5 py-2.5 text-center text-[.82rem] font-semibold transition-all ${
              i === active
                ? "bg-accent text-white"
                : "text-text-3 hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={i} className={i === active ? "block" : "hidden"}>
          <div className="relative my-5 overflow-hidden rounded-xl border border-border">
            <div className="overflow-x-auto bg-bg-2 p-5">
              <div
                className="font-mono text-[.82rem] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: tab.html }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
