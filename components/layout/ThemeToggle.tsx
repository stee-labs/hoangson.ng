"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-transparent text-fg-2 transition-colors hover:border-line hover:text-fg"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name={theme === "dark" ? "moon" : "sun"} size={17} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
