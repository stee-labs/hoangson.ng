"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** True when the user prefers reduced motion. Defaults to false during SSR. */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** True on devices with a precise pointer that can hover (desktop). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
