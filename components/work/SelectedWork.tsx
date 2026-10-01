import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="relative pb-24 md:pb-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Work"
          title="Selected work"
          subtitle="A collection of products and experiments I’ve worked on across web, mobile, e-commerce and AI."
        />
        <div className="mt-12 md:mt-16">
          <ProjectGrid projects={projects.filter((p) => p.featured)} />
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button href="/work/" variant="ghost">
            All work & case studies
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
