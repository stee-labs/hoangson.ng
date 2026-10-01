# Son Nguyen — Portfolio

Personal portfolio of Son Nguyen, a full-stack engineer with a product focus. Next.js (static export) for GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Editing content

All copy lives in `data/`. Components never hard-code content.

| File | What it controls |
| --- | --- |
| `data/site.ts` | Name, SEO text, nav, **profile links (GitHub / LinkedIn / email)** |
| `data/experience.ts` | Hero copy, metrics, domain expertise, process steps, about text, portrait, interests |
| `data/skills.ts` | "What I Build" cards, tech stack, "Selected Experiences" gallery |
| `data/projects.ts` | Projects and full case-study content (grid, filters, `/work/[slug]`, sitemap) |
| `data/experiments.ts` | "Currently Exploring" card, AI Lab copy, research tracks |
| `data/ai-demo.ts` | Mock hotels and intent rules for the AI concept demo |

### Before publishing

- [ ] Add real links in `data/site.ts` → `links`. Empty values render as disabled "coming soon" placeholders.
- [ ] Review the case-study copy in `data/projects.ts`. It's a first draft, so make sure every statement reflects your real work.
- [ ] Add real screenshots: put them in `public/images/projects/<slug>/` and set `cover: "/images/projects/<slug>/cover.webp"` on the project. Until then, wireframe frames labelled "Placeholder" are shown.
- [ ] Optional portrait: set `about.portrait` in `data/experience.ts`. An abstract visual is shown until then. Please don't use AI-generated photos.

Only verified metrics belong in `metrics` / `impact`. The site shows nothing else.

### Adding a project

Append an object to `projects` in `data/projects.ts`. The grid (with its editorial layout), filters, case-study route, "next project" link and sitemap all update automatically.

## Deployment (GitHub Pages)

1. Push this repo to GitHub.
2. **Settings → Pages → Source: GitHub Actions.**
3. Push to `main`. `.github/workflows/deploy.yml` builds and deploys.

The workflow reads the base path from `actions/configure-pages`:

- repo `nguyenhoangson.github.io` → served at `/`
- any other repo, e.g. `portfolio` → served at `/portfolio`

To build a project-site variant locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://<user>.github.io/portfolio npm run build
```

Use `asset("/path")` from `lib/utils.ts` for any `/public` file referenced from code, so the base path is applied.

## Architecture notes

- **Motion split:** Framer Motion handles component reveals, micro-interactions and page transitions (`app/template.tsx`). GSAP ScrollTrigger is used only for the pinned horizontal gallery, and it's lazy-loaded (`components/animations/HorizontalScroll.tsx`). Lenis provides smooth scrolling on desktop.
- **Above-the-fold intros are pure CSS** (`.intro-*` in `globals.css`, `IntroTitle`), so titles paint before hydration and LCP stays fast. The preloader is CSS-timed too.
- **Scroll-linked values** go through `hooks/useRange.ts`, not a raw `useTransform` range. This stops Framer from offloading them to native ScrollTimelines, which misbehave around sticky/pinned layouts.
- **Reduced motion:** the preloader, Lenis, custom cursor, parallax, pinning and scroll storytelling are all disabled. Content stays fully visible.
- **Hero landscape:** a 2D canvas instead of WebGL. It pauses offscreen, starts when the page is idle, and runs lighter on small screens.
- `scripts/generate-og.mjs` regenerates `public/og.png` and the PNG icons (`node scripts/generate-og.mjs`).
