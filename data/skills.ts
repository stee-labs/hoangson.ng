export type Capability = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  items: string[];
};

/** "What I Build" — the four capability pillars. */
export const capabilities: Capability[] = [
  {
    id: "web",
    title: "Web",
    icon: "web",
    summary: "Fast, accessible web products and the APIs behind them.",
    items: ["Next.js", "React", "TypeScript", "PHP", "MySQL", "REST APIs"],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "mobile",
    summary: "Cross-platform apps, from first build to store release.",
    items: ["React Native", "Expo", "iOS", "Android", "Firebase", "App Store", "Google Play"],
  },
  {
    id: "product",
    title: "Product",
    icon: "product",
    summary: "Finding the right problem before writing the first line.",
    items: ["Product Discovery", "UX/UI", "User Flows", "Research", "Optimization", "Architecture"],
  },
  {
    id: "ai",
    title: "AI",
    icon: "ai",
    summary: "Practical AI features with real UX, not demos in a vacuum.",
    items: ["AI Agents", "LLM Applications", "RAG", "Tool Calling", "AI Search", "Conversational UX"],
  },
];

export const techStack = [
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "TypeScript",
  "Node.js",
  "PHP",
  "MySQL",
  "Firebase",
  "REST APIs",
  "Git",
  "LLM APIs",
];

/** Cards for the horizontal "Selected Experiences" gallery. */
export const experiences = [
  {
    id: "web",
    label: "Web",
    title: "Booking & commerce on the web",
    body: "Search, room selection, rates and checkout — tuned for clarity, conversion and speed.",
    visual: "browser",
    href: "/work/hotel-booking-experience/",
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "Loyalty in your pocket",
    body: "Member apps for rewards, offers and services, released to the App Store and Google Play.",
    visual: "mobile",
    href: "/work/hotel-loyalty-ecosystem/",
  },
  {
    id: "ai",
    label: "AI",
    title: "Conversational discovery",
    body: "Researching agents that turn a sentence into a room recommendation.",
    visual: "agent",
    href: "/work/ai-hotel-booking-agent/",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    title: "Commerce beyond the room",
    body: "Vouchers, offers and products sold directly to hotel customers.",
    visual: "commerce",
    href: "/work/hotel-ecommerce-platform/",
  },
  {
    id: "product",
    label: "Product",
    title: "From discovery to production",
    body: "Owning the problem, the flow, the architecture and the release — end to end.",
    visual: "flow",
    href: "/#process",
  },
] as const;

/**
 * "How I Ship" — the engineering beyond the UI that takes a product
 * from idea to production. Grouped into pipeline stages.
 */
export type ShipStage = {
  id: string;
  step: string;
  title: string;
  summary: string;
  icon: string;
  items: { name: string; note: string }[];
};

export const shipPath = ["Idea", "Code", "Backend", "Deploy", "Production"];

export const shipStages: ShipStage[] = [
  {
    id: "delivery",
    step: "Code",
    title: "Delivery",
    summary: "A workflow that keeps shipping safe and repeatable.",
    icon: "code",
    items: [
      { name: "Git", note: "Branching, reviews and a readable history" },
      { name: "Testing", note: "Confidence before every release" },
      { name: "CI/CD", note: "Automated builds, checks and deploys" },
    ],
  },
  {
    id: "backend",
    step: "Backend",
    title: "Foundations",
    summary: "The parts users never see, designed so the product can grow.",
    icon: "api",
    items: [
      { name: "API Design", note: "REST APIs shaped around real product flows" },
      { name: "Database Design", note: "Schemas and data models that hold up over time" },
      { name: "Authentication", note: "Secure sign-in, sessions and member accounts" },
    ],
  },
  {
    id: "release",
    step: "Deploy",
    title: "Release",
    summary: "Getting it into users’ hands — on the web and in the stores.",
    icon: "send",
    items: [
      { name: "Cloud / Deployment", note: "Environments, hosting and rollouts" },
      { name: "App Store / Play Store Release", note: "Builds, store review and releases on iOS & Android" },
    ],
  },
  {
    id: "production",
    step: "Production",
    title: "Operate",
    summary: "Shipping is the start. Measuring is how products get better.",
    icon: "spark",
    items: [
      { name: "Analytics", note: "Usage and conversion tracked to guide decisions" },
      { name: "Performance", note: "Fast loads, smooth apps, fewer errors" },
    ],
  },
];
