"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { useRange } from "@/hooks/useRange";

/** Moves children vertically relative to scroll. `amount` is in px at the extremes. */
export function Parallax({ children, amount = 60, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useRange(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Image-style parallax: content is scaled slightly and shifted inside a clipped frame. */
export function ParallaxImage({ children, amount = 40, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useRange(scrollYProgress, [0, 1], reduced ? [0, 0] : [-amount, amount]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale: reduced ? 1 : 1.12 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
