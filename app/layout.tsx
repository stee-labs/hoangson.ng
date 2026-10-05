import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { Providers } from "@/components/layout/Providers";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/data/site";
import { absoluteUrl, asset } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: ["Son Nguyen", site.fullName, "Full-stack Engineer", "Product Engineer", "React", "Next.js", "React Native", "Hospitality technology", "Loyalty", "AI agents", "Vietnam"],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl("/og.png")],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: asset("/icon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon-32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f1" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint: restore theme, decide whether to show the preloader. */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);if(sessionStorage.getItem('preloaded')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-preloaded','');}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.fullName,
  jobTitle: site.role,
  description: site.description,
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/portrait.jpg"),
  address: { "@type": "PostalAddress", addressCountry: "VN" },
  knowsAbout: ["Web development", "Mobile development", "UI/UX", "Product development", "Artificial intelligence", "Hospitality technology", "Loyalty programs", "E-commerce"],
  sameAs: [site.links.github, site.links.linkedin, site.links.facebook, site.links.instagram].filter(Boolean),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`#preloader{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">
          Skip to content
        </a>
        <Providers>
          <SmoothScroll />
          <Preloader />
          <Cursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <div className="noise" aria-hidden />
      </body>
    </html>
  );
}
