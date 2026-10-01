import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected products and experiments across web, mobile, e-commerce and AI — with case studies.",
  alternates: { canonical: absoluteUrl("/work/") },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader label="Selected work" title={["Work"]}>
        A collection of products and experiments I’ve worked on across web, mobile, e-commerce and AI.
      </PageHeader>
      <section aria-labelledby="all-projects" className="container-x pb-24 md:pb-32">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <ProjectGrid />
      </section>
      <ProjectGallery />
      <Contact />
    </>
  );
}
