"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lessons } from "@/data/lessons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-50 w-[260px] overflow-y-auto border-r border-border bg-bg-2 py-6 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          onClick={onClose}
          className={`block border-l-2 px-6 py-2.5 text-[.82rem] font-medium no-underline transition-all ${
            pathname === "/"
              ? "border-l-accent bg-accent/5 text-accent-2"
              : "border-l-transparent text-text-2 hover:bg-accent/5 hover:text-accent-2"
          }`}
        >
          Home
        </Link>
        {lessons.map((lesson, i) => {
          const isActive = pathname === `/lessons/${lesson.slug}`;
          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              onClick={onClose}
              className={`block border-l-2 px-6 py-2.5 text-[.82rem] font-medium no-underline transition-all ${
                isActive
                  ? "border-l-accent bg-accent/5 text-accent-2"
                  : "border-l-transparent text-text-2 hover:bg-accent/5 hover:text-accent-2"
              }`}
            >
              {i + 1}. {lesson.title}
            </Link>
          );
        })}
      </aside>
    </>
  );
}
