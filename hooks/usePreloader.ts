"use client";

import { useEffect, useState } from "react";

const EVENT = "preloader:done";

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

export function markPreloaderDone() {
  window.__preloaderDone = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Resolves true once the intro preloader has finished (or was skipped). */
export function usePreloaderDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__preloaderDone || document.documentElement.hasAttribute("data-preloaded")) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return done;
}
