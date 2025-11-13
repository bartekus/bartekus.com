import { useEffect, useRef } from "react";
import { useTheme } from "~/hooks/use-theme";
import { siteConfig } from "~/config";

interface GiscusProps {
  term: string;
}

export function Giscus({ term }: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Only load if configured
    if (
      !siteConfig.giscus.repo ||
      !siteConfig.giscus.repoId ||
      !siteConfig.giscus.category ||
      !siteConfig.giscus.categoryId
    ) {
      return;
    }

    if (!containerRef.current) return;

    // Remove existing giscus if present
    const existingFrame = containerRef.current.querySelector("iframe.giscus-frame");
    if (existingFrame) {
      existingFrame.remove();
    }

    // Create script
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", siteConfig.giscus.repo);
    script.setAttribute("data-repo-id", siteConfig.giscus.repoId);
    script.setAttribute("data-category", siteConfig.giscus.category);
    script.setAttribute("data-category-id", siteConfig.giscus.categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.appendChild(script);
  }, [term, theme]);

  // Don't render if not configured
  if (
    !siteConfig.giscus.repo ||
    !siteConfig.giscus.repoId ||
    !siteConfig.giscus.category ||
    !siteConfig.giscus.categoryId
  ) {
    return null;
  }

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <div ref={containerRef} className="giscus" />
    </div>
  );
}
