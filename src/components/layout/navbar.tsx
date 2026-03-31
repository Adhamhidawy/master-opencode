"use client";

import Link from "next/link";
import { Moon, Sun, Menu, Search } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[1.1rem] text-text no-underline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="#8b5cf6" />
            <rect x="13" y="3" width="8" height="8" rx="1" fill="#8b5cf6" opacity=".6" />
            <rect x="3" y="13" width="8" height="8" rx="1" fill="#8b5cf6" opacity=".6" />
            <rect x="13" y="13" width="8" height="8" rx="1" fill="#8b5cf6" opacity=".3" />
          </svg>
          <span className="bg-gradient-to-br from-accent-2 to-pink bg-clip-text text-transparent">Master OpenCode</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link href="/lessons" className="hidden rounded-lg px-3.5 py-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-all hover:bg-bg-3 hover:text-text md:block">
            Lessons
          </Link>
          <Link href="/playground" className="hidden rounded-lg px-3.5 py-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-all hover:bg-bg-3 hover:text-text md:block">
            Playground
          </Link>
          <Link href="/challenges" className="hidden rounded-lg px-3.5 py-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-all hover:bg-bg-3 hover:text-text md:block">
            Challenges
          </Link>
          <Link href="/cheat-sheet" className="hidden rounded-lg px-3.5 py-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-all hover:bg-bg-3 hover:text-text md:block">
            Cheat Sheet
          </Link>
          <Link href="/quiz" className="hidden rounded-lg px-3.5 py-1.5 text-[.85rem] font-medium text-text-2 no-underline transition-all hover:bg-bg-3 hover:text-text md:block">
            Quiz
          </Link>

          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="hidden items-center gap-2 rounded-lg border border-border px-3.5 py-1.5 text-[.8rem] text-text-3 transition-all hover:border-border-2 hover:text-text-2 md:flex"
          >
            <Search width={14} height={14} />
            Search
            <kbd className="rounded border border-border bg-bg-3 px-1.5 py-0.5 text-[.7rem]">Ctrl K</kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-2 transition-all hover:bg-bg-3 hover:text-text"
          >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center text-text-2 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
