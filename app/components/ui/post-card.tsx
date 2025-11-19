import { Link } from "react-router";
import { Calendar, Clock } from "lucide-react";

import { TagPill } from "~/components/ui/tag-pill";
import { cn } from "~/lib/utils";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  readingTime?: number;
  tags?: string[];
  slug: string;
  cover?: string;
  className?: string;
}

export function PostCard({ title, description, date, readingTime, tags, slug, cover, className }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/writing/${slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50",
        className
      )}
    >
      {cover && (
        <div className="aspect-video overflow-hidden bg-surface-2">
          <img 
            src={cover} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted mb-4 line-clamp-2">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
