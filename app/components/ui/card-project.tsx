import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { TagPill } from "~/components/ui/tag-pill";
import { cn } from "~/lib/utils";

interface CardProjectProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
  className?: string;
}

export function CardProject({ title, description, image, tags, href, className }: CardProjectProps) {
  const content = (
    <>
      {image && (
        <div className="aspect-video overflow-hidden rounded-t-lg bg-surface-2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={800}
            height={420}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted mb-4">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
        {href && (
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  );

  const baseClasses = cn(
    "group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50",
    className
  );

  if (href) {
    return (
      <Link to={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
