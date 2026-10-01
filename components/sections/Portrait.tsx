"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { StatusDot } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import { useRange } from "@/hooks/useRange";
import { ease } from "@/lib/motion";
import { asset, cn } from "@/lib/utils";

type PortraitProps = {
  /** Background-removed cutout, available at 600w and 900w (see public/images). */
  src600: string;
  src900: string;
  alt: string;
  location: string;
  status?: string;
  className?: string;
};

/**
 * Layered portrait: animated glow + contour field behind an outlined name,
 * a rim-lit cutout in front. Mouse moves the layers at different depths,
 * scrolling adds a gentle parallax. Everything is static for reduced motion.
 */
export function Portrait({ src600, src900, alt, location, status, className }: PortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const interactive = fine && !reduced;

  // pointer depth
  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const personX = useTransform(mx, (v) => v * 14);
  const personY = useTransform(my, (v) => v * 8);
  const nameX = useTransform(mx, (v) => v * -26);
  const glowX = useTransform(mx, (v) => `${50 + v * 18}%`);
  const glowY = useTransform(my, (v) => `${30 + v * 14}%`);
  const glow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, var(--glow), transparent 58%)`);

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollPerson = useRange(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);
  const scrollName = useRange(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);
  const subjectY = useTransform([personY, scrollPerson], ([a, b]: number[]) => a + b);

  return (
    <motion.div
      ref={ref}
      className={cn("group relative isolate overflow-hidden rounded-[22px] border border-line bg-bg-2", className)}
      initial={{ clipPath: "inset(8% 8% 8% 8% round 28px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 22px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: ease.out }}
      onPointerMove={(e) => {
        if (!interactive || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* 1 — light field */}
      <motion.div aria-hidden className="absolute inset-0 -z-10 opacity-80 transition-opacity duration-700 group-hover:opacity-100" style={{ background: glow }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_95%,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent_45%)]" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <Contours reduced={reduced} />

      {/* 2 — outlined name behind the subject */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 top-[8%] -z-10 select-none text-center" style={{ x: nameX, y: scrollName }}>
        <span
          className="display block text-[clamp(6rem,14vw,11rem)] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px color-mix(in oklab, var(--fg) 22%, transparent)" }}
        >
          SON
        </span>
      </motion.div>

      {/* 3 — subject */}
      <motion.div className="absolute inset-x-0 bottom-0 top-[6%]" style={{ x: personX, y: subjectY }}>
        <motion.div
          className="h-full w-full"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.15 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(src900)}
            srcSet={`${asset(src600)} 600w, ${asset(src900)} 900w`}
            sizes="(min-width: 1024px) 30vw, 90vw"
            alt={alt}
            width={900}
            height={1064}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top saturate-[0.9] drop-shadow-[0_0_24px_var(--glow)] transition-[filter,transform] duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02] group-hover:saturate-100"
          />
        </motion.div>
      </motion.div>

      {/* 4 — grounding fade + meta */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        {status ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-2 backdrop-blur-md">
            <StatusDot className="!h-1.5 !w-1.5" />
            {status}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-2">
          <Icon name="location" size={12} />
          {location}
        </span>
      </div>
    </motion.div>
  );
}

function Contours({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      aria-hidden
      className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-[140%] text-accent"
      viewBox="0 0 560 400"
      preserveAspectRatio="none"
      animate={reduced ? undefined : { x: ["0%", "-28%", "0%"] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d={`M-20 ${200 + i * 16} C 90 ${140 + i * 12}, 190 ${260 + i * 8}, 290 ${190 + i * 10} S 470 ${150 + i * 14}, 600 ${200 + i * 12}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.08 + i * 0.012}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  );
}
