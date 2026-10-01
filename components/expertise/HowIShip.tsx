"use client";

import { motion, useScroll } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/animations/GlowCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shipPath, shipStages } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { useRange } from "@/hooks/useRange";
import { cn } from "@/lib/utils";

/**
 * "How I Ship": the engineering beyond the UI. A pipeline strip runs like a
 * CI job, and a rail fills as the stages scroll past.
 */
export function HowIShip({ index = "05" }: { index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const rail = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="ship" aria-labelledby="ship-title" className="relative border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index={index}
          label="How I ship"
          title="From idea to production."
          subtitle={
            <span id="ship-title">
              Not just React and React Native. I take products end to end — backend, delivery, release, and what happens after launch.
            </span>
          }
        />

        <Reveal className="mt-12 md:mt-16">
          <Pipeline reduced={reduced} />
        </Reveal>

        <div ref={ref} className="relative mt-10 md:mt-14">
          {/* rail (desktop) */}
          <div aria-hidden className="absolute inset-x-[12.5%] top-[2.1rem] hidden h-px bg-line lg:block">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: reduced ? 1 : rail }} />
          </div>

          <RevealGroup as="ol" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {shipStages.map((stage, i) => (
              <RevealItem as="li" key={stage.id} className="h-full">
                <div className="mb-4 hidden justify-center lg:flex" aria-hidden>
                  <span className="relative z-10 grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-line bg-bg text-accent">
                    <Icon name={stage.icon} size={22} />
                  </span>
                </div>
                <GlowCard className="group flex h-full flex-col p-6 md:p-7">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                      0{i + 1} · {stage.step}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-line text-fg-2 transition-colors group-hover:border-accent/50 group-hover:text-accent lg:hidden">
                      <Icon name={stage.icon} size={16} />
                    </span>
                  </div>
                  <h3 className="relative z-10 mt-6 text-2xl font-semibold uppercase tracking-[-0.02em]">{stage.title}</h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-fg-2">{stage.summary}</p>
                  <ul className="relative z-10 mt-6 grid gap-4 border-t border-line pt-6">
                    {stage.items.map((item) => (
                      <li key={item.name} className="group/item flex gap-3">
                        <Icon name="check" size={15} className="mt-0.5 shrink-0 text-accent-2" />
                        <span>
                          <span className="block text-[0.95rem] font-medium text-fg transition-transform duration-300 group-hover/item:translate-x-0.5">{item.name}</span>
                          <span className="mt-0.5 block text-[0.8rem] leading-relaxed text-fg-2">{item.note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-10 flex flex-col gap-3 rounded-2xl border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-sm text-fg">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon name="mobile" size={15} />
            </span>
            3 mobile products released to the App Store and Google Play.
          </p>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-3">Idea → Production</span>
        </Reveal>
      </div>
    </section>
  );
}

/** Idea → Code → Backend → Deploy → Production, lit up step by step like a CI run. */
function Pipeline({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState(shipPath.length - 1);

  useEffect(() => {
    if (reduced) return;
    setActive(0);
    const id = window.setInterval(() => setActive((a) => (a + 1) % (shipPath.length + 2)), 700);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <ol aria-label="Delivery pipeline" className="scrollbar-none -mx-[var(--gutter)] flex items-center gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
      {shipPath.map((step, i) => {
        const done = i <= active;
        const last = i === shipPath.length - 1;
        return (
          <Fragment key={step}>
            <li
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-300",
                done ? (last ? "border-accent-2/50 text-accent-2" : "border-accent/50 bg-accent-soft text-fg") : "border-line text-fg-3",
              )}
            >
              {last ? (
                <span className={cn("h-1.5 w-1.5 rounded-full", done ? "bg-accent-2 animate-pulse-dot" : "bg-fg-3")} aria-hidden />
              ) : (
                <Icon name="check" size={12} className={cn("transition-opacity", done ? "opacity-100" : "opacity-30")} />
              )}
              {step}
            </li>
            {!last && (
              <li aria-hidden className="relative h-px w-6 shrink-0 overflow-hidden bg-line md:flex-1">
                <span className={cn("absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-[var(--ease-out)]", i < active ? "w-full" : "w-0")} />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
