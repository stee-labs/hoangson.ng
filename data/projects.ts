/**
 * Projects & case studies.
 *
 * Add a project by appending an object — the grid, filters, case-study page,
 * sitemap and "next project" link all derive from this list.
 *
 * NOTE: Case-study narratives are first drafts. Review and adjust wording so
 * every statement reflects your real work. Only list verified metrics in
 * `impact` / `caseStudy.results.metrics`.
 */

export type ProjectCategory = "web" | "mobile" | "product" | "ecommerce" | "ai";
export type ProjectStatus = "shipped" | "prototype" | "research";
export type ProjectVisualKind = "mobile" | "browser" | "commerce" | "agent";

export type Project = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  tags: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  badge?: string;
  featured: boolean;
  /** Grid footprint on desktop. */
  size: "large" | "medium";
  visual: ProjectVisualKind;
  /** Optional real screenshot in /public (e.g. "/images/projects/loyalty/cover.webp"). */
  cover?: string;
  role: string[];
  stack: string[];
  focus?: string[];
  impact: { value: string; label: string }[];
  caseStudy: CaseStudy;
};

export type CaseStudy = {
  problem: { lead: string; body: string[] };
  role: { lead: string; items: { title: string; detail: string }[] };
  thinking: { title: string; body: string }[];
  ux: { lead: string; flow: string[] };
  architecture: { lead: string; layers: { name: string; nodes: string[] }[] };
  challenges: { title: string; body: string }[];
  results: { lead: string; notes: string[] };
  lessons: string[];
};

export const categoryFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "product", label: "Product" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "ai", label: "AI / Research" },
];

export const projects: Project[] = [
  {
    slug: "hotel-loyalty-ecosystem",
    number: "01",
    title: "Hotel Loyalty Ecosystem",
    summary:
      "A digital ecosystem for hotel loyalty members covering mobile experiences, rewards, offers, booking and member services.",
    tags: ["Mobile", "Web", "Loyalty", "Hospitality"],
    categories: ["mobile", "web", "product"],
    status: "shipped",
    featured: true,
    size: "large",
    visual: "mobile",
    role: ["Product", "UX/UI", "Full-stack", "Mobile"],
    stack: ["React Native", "Expo", "React", "PHP", "MySQL", "Firebase", "REST APIs"],
    impact: [
      { value: "10K+", label: "Users" },
      { value: "3", label: "Released mobile products" },
    ],
    caseStudy: {
      problem: {
        lead: "Loyalty programs were fragmented, with limited engagement and a poor digital experience for members.",
        body: [
          "Members had to jump between channels to check their status, find offers or redeem rewards. The value of the program was real — but hard to see and harder to use.",
          "The goal was a single, coherent member experience across mobile and web that made the program feel rewarding every time it was opened.",
        ],
      },
      role: {
        lead: "I worked across the full product surface — from shaping the problem to shipping the apps.",
        items: [
          { title: "Product", detail: "Scoping features, prioritising the roadmap and aligning with business goals." },
          { title: "UX / UI", detail: "User flows, information architecture and interface design for member journeys." },
          { title: "Full-stack", detail: "APIs, data model and admin tooling behind the member experience." },
          { title: "Mobile", detail: "Building and releasing the apps to the App Store and Google Play." },
        ],
      },
      thinking: [
        { title: "Value first, features second", body: "Every screen answers one member question: what do I have, what can I get, and what should I do next?" },
        { title: "One ecosystem, many surfaces", body: "Shared APIs and design patterns let mobile and web evolve together instead of drifting apart." },
        { title: "Release as a product, not a project", body: "Designing for iteration after launch — content, offers and campaigns manageable without new app releases." },
      ],
      ux: {
        lead: "Core member journey, designed to be understood at a glance.",
        flow: ["Onboard", "Member profile", "Points & tier", "Offers", "Redeem", "Book", "Services"],
      },
      architecture: {
        lead: "A shared backend serving multiple client apps.",
        layers: [
          { name: "Clients", nodes: ["iOS app", "Android app", "Web portal", "Admin"] },
          { name: "Services", nodes: ["REST APIs", "Auth", "Notifications"] },
          { name: "Data", nodes: ["MySQL", "Firebase", "Hotel systems"] },
        ],
      },
      challenges: [
        { title: "Consistency across apps", body: "Keeping member data, balances and offers consistent between mobile, web and hotel-side systems." },
        { title: "Store releases", body: "Managing builds, reviews and updates across iOS and Android without slowing down the product." },
        { title: "Content without releases", body: "Letting the business update offers and campaigns without shipping a new binary." },
      ],
      results: {
        lead: "Verified outcomes from the ecosystem.",
        notes: ["Adopted by 10K+ users", "3 mobile products released to the stores"],
      },
      lessons: [
        "Loyalty is a product, not a points table — engagement comes from clarity and timely value.",
        "Shared foundations across apps pay back every time a new surface is added.",
      ],
    },
  },
  {
    slug: "hotel-booking-experience",
    number: "02",
    title: "Hotel Booking Experience",
    summary:
      "An end-to-end booking journey — from search and destination to room, rate and guest details — optimised for clarity, conversion and performance.",
    tags: ["Web", "Booking", "Product"],
    categories: ["web", "product"],
    status: "shipped",
    featured: true,
    size: "medium",
    visual: "browser",
    role: ["Product", "UX/UI", "Full-stack"],
    stack: ["React", "Next.js", "TypeScript", "PHP", "MySQL", "REST APIs"],
    focus: ["Search", "Destination selection", "Hotel selection", "Room selection", "Rates", "Guest information", "Booking"],
    impact: [],
    caseStudy: {
      problem: {
        lead: "Booking a hotel room should feel simple — but the underlying data is anything but.",
        body: [
          "Destinations, hotels, room types, rate plans, policies and availability all interact. Exposing that complexity directly creates friction and drop-off.",
          "The challenge was to design a journey that feels effortless while staying accurate at every step.",
        ],
      },
      role: {
        lead: "Owning the journey end-to-end: flow, interface and implementation.",
        items: [
          { title: "Product", detail: "Mapping the booking funnel and identifying where guests hesitate." },
          { title: "UX / UI", detail: "Designing search, selection and checkout steps with progressive disclosure." },
          { title: "Full-stack", detail: "Front-end implementation and integration with availability and rate APIs." },
        ],
      },
      thinking: [
        { title: "Reduce decisions per step", body: "Each step asks for one decision. Details appear when they matter, not before." },
        { title: "Make price honest early", body: "Showing rates and conditions clearly reduces surprises — and abandoned checkouts." },
        { title: "Performance is UX", body: "Fast search and instant feedback keep guests moving through the funnel." },
      ],
      ux: {
        lead: "The booking funnel, step by step.",
        flow: ["Search", "Destination", "Hotel", "Room", "Rates", "Guest info", "Booking"],
      },
      architecture: {
        lead: "A web front-end orchestrating availability and rate services.",
        layers: [
          { name: "Client", nodes: ["Booking web app", "State & caching"] },
          { name: "Services", nodes: ["Search API", "Availability", "Rates", "Reservations"] },
          { name: "Data", nodes: ["MySQL", "Hotel inventory"] },
        ],
      },
      challenges: [
        { title: "Real-time availability", body: "Keeping availability and pricing accurate without making the interface slow." },
        { title: "Complex rate logic", body: "Presenting rate plans, inclusions and policies in a way guests can compare quickly." },
        { title: "Mobile-first checkout", body: "Designing forms that are fast and forgiving on small screens." },
      ],
      results: {
        lead: "Focus areas of the work.",
        notes: ["UX optimisation across the funnel", "Conversion-focused step design", "Performance improvements in search and selection"],
      },
      lessons: [
        "Most booking friction is information design, not technology.",
        "Measuring each step of a funnel turns opinions into priorities.",
      ],
    },
  },
  {
    slug: "hotel-ecommerce-platform",
    number: "03",
    title: "Hotel E-commerce Platform",
    summary:
      "E-commerce experiences for hotel customers including products, vouchers, offers and hotel-related commerce.",
    tags: ["Web", "E-commerce", "Product"],
    categories: ["web", "ecommerce", "product"],
    status: "shipped",
    featured: true,
    size: "medium",
    visual: "commerce",
    role: ["Product", "UX/UI", "Full-stack"],
    stack: ["React", "Next.js", "PHP", "MySQL", "REST APIs"],
    impact: [],
    caseStudy: {
      problem: {
        lead: "Hotels sell far more than rooms — but those products rarely get a real storefront.",
        body: [
          "Vouchers, dining, spa and experiences were often sold through ad-hoc channels, making them hard to discover and hard to manage.",
          "The aim was a proper commerce experience that fits hotel products and the way guests buy them.",
        ],
      },
      role: {
        lead: "Designing and building the storefront and the commerce flows behind it.",
        items: [
          { title: "Product", detail: "Defining product types, offers and purchase flows for hotel commerce." },
          { title: "UX / UI", detail: "Catalogue, product detail and checkout experiences." },
          { title: "Full-stack", detail: "Storefront, order handling and integration APIs." },
        ],
      },
      thinking: [
        { title: "Hotel products are different", body: "Vouchers and experiences have validity, locations and conditions — the UI must make them clear." },
        { title: "Gifting is a use case", body: "Many purchases are for someone else; the flow should support that naturally." },
        { title: "Reusable commerce core", body: "One engine that can serve multiple hotels and brands." },
      ],
      ux: {
        lead: "From discovery to delivered voucher.",
        flow: ["Browse", "Offer detail", "Cart", "Checkout", "Payment", "Voucher", "Redeem"],
      },
      architecture: {
        lead: "A storefront backed by a reusable commerce service.",
        layers: [
          { name: "Client", nodes: ["Storefront", "Admin"] },
          { name: "Services", nodes: ["Catalogue", "Orders", "Vouchers", "Payments"] },
          { name: "Data", nodes: ["MySQL", "Brand configuration"] },
        ],
      },
      challenges: [
        { title: "Multi-brand setup", body: "Supporting different hotels and brands on shared infrastructure." },
        { title: "Voucher lifecycle", body: "Issuing, tracking and redeeming vouchers reliably." },
        { title: "Offer rules", body: "Expressing pricing, validity and conditions without complicating checkout." },
      ],
      results: {
        lead: "Scope of the platform.",
        notes: ["Products, vouchers and offers for hotel customers", "Shared commerce foundation across brands"],
      },
      lessons: [
        "Domain-specific commerce needs domain-specific UX — generic templates fall short.",
        "Clear conditions build trust and reduce support requests.",
      ],
    },
  },
  {
    slug: "ai-hotel-booking-agent",
    number: "04",
    title: "AI Hotel Booking Agent",
    summary:
      "Exploring how conversational AI agents can help users discover and book hotel rooms using natural language.",
    tags: ["AI", "LLM", "Research"],
    categories: ["ai"],
    status: "prototype",
    badge: "Research / Prototype",
    featured: true,
    size: "large",
    visual: "agent",
    role: ["Research", "Product", "Engineering"],
    stack: ["LLM APIs", "Tool Calling", "TypeScript", "REST APIs"],
    focus: ["Intent detection", "Search", "Hotel APIs", "Room availability", "Rates", "Recommendation", "Booking"],
    impact: [],
    caseStudy: {
      problem: {
        lead: "Guests think in sentences. Booking engines think in filters.",
        body: [
          "“A room near the beach this weekend” contains a destination, a date range and a preference — but traditional booking flows make the guest translate that into forms.",
          "This research explores whether an agent can do that translation reliably, then use real hotel APIs to find and recommend rooms.",
        ],
      },
      role: {
        lead: "A personal research prototype — from question to working concept.",
        items: [
          { title: "Research", detail: "Studying agent patterns, tool calling and conversational UX." },
          { title: "Product", detail: "Defining where conversation helps and where classic UI is better." },
          { title: "Engineering", detail: "Prototyping the agent loop and tool integrations." },
        ],
      },
      thinking: [
        { title: "Agents need tools, not just words", body: "Answers must come from real availability and rates via tool calls — never from the model’s imagination." },
        { title: "Hand off to UI", body: "Conversation is great for intent; cards and buttons are better for comparing and confirming." },
        { title: "Transparent reasoning", body: "Showing what the agent understood builds trust and makes corrections easy." },
      ],
      ux: {
        lead: "From a sentence to a booking.",
        flow: ["Intent detection", "Search", "Hotel APIs", "Availability", "Rates", "Recommendation", "Booking"],
      },
      architecture: {
        lead: "An agent loop orchestrating hotel tools.",
        layers: [
          { name: "Interface", nodes: ["Chat UI", "Result cards"] },
          { name: "Agent", nodes: ["Intent detection", "Reasoning", "Tool calling"] },
          { name: "Tools", nodes: ["Hotel search", "Availability", "Rates", "Booking"] },
        ],
      },
      challenges: [
        { title: "Ambiguity", body: "Resolving vague dates, locations and preferences — and knowing when to ask." },
        { title: "Grounding", body: "Ensuring every recommendation is backed by real data from tools." },
        { title: "Latency", body: "Keeping multi-step tool calls fast enough to feel conversational." },
      ],
      results: {
        lead: "Status: research prototype — ongoing.",
        notes: ["Working concept of intent → tools → recommendation", "Interactive concept demo in the AI Lab"],
      },
      lessons: [
        "The hard part isn’t the model — it’s designing tools and UX around it.",
        "Good agents know when to stop talking and show a button.",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
