import { AIDemo } from "@/components/ai/AIDemo";
import { AgentDiagram } from "@/components/ai/AgentDiagram";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aiLab } from "@/data/experiments";

export function AILab({ showLink = true, index = "06" }: { showLink?: boolean; index?: string }) {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-20%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, var(--glow), transparent 60%)" }} />
      </div>
      <div className="container-x">
        <SectionHeading
          index={index}
          label="AI Lab"
          title="Exploring how AI agents can change the way guests discover and book hotels."
          uppercase={false}
          titleClassName="text-[clamp(1.9rem,4.2vw,3.75rem)]"
          subtitle={
            <span className="flex flex-col items-start gap-4 lg:items-end">
              <Badge tone="accent">{aiLab.badge}</Badge>
              <span id="lab-title" className="lg:text-right">
                A personal research track: turning a sentence into a grounded, bookable recommendation.
              </span>
            </span>
          }
        />

        <Reveal className="mt-14 md:mt-20">
          <AgentDiagram />
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Try the concept</h3>
            <p className="mt-4 max-w-md leading-relaxed text-fg-2">
              The goal isn’t a chatbot — it’s a better discovery experience. Conversation captures intent; tools ground the answer in real availability; cards make comparing and booking easy.
            </p>
            <p className="label mt-10 mb-4">Key concepts</p>
            <ul className="flex flex-wrap gap-2">
              {aiLab.concepts.map((c) => (
                <li key={c} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg-2">
                  {c}
                </li>
              ))}
            </ul>
            {showLink && (
              <div className="mt-10">
                <Button href="/lab/" variant="ghost">
                  Visit the lab
                </Button>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <AIDemo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
