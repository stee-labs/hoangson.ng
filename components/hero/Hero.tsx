"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { IntroTitle } from "@/components/animations/IntroTitle";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroCopy } from "@/data/experience";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { usePreloaderDone } from "@/hooks/usePreloader";
import { useRange } from "@/hooks/useRange";
import { profileLink } from "@/lib/links";
import { scrollToId } from "@/lib/scroll";

const disciplines = [
  { label: "Web", icon: "web" },
  { label: "Mobile", icon: "mobile" },
  { label: "UI/UX", icon: "uiux" },
  { label: "AI", icon: "ai" },
  { label: "Product", icon: "product" },
];

export function Hero() {
  const ready = usePreloaderDone();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useRange(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0]);
  const lift = useRange(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const github = profileLink("github");

  /** Stagger delay for the CSS intro animations (see .intro-* in globals.css). */
  const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background: glow + terrain + grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-[10%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 60%)" }}
          animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <HeroBackground className="absolute inset-x-0 bottom-0 h-[62%] w-full [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_70%,transparent)]" />
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Floating workspace (desktop) */}
      <div className="pointer-events-none absolute bottom-[12%] right-[var(--gutter)] top-[34%] hidden w-[34%] max-w-[520px] lg:block">
        <div className="relative h-full w-full">
          <HeroVisual play={ready} />
        </div>
      </div>

      <motion.div style={{ opacity: fade, y: lift }} className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-[calc(var(--nav-h)+3rem)] md:pb-14">
        <p className="intro-fade label mb-6 flex items-center gap-3 md:mb-8" style={d(0)}>
          <span className="h-px w-8 bg-accent" aria-hidden />
          {heroCopy.eyebrow}
        </p>

        <IntroTitle
          id="hero-title"
          text={heroCopy.lines}
          stagger={0.11}
          className="display whitespace-nowrap text-[clamp(1.9rem,9.4vw,5rem)] lg:text-[min(6.2vw,6.5rem)]"
          lineClasses={heroCopy.lines.map((_, i) => (i === heroCopy.accentLine ? "text-accent" : undefined))}
        />

        <div className="mt-8 grid max-w-xl gap-4 md:mt-10">
          <p className="intro-fade text-pretty text-lg leading-snug text-fg md:text-xl" style={d(0.45)}>
            {heroCopy.lead}
          </p>
          <p className="intro-fade text-pretty text-[0.95rem] leading-relaxed text-fg-2 md:text-base" style={d(0.55)}>
            {heroCopy.body}
          </p>
        </div>

        <ul className="intro-fade mt-7 flex flex-wrap gap-x-5 gap-y-3" style={d(0.65)} aria-label="Disciplines">
          {disciplines.map((d) => (
            <li key={d.label} className="flex items-center gap-2 text-[0.8rem] text-fg-2">
              <Icon name={d.icon} size={16} className="text-fg" />
              {d.label}
            </li>
          ))}
        </ul>

        <div className="intro-fade mt-9 flex flex-wrap items-center gap-3" style={d(0.75)}>
          <Button href="/#work" size="lg" icon="arrow-right">
            View selected work
          </Button>
          <Button href={github.href} placeholder={github.placeholder} external={github.external} variant="ghost" size="lg" icon="arrow-up-right">
            GitHub
          </Button>
        </div>
      </motion.div>

      <div className="intro-fade container-x relative hidden items-center justify-between pb-8 md:flex" style={d(0.9)}>
        <span className="label">Based in Vietnam</span>
        <button
          type="button"
          onClick={() => scrollToId("metrics")}
          className="group flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-2 transition-colors hover:text-fg"
        >
          Scroll
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-fg"
              animate={reduced ? undefined : { y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </button>
      </div>
    </section>
  );
}
