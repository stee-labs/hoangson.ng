"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/animations/MagneticButton";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: "arrow-right" | "arrow-up-right" | "arrow-left" | "arrow-down" | null;
  leadingIcon?: string;
  external?: boolean;
  /** Placeholder links render disabled until a real URL is configured. */
  placeholder?: boolean;
  magnetic?: boolean;
  size?: "md" | "lg";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = "arrow-right",
  leadingIcon,
  external,
  placeholder,
  magnetic = true,
  size = "md",
  className,
}: ButtonProps) {
  const classes = cn(
    "group/btn relative inline-flex items-center gap-2.5 overflow-hidden rounded-full font-medium uppercase tracking-[0.08em] transition-[color,background-color,border-color,box-shadow] duration-200",
    size === "lg" ? "h-14 px-7 text-[0.8rem]" : "h-11 px-5 text-[0.72rem]",
    variant === "primary"
      ? "bg-accent text-accent-fg hover:shadow-[0_0_40px_-8px_var(--glow)]"
      : "border border-line-2 text-fg hover:border-fg",
    placeholder && "cursor-not-allowed opacity-50",
    className,
  );

  const content = (
    <>
      {/* hover fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-0 origin-bottom scale-y-0 rounded-full transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:scale-y-100",
          variant === "primary" ? "bg-fg" : "bg-surface-2",
          placeholder && "hidden",
        )}
      />
      {leadingIcon && <Icon name={leadingIcon} size={16} className="relative" />}
      <span className={cn("relative transition-colors duration-200", variant === "primary" && !placeholder && "group-hover/btn:text-bg")}>
        {children}
      </span>
      {icon && (
        <span className="relative inline-flex h-4 w-4 overflow-hidden">
          <Icon
            name={icon}
            size={16}
            className={cn(
              "absolute transition-transform duration-300 ease-[var(--ease-out)]",
              variant === "primary" && !placeholder && "group-hover/btn:text-bg",
              icon === "arrow-right" && "group-hover/btn:translate-x-[140%]",
              icon === "arrow-up-right" && "group-hover/btn:translate-x-[140%] group-hover/btn:-translate-y-[140%]",
              icon === "arrow-down" && "group-hover/btn:translate-y-[140%]",
              icon === "arrow-left" && "group-hover/btn:-translate-x-[140%]",
            )}
          />
          <Icon
            name={icon}
            size={16}
            className={cn(
              "absolute transition-transform duration-300 ease-[var(--ease-out)]",
              variant === "primary" && !placeholder && "text-bg",
              icon === "arrow-right" && "-translate-x-[140%] group-hover/btn:translate-x-0",
              icon === "arrow-up-right" && "-translate-x-[140%] translate-y-[140%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0",
              icon === "arrow-down" && "-translate-y-[140%] group-hover/btn:translate-y-0",
              icon === "arrow-left" && "translate-x-[140%] group-hover/btn:translate-x-0",
            )}
          />
        </span>
      )}
    </>
  );

  let el: ReactNode;
  if (placeholder) {
    el = (
      <a href="#" className={classes} aria-disabled="true" title="Link coming soon" onClick={(e) => e.preventDefault()}>
        {content}
      </a>
    );
  } else if (external || /^(https?:|mailto:)/.test(href)) {
    el = (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  } else {
    el = (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return magnetic && !placeholder ? <Magnetic>{el}</Magnetic> : el;
}
