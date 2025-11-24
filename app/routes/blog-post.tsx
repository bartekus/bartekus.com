import { useParams, Link, Navigate } from "react-router";
import { Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { TagPill } from "~/components/ui/tag-pill";
import { Giscus } from "~/components/comments/Giscus";
import { siteConfig } from "~/config";
import matter from "gray-matter";

// Import all MDX posts as raw strings for frontmatter parsing
const postModulesRaw = import.meta.glob("/app/content/posts/*.mdx", {
  eager: true,
  query: "?raw",
});

// Import all MDX posts as components
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

    // Check if frontmatter is exposed directly by remark-frontmatter
    // Some MDX setups expose it as module.frontmatter or module.meta
    let meta: PostMeta;

    console.log(Object.entries(postModulesRaw));

    if (module.frontmatter) {
      // If remark-frontmatter exposes it directly
      meta = {
        title: module.frontmatter.title || "",
        description: module.frontmatter.description || "",
        date: module.frontmatter.date || "",
        updated: module.frontmatter.updated,
        tags: module.frontmatter.tags || [],
        draft: module.frontmatter.draft || false,
        cover: module.frontmatter.cover,
        ogTitle: module.frontmatter.ogTitle,
        ogDescription: module.frontmatter.ogDescription,
        readingTime: module.frontmatter.readingTime,
      };
    } else {
      // Fallback: Since MDX plugin intercepts ?raw, we need to read files differently
      // For now, use empty meta as placeholder
      console.warn(`No frontmatter found for ${slug}. Check module properties:`, Object.keys(module));
      meta = {
        title: "",
        description: "",
        date: "",
        tags: [],
        draft: false,
      };
    }

    return {
      slug,
      meta: meta,
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

  // Safe date formatting with error handling
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate = formatDate(post.meta.date);
  const formattedUpdated = post.meta.updated ? formatDate(post.meta.updated) : null;

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

      <article className="container px-4 py-12 md:py-20 max-w-4xl mx-auto">
        {/* Back button - improved styling */}
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Back to Writing</span>
        </Link>

        {/* Cover image - enhanced with better aspect ratio and shadow */}
        {/*{post.meta.cover && (*/}
        {/*  <div className="aspect-[2/1] overflow-hidden rounded-xl bg-surface-2 mb-10 shadow-lg">*/}
        {/*    <img*/}
        {/*      src={post.meta.cover}*/}
        {/*      alt={post.meta.title}*/}
        {/*      className="h-full w-full object-cover"*/}
        {/*      width={800}*/}
        {/*      height={420}*/}
        {/*      loading="eager"*/}
        {/*      decoding="async"*/}
        {/*      fetchPriority="high"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* Header - improved spacing and typography */}
        {/*<header className="mb-12">*/}
        {/*  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">{post.meta.title}</h1>*/}
        {/*  <p className="text-xl md:text-2xl text-text-muted mb-8 leading-relaxed">{post.meta.description}</p>*/}

        {/*  /!* Metadata - more compact and elegant *!/*/}
        {/*  <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6 pb-6 border-b border-border">*/}
        {/*    <div className="flex items-center gap-2">*/}
        {/*      <Calendar className="h-4 w-4" aria-hidden="true" />*/}
        {/*      <time dateTime={post.meta.date} className="font-medium">*/}
        {/*        {formattedDate}*/}
        {/*      </time>*/}
        {/*    </div>*/}
        {/*    {formattedUpdated && (*/}
        {/*      <div className="flex items-center gap-2">*/}
        {/*        <span className="text-text-muted/70">Updated:</span>*/}
        {/*        <time dateTime={post.meta.updated} className="font-medium">*/}
        {/*          {formattedUpdated}*/}
        {/*        </time>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*    {post.meta.readingTime && (*/}
        {/*      <div className="flex items-center gap-2">*/}
        {/*        <Clock className="h-4 w-4" aria-hidden="true" />*/}
        {/*        <span className="font-medium">{post.meta.readingTime} min read</span>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}

        {/*  /!* Tags *!/*/}
        {/*  {post.meta.tags && post.meta.tags.length > 0 && (*/}
        {/*    <div className="flex flex-wrap gap-2">*/}
        {/*      {post.meta.tags.map((tag) => (*/}
        {/*        <TagPill key={tag}>{tag}</TagPill>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</header>*/}

        {/* Content - custom prose styling since typography plugin isn't installed */}
        <div className="prose-content mb-16">
          <post.Component />
        </div>

        {/* Navigation - improved styling */}
        <nav className="mt-16 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Post navigation">
          {prevPost ? (
            <Link
              to={`/writing/${prevPost.slug}`}
              className="group flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary/50 bg-card hover:bg-surface-2 transition-all duration-200"
              aria-label={`Previous post: ${prevPost.meta.title}`}
            >
              <ChevronLeft
                className="h-5 w-5 mt-1 text-text-muted group-hover:text-primary transition-colors flex-shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Previous</div>
                <div className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.meta.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              to={`/writing/${nextPost.slug}`}
              className="group flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary/50 bg-card hover:bg-surface-2 transition-all duration-200 md:text-right md:flex-row-reverse"
              aria-label={`Next post: ${nextPost.meta.title}`}
            >
              <ChevronRight
                className="h-5 w-5 mt-1 text-text-muted group-hover:text-primary transition-colors flex-shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Next</div>
                <div className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.meta.title}
                </div>
              </div>
            </Link>
          )}
        </nav>

        {/* Comments */}
        {!post.meta.draft && (
          <div className="mt-16 pt-12 border-t border-border">
            <Giscus term={post.meta.title} />
          </div>
        )}
      </article>
    </>
  );
}
