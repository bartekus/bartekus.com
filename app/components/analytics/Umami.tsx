import { useEffect } from "react";
import { siteConfig } from "~/config";

export function Umami() {
  useEffect(() => {
    // Respect Do Not Track
    const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
    if (dnt === "1" || dnt === "yes") {
      console.log("Umami: Do Not Track enabled, analytics disabled");
      return;
    }

    // Only load if configured
    if (!siteConfig.umami.websiteId || !siteConfig.umami.src) {
      return;
    }

    // Check if script already exists
    if (document.querySelector(`script[data-website-id="${siteConfig.umami.websiteId}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.setAttribute("data-website-id", siteConfig.umami.websiteId);
    script.src = siteConfig.umami.src;

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(
        `script[data-website-id="${siteConfig.umami.websiteId}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
