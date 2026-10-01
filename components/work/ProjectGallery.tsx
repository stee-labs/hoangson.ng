import Link from "next/link";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import { Reveal } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { experiences } from "@/data/skills";

/** "Selected Experiences" — pinned horizontal gallery on desktop, swipe carousel on touch. */
export function ProjectGallery() {
  return (
    <section aria-labelledby="experiences-title" className="relative border-y border-line bg-bg-2 py-20 lg:py-0">
      <HorizontalScroll
        header={
          <div className="container-x mb-10 flex items-end justify-between gap-6 lg:mb-12">
            <Reveal>
              <p className="label mb-4 flex items-center gap-3">
                <span className="font-mono text-accent">↳</span>
                <span className="h-px w-8 bg-line-2" aria-hidden />
                Across disciplines
              </p>
              <h2 id="experiences-title" className="heading text-[clamp(2rem,4.8vw,4.25rem)] uppercase">
                Selected experiences
              </h2>
            </Reveal>
            <p className="label hidden items-center gap-2 md:flex">
              <span className="hidden lg:inline">Scroll</span>
              <span className="lg:hidden">Swipe</span>
              <Icon name="arrow-right" size={14} />
            </p>
          </div>
        }
      >
        {experiences.map((e, i) => (
          <Link
            key={e.id}
            href={e.href}
            data-cursor="Explore"
            className="group relative flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-line bg-bg transition-colors hover:border-line-2 sm:w-[58vw] lg:w-[38vw] xl:w-[34vw]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <ProjectVisual kind={e.visual} alt={`${e.label} experience`} showLabel={false} />
              <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] backdrop-blur">
                {e.label}
              </span>
            </div>
            <div className="flex flex-1 items-end justify-between gap-6 p-5 md:p-7">
              <div>
                <p className="font-mono text-[0.65rem] text-fg-3">0{i + 1} / 0{experiences.length}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">{e.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-2">{e.body}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </div>
          </Link>
        ))}
      </HorizontalScroll>
    </section>
  );
}
