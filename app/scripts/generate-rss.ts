import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || "https://bartekus.com";
const AUTHOR_NAME = "Bartek Kus";
const AUTHOR_EMAIL = "bartekus@gmail.com";

interface PostMeta {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
}

interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function getPosts(): Post[] {
  const postsDir = path.join(__dirname, "../content/posts");
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const slug = file.replace(".mdx", "");

      return {
        slug,
        meta: data as PostMeta,
        content,
      };
    })
    .filter((post) => !post.meta.draft)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

function generateRSS(posts: Post[]): string {
  const buildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      const pubDate = new Date(post.meta.date).toUTCString();

      return `    <item>
      <title>${escapeXml(post.meta.title)}</title>
      <description>${escapeXml(post.meta.description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${AUTHOR_EMAIL} (${AUTHOR_NAME})</author>
      ${post.meta.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bartek Kus</title>
    <description>Pragmatic full-stack engineer; identity; local-first infra; AI-assisted dev.</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
${items}
  </channel>
</rss>`;
}

function generateAtom(posts: Post[]): string {
  const updated = new Date().toISOString();

  const entries = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      const published = new Date(post.meta.date).toISOString();
      const postUpdated = post.meta.updated ? new Date(post.meta.updated).toISOString() : published;

      return `  <entry>
    <title>${escapeXml(post.meta.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <updated>${postUpdated}</updated>
    <published>${published}</published>
    <summary>${escapeXml(post.meta.description)}</summary>
    <author>
      <name>${AUTHOR_NAME}</name>
      <email>${AUTHOR_EMAIL}</email>
    </author>
    ${post.meta.tags.map((tag) => `<category term="${escapeXml(tag)}" />`).join("\n    ")}
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Bartek Kus</title>
  <subtitle>Pragmatic full-stack engineer; identity; local-first infra; AI-assisted dev.</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <link href="${SITE_URL}" />
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>
${entries}
</feed>`;
}

function main() {
  console.log("Generating RSS and Atom feeds...");

  const posts = getPosts();
  console.log(`Found ${posts.length} published posts`);

  const rss = generateRSS(posts);
  const atom = generateAtom(posts);

  const publicDir = path.join(__dirname, "../../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);
  fs.writeFileSync(path.join(publicDir, "atom.xml"), atom);

  console.log("✓ RSS feed generated: public/rss.xml");
  console.log("✓ Atom feed generated: public/atom.xml");
}

main();
