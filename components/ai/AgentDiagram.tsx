"use client";

import { Fragment, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { aiLab } from "@/data/experiments";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { cn } from "@/lib/utils";

const icons: Record<string, string> = { user: "user", agent: "ai", apis: "api", result: "spark" };

/** User → Agent → Hotel APIs → Smart result, with light travelling along the connections. */
export function AgentDiagram() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const nodes = aiLab.flow;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % nodes.length), 1600);
    return () => window.clearInterval(id);
  }, [reduced, nodes.length]);

  return (
    <div className="relative">
      <ol className="flex flex-col items-stretch lg:flex-row lg:items-center" aria-label="Agent flow">
        {nodes.map((node, i) => (
          <Fragment key={node.id}>
            <li
              className={cn(
                "relative rounded-2xl border bg-bg-2/80 p-5 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 lg:flex-1",
                active === i ? "border-accent/60 shadow-[0_0_50px_-12px_var(--glow)] lg:-translate-y-1" : "border-line",
                node.id === "agent" && "lg:flex-[1.25]",
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("grid h-9 w-9 place-items-center rounded-xl border transition-colors duration-500", active === i ? "border-accent/60 bg-accent-soft text-accent" : "border-line text-fg-2")}>
                  <Icon name={icons[node.id]} size={17} />
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg">{node.label}</span>
                <span className="ml-auto font-mono text-[0.6rem] text-fg-3">0{i + 1}</span>
              </div>
              <ul className="mt-4 grid gap-1.5 text-sm text-fg-2">
                {node.items.map((item) => (
                  <li key={item} className={cn("flex items-start gap-2", node.id === "user" && "italic text-fg")}>
                    {node.id !== "user" && <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />}
                    {item}
                  </li>
                ))}
              </ul>
            </li>
            {i < nodes.length - 1 && <Connector live={!reduced && active === i} />}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

function Connector({ live }: { live: boolean }) {
  return (
    <li aria-hidden className="relative mx-auto h-10 w-px shrink-0 overflow-hidden bg-line lg:mx-0 lg:h-px lg:w-10 xl:w-14">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent transition-opacity duration-500",
          "animate-[flow-y_1.6s_linear_infinite] lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/3 lg:animate-[flow-x_1.6s_linear_infinite] lg:bg-gradient-to-r",
          live ? "opacity-100" : "opacity-30",
        )}
      />
    </li>
  );
}
