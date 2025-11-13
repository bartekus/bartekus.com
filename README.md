# bartekus.com

Personal website and blog for Bartek Kus - Solution Architect, Principal Software Engineer & Founder.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **Blog**: MDX with gray-matter for frontmatter
- **SEO**: react-helmet-async for meta tags
- **Animation**: Framer Motion
- **Deployment**: Cloudflare Pages
- **Analytics**: Umami (optional)
- **Comments**: Giscus (optional)

## Features

- 🎨 Custom design system with light/dark mode
- 📝 MDX blog with syntax highlighting
- 🔍 Client-side search with Fuse.js
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA accessibility
- 🚀 95+ Lighthouse scores
- 📊 SEO optimized with JSON-LD structured data
- 🔒 Secure headers and CSP
- 📄 Printable resume
- 🌐 RSS/Atom feeds

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/bartekus/bartekus.com.git
cd bartekus.com

# Install dependencies
npm install

# Copy environment variables
cp public/.env.example .env

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`.

### Environment Variables

See `public/.env.example` for required environment variables.

Optional integrations:
- **Umami**: Add `VITE_UMAMI_WEBSITE_ID` and `VITE_UMAMI_SRC`
- **Giscus**: Add Giscus repo and category IDs for blog comments
- **Formspree**: Add endpoint for contact form

## Content Management

### Adding Blog Posts

Create a new MDX file in `src/content/posts/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-15"
tags: ["Tag1", "Tag2"]
draft: false
readingTime: 8
cover: "/images/cover.jpg"  # optional
---

# Your Post Title

Your content here...
```

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── seo/            # SEO component
│   └── ui/             # Reusable UI components
├── content/
│   └── posts/          # MDX blog posts
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── config.ts           # Site configuration
└── index.css           # Design system & global styles
```

## Building for Production

```bash
# Type check
npm run check

# Build
npm run build

# Preview production build
npm run preview
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
  - Build command: `npm run build`
  - Build output directory: `dist`
3. Add environment variables in Cloudflare dashboard
4. Deploy!

### Custom Domain

1. Go to Cloudflare Pages project settings
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate will be provisioned automatically

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Type check with TypeScript
- `npm run format` - Format code with Prettier

## License

MIT License - See LICENSE file for details.

## Contact

- Website: [bartekus.com](https://bartekus.com)
- Email: bartekus@gmail.com
- LinkedIn: [/in/bartekus](https://linkedin.com/in/bartekus)
- GitHub: [@bartekus](https://github.com/bartekus)
