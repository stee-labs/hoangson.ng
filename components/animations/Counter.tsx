"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

/** Short count-up when the number enters the viewport. Renders the final value without JS. */
export function Counter({ value, prefix = "", suffix = "", duration = 1.1 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (reduced) return;
    if (!inView && !armed.current) {
      armed.current = true;
      setDisplay(0);
    }
  }, [inView, reduced]);

  useEffect(() => {
    if (!inView || reduced) return setDisplay(value);
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
