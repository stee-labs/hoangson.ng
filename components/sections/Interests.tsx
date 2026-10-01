import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { interests } from "@/data/experience";

export function Interests() {
  return (
    <div className="card p-5 md:p-6">
      <p className="label mb-5 text-accent">When I’m not coding</p>
      <RevealGroup as="ul" className="grid grid-cols-2 gap-x-4 gap-y-3.5 sm:grid-cols-4" stagger={0.04}>
        {interests.map((it) => (
          <RevealItem as="li" key={it.label} y={10} className="group flex items-center gap-2.5 text-sm text-fg-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line text-fg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:border-accent/50 group-hover:text-accent">
              <Icon name={it.icon} size={15} />
            </span>
            {it.label}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
