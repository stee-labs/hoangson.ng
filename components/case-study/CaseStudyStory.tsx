"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import type { Project } from "@/data/projects";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMedia";
import { useRange } from "@/hooks/useRange";

/**
 * Scroll storytelling (desktop):
 *   1. THE PROBLEM on the left, image on the right
 *   2. image expands to full width as the text leaves
 *   3. MY ROLE appears over the image
 * Mobile and reduced motion get a clean stacked layout instead.
 */
export function CaseStudyStory({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  return desktop && !reduced ? <PinnedStory project={project} /> : <StaticStory project={project} />;
}

function ProblemText({ project }: { project: Project }) {
  const { problem } = project.caseStudy;
  return (
    <>
      <p className="label mb-5 flex items-center gap-3">
        <span className="text-accent">01</span>
        <span className="h-px w-8 bg-line-2" aria-hidden />
        The problem
      </p>
      <h2 className="heading text-balance text-[clamp(1.8rem,3.2vw,2.9rem)]">{problem.lead}</h2>
      <div className="mt-6 grid gap-4 leading-relaxed text-fg-2">
        {problem.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </>
  );
}

function RoleCard({ project }: { project: Project }) {
  const { role } = project.caseStudy;
  return (
    <div className="rounded-[22px] border border-line-2 bg-bg/85 p-6 backdrop-blur-xl md:p-8">
      <p className="label mb-4 flex items-center gap-3">
        <span className="text-accent">02</span>
        <span className="h-px w-8 bg-line-2" aria-hidden />
        My role
      </p>
      <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{role.lead}</h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {role.items.map((r) => (
          <div key={r.title} className="border-t border-line pt-4">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg">{r.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">{r.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StaticStory({ project }: { project: Project }) {
  return (
    <section id="overview" className="container-x grid gap-10 py-20" aria-label="The problem and my role">
      <Reveal>
        <ProblemText project={project} />
      </Reveal>
      <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-line">
        <ProjectVisual kind={project.visual} cover={project.cover} alt={`${project.title} detail`} />
      </Reveal>
      <Reveal id="role">
        <RoleCard project={project} />
      </Reveal>
    </section>
  );
}

function PinnedStory({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // image: right half → full bleed
  const left = useRange(p, [0.12, 0.45], [52, 0]);
  const inset = useRange(p, [0.12, 0.45], [12, 0]);
  const radius = useRange(p, [0.12, 0.45], [22, 0]);
  const clipPath = useTransform([left, inset, radius], ([l, i, r]: number[]) => `inset(${i}% ${i * 0.4}% ${i}% ${l}% round ${r}px)`);
  const imgScale = useRange(p, [0.12, 0.45, 1], [1.08, 1, 1.04]);
  const dim = useRange(p, [0.45, 0.6], [0, 0.55]);

  // text
  const textX = useRange(p, [0.1, 0.35], [0, -60]);
  const textOpacity = useRange(p, [0.1, 0.32], [1, 0]);
  const roleY = useRange(p, [0.52, 0.72], [80, 0]);
  const roleOpacity = useRange(p, [0.52, 0.68], [0, 1]);

  return (
    <section ref={ref} id="overview" className="relative h-[320vh]" aria-label="The problem and my role">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="group absolute inset-0" style={{ clipPath }}>
          <motion.div className="h-full w-full" style={{ scale: imgScale }}>
            <ProjectVisual kind={project.visual} cover={project.cover} alt={`${project.title} detail`} />
          </motion.div>
          <motion.div className="absolute inset-0 bg-bg" style={{ opacity: dim }} />
        </motion.div>

        <div className="container-x relative flex h-full items-center">
          <motion.div className="w-[44%]" style={{ x: textX, opacity: textOpacity }}>
            <ProblemText project={project} />
          </motion.div>
        </div>

        <div id="role" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div className="pointer-events-auto w-full max-w-3xl px-[var(--gutter)]" style={{ y: roleY, opacity: roleOpacity }}>
            <RoleCard project={project} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
