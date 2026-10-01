"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/data/experience";
import { site } from "@/data/site";
import { ease } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";
import { asset, cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Solid-on-scroll + hide on scroll down / reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking on the home page; route-based elsewhere
  useEffect(() => {
    if (!isHome) {
      const match = site.nav.find((n) => pathname.startsWith(`/${n.section}`));
      setActive(match?.section ?? null);
      return;
    }
    const ids = site.nav.map((n) => n.section);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    const top = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [isHome, pathname]);

  // Mobile menu: lock scroll, close on Escape, move focus
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      setOpen(false);
      window.setTimeout(() => scrollToId(href.slice(2)), open ? 350 : 0);
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled && !open ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: ease.out }}
      >
        <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between">
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-2 text-[0.95rem] font-semibold tracking-[0.02em]"
            aria-label={`${site.name} — home`}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="relative">
              {site.shortName}
              <span className="absolute -right-2 bottom-1 h-1 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {site.nav.map((item) => {
                const isActive = active === item.section;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className={cn(
                        "group relative block px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-200",
                        isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                      )}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.label}
                      <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-fg-2 transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100" />
                      {isActive && (
                        <motion.span layoutId="nav-active" className="absolute inset-x-3 bottom-1 h-px bg-accent" transition={{ duration: 0.35, ease: ease.out }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span className="mx-1 hidden h-4 w-px bg-line md:block" aria-hidden />
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-[var(--gutter)] pb-10 pt-[calc(var(--nav-h)+2rem)] md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: ease.inOut }}
          >
            <ul className="grid gap-1">
              {site.nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: ease.out }}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="flex items-baseline justify-between py-4 text-[2.4rem] font-semibold uppercase tracking-[-0.03em]"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div className="flex items-center gap-4 text-sm text-fg-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(about.avatar)} alt="" width={48} height={48} className="h-12 w-12 rounded-full border border-line object-cover" />
              <span className="grid gap-0.5">
                <span className="text-fg">{site.name}</span>
                <span>{site.role}</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
