import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  kicker?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, kicker, className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3 mb-12", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance">{title}</h2>
      {kicker && (
        <p className="text-lg text-text-muted max-w-2xl">{kicker}</p>
      )}
    </div>
  );
}
