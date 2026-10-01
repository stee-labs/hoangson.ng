"use client";

import { transform, useTransform, type MotionValue } from "framer-motion";

/**
 * Map a scroll progress value to an output range (clamped).
 * Uses a function transform on purpose: Framer can't offload it to a native
 * ScrollTimeline, whose ranges are unreliable around sticky/pinned layouts.
 */
export function useRange(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, (v) => transform(v, input, output));
}
