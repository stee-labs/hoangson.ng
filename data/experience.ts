/**
 * Experience, metrics, domain knowledge and working process.
 * Metrics here are the only numbers displayed on the site — do not add unverified ones.
 */

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 10, suffix: "+", label: "Years experience" },
  { value: 3, label: "Products released" },
  { value: 10, suffix: "K+", label: "Users" },
  { value: 20, suffix: "+", label: "Hotels & brands" },
];

export const heroCopy = {
  eyebrow: "Son Nguyen",
  lines: ["Full-stack", "Engineer ·", "Product-focused"],
  accentLine: 2,
  lead: "Building digital products from idea to production.",
  body: "10+ years of experience building real-world products, with deep expertise in hospitality, loyalty and hotel technology.",
};

export const domains = [
  { name: "Hospitality", icon: "hotel", note: "Guest journeys, hotel operations" },
  { name: "Loyalty", icon: "loyalty", note: "Members, tiers, rewards, offers" },
  { name: "CRM", icon: "crm", note: "Guest profiles & engagement" },
  { name: "Booking", icon: "booking", note: "Search, rooms, rates, checkout" },
  { name: "E-commerce", icon: "cart", note: "Vouchers, products, commerce" },
] as const;

export const domainCopy =
  "More than a decade working with hotel technology has given me a deep understanding of guest journeys, loyalty systems, booking experiences, hotel operations and digital commerce.";

export const process = [
  { n: "01", title: "Understand", body: "What problem are we solving?", detail: "Business goals, constraints and the people affected." },
  { n: "02", title: "Research", body: "Users / market / existing solutions", detail: "Talk to users, study competitors, question assumptions." },
  { n: "03", title: "Design", body: "UX / architecture / product flow", detail: "Flows and system design, shaped together — not in sequence." },
  { n: "04", title: "Build", body: "Frontend / backend / mobile", detail: "Ship end-to-end, in small increments, with care for quality." },
  { n: "05", title: "Measure", body: "Usage / conversion / errors", detail: "Instrument what matters so decisions come from evidence." },
  { n: "06", title: "Iterate", body: "Improve the product", detail: "Refine, simplify, repeat. Products are never finished." },
];

export const about = {
  heading: "Hi, I’m Son Nguyen.",
  subtitle: "Full-stack Engineer · Product-focused",
  tagline: "Building digital products from idea to production.",
  intro:
    "Full-stack engineer with 10+ years of experience building digital products for the hospitality industry.",
  body: "My work sits somewhere between engineering, product and UX. I enjoy understanding complex business problems, turning them into simple user experiences, and building the technology behind them.",
  quote: "Good products solve real problems and create real value.",
  /** Background-removed portrait (generated from public/images/portrait.jpg). */
  portrait: {
    src600: "/images/portrait-cutout-600.webp",
    src900: "/images/portrait-cutout-900.webp",
    original: "/images/portrait.jpg",
  },
  avatar: "/images/avatar.webp",
};

export const interests = [
  { label: "Development", icon: "code" },
  { label: "UI/UX", icon: "uiux" },
  { label: "Case Analysis", icon: "case" },
  { label: "Dance", icon: "dance" },
  { label: "Music", icon: "music" },
  { label: "Travel", icon: "travel" },
  { label: "Gym", icon: "gym" },
  { label: "Running", icon: "running" },
] as const;
