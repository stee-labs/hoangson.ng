import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smoothly scroll to an element id, using Lenis when active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: id === "top" ? 0 : -8, duration: reduced ? 0 : 1.1, immediate: reduced });
  } else {
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
  history.replaceState(null, "", `#${id}`);
  return true;
}
