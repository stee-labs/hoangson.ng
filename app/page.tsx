import { AILab } from "@/components/ai/AILab";
import { DomainExpertise } from "@/components/expertise/DomainExpertise";
import { ExpertiseGrid } from "@/components/expertise/ExpertiseGrid";
import { Hero } from "@/components/hero/Hero";
import { HeroStats } from "@/components/hero/HeroStats";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { HowIThink } from "@/components/sections/HowIThink";
import { HowIShip } from "@/components/expertise/HowIShip";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { SelectedWork } from "@/components/work/SelectedWork";

/**
 * Narrative order: who → what he builds → what he shipped → how he thinks
 * → how he ships (end-to-end depth) → technical depth → what he's exploring → contact.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HeroStats />
      <ExpertiseGrid />
      <SelectedWork />
      <ProjectGallery />
      <DomainExpertise />
      <HowIThink />
      <HowIShip />
      <AILab />
      <AboutSection />
      <CurrentlyExploring />
      <Contact />
    </>
  );
}
