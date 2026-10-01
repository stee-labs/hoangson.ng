"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { detectIntent, recommend, suggestionPrompts, type DemoIntent, type MockHotel } from "@/data/ai-demo";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Step = { label: string; detail: string };
type Run = { query: string; intent: DemoIntent; steps: Step[]; results: MockHotel[] };

/** Simulated agent run over local mock data — demonstrates the UX, not a real model. */
export function AIDemo() {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = (query: string) => {
    const q = query.trim();
    if (!q) return;
    timers.current.forEach(clearTimeout);
    const intent = detectIntent(q);
    const results = recommend(intent);
    const steps: Step[] = [
      { label: "Intent detection", detail: intent.summary },
      { label: "Search", detail: `search_hotels(${intent.signals.find((s) => ["beach", "city", "mountain"].includes(s)) ?? "any"})` },
      { label: "Tool calling", detail: "check_availability() · get_rates()" },
      { label: "Reasoning", detail: `ranked ${results.length} best matches by fit` },
    ];
    setRun({ query: q, intent, steps, results });
    setValue("");
    if (reduced) return setShown(steps.length + 1);
    setShown(0);
    for (let i = 1; i <= steps.length + 1; i++) {
      timers.current.push(window.setTimeout(() => setShown(i), i * 520));
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    start(value);
  };

  const done = run && shown > run.steps.length;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-accent-2 animate-pulse-dot" aria-hidden />
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em]">Booking agent</span>
        </div>
        <Badge tone="accent">Concept demo</Badge>
      </div>

      <div className="min-h-[320px] space-y-4 p-5" aria-live="polite">
        {!run && (
          <div className="grid gap-4">
            <p className="text-sm leading-relaxed text-fg-2">Ask for a stay in your own words. The agent detects intent, calls (mock) hotel tools and recommends rooms.</p>
            <div className="flex flex-wrap gap-2">
              {suggestionPrompts.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => start(s)}
                  className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-fg-2 transition-colors hover:border-accent/50 hover:text-fg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {run && (
          <>
            <motion.p
              key={run.query}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm border border-line-2 bg-bg-3 px-4 py-2.5 text-sm"
            >
              {run.query}
            </motion.p>

            <ol className="grid gap-2">
              {run.steps.map((s, i) => (
                <AnimatePresence key={s.label}>
                  {shown > i && (
                    <motion.li
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: ease.out }}
                      className="flex items-center gap-3 text-xs"
                    >
                      <span className={cn("grid h-5 w-5 place-items-center rounded-full border", shown > i + 1 || done ? "border-accent-2/50 text-accent-2" : "border-accent/50 text-accent")}>
                        {shown > i + 1 || done ? <Icon name="check" size={11} /> : <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />}
                      </span>
                      <span className="w-24 shrink-0 font-mono sm:w-32 uppercase tracking-[0.1em] text-fg">{s.label}</span>
                      <span className="truncate font-mono text-fg-3">{s.detail}</span>
                    </motion.li>
                  )}
                </AnimatePresence>
              ))}
            </ol>

            <AnimatePresence>
              {done && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: ease.out }} className="grid gap-3">
                  <p className="text-sm text-fg-2">
                    {run.intent.signals.length ? "Here’s what fits best:" : "I’d need a bit more detail — a place or dates helps. Meanwhile, popular picks:"}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {run.results.map((h, i) => (
                      <motion.div
                        key={h.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4, ease: ease.out }}
                        className="rounded-xl border border-line bg-bg-2 p-3"
                      >
                        <div
                          className="mb-3 aspect-[16/8] rounded-lg"
                          style={{ background: `linear-gradient(${140 + i * 40}deg, color-mix(in oklab, var(--accent) 40%, var(--bg-3)), var(--bg-3) 60%, color-mix(in oklab, var(--accent-2) 20%, var(--bg-3)))` }}
                          aria-hidden
                        />
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{h.name}</p>
                            <p className="text-xs text-fg-3">
                              {h.area} · {h.room}
                            </p>
                          </div>
                          <p className="text-right text-sm font-medium">
                            ${h.rate}
                            <span className="block font-mono text-[0.6rem] text-fg-3">/night</span>
                          </p>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-fg-2">{h.reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
        <label htmlFor="ai-demo-input" className="sr-only">
          Ask the booking agent
        </label>
        <input
          id="ai-demo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What hotel should I stay at?"
          autoComplete="off"
          className="h-11 flex-1 rounded-full border border-line bg-bg px-4 text-sm text-fg placeholder:text-fg-3 focus:border-accent/60 focus:outline-none"
        />
        <button
          type="submit"
          className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-fg transition-transform hover:scale-105 disabled:opacity-40"
          disabled={!value.trim()}
          aria-label="Send"
        >
          <Icon name="arrow-right" size={16} />
        </button>
      </form>
      <p className="border-t border-line px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-3">Simulated with local mock data · no AI API is called</p>
    </div>
  );
}
