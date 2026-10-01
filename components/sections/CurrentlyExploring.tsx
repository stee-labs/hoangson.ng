import { Reveal } from "@/components/animations/Reveal";
import { StatusDot } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { currentlyExploring, experiments, statusLabel } from "@/data/experiments";

export function CurrentlyExploring() {
  const next = experiments.filter((e) => e !== currentlyExploring);
  return (
    <section aria-labelledby="exploring-title" className="relative pb-24 md:pb-36">
      <div className="container-x">
        <Reveal className="card glow-card grid overflow-hidden md:grid-cols-12">
          <div className="relative p-6 md:col-span-7 md:p-10">
            <p id="exploring-title" className="label mb-8 flex items-center gap-3 text-accent-2">
              <span className="font-mono text-accent">08</span>
              <span className="h-px w-8 bg-line-2" aria-hidden />
              Currently exploring
            </p>
            <div className="flex items-start gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-accent-2/40 bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] text-accent-2 animate-float">
                <Icon name="ai" size={24} />
              </span>
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
                  {currentlyExploring.title}
                  {currentlyExploring.subtitle && <span className="block text-fg-2">{currentlyExploring.subtitle}</span>}
                </h2>
                <p className="mt-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-2">
                  <StatusDot />
                  {statusLabel[currentlyExploring.status]}
                </p>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-fg-2">{currentlyExploring.description}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-line p-6 md:col-span-5 md:border-l md:border-t-0 md:p-10">
            <p className="label mb-6">On the radar</p>
            <ul className="grid gap-5">
              {next.map((e) => (
                <li key={e.title} className="group">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium transition-transform duration-300 group-hover:translate-x-1">{e.title}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-3">{statusLabel[e.status]}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{e.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
