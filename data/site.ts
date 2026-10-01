/**
 * Global site configuration.
 *
 * Links left as "" render as disabled placeholders — fill them in when ready.
 * Never add URLs that don't belong to you.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenhoangson.github.io").replace(/\/$/, "");

export const site = {
  name: "Son Nguyen",
  /** Full legal name — used only in SEO metadata so searches for it still match. */
  fullName: "Nguyen Hoang Son",
  shortName: "SON",
  role: "Full-stack Engineer · Product-focused",
  tagline: "Building digital products from idea to production.",
  title: "Son Nguyen — Full-stack Engineer · Product-focused",
  description:
    "Son Nguyen (Nguyen Hoang Son) is a product-focused full-stack engineer with 10+ years of experience building web, mobile, e-commerce and AI-powered digital products, with deep expertise in hospitality and loyalty technology.",
  location: "Vietnam",
  url: siteUrl,
  locale: "en_US",

  /** Primary → secondary → specialization. Order matters for positioning. */
  positioning: {
    primary: "Full-stack Engineer · Product-focused",
    secondary: ["Web", "Mobile", "Product", "UI/UX", "AI"],
    specialization: ["Hospitality", "Loyalty", "CRM", "Booking", "E-commerce"],
  },

  links: {
    // TODO: add real profile URLs
    github: "",
    linkedin: "",
    // TODO: add real email address
    email: "",
  },

  nav: [
    { label: "Work", href: "/#work", section: "work" },
    { label: "Expertise", href: "/#expertise", section: "expertise" },
    { label: "Lab", href: "/#lab", section: "lab" },
    { label: "About", href: "/#about", section: "about" },
    { label: "Contact", href: "/#contact", section: "contact" },
  ],

  copyrightYear: 2026,
} as const;

export type SiteLinks = typeof site.links;
