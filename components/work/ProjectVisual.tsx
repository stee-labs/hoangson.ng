import type { ReactNode } from "react";
import type { ProjectVisualKind } from "@/data/projects";
import { asset, cn } from "@/lib/utils";

/**
 * Project imagery. Renders the real screenshot when `cover` is provided;
 * otherwise a neutral wireframe composition that is clearly labelled as a
 * placeholder — never a fabricated client screenshot.
 */
export function ProjectVisual({
  kind,
  cover,
  alt,
  className,
  showLabel = true,
  priority = false,
}: {
  kind: ProjectVisualKind | "flow";
  cover?: string;
  alt: string;
  className?: string;
  showLabel?: boolean;
  priority?: boolean;
}) {
  if (cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(cover)}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <div role="img" aria-label={`${alt} — illustrative placeholder`} className={cn("relative h-full w-full overflow-hidden", className)}>
      <Backdrop />
      {kind === "mobile" && <MobileComposition />}
      {kind === "browser" && <BookingComposition />}
      {kind === "commerce" && <CommerceComposition />}
      {kind === "agent" && <AgentComposition />}
      {kind === "flow" && <FlowComposition />}
      {showLabel && kind !== "agent" && kind !== "flow" && (
        <span className="absolute bottom-3 left-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-fg-3 backdrop-blur">
          Placeholder · add screenshot
        </span>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Building blocks
---------------------------------------------------------------------------- */

function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 bg-bg-2">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,var(--accent-soft),transparent_60%)]" />
      <div className="bg-grid absolute inset-0 opacity-40" />
    </div>
  );
}

function Bar({ w = "100%", className }: { w?: string; className?: string }) {
  return <div className={cn("h-1.5 rounded-full bg-fg/15", className)} style={{ width: w }} />;
}

/** Abstract "photo" area — a soft gradient standing in for imagery. */
function Photo({ className, hue = 0 }: { className?: string; hue?: number }) {
  return (
    <div
      className={cn("rounded-lg", className)}
      style={{
        background: `linear-gradient(${150 + hue}deg, color-mix(in oklab, var(--accent) ${38 - hue / 6}%, var(--bg-3)) 0%, var(--bg-3) 55%, color-mix(in oklab, var(--accent-2) ${14 + hue / 10}%, var(--bg-3)) 100%)`,
      }}
    />
  );
}

function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("absolute aspect-[9/19] rounded-[1.6rem] border border-line-2 bg-bg p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-bg-3">
        <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-bg" />
        <div className="flex h-full flex-col gap-2 p-2.5 pt-5">{children}</div>
      </div>
    </div>
  );
}

function Browser({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("absolute overflow-hidden rounded-xl border border-line-2 bg-bg-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg/20" />
        <span className="ml-3 h-3 flex-1 rounded-full bg-fg/5" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Compositions
---------------------------------------------------------------------------- */

function MobileComposition() {
  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
      <Phone className="left-[12%] top-[16%] w-[26%] -rotate-[8deg]">
        <Photo className="h-[34%]" hue={20} />
        <Bar w="70%" />
        <Bar w="45%" />
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          <div className="aspect-square rounded-md bg-fg/10" />
          <div className="aspect-square rounded-md bg-fg/10" />
          <div className="aspect-square rounded-md bg-fg/10" />
        </div>
      </Phone>
      <Phone className="left-[37%] top-[8%] z-10 w-[28%]">
        <div className="rounded-lg bg-gradient-to-br from-accent/70 to-accent/20 p-2">
          <div className="text-[0.45rem] font-medium uppercase tracking-widest text-white/80">Member</div>
          <div className="mt-3 h-2 w-1/2 rounded-full bg-white/70" />
          <div className="mt-1 h-1 w-1/3 rounded-full bg-white/40" />
        </div>
        <Bar w="60%" className="mt-1" />
        <div className="grid grid-cols-2 gap-1.5">
          <Photo className="aspect-[4/3]" hue={40} />
          <Photo className="aspect-[4/3]" hue={-20} />
        </div>
        <Bar w="80%" />
        <Bar w="50%" />
        <div className="mt-auto h-6 rounded-full bg-accent/80" />
      </Phone>
      <Phone className="left-[63%] top-[18%] w-[25%] rotate-[7deg]">
        <Bar w="50%" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md bg-fg/5 p-1.5">
            <Photo className="h-6 w-6 shrink-0" hue={i * 30} />
            <div className="grid flex-1 gap-1">
              <Bar w="80%" />
              <Bar w="40%" />
            </div>
          </div>
        ))}
      </Phone>
    </div>
  );
}

function BookingComposition() {
  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
      <Browser className="left-[8%] top-[14%] w-[76%]">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-bg-2 p-2">
          <div className="h-3 w-3 rounded-full border border-fg/30" />
          <Bar w="30%" />
          <div className="ml-auto h-4 w-12 rounded-md bg-accent/80" />
        </div>
        <div className="mt-3 flex gap-1.5">
          {["w-10", "w-14", "w-8", "w-12"].map((w, i) => (
            <div key={i} className={cn("h-3 rounded-full", w, i === 0 ? "bg-accent/40" : "bg-fg/10")} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1fr_1.4fr] gap-3">
          <Photo className="aspect-[4/3]" hue={10} />
          <div className="grid content-start gap-1.5 pt-1">
            <Bar w="70%" />
            <Bar w="50%" />
            <Bar w="85%" />
            <div className="mt-2 flex items-center justify-between">
              <Bar w="30%" />
              <div className="h-4 w-14 rounded-md border border-accent/60" />
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid gap-1.5 rounded-md bg-fg/5 p-1.5">
              <Photo className="aspect-[5/3]" hue={i * 25} />
              <Bar w="70%" />
            </div>
          ))}
        </div>
      </Browser>
      <Phone className="left-[72%] top-[34%] z-10 w-[19%]">
        <Bar w="60%" />
        <Photo className="h-[28%]" hue={35} />
        <Bar w="80%" />
        <Bar w="40%" />
        <div className="grid gap-1 rounded-md bg-fg/5 p-1.5">
          <Bar w="50%" />
          <Bar w="70%" />
        </div>
        <div className="mt-auto h-5 rounded-full bg-accent/80" />
      </Phone>
    </div>
  );
}

function CommerceComposition() {
  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
      <Browser className="left-[6%] top-[12%] w-[70%]">
        <div className="flex items-center justify-between">
          <Bar w="20%" />
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-fg/10" />
            <div className="h-3 w-3 rounded-full bg-accent/60" />
          </div>
        </div>
        <Photo className="mt-3 h-16" hue={-10} />
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="grid gap-1">
              <Photo className="aspect-square" hue={i * 12} />
              <Bar w="80%" />
              <Bar w="40%" className="bg-accent/30" />
            </div>
          ))}
        </div>
      </Browser>
      <Phone className="left-[68%] top-[26%] z-10 w-[20%]">
        <Bar w="40%" />
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-1.5 rounded-md bg-fg/5 p-1.5">
            <Photo className="h-7 w-7 shrink-0" hue={i * 40} />
            <div className="grid flex-1 content-center gap-1">
              <Bar w="80%" />
              <Bar w="40%" />
            </div>
          </div>
        ))}
        <div className="mt-2 rounded-md border border-dashed border-fg/20 p-2">
          <div className="text-[0.4rem] uppercase tracking-widest text-fg-3">Voucher</div>
          <Bar w="60%" className="mt-1.5" />
        </div>
        <div className="mt-auto h-5 rounded-full bg-accent/80" />
      </Phone>
    </div>
  );
}

function AgentComposition() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-[6%] pb-[4%] pt-[14%] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
      <div className="grid w-full max-w-[520px] gap-3 text-[clamp(0.55rem,1.1vw,0.75rem)]">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm border border-line-2 bg-bg-3 px-3.5 py-2.5 text-fg">
          I want a room near the beach this weekend.
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Intent", "Search", "Hotel APIs", "Availability", "Rates"].map((s, i) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[0.9em] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" style={{ opacity: 1 - i * 0.12 }} />
              {s}
            </span>
          ))}
        </div>
        <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-line bg-bg-2 p-2.5">
          <p className="mb-2 text-fg-2">Found options near the beach for this weekend:</p>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div key={i} className="grid gap-1.5 rounded-lg bg-fg/5 p-1.5">
                <Photo className="aspect-[5/3]" hue={i * 30 + 10} />
                <Bar w="70%" />
                <Bar w="40%" className="bg-accent/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowComposition() {
  const steps = ["Discover", "Design", "Build", "Ship"];
  return (
    <div className="absolute inset-0 flex items-center justify-center p-[8%]">
      <div className="grid w-full grid-cols-4 items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="relative">
            <div
              className={cn(
                "grid aspect-square place-items-center rounded-2xl border text-center font-mono text-[clamp(0.5rem,1vw,0.7rem)] uppercase tracking-[0.12em]",
                i === 3 ? "border-accent/60 bg-accent-soft text-accent" : "border-line-2 bg-bg-3 text-fg-2",
              )}
            >
              {s}
            </div>
            {i < steps.length - 1 && <div className="absolute -right-2 top-1/2 h-px w-2 bg-line-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
