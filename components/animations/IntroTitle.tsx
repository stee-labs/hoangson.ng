import { Fragment, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

type IntroTitleProps = {
  /** A string (revealed word by word) or an array of lines. */
  text: string | string[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClasses?: (string | undefined)[];
  delay?: number;
  stagger?: number;
};

/**
 * Above-the-fold title reveal driven purely by CSS (.intro-wipe), so the text
 * paints on first render — before hydration — keeping LCP fast.
 * For below-the-fold headings use <TextReveal>.
 */
export function IntroTitle({ text, as: Tag = "h1", id, className, lineClasses, delay = 0.05, stagger = 0.08 }: IntroTitleProps) {
  const isLines = Array.isArray(text);
  const units = isLines ? text : text.split(" ");
  return (
    <Tag id={id} className={className}>
      {units.map((unit, i) => (
        <Fragment key={`${unit}-${i}`}>
          <span className={cn("intro-wipe", lineClasses?.[i])} style={{ "--d": `${delay + i * stagger}s` } as CSSProperties}>
            {unit}
          </span>
          {isLines ? i < units.length - 1 && <br /> : i < units.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
