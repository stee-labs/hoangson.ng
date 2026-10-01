"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

/** Gently pulls its child toward the pointer. No-op on touch / reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const x = useSpring(useMotionValue(0), spring.magnetic);
  const y = useSpring(useMotionValue(0), spring.magnetic);
  const active = fine && !reduced;

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!active || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
