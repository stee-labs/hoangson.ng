import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ExpertiseGrid } from "@/components/expertise/ExpertiseGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { HowIThink } from "@/components/sections/HowIThink";
import { HowIShip } from "@/components/expertise/HowIShip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — product-focused full-stack engineer with 10+ years building digital products, with deep hospitality and loyalty expertise.`,
  alternates: { canonical: absoluteUrl("/about/") },
};

export default function AboutPage() {
  const tiers = [
    { label: "Primary", value: site.positioning.primary, note: site.tagline, items: [] as readonly string[] },
    { label: "Secondary", value: "Disciplines", items: site.positioning.secondary },
    { label: "Specialization", value: "Domain", items: site.positioning.specialization },
  ];
  return (
    <>
      <div className="pt-[var(--nav-h)]">
        <AboutSection full />
      </div>

      <section aria-label="Positioning" className="container-x pb-24 md:pb-32">
        <SectionHeading label="Positioning" title="Engineer first. Product always." subtitle="How I describe the work I do — in order of what matters." />
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3" stagger={0.08}>
          {tiers.map((t) => (
            <RevealItem key={t.label} className="bg-bg p-6 md:p-8">
              <p className="label">{t.label}</p>
              <p className="mt-6 text-xl font-semibold tracking-[-0.02em]">{t.value}</p>
              {"note" in t && t.note && <p className="mt-2 text-sm text-fg-2">{t.note}</p>}
              {t.items.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {t.items.map((i) => (
                    <li key={i} className="rounded-full border border-line px-3 py-1 text-xs text-fg-2">
                      {i}
                    </li>
                  ))}
                </ul>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-3">
            I understand problems, research solutions, design products, write code, ship software — and keep improving it.
          </p>
        </Reveal>
      </section>

      <ExpertiseGrid />
      <HowIThink />
      <HowIShip />
      <Contact />
    </>
  );
}
