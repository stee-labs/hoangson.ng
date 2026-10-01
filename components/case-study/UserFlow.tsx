import { Fragment } from "react";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";

export function UserFlow({ steps }: { steps: string[] }) {
  return (
    <RevealGroup as="ol" stagger={0.06} className="flex flex-wrap items-center gap-2 md:gap-3" aria-label="User flow">
      {steps.map((s, i) => (
        <Fragment key={s}>
          <RevealItem as="li" y={12} className="group flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2.5 transition-colors hover:border-accent/50">
            <span className="font-mono text-[0.6rem] text-fg-3 group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm">{s}</span>
          </RevealItem>
          {i < steps.length - 1 && (
            <RevealItem as="li" y={12} aria-hidden className="text-fg-3">
              <Icon name="arrow-right" size={14} />
            </RevealItem>
          )}
        </Fragment>
      ))}
    </RevealGroup>
  );
}
