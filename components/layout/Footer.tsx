import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { about } from "@/data/experience";
import { profileLink } from "@/lib/links";
import { asset } from "@/lib/utils";

export function Footer() {
  const links = [
    { label: "GitHub", icon: "github", ...profileLink("github") },
    { label: "LinkedIn", icon: "linkedin", ...profileLink("linkedin") },
    { label: "Facebook", icon: "facebook", ...profileLink("facebook") },
    { label: "Instagram", icon: "instagram", ...profileLink("instagram") },
    { label: "Email", icon: "mail", ...profileLink("email") },
  ];

  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="text-lg font-semibold tracking-[0.02em]">
            {site.shortName}
          </Link>
          <div className="mt-6 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(about.avatar)} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full border border-line object-cover" />
            <div>
              <p className="text-fg">{site.name}</p>
              <p className="mt-0.5 text-sm text-fg-2">{site.role}</p>
              <p className="mt-0.5 text-sm text-fg-3">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-fg-3">Hospitality · Loyalty · Mobile · AI</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label mb-5">Explore</p>
          <ul className="grid gap-2.5 text-sm">
            {[
              { label: "Work", href: "/work/" },
              { label: "AI Lab", href: "/lab/" },
              { label: "About", href: "/about/" },
              { label: "Contact", href: "/#contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-fg-2 transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label mb-5">Connect</p>
          <ul className="grid gap-2.5 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                {l.placeholder ? (
                  <span className="inline-flex items-center gap-2.5 text-fg-3" title="Link coming soon">
                    <Icon name={l.icon} size={15} />
                    {l.label}
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em]">(soon)</span>
                  </span>
                ) : (
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 text-fg-2 transition-colors hover:text-fg"
                  >
                    <Icon name={l.icon} size={15} />
                    <span className="link-underline">{l.label}</span>
                    <Icon name="arrow-up-right" size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {site.copyrightYear} {site.name}. All rights reserved.</p>
        <p className="font-mono uppercase tracking-[0.14em]">Built with Next.js · {site.location}</p>
      </div>
    </footer>
  );
}
