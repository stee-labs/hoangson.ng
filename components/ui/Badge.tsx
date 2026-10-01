import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "accent" | "success"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
        tone === "default" && "border-line bg-surface text-fg-2",
        tone === "accent" && "border-accent/40 bg-accent-soft text-accent",
        tone === "success" && "border-accent-2/40 text-accent-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden>
      <span className="absolute inset-0 animate-ping rounded-full bg-accent-2 opacity-50" />
      <span className="relative h-2 w-2 rounded-full bg-accent-2" />
    </span>
  );
}
