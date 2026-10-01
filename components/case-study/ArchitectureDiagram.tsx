import { Fragment } from "react";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import type { CaseStudy } from "@/data/projects";

/** Layered system diagram with animated data flow between layers. */
export function ArchitectureDiagram({ layers }: { layers: CaseStudy["architecture"]["layers"] }) {
  return (
    <RevealGroup stagger={0.12} className="card overflow-hidden p-4 md:p-8" role="figure" aria-label="System architecture diagram">
      {layers.map((layer, i) => (
        <Fragment key={layer.name}>
          <RevealItem className="grid gap-3 md:grid-cols-[9rem_1fr] md:items-center md:gap-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-2">
              <span className="mr-2 text-accent">L{i + 1}</span>
              {layer.name}
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
              {layer.nodes.map((n) => (
                <li key={n} className="rounded-xl border border-line bg-bg-2 px-3 py-3 text-center text-sm transition-colors hover:border-accent/50 hover:text-accent">
                  {n}
                </li>
              ))}
            </ul>
          </RevealItem>
          {i < layers.length - 1 && (
            <div aria-hidden className="grid md:grid-cols-[9rem_1fr] md:gap-6">
              <span />
              <div className="flex justify-around py-1">
                {[0, 1, 2].map((k) => (
                  <span key={k} className="relative h-8 w-px overflow-hidden bg-line">
                    <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent" style={{ animation: `flow-y 1.8s linear ${k * 0.3}s infinite` }} />
                  </span>
                ))}
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </RevealGroup>
  );
}
