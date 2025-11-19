import { useParams, Link, Navigate } from "react-router";
import { Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { TagPill } from "~/components/ui/tag-pill";
import { Giscus } from "~/components/comments/Giscus";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config";

// Import all MDX posts
const postModules = import.meta.glob("/app/content/posts/*.mdx", { eager: true });

interface PostMeta {
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

interface Post {
  slug: string;
  meta: PostMeta;
  Component: React.ComponentType;
}

// Parse posts from glob imports
const posts: Post[] = Object.entries(postModules)
  .map(([path, module]: [string, any]) => {
    const slug = path.split("/").pop()?.replace(".mdx", "") || "";
    return {
      slug,
      meta: module.frontmatter || {},
      Component: module.default,
    };
  })
  .filter((post) => !post.meta.draft)
  .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const formattedDate = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedUpdated = post.meta.updated
    ? new Date(post.meta.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const ogImage = post.meta.cover ? `${siteConfig.url}${post.meta.cover}` : `${siteConfig.url}/og/${slug}.png`;

  return (
    <>
      <SEO
        title={post.meta.ogTitle || post.meta.title}
        description={post.meta.ogDescription || post.meta.description}
        image={ogImage}
        path={`/writing/${slug}`}
        article
        publishedTime={post.meta.date}
        modifiedTime={post.meta.updated || post.meta.date}
      />

      <article className="container px-4 py-20 max-w-4xl">
        {/* Back button */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Writing
        </Link>

        {/* Cover image */}
        {post.meta.cover && (
          <div className="aspect-[2/1] overflow-hidden rounded-lg bg-surface-2 mb-8">
            <img 
              src={post.meta.cover} 
              alt={post.meta.title} 
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.meta.title}</h1>
          <p className="text-xl text-text-muted mb-6">{post.meta.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.meta.date}>{formattedDate}</time>
            </div>
            {formattedUpdated && (
              <div className="flex items-center gap-1">
                <span>Updated: {formattedUpdated}</span>
              </div>
            )}
            {post.meta.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{post.meta.readingTime} min read</span>
              </div>
            )}
          </div>

          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <post.Component />
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Post navigation">
          {prevPost ? (
            <Link
              to={`/writing/${prevPost.slug}`}
              className="group flex items-start gap-4 p-6 rounded-lg border border-border hover:border-primary/50 bg-card transition-all"
              aria-label={`Previous post: ${prevPost.meta.title}`}
            >
              <ChevronLeft className="h-5 w-5 mt-1 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
              <div>
                <div className="text-sm text-text-muted mb-1">Previous</div>
                <div className="font-semibold group-hover:text-primary transition-colors">{prevPost.meta.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              to={`/writing/${nextPost.slug}`}
              className="group flex items-start gap-4 p-6 rounded-lg border border-border hover:border-primary/50 bg-card transition-all md:text-right md:justify-end"
              aria-label={`Next post: ${nextPost.meta.title}`}
            >
              <div className="md:order-2">
                <div className="text-sm text-text-muted mb-1">Next</div>
                <div className="font-semibold group-hover:text-primary transition-colors">{nextPost.meta.title}</div>
              </div>
              <ChevronRight className="h-5 w-5 mt-1 text-text-muted group-hover:text-primary transition-colors flex-shrink-0 md:order-3" aria-hidden="true" />
            </Link>
          )}
        </nav>

        {/* Comments */}
        {!post.meta.draft && <Giscus term={post.meta.title} />}
      </article>
    </>
  );
}
