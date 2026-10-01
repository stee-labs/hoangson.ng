"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Card with a pointer-tracked border glow (see .glow-card in globals.css). */
export function GlowCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("card glow-card", className)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
