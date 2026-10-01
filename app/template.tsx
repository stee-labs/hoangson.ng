"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { ease } from "@/lib/motion";

let hasMounted = false;

/**
 * Page transitions (≈450ms): a curtain wipes away while the page rises in.
 * Skipped on the very first load — the preloader handles that entrance.
 */
export default function Template({ children }: { children: ReactNode }) {
  // SSR and the initial hydration always count as "first" so markup matches.
  const [first] = useState(() => typeof window === "undefined" || !hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <>
      {!first && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] bg-bg-3"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.5, ease: ease.inOut }}
        />
      )}
      <motion.div
        initial={first ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: ease.out, delay: first ? 0 : 0.08 }}
      >
        {children}
      </motion.div>
    </>
  );
}
