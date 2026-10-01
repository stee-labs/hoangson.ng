"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";

type Mode = "default" | "hover" | "label";

/** Small dot cursor. Grows over interactive elements, shows a label over [data-cursor]. Desktop only. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.3 });
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor || "View");
        return;
      }
      if (t?.closest("a, button, [role='button'], input, textarea, select, label")) setMode("hover");
      else setMode("default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={
          mode === "label"
            ? { width: 0, height: 0, opacity: 0 }
            : mode === "hover"
              ? { width: 40, height: 40, backgroundColor: "rgba(124,124,255,0.12)", borderColor: "var(--accent)", opacity: 1 }
              : { width: 8, height: 8, backgroundColor: "var(--fg)", borderColor: "rgba(0,0,0,0)", opacity: 1 }
        }
        style={{ borderWidth: 1, borderStyle: "solid" }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <AnimatePresence>
        {mode === "label" && (
          <motion.div
            className="absolute left-0 top-0 whitespace-nowrap rounded-full bg-fg px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bg"
            initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {label} →
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
