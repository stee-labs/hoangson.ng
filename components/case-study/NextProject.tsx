import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import type { Project } from "@/data/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next project" className="border-t border-line">
      <Link href={`/work/${project.slug}/`} data-cursor="Next project" className="group relative block overflow-hidden">
        <div className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-[transform,opacity] duration-700 ease-[var(--ease-out)] group-hover:scale-y-100 group-hover:opacity-100">
          <ProjectVisual kind={project.visual} cover={project.cover} alt="" showLabel={false} />
          <div className="absolute inset-0 bg-bg/70" />
        </div>
        <div className="container-x relative flex min-h-[60svh] flex-col justify-between gap-10 py-16 md:py-24">
          <div className="flex items-center justify-between">
            <span className="label">Next project</span>
            <span className="font-mono text-[0.68rem] text-fg-3">{project.number}</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <h2 className="heading max-w-5xl text-balance text-[clamp(2.5rem,8vw,7.5rem)] uppercase transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-3">
              {project.title}
            </h2>
            <span className="mb-3 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-2 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg md:h-20 md:w-20">
              <Icon name="arrow-right" size={22} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
