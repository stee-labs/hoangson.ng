import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Portrait } from "@/components/sections/Portrait";
import { Interests } from "@/components/sections/Interests";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/data/experience";
import { site } from "@/data/site";

export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal y={10} className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] text-accent">07</span>
            <span className="h-px w-8 bg-line-2" aria-hidden />
            <span className="label">About</span>
          </Reveal>
          <TextReveal as={full ? "h1" : "h2"} id="about-title" text={about.heading} className="heading text-balance text-[clamp(2.25rem,5.4vw,4.75rem)] uppercase" />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-accent">{about.subtitle}</p>
            <p className="mt-1 text-fg-2">{about.tagline}</p>
            <div className="mt-8 grid max-w-xl gap-5 text-pretty leading-relaxed text-fg-2">
              <p className="text-fg">{about.intro}</p>
              <p>{about.body}</p>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-fg-2">
              <Icon name="location" size={16} />
              {site.location}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <Interests />
          </Reveal>
          <Reveal className="mt-10 lg:hidden">
            <blockquote className="border-l border-accent pl-5">
              <p className="text-lg leading-snug text-fg">“{about.quote}”</p>
              <footer className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-3">— {site.name}</footer>
            </blockquote>
          </Reveal>
          {!full && (
            <Reveal delay={0.2} className="mt-10">
              <Button href="/about/" variant="ghost">
                More about me
              </Button>
            </Reveal>
          )}
        </div>

        <div className="order-first lg:order-none lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Portrait
              src600={about.portrait.src600}
              src900={about.portrait.src900}
              alt={`Portrait of ${site.name}`}
              location={site.location}
              status="Exploring AI agents"
              className="mx-auto aspect-[4/5] w-full max-w-[440px] lg:max-w-none"
            />
            <blockquote className="mt-8 hidden border-l border-accent pl-5 lg:block">
              <p className="text-lg leading-snug text-fg">“{about.quote}”</p>
              <footer className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-3">— {site.name}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
