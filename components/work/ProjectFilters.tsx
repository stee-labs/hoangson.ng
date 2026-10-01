"use client";

import { motion } from "framer-motion";
import { categoryFilters, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export type FilterId = "all" | ProjectCategory;

export function ProjectFilters({ value, onChange, counts }: { value: FilterId; onChange: (v: FilterId) => void; counts: Record<string, number> }) {
  return (
    <div role="group" aria-label="Filter projects" className="scrollbar-none -mx-[var(--gutter)] flex gap-1.5 overflow-x-auto px-[var(--gutter)] md:mx-0 md:flex-wrap md:px-0">
      {categoryFilters.map((f) => {
        const active = value === f.id;
        const count = counts[f.id] ?? 0;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            aria-pressed={active}
            disabled={count === 0}
            className={cn(
              "relative h-9 shrink-0 rounded-full border px-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-200 disabled:opacity-30",
              active ? "border-transparent text-accent-fg" : "border-line text-fg-2 hover:border-line-2 hover:text-fg",
            )}
          >
            {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">
              {f.label}
              <sup className="ml-1 text-[0.55rem] opacity-60">{count}</sup>
            </span>
          </button>
        );
      })}
    </div>
  );
}
