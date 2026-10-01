import type { ReactNode } from "react";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  label: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "split";
  className?: string;
  titleClassName?: string;
  uppercase?: boolean;
};

/** Editorial section header: index + label, clip-revealed title, optional supporting copy. */
export function SectionHeading({ index, label, title, subtitle, align = "split", className, titleClassName, uppercase = true }: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-6 md:gap-10", align === "split" && "lg:grid-cols-12 lg:items-end", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <Reveal y={10} className="mb-5 flex items-center gap-3">
          {index && <span className="font-mono text-[0.6875rem] text-accent">{index}</span>}
          <span className="h-px w-8 bg-line-2" aria-hidden />
          <span className="label">{label}</span>
        </Reveal>
        <TextReveal
          as="h2"
          text={title}
          className={cn("heading text-balance text-[clamp(2.25rem,5.6vw,5rem)]", uppercase && "uppercase", titleClassName)}
        />
      </div>
      {subtitle && (
        <Reveal delay={0.15} className={cn("max-w-md text-pretty text-base leading-relaxed text-fg-2 md:text-lg", align === "split" && "lg:col-span-5 lg:justify-self-end")}>
          {subtitle}
        </Reveal>
      )}
    </header>
  );
}
