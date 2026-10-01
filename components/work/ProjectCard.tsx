"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import type { Project } from "@/data/projects";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide = false, tall = false }: { project: Project; wide?: boolean; tall?: boolean }) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  return (
    <Link
      href={`/work/${project.slug}/`}
      data-cursor="View project"
      className="group block h-full rounded-[22px] focus-visible:outline-offset-4"
      onPointerMove={(e) => {
        if (!fine || reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width - 0.5) * -14);
        py.set(((e.clientY - r.top) / r.height - 0.5) * -10);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <article className="card flex h-full flex-col overflow-hidden transition-[transform,border-color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1.5 group-hover:border-line-2">
        <div className={cn("relative overflow-hidden border-b border-line", wide ? "aspect-[16/9] md:aspect-[21/9]" : tall ? "aspect-[4/3] md:aspect-[16/11]" : "aspect-[4/3]")}>
          <motion.div className="absolute inset-[-12px]" style={{ x: px, y: py }}>
            <ProjectVisual kind={project.visual} cover={project.cover} alt={`${project.title} visual`} />
          </motion.div>
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[0.65rem] text-fg backdrop-blur">{project.number}</span>
            {project.badge && <Badge tone="accent" className="backdrop-blur">{project.badge}</Badge>}
          </div>
          <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 scale-75 place-items-center rounded-full bg-fg text-bg opacity-0 transition-all duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 md:text-2xl">
              {project.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {project.tags.slice(0, 3).map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-fg-2">{project.summary}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-2">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-3 transition-colors duration-300 group-hover:text-fg-2">
              {project.stack.slice(0, 4).join(" · ")}
            </p>
            {project.impact[0] && (
              <p className="shrink-0 text-right">
                <span className="block text-lg font-semibold text-fg">{project.impact[0].value}</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-3">{project.impact[0].label}</span>
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
