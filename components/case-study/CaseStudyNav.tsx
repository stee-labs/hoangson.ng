"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

/** Sticky table of contents with the current section highlighted. */
export function CaseStudyNav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--nav-h)+2rem)]">
      <p className="label mb-4">Contents</p>
      <ol className="grid gap-1 border-l border-line">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                if (scrollToId(item.id)) e.preventDefault();
              }}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px flex items-center gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-200",
                active === item.id ? "border-accent text-fg" : "border-transparent text-fg-3 hover:text-fg-2",
              )}
            >
              <span className="font-mono text-[0.6rem]">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
