import { techStack } from "@/data/skills";
import { cn } from "@/lib/utils";

/** Quiet, looping marquee of tools — present but deliberately not the focus. */
export function TechStack({ className }: { className?: string }) {
  const row = [...techStack, ...techStack];
  return (
    <div className={cn("relative", className)}>
      <p className="label mb-5">Tech stack</p>
      <div className="relative overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]" aria-label="Technologies">
          {row.map((t, i) => (
            <li key={`${t}-${i}`} aria-hidden={i >= techStack.length} className="flex items-center gap-10 whitespace-nowrap text-lg text-fg-2 md:text-2xl">
              {t}
              <span className="h-1.5 w-1.5 rotate-45 bg-line-2" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
