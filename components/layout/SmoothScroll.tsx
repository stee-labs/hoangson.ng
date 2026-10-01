"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Lenis smooth scrolling for fine pointers. Disabled for reduced motion; touch keeps native scrolling. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Reset scroll on route change (unless navigating to a hash)
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    // Lenis caches page dimensions; refresh them for the new route before scrolling.
    lenis.resize();
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const jump = () => {
        lenis.resize();
        const el = document.getElementById(id);
        if (el) lenis.scrollTo(el, { immediate: true, force: true, offset: -8 });
      };
      const timers = [window.setTimeout(jump, 60), window.setTimeout(jump, 400)];
      return () => timers.forEach(window.clearTimeout);
    }
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
