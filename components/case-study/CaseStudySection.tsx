import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

export function CaseStudySection({ id, index, label, title, children, className }: { id: string; index: string; label: string; title?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={cn("scroll-mt-24 border-t border-line py-16 md:py-24", className)}>
      <Reveal y={10} className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[0.6875rem] text-accent">{index}</span>
        <span className="h-px w-8 bg-line-2" aria-hidden />
        <span id={`${id}-label`} className="label">
          {label}
        </span>
      </Reveal>
      {title && <TextReveal as="h2" text={title} className="heading mb-10 max-w-3xl text-balance text-[clamp(1.75rem,3.4vw,3rem)]" />}
      {children}
    </section>
  );
}
