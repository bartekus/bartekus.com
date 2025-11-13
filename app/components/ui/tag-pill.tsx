import { cn } from "~/lib/utils";

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "accent";
}

export function TagPill({ children, className, variant = "default" }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        {
          "bg-surface-2 text-text-muted hover:bg-muted": variant === "default",
          "bg-primary/10 text-primary hover:bg-primary/20": variant === "primary",
          "bg-accent/10 text-accent hover:bg-accent/20": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
