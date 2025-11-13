import { siteConfig } from "~/config";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    path?: string;
    article?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}

export function SEO({
                        title,
                        description = siteConfig.description,
                        image = `${siteConfig.url}/og-default.png`,
                        path = "",
                        article = false,
                        publishedTime,
                        modifiedTime,
                        author = siteConfig.author.name,
                    }: SEOProps) {
    const fullTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
    const url = `${siteConfig.url}${path}`;

    const jsonLd = article
        ? {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            image,
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            author: {
                "@type": "Person",
                name: author,
                url: siteConfig.url,
            },
        }
        : {
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.author.name,
            jobTitle: siteConfig.author.jobTitle,
            url: siteConfig.url,
            sameAs: [
                siteConfig.social.github,
                siteConfig.social.linkedin,
                siteConfig.social.x,
            ],
        };

    return (
        <>
            {/* Basic SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content={article ? "article" : "website"} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="en_CA" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:creator" content="@bartekus" />

            {/* Article specific */}
            {article && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {article && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {article && <meta property="article:author" content={author} />}

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
