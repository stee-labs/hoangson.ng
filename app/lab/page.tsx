import type { Metadata } from "next";
import { AILab } from "@/components/ai/AILab";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { Badge, StatusDot } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiments, statusLabel } from "@/data/experiments";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Lab",
  description: "Research and prototypes exploring AI agents, AI search and conversational UX for hospitality.",
  alternates: { canonical: absoluteUrl("/lab/") },
};

export default function LabPage() {
  return (
    <>
      <PageHeader label="Research / Prototype" title={["AI Lab"]}>
        Exploring how AI agents can change the way guests discover and book hotels. Everything here is research — clearly labelled, never oversold.
      </PageHeader>

      <AILab showLink={false} index="01" />

      <section aria-label="Experiments" className="container-x pb-24 md:pb-36">
        <SectionHeading index="02" label="Experiments" title="Research tracks" subtitle="What I’m exploring now, and what’s next." />
        <RevealGroup as="ul" className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
          {experiments.map((e) => (
            <RevealItem as="li" key={e.title} className="card p-6 md:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">
                  {e.title} {e.subtitle && <span className="text-fg-2">{e.subtitle}</span>}
                </h3>
                {e.status === "researching" ? (
                  <Badge tone="success">
                    <StatusDot className="!h-1.5 !w-1.5" />
                    {statusLabel[e.status]}
                  </Badge>
                ) : (
                  <Badge>{statusLabel[e.status]}</Badge>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fg-2">{e.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Contact />
    </>
  );
}
