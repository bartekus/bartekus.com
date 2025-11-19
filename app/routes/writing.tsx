import { useState } from "react";
import { Search } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { PostCard } from "~/components/ui/post-card";
import { Input } from "~/components/ui/input";
import { TagPill } from "~/components/ui/tag-pill";

// Seed posts data
const posts = [
  {
    title: "Design principles for resilient systems",
    description: "Exploring simplicity, observability, blast radius, idempotency, and graceful degradation in distributed systems.",
    date: "2024-01-15",
    readingTime: 8,
    tags: ["Systems Design", "Architecture"],
    slug: "design-principles-resilient-systems",
    cover: "/images/design-principles-hero.jpg",
  },
  {
    title: "Local-first developer platforms on a single droplet",
    description: "Building complete dev environments with Encore.ts, Traefik, Docker Compose, GitHub Actions, Stripe, and Logto.",
    date: "2024-01-10",
    readingTime: 12,
    tags: ["DevOps", "Infrastructure"],
    slug: "local-first-developer-platforms",
    cover: "/images/local-first-platforms-hero.jpg",
  },
  {
    title: "Identity in practice: OIDC, SSI, and DID without the hype",
    description: "Practical guidance on when to use each identity standard, what to avoid, and links to authoritative specs.",
    date: "2024-01-05",
    readingTime: 10,
    tags: ["Identity", "Security"],
    slug: "identity-in-practice",
    cover: "/images/identity-practice-hero.jpg",
  },
  {
    title: "RAG beyond the demo: failure modes and patterns",
    description:
      "Exploring indexing strategies, chunking approaches, evaluation frameworks, observability, and guardrails for production RAG systems.",
    date: "2023-12-28",
    readingTime: 14,
    tags: ["AI", "RAG"],
    slug: "rag-beyond-demo",
    cover: "/images/rag-beyond-demo-hero.jpg",
  },
  {
    title: "Pension.you, briefly",
    description: "A simple, human explanation of private pensions with life insurance integration and why transparency matters.",
    date: "2023-12-20",
    readingTime: 5,
    tags: ["FinTech", "Product"],
    slug: "pension-you-briefly",
    cover: "/images/pension-you-hero.jpg",
  },
];

const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

export default function Writing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <>
      <SEO
        title="Writing"
        description="Articles about systems design, identity, infrastructure, AI-assisted development, and software engineering by Bartek Kus."
        path="/writing"
      />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Blog"
          title="Writing"
          kicker="Thoughts on resilient systems, identity infrastructure, and building software that lasts."
        />

        {/* Search and Filter */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative mb-6">
            <label htmlFor="search-articles" className="sr-only">
              Search articles
            </label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
            <Input
              id="search-articles"
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search articles"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter articles by tag">
            <button
              onClick={() => setSelectedTag(null)}
              className={`${selectedTag === null ? "opacity-100" : "opacity-60 hover:opacity-100"} transition-opacity`}
              aria-pressed={selectedTag === null}
              aria-label="Show all articles"
            >
              <TagPill variant={selectedTag === null ? "primary" : "default"}>All</TagPill>
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`${selectedTag === tag ? "opacity-100" : "opacity-60 hover:opacity-100"} transition-opacity`}
                aria-pressed={selectedTag === tag}
                aria-label={`Filter by ${tag} tag`}
              >
                <TagPill variant={selectedTag === tag ? "primary" : "default"}>{tag}</TagPill>
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12" role="status" aria-live="polite">
            <p className="text-text-muted">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}
