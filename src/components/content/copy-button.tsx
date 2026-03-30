"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded border border-border bg-none px-2.5 py-0.5 text-[.72rem] text-text-3 transition-all hover:border-border-2 hover:text-text"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
