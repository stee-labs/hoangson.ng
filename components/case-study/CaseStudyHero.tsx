import Link from "next/link";
import type { CSSProperties } from "react";
import { IntroTitle } from "@/components/animations/IntroTitle";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import type { Project } from "@/data/projects";

const d = (delay: number) => ({ "--d": `${delay}s` }) as CSSProperties;

/** Case-study opening. CSS-driven entrance so the title paints before hydration. */
export function CaseStudyHero({ project }: { project: Project }) {
  const meta = [
    { label: "Role", value: project.role.join(" / ") },
    { label: "Stack", value: project.stack.join(" / ") },
    project.impact.length
      ? { label: "Impact", value: project.impact.map((m) => `${m.value} ${m.label.toLowerCase()}`).join("\n") }
      : { label: "Status", value: project.status === "shipped" ? "Shipped" : project.badge ?? "Prototype" },
  ];

  return (
    <header className="relative pt-[calc(var(--nav-h)+2.5rem)] md:pt-[calc(var(--nav-h)+4rem)]">
      <div className="container-x">
        <div className="intro-fade" style={d(0)}>
          <Link href="/work/" className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-2 transition-colors hover:text-fg">
            <Icon name="arrow-left" size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to work
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="intro-fade label mb-5 flex items-center gap-3" style={d(0.05)}>
              <span className="text-accent">{project.number}</span>
              <span className="h-px w-8 bg-line-2" aria-hidden />
              Case study
            </p>
            <IntroTitle text={project.title} delay={0.1} className="heading text-balance text-[clamp(2.6rem,7.4vw,7rem)] uppercase" />
          </div>
          <div className="intro-fade lg:col-span-4" style={d(0.3)}>
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.badge && <Badge tone="accent">{project.badge}</Badge>}
              {project.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <p className="text-pretty leading-relaxed text-fg-2">{project.summary}</p>
          </div>
        </div>
      </div>

      <div className="intro-clip container-x mt-12 md:mt-16" style={d(0.35)}>
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[22px] border border-line sm:aspect-[16/9] lg:aspect-[21/9]">
          <ProjectVisual kind={project.visual} cover={project.cover} alt={`${project.title} hero visual`} priority />
        </div>
      </div>

      <dl className="intro-fade container-x mt-6 grid gap-px overflow-hidden sm:grid-cols-3" style={d(0.5)}>
        {meta.map((m) => (
          <div key={m.label} className="border-t border-line py-5 sm:pr-6">
            <dt className="label">{m.label}</dt>
            <dd className="mt-2 whitespace-pre-line text-sm leading-relaxed text-fg">{m.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
