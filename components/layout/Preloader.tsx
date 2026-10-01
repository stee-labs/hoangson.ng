"use client";

import { useEffect, useState } from "react";
import { markPreloaderDone } from "@/hooks/usePreloader";

/**
 * ~1s intro shown once per session. Every visual step is a CSS animation
 * (see globals.css) so it plays before hydration; this component only
 * signals completion and removes the overlay. Skipped before paint for
 * returning sessions and reduced motion via the inline boot script.
 */
export function Preloader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (html.hasAttribute("data-preloaded")) {
      setMounted(false);
      markPreloaderDone();
      return;
    }
    try {
      sessionStorage.setItem("preloaded", "1");
    } catch {}
    // Timings are relative to navigation start, matching the CSS animation clock.
    const elapsed = performance.now();
    const done = window.setTimeout(() => {
      markPreloaderDone();
      html.setAttribute("data-preloaded", "");
    }, Math.max(0, 950 - elapsed));
    const remove = window.setTimeout(() => setMounted(false), Math.max(0, 1600 - elapsed));
    return () => {
      window.clearTimeout(done);
      window.clearTimeout(remove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div id="preloader" role="status" aria-label="Loading" className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-[var(--gutter)] text-fg">
      <div className="flex items-center justify-between pt-2">
        <span className="label">Portfolio</span>
        <span className="label preloader-count tabular-nums" aria-hidden />
      </div>

      <div className="overflow-hidden">
        <p className="display intro-rise text-[clamp(5rem,24vw,22rem)] leading-[0.8]" style={{ animationDelay: "0s" }}>
          SON
        </p>
      </div>

      <div className="grid gap-5">
        <div className="h-px w-full bg-line">
          <div className="preloader-bar h-px w-full bg-accent" />
        </div>
        <div className="intro-fade flex flex-col justify-between gap-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-2 sm:flex-row" style={{ animationDelay: "0.15s" }}>
          <span className="text-fg">10+ years</span>
          <span>Building digital products</span>
        </div>
      </div>
    </div>
  );
}
