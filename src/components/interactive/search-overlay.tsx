"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { search, SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      // Navigate results when overlay is open
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
        }
        if (e.key === "Enter" && results.length > 0) {
          e.preventDefault();
          const selected = results[selectedIndex];
          if (selected) {
            router.push(selected.href);
            setIsOpen(false);
            setQuery("");
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Search when query changes
  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15%]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOverlay}
      />

      {/* Overlay panel */}
      <div className="relative z-[70] w-[90vw] max-w-[600px] overflow-hidden rounded-lg border border-border bg-bg-2 shadow-2xl">
        {/* Input area */}
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Search className="h-5 w-5 shrink-0 text-text-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, commands, challenges..."
            className="flex-1 bg-transparent text-[.95rem] outline-none placeholder:text-text-3 text-text"
          />
          <button
            onClick={closeOverlay}
            className="shrink-0 text-text-3 transition-colors hover:text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[400px] overflow-y-auto border-x border-b border-border">
          {query.trim() === "" ? (
            <div className="px-4 py-8 text-center text-[.88rem] text-text-3">
              Type to search across all content...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-[.88rem] text-text-3">
              No results found
            </div>
          ) : (
            <div>
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.title}-${index}`}
                  onClick={() => {
                    router.push(result.href);
                    closeOverlay();
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-4 py-3 transition-all",
                    index === selectedIndex && "bg-bg-3"
                  )}
                >
                  {/* Type badge */}
                  <span
                    className={cn(
                      "shrink-0 rounded px-2 py-0.5 text-[.7rem] font-bold uppercase",
                      result.type === "lesson" && "bg-accent/10 text-accent-2",
                      result.type === "cheat-sheet" && "bg-blue/10 text-blue",
                      result.type === "challenge" && "bg-orange/10 text-orange"
                    )}
                  >
                    {result.type === "cheat-sheet" ? "Cheat Sheet" : result.type === "lesson" ? "Lesson" : "Challenge"}
                  </span>
                  {/* Title and description */}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[.88rem] font-medium text-text">
                      {result.title}
                    </div>
                    <div className="truncate text-[.78rem] text-text-3">
                      {result.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex gap-4 border-t border-border bg-bg-3 px-4 py-2 text-[.72rem] text-text-3">
          <span>↑↓ Navigate</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
