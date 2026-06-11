import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || "https://bartekus.com";

// Keep in sync with app/routes.ts (the catch-all not-found route is intentionally excluded).
const STATIC_ROUTES = ["", "/about", "/work", "/projects", "/writing", "/now", "/uses", "/contact", "/press", "/resume"];

interface PostMeta {
  date: string;
  updated?: string;
  draft: boolean;
}

function getPosts(): { slug: string; meta: PostMeta }[] {
  const postsDir = path.join(__dirname, "../content/posts");
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf-8"));
      return { slug: file.replace(".mdx", ""), meta: data as PostMeta };
    })
    .filter((post) => !post.meta.draft);
}

function generateSitemap(posts: { slug: string; meta: PostMeta }[]): string {
  const staticUrls = STATIC_ROUTES.map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`);
  const postUrls = posts.map((post) => {
    const lastmod = post.meta.updated || post.meta.date;
    return `  <url>\n    <loc>${SITE_URL}/writing/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...postUrls].join("\n")}\n</urlset>\n`;
}

console.log("Generating sitemap...");
const posts = getPosts();
fs.writeFileSync(path.join(__dirname, "../../public/sitemap.xml"), generateSitemap(posts));
console.log(`✓ Sitemap generated: public/sitemap.xml (${STATIC_ROUTES.length} pages + ${posts.length} posts)`);
