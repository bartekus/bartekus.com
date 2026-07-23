# bartekus.com

Personal website and blog for Bartek Kus: Solution Architect and Principal Software Engineer; creator of [spec-spine](https://github.com/statecrafting/spec-spine) and [Statecraft](https://github.com/statecrafting/statecraft).

## Tech Stack

- **Framework**: React Router v7 (framework mode, SPA build, no SSR) + React 19 + TypeScript
- **Build**: Vite 7 (MDX via `@mdx-js/rollup` with remark-gfm, remark-frontmatter, rehype-prism-plus; image optimization on build)
- **Styling**: Tailwind CSS v4 (theme in `app/app.css` via `@theme`; no tailwind config file) + shadcn/ui primitives
- **Blog**: MDX with gray-matter frontmatter, parsed at build time via `import.meta.glob`
- **SEO**: custom `SEO` component (OG/Twitter tags + JSON-LD), generated `rss.xml`, `atom.xml`, and `sitemap.xml`
- **Animation**: Framer Motion
- **Deployment**: Cloudflare Pages (static assets from `build/client`)
- **Analytics**: Umami (optional)
- **Comments**: Giscus (optional)

## Getting Started

```bash
git clone https://github.com/bartekus/bartekus.com.git
cd bartekus.com
npm install
npm run dev
```

The site will be available at `http://localhost:5173`.

### Environment Variables

All optional, bound in `app/config.ts`:

- `VITE_SITE_URL`: canonical site URL used by the RSS and sitemap generators (defaults to `https://bartekus.com`)
- `VITE_UMAMI_WEBSITE_ID`, `VITE_UMAMI_SRC`: Umami analytics
- `VITE_GISCUS_*`: Giscus blog comments
- `VITE_FORMSPREE_ENDPOINT`: contact form

## Content Management

### Adding Blog Posts

Drop an MDX file into `app/content/posts/`; the writing index, post page, feeds, and sitemap all derive from frontmatter at build time. No registration step.

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2026-01-15"
updated: "2026-06-10" # optional; shown on the post and used as sitemap lastmod
tags: ["Tag1", "Tag2"]
draft: false
readingTime: 8
cover: "/images/cover.jpg" # optional
---

# Your Post Title

Your content here...
```

Dates are date-only strings rendered as written (formatted with `timeZone: "UTC"`). House style: no em dashes; later corrections go in a closing "An update from <Month Year>" paragraph plus the `updated` field rather than silent edits.

### Adding Pages

Routes are explicit, not file-based: create the component in `app/routes/`, then register it in `app/routes.ts` (the catch-all `*` route must stay last). Add static pages to `STATIC_ROUTES` in `app/scripts/generate-sitemap.ts`.

### Project Structure

```
app/
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── seo/            # SEO component (OG + JSON-LD)
│   └── ui/             # Reusable UI components (shadcn/ui style)
├── content/
│   └── posts/          # MDX blog posts
├── lib/
│   └── posts.ts        # Frontmatter parsing + post registry (import.meta.glob)
├── routes/             # Route components (registered in app/routes.ts)
├── scripts/            # Prebuild: resume sync, RSS/Atom, sitemap
├── data/               # resume.json (overwritten from gist on build)
└── config.ts           # Site configuration + env bindings
```

## Scripts

- `npm run dev`: start the dev server (Vite, port 5173)
- `npm run build`: prebuild (resume sync + RSS/Atom + sitemap), then `react-router build`
- `npm run preview`: preview the built bundle
- `npm run typecheck`: `react-router typegen && tsc`
- `npx prettier --write .`: format (printWidth 133, double quotes)

Note: `app/data/resume.json` is fetched from a GitHub Gist during prebuild; local edits to it are overwritten on the next build.

## Deployment

Cloudflare Pages:

1. Connect the GitHub repository to Cloudflare Pages
2. Build command: `npm run build`; output directory: `build/client`
3. Add environment variables in the Cloudflare dashboard

## Contact

- Website: [bartekus.com](https://bartekus.com)
- Email: bartekus@gmail.com
- LinkedIn: [/in/bartekus](https://linkedin.com/in/bartekus)
- GitHub: [@bartekus](https://github.com/bartekus)
