# bartekus.com

Personal website and blog for Bartek Kus: Solution Architect and Principal Software Engineer; creator of [spec-spine](https://github.com/statecrafting/spec-spine) and the [statecrafting](https://statecraft.ing) tool family.

## Tech Stack

- **Framework**: React Router v7 (framework mode, SPA build, `ssr: false`; there is no server bundle and no container image) + React 19 + TypeScript
- **Build**: Vite 7 (MDX via `@mdx-js/rollup` with remark-gfm, remark-frontmatter, rehype-prism-plus; image optimization on build)
- **Styling**: Tailwind CSS v4 (theme in `app/app.css` via `@theme`; no tailwind config file) + shadcn/ui primitives
- **Blog**: MDX with gray-matter frontmatter, parsed at build time via `import.meta.glob`
- **SEO**: custom `SEO` component (OG/Twitter tags + JSON-LD), generated `rss.xml`, `atom.xml`, and `sitemap.xml`
- **Animation**: Framer Motion
- **Deployment**: Cloudflare Pages (static assets from `build/client`); CI on GitHub Actions (`.github/workflows/ci.yml`: typecheck + build on Node from `.node-version`)
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

Dates are date-only strings rendered as written (formatted with `timeZone: "UTC"`). House style: no em dashes (U+2014); claims carry their grade (specified, implemented, tested, released, deployed are different statements). Later corrections do not rewrite the body: add `updated: "YYYY-MM-DD"` to the frontmatter and an italic paragraph right after the H1, `*Update, <Month Year>: ...*`, that says what changed and links to the essay explaining it.

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
├── scripts/            # Prebuild: resume sync, RSS/Atom, sitemap; covers generator (manual)
├── data/               # resume.json (overwritten from gist on build)
└── config.ts           # Site configuration + env bindings
```

## Scripts

- `npm run dev`: start the dev server (Vite, port 5173)
- `npm run build`: prebuild (resume sync + RSS/Atom + sitemap), then `react-router build`
- `npm run preview`: preview the built bundle
- `npm run typecheck`: `react-router typegen && tsc`
- `npm run covers [slug]`: regenerate the "ledger noir" essay covers and `public/og-default.png` from `app/scripts/generate-covers.ts` (SVG rasterised with sharp; add new slugs to its `COVERS` map). Not part of the build; outputs are committed.
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
