import type { CSSProperties, ReactNode } from "react";
import { IntroTitle } from "@/components/animations/IntroTitle";

export function PageHeader({ label, title, children }: { label: string; title: string | string[]; children?: ReactNode }) {
  return (
    <header className="container-x relative pb-12 pt-[calc(var(--nav-h)+3rem)] md:pb-20 md:pt-[calc(var(--nav-h)+5rem)]">
      <p className="intro-fade mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" aria-hidden />
        <span className="label">{label}</span>
      </p>
      <IntroTitle text={title} className="display text-[clamp(3rem,10vw,9rem)]" />
      {children && (
        <div className="intro-fade mt-8 max-w-xl text-pretty text-lg leading-relaxed text-fg-2" style={{ "--d": "0.25s" } as CSSProperties}>
          {children}
        </div>
      )}
    </header>
  );
}
