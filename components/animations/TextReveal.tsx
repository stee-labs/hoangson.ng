"use client";

import { motion } from "framer-motion";
import { createElement, type ElementType } from "react";
import { duration, ease, stagger as staggers, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** A string (split into words) or an array of lines (each revealed as a unit). */
  text: string | string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Extra classes per unit (by index) — serializable so server components can pass it. */
  lineClasses?: (string | undefined)[];
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** When `immediate`, wait for this to be true before animating. */
  play?: boolean;
};

/**
 * Masked text reveal: each word/line slides up from behind a clip.
 * The real text stays in the DOM for screen readers and SEO.
 */
export function TextReveal({
  text,
  as = "p",
  id,
  className,
  lineClasses,
  delay = 0,
  stagger = staggers.base,
  immediate = false,
  play = true,
}: TextRevealProps) {
  const isLines = Array.isArray(text);
  const units = isLines ? text : text.split(" ");
  const label = isLines ? text.join(" ") : text;

  const trigger = immediate
    ? { animate: play ? "show" : "hidden" }
    : { whileInView: "show", viewport };

  return createElement(
    as,
    { id, className, "aria-label": label },
    <motion.span
      aria-hidden="true"
      className={cn(isLines ? "block" : "inline")}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className={cn(
            "relative overflow-hidden align-bottom",
            isLines ? "block pb-[0.06em] -mb-[0.06em]" : "inline-block pb-[0.08em] -mb-[0.08em]",
            lineClasses?.[i],
          )}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: duration.story * 0.85, ease: ease.out } },
            }}
          >
            {unit}
          </motion.span>
          {!isLines && i < units.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>,
  );
}
