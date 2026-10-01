"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { duration, ease, viewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
};

/** Fade + translate into view. The default building block for scroll reveals. */
export function Reveal({ children, delay = 0, y = 28, x = 0, scale = 1, once = true, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ ...viewport, once }}
      transition={{ duration: duration.reveal, ease: ease.out, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered reveal for lists: wrap items in <RevealItem>. */
export function RevealGroup({
  children,
  stagger = 0.07,
  delay = 0,
  as = "div",
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number; as?: "div" | "ul" | "ol" }) {
  const Comp = (as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div) as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, y = 24, as = "div", ...rest }: HTMLMotionProps<"div"> & { y?: number; as?: "div" | "li" }) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
