import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyNav, type TocItem } from "@/components/case-study/CaseStudyNav";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyStory } from "@/components/case-study/CaseStudyStory";
import { NextProject } from "@/components/case-study/NextProject";
import { Results } from "@/components/case-study/Results";
import { UserFlow } from "@/components/case-study/UserFlow";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { GlowCard } from "@/components/animations/GlowCard";
import { getNextProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = absoluteUrl(`/work/${project.slug}/`);
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${project.title} — ${site.name}`, description: project.summary, images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${project.title} — ${site.name}`, description: project.summary },
  };
}

const toc: TocItem[] = [
  { id: "overview", label: "Problem" },
  { id: "role", label: "My role" },
  { id: "thinking", label: "Product thinking" },
  { id: "ux", label: "UX / UI" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "Lessons" },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const cs = project.caseStudy;
  const next = getNextProject(project.slug);

  return (
    <article>
      <CaseStudyHero project={project} />
      <CaseStudyStory project={project} />

      <div className="container-x grid gap-10 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="h-full pt-24">
            <CaseStudyNav items={toc} />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <CaseStudySection id="thinking" index="03" label="Product thinking" title="Decisions that shaped the product.">
            <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.08}>
              {cs.thinking.map((t, i) => (
                <RevealItem key={t.title} className="h-full">
                  <GlowCard className="h-full p-6">
                    <p className="relative z-10 font-mono text-[0.65rem] text-accent">0{i + 1}</p>
                    <h3 className="relative z-10 mt-6 text-lg font-semibold leading-snug tracking-[-0.01em]">{t.title}</h3>
                    <p className="relative z-10 mt-3 text-sm leading-relaxed text-fg-2">{t.body}</p>
                  </GlowCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </CaseStudySection>

          <CaseStudySection id="ux" index="04" label="UX / UI" title={cs.ux.lead}>
            <UserFlow steps={cs.ux.flow} />
            {project.focus && (
              <Reveal className="mt-10">
                <p className="label mb-3">Focus areas</p>
                <p className="max-w-2xl text-fg-2">{project.focus.join(" · ")}</p>
              </Reveal>
            )}
          </CaseStudySection>

          <CaseStudySection id="architecture" index="05" label="Technical architecture" title={cs.architecture.lead}>
            <ArchitectureDiagram layers={cs.architecture.layers} />
            <Reveal className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.68rem] text-fg-2">
                  {s}
                </span>
              ))}
            </Reveal>
          </CaseStudySection>

          <CaseStudySection id="challenges" index="06" label="Technical challenges" title="What made it hard.">
            <RevealGroup as="ol" className="grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3" stagger={0.08}>
              {cs.challenges.map((c, i) => (
                <RevealItem as="li" key={c.title} className="bg-bg p-6 md:p-7">
                  <p className="font-mono text-[0.65rem] text-fg-3">0{i + 1}</p>
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{c.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </CaseStudySection>

          <CaseStudySection id="results" index="07" label="Result">
            <Results project={project} />
          </CaseStudySection>

          <CaseStudySection id="lessons" index="08" label="Lessons">
            <RevealGroup as="ul" className="grid gap-8" stagger={0.1}>
              {cs.lessons.map((l) => (
                <RevealItem as="li" key={l} className="max-w-3xl text-balance text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-snug tracking-[-0.02em]">
                  <span className="text-accent">“</span>
                  {l}
                  <span className="text-accent">”</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </CaseStudySection>
        </div>
      </div>

      <NextProject project={next} />
    </article>
  );
}
