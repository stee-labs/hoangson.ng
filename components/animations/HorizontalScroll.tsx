"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Desktop: pins the section and maps vertical scroll to horizontal movement (GSAP ScrollTrigger).
 * Touch / narrow / reduced motion: falls back to a native swipe carousel with scroll-snap.
 * GSAP is loaded on demand so it never ships in the main bundle.
 */
export function HorizontalScroll({ header, children }: { header?: ReactNode; children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !sectionRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current!;
        const track = trackRef.current!;
        section.dataset.pinned = "true";
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
          delete section.dataset.pinned;
        };
      });

      // Fonts/images can change widths after load
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      cleanup = () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={sectionRef} className="group/hs relative flex min-h-0 flex-col justify-center overflow-hidden lg:data-[pinned=true]:h-svh">
      {header}
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 sm:gap-6 lg:group-data-[pinned=true]/hs:snap-none lg:group-data-[pinned=true]/hs:overflow-visible"
        data-lenis-prevent-touch
      >
        {children}
      </div>
    </div>
  );
}
