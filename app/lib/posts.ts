import { Buffer } from "buffer";
import matter from "gray-matter";
import type { ComponentType } from "react";

globalThis.Buffer = Buffer;

// Type definitions for glob imports
// React Router wraps import.meta.glob imports differently than plain Vite
// The structure is { default: () => ({ type: string }) } instead of { default: string }
// This is expected behavior with React Router's glob import handling, not a bug.
type RawModule = {
  default: () => { type: string };
};
type MDXModule = { default: ComponentType };

// Import all MDX posts as raw strings for frontmatter parsing
const postModulesRaw = import.meta.glob<RawModule>("/app/content/posts/*.mdx", {
  eager: true,
  query: "?raw",
});

// Import all MDX posts as components
const postModules = import.meta.glob<MDXModule>("/app/content/posts/*.mdx", { eager: true });

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  ogTitle?: string;
  ogDescription?: string;
  readingTime?: number;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  Component: ComponentType;
}

// Parse posts from glob imports; drafts filtered, newest first.
// Adding an .mdx file under app/content/posts/ is all it takes to publish.
export const posts: Post[] = Object.entries(postModules)
  .map(([path, module]: [string, MDXModule]) => {
    const slug = path.split("/").pop()?.replace(".mdx", "") || "";

    // Get the raw content for this path - with ?raw query, default is a string
    const rawModule = postModulesRaw[path];
    if (!rawModule) {
      throw new Error(`Raw content not found for ${path}`);
    }
    const rawContent = rawModule.default().type;

    // Parse frontmatter using gray-matter
    const { data } = matter(rawContent);

    const meta: PostMeta = {
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      updated: data.updated,
      tags: data.tags || [],
      draft: data.draft || false,
      cover: data.cover,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      readingTime: data.readingTime,
    };

    return {
      slug,
      meta,
      Component: module.default,
    };
  })
  .filter((post) => !post.meta.draft)
  .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

export interface PostSummary {
  title: string;
  description: string;
  date: string;
  readingTime?: number;
  tags: string[];
  slug: string;
  cover?: string;
}

// Card-shaped view consumed by the writing index and home page
export const postSummaries: PostSummary[] = posts.map((post) => ({
  title: post.meta.title,
  description: post.meta.description,
  date: post.meta.date,
  readingTime: post.meta.readingTime,
  tags: post.meta.tags,
  slug: post.slug,
  cover: post.meta.cover,
}));
