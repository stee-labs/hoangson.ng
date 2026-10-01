import { Counter } from "@/components/animations/Counter";
import { Reveal } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/data/projects";

/** Only verified metrics — parsed from `impact` values like "10K+". */
export function Results({ project }: { project: Project }) {
  const { results } = project.caseStudy;
  return (
    <div className="grid gap-10">
      {project.impact.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {project.impact.map((m) => {
            const match = /^(\D*)(\d+)(.*)$/.exec(m.value);
            return (
              <Reveal key={m.label} className="card p-6 md:p-8">
                <p className="heading text-[clamp(3rem,7vw,5.5rem)] leading-none">
                  {match ? <Counter prefix={match[1]} value={Number(match[2])} suffix={match[3]} /> : m.value}
                </p>
                <p className="label mt-4">{m.label}</p>
              </Reveal>
            );
          })}
        </div>
      )}
      <Reveal>
        <p className="mb-5 text-lg text-fg">{results.lead}</p>
        <ul className="grid gap-3">
          {results.notes.map((n) => (
            <li key={n} className="flex items-start gap-3 text-fg-2">
              <Icon name="check" size={16} className="mt-1 shrink-0 text-accent-2" />
              {n}
            </li>
          ))}
        </ul>
        {project.impact.length === 0 && (
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-3">Only verified metrics are published here.</p>
        )}
      </Reveal>
    </div>
  );
}
