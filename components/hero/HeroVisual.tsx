"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMedia";
import { ease } from "@/lib/motion";

/** Floating workspace: code editor + product UI + status chip, layered with mouse parallax. */
export function HeroVisual({ play }: { play: boolean }) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!fine || reduced) return;
    const on = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [fine, reduced, mx, my]);

  return (
    <div aria-hidden className="pointer-events-none relative h-full w-full select-none">
      <Layer mx={mx} my={my} depth={14} className="absolute right-[4%] top-[6%] w-[78%]" delay={0.25} play={play}>
        <CodeWindow />
      </Layer>
      <Layer mx={mx} my={my} depth={30} className="absolute bottom-[4%] left-0 w-[46%]" delay={0.4} play={play}>
        <ProductCard />
      </Layer>
      <Layer mx={mx} my={my} depth={44} className="absolute bottom-[22%] right-0" delay={0.55} play={play}>
        <div className="flex items-center gap-2 rounded-full border border-line bg-bg-2/80 px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-2 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse-dot" />
          Build · Measure · Iterate
        </div>
      </Layer>
    </div>
  );
}

function Layer({
  mx,
  my,
  depth,
  className,
  children,
  delay,
  play,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: React.ReactNode;
  delay: number;
  play: boolean;
}) {
  const x = useTransform(mx, (v) => v * -depth);
  const y = useTransform(my, (v) => v * -depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={play ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: 1, ease: ease.out, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const code: [string, string][][] = [
  [["k", "export async function "], ["f", "recommend"], ["p", "(intent) {"]],
  [["p", "  const "], ["v", "hotels"], ["p", " = await "], ["f", "search"], ["p", "(intent.location)"]],
  [["p", "  const "], ["v", "rooms"], ["p", " = await "], ["f", "availability"], ["p", "(hotels, intent.dates)"]],
  [["c", "  // rank by fit, not just price"]],
  [["k", "  return "], ["f", "rank"], ["p", "(rooms, intent.preferences)"]],
  [["p", "}"]],
];

const tone: Record<string, string> = {
  k: "text-accent",
  f: "text-accent-2",
  v: "text-fg",
  p: "text-fg-2",
  c: "text-fg-3 italic",
};

function CodeWindow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-2/85 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="ml-3 font-mono text-[0.65rem] text-fg-3">agent/recommend.ts</span>
      </div>
      <pre className="overflow-hidden p-4 font-mono text-[0.72rem] leading-[1.9]">
        {code.map((line, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="mr-4 w-4 text-right text-fg-3/60">{i + 1}</span>
            {line.map(([t, s], j) => (
              <span key={j} className={tone[t]}>
                {s}
              </span>
            ))}
            {i === code.length - 1 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent animate-blink" />}
          </div>
        ))}
      </pre>
    </div>
  );
}

function ProductCard() {
  return (
    <div className="rounded-2xl border border-line bg-bg-3/90 p-3 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md">
      <div
        className="aspect-[16/9] rounded-xl"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--accent) 45%, var(--bg-3)), var(--bg-3) 60%, color-mix(in oklab, var(--accent-2) 20%, var(--bg-3)))",
        }}
      />
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="grid gap-1.5">
          <div className="h-2 w-24 rounded-full bg-fg/30" />
          <div className="h-1.5 w-16 rounded-full bg-fg/15" />
        </div>
        <div className="rounded-full bg-accent px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent-fg">Book</div>
      </div>
    </div>
  );
}
