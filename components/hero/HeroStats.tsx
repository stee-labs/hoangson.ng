import { Counter } from "@/components/animations/Counter";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { metrics } from "@/data/experience";

export function HeroStats() {
  return (
    <section id="metrics" aria-label="Key numbers" className="relative border-y border-line">
      <RevealGroup className="container-x grid grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {metrics.map((m, i) => (
          <RevealItem
            key={m.label}
            className={[
              "relative py-8 md:py-12",
              i % 2 === 1 ? "pl-5 md:pl-10" : "pr-5 lg:pr-0",
              i >= 2 ? "border-t border-line lg:border-t-0" : "",
              i % 2 === 1 ? "border-l border-line" : "",
              i === 2 ? "lg:border-l lg:pl-10" : "",
            ].join(" ")}
          >
            <p className="heading text-[clamp(2.5rem,6vw,4.75rem)] leading-none">
              <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
            </p>
            <p className="label mt-3">{m.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
