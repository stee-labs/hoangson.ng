"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { process as steps } from "@/data/experience";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Process as a scroll-driven story. The step crossing the centre of the
 * viewport is emphasised — no scroll-jacking, so it works everywhere.
 */
export function HowIThink() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = (active + 1) / steps.length;

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+4rem)]">
            <Reveal y={10} className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[0.6875rem] text-accent">04</span>
              <span className="h-px w-8 bg-line-2" aria-hidden />
              <span className="label">How I think</span>
            </Reveal>
            <TextReveal
              as="h2"
              id="process-title"
              text={["I don’t start", "with code."]}
              className="heading text-[clamp(2.5rem,6vw,5.5rem)] uppercase"
              lineClasses={[undefined, "text-fg-2"]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm leading-relaxed text-fg-2">
                Code is the most expensive way to find out you built the wrong thing. I start with the problem, then design the product and the system together.
              </p>
            </Reveal>

            {/* progress */}
            <div className="mt-10 hidden items-center gap-4 lg:flex" aria-hidden>
              <span className="font-mono text-sm tabular-nums text-fg">{steps[active].n}</span>
              <div className="relative h-px w-40 bg-line">
                <motion.div className="absolute inset-y-0 left-0 bg-accent" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.5, ease: ease.out }} />
              </div>
              <span className="font-mono text-sm text-fg-3">0{steps.length}</span>
            </div>
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-line md:left-[1.35rem]" aria-hidden />
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <li
                key={step.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                aria-current={isActive ? "step" : undefined}
                className="relative grid grid-cols-[2.25rem_1fr] gap-5 py-9 md:grid-cols-[2.75rem_1fr] md:gap-8 md:py-14"
              >
                <span
                  className={cn(
                    "relative z-10 grid h-9 w-9 place-items-center rounded-full border bg-bg font-mono text-[0.65rem] transition-all duration-500 md:h-11 md:w-11",
                    isActive ? "border-accent text-accent shadow-[0_0_30px_-4px_var(--glow)]" : "border-line text-fg-2",
                  )}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className={cn(
                      "text-[clamp(2rem,4.5vw,3.5rem)] font-semibold uppercase leading-none tracking-[-0.035em] transition-[transform,color] duration-500 ease-[var(--ease-out)]",
                      isActive ? "translate-x-1 text-fg" : "text-fg-3",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p className={cn("mt-3 text-lg transition-colors duration-500", isActive ? "text-fg" : "text-fg-3")}>{step.body}</p>
                  <p className={cn("mt-1.5 max-w-md text-sm leading-relaxed transition-colors duration-500", isActive ? "text-fg-2" : "text-fg-3")}>{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
