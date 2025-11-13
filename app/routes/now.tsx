import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function Now() {
  return (
    <>
      <SEO title="Now" description="What Bartek Kus is currently working on and focused on." path="/now" />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="What I'm Doing Now" kicker="Last updated: January 2024" />

        <div className="prose prose-lg max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Focus</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Pension.you</strong> - Building the MVP for a private pension platform with
                integrated life insurance. Currently focused on regulatory compliance automation and fraud detection systems.
              </li>
              <li>
                <strong className="text-foreground">Identity Systems Research</strong> - Exploring practical applications of SSI and
                DIDs beyond the hype. Writing detailed guides on OIDC implementations.
              </li>
              <li>
                <strong className="text-foreground">Local-First Infrastructure</strong> - Documenting patterns for deploying complete
                dev environments on single servers using Encore.ts, Docker, and Traefik.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Learning</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>RAG system failure modes and mitigation strategies</li>
              <li>Canadian pension regulations and compliance requirements</li>
              <li>Advanced TypeScript patterns for large-scale applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Location</h2>
            <p>Based in Edmonton, Canada. Available for remote consulting.</p>
          </section>

          <div className="mt-12 p-6 rounded-lg bg-surface-2 border border-border">
            <p className="text-sm text-text-muted">
              This is a{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                now page
              </a>
              , inspired by Derek Sivers. It's a snapshot of my current priorities and projects.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
