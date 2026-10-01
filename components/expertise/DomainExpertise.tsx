import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { domainCopy, domains } from "@/data/experience";

/** Hospitality as a specialization — deliberately compact. */
export function DomainExpertise() {
  return (
    <section aria-labelledby="domain-title" className="relative py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading index="03" label="Specialization" title="Domain expertise" align="left" titleClassName="text-[clamp(2rem,4.4vw,3.75rem)]" />
          <Reveal delay={0.1}>
            <p id="domain-title" className="mt-8 max-w-md text-pretty leading-relaxed text-fg-2">
              {domainCopy}
            </p>
            <p className="mt-6 max-w-md border-l border-accent pl-4 text-sm leading-relaxed text-fg">
              I work broadly across web, mobile, product and AI — with unusually deep knowledge of this domain.
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="border-t border-line lg:col-span-6 lg:col-start-7" stagger={0.06}>
            {domains.map((d, i) => (
              <RevealItem as="li" key={d.name} y={16} className="group relative flex items-center gap-5 overflow-hidden border-b border-line py-5 md:py-6">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-surface-2 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100" aria-hidden />
                  <span className="relative font-mono text-[0.65rem] text-fg-3">0{i + 1}</span>
                  <Icon name={d.icon} size={20} className="relative text-fg-2 transition-colors group-hover:text-accent" />
                  <span className="relative text-xl font-medium uppercase tracking-[-0.01em] md:text-2xl">{d.name}</span>
                  <span className="relative ml-auto hidden translate-x-3 text-right text-sm text-fg-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                    {d.note}
                  </span>
              </RevealItem>
            ))}
        </RevealGroup>
      </div>
    </section>
  );
}
