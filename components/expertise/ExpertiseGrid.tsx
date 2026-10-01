import { GlowCard } from "@/components/animations/GlowCard";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/skills";
import { TechStack } from "@/components/expertise/TechStack";

/** "What I Build" — four capability pillars. */
export function ExpertiseGrid() {
  return (
    <section id="expertise" aria-labelledby="build-title" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="Capabilities"
          title="What I build"
          subtitle={<span id="build-title">From product discovery to production.</span>}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4" stagger={0.08}>
          {capabilities.map((c, i) => (
            <RevealItem key={c.id} className="h-full">
              <GlowCard className="group flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1 md:p-7">
                <div className="relative z-10 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-accent transition-all duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:border-accent/50 group-hover:bg-accent-soft">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="font-mono text-[0.65rem] text-fg-3">0{i + 1}</span>
                </div>

                <h3 className="relative z-10 mt-10 text-2xl font-semibold uppercase tracking-[-0.02em] md:text-[1.7rem]">{c.title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-fg-2">{c.summary}</p>

                <ul className="relative z-10 mt-8 grid gap-2 border-t border-line pt-6 text-sm">
                  {c.items.map((item, j) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-fg-2 transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-fg"
                      style={{ transitionDelay: `${j * 25}ms` }}
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <TechStack className="mt-16 md:mt-24" />
      </div>
    </section>
  );
}
