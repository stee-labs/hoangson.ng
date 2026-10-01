"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectFilters, type FilterId } from "@/components/work/ProjectFilters";
import { categoryFilters, projects as allProjects, type Project } from "@/data/projects";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Editorial rhythm: large + medium, then medium + large. A lone last card spans full width. */
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function ProjectGrid({ projects = allProjects }: { projects?: Project[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    categoryFilters.forEach((f) => {
      if (f.id !== "all") c[f.id] = projects.filter((p) => p.categories.includes(f.id as Exclude<FilterId, "all">)).length;
    });
    return c;
  }, [projects]);

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <ProjectFilters value={filter} onChange={setFilter} counts={counts} />
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>
      <LayoutGroup>
        <motion.ul layout className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => {
              const lone = visible.length % 2 === 1 && i === visible.length - 1;
              const span = lone ? "md:col-span-2 lg:col-span-12" : spans[i % 4];
              const large = !lone && (i % 4 === 0 || i % 4 === 3);
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, ease: ease.out, delay: i * 0.05 }}
                  className={cn(span)}
                >
                  <ProjectCard project={p} wide={lone} tall={large} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
