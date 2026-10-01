/** Shared motion language — every animation should pull from here. */

export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  in: [0.55, 0, 1, 0.45] as [number, number, number, number],
};

export const duration = {
  micro: 0.2,
  reveal: 0.65,
  page: 0.45,
  story: 0.9,
};

export const stagger = {
  tight: 0.04,
  base: 0.07,
  loose: 0.1,
};

export const spring = {
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
  soft: { stiffness: 120, damping: 20, mass: 0.6 },
};

export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
