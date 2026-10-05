import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { profileLink } from "@/lib/links";

export function Contact() {
  const email = profileLink("email");
  // Only real profiles get a button here; empty ones still show as "(soon)" in the footer.
  const socials = (
    [
      { label: "GitHub", ...profileLink("github") },
      { label: "LinkedIn", ...profileLink("linkedin") },
      { label: "Facebook", ...profileLink("facebook") },
      { label: "Instagram", ...profileLink("instagram") },
    ] as const
  ).filter((l) => !l.placeholder);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line py-28 md:py-44">
      <Waves />
      <div className="container-x">
        <Reveal y={10} className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] text-accent">09</span>
          <span className="h-px w-8 bg-line-2" aria-hidden />
          <span className="label">Contact</span>
        </Reveal>
        <TextReveal
          as="h2"
          id="contact-title"
          text={["Let’s build", "something", "useful."]}
          stagger={0.1}
          className="display text-[clamp(3rem,11.5vw,10.5rem)]"
          lineClasses={[undefined, undefined, "text-accent"]}
        />
        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-lg leading-snug text-fg-2 md:text-xl">Have an interesting product, technical challenge or idea?</p>
            {!email.placeholder && (
              <a href={email.href} className="link-underline mt-4 inline-block font-mono text-sm text-fg-3 transition-colors hover:text-fg">
                {site.links.email}
              </a>
            )}
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap gap-3">
            <Button href={email.href} placeholder={email.placeholder} size="lg">
              Get in touch
            </Button>
            {socials.map((l) => (
              <Button key={l.label} href={l.href} external={l.external} variant="ghost" size="lg" icon="arrow-up-right">
                {l.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Slow, low-contrast waves. Each layer is a 2× wide tile translated for a seamless loop. */
function Waves() {
  const layers = [
    { d: 30, o: 0.5, y: 0, amp: 40 },
    { d: 44, o: 0.3, y: 26, amp: 56 },
    { d: 60, o: 0.18, y: 54, amp: 70 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] overflow-hidden [mask-image:linear-gradient(to_top,black_30%,transparent)]">
      {layers.map((l, i) => {
        const path = (() => {
          let p = `M0 ${120 + l.y}`;
          for (let x = 0, seg = 0; x < 2400; x += 300, seg++) p += ` Q ${x + 150} ${120 + l.y - l.amp * (seg % 2 ? -1 : 1) * (i % 2 ? -1 : 1)}, ${x + 300} ${120 + l.y}`;
          return p;
        })();
        return (
          <svg
            key={i}
            className="absolute bottom-0 left-0 h-full w-[200%] text-accent"
            viewBox="0 0 2400 300"
            preserveAspectRatio="none"
            style={{ animation: `wave ${l.d}s linear infinite`, opacity: l.o }}
          >
            <path d={path} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            {Array.from({ length: 6 }).map((_, k) => (
              <path key={k} d={path} transform={`translate(0 ${(k + 1) * 22})`} fill="none" stroke="currentColor" strokeOpacity={0.6 - k * 0.09} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        );
      })}
    </div>
  );
}
