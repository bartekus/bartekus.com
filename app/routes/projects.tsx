import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { CardProject } from "~/components/ui/card-project";

export default function Projects() {
  return (
    <>
      <SEO title="Projects" description="Open source projects, research, and experiments by Bartek Kus." path="/projects" />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Projects"
          title="Things I'm Building"
          kicker="Open source tools, research projects, and experiments in identity, infrastructure, and AI."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <CardProject
            title="Oliu.id"
            description="Identity verification platform with OIDC, SSI, and DID support. Production-ready with fraud detection and regulatory compliance."
            tags={["Identity", "OIDC", "SSI"]}
          />

          <CardProject
            title="Encore.ts Integrations"
            description="Complete integration guides for Encore.ts with Stripe, Logto, Traefik, and Docker. Production deployment patterns."
            tags={["TypeScript", "DevOps", "Docker"]}
          />

          <CardProject
            title="GlyphOS Research"
            description="Experimental operating system concepts focused on simplicity and clarity. Research into minimal viable abstractions."
            tags={["Research", "Systems"]}
          />

          <CardProject
            title="Pension.you"
            description="Private pension platform with life insurance integration. Building transparent fee structures and compliance automation."
            tags={["FinTech", "React", "Node.js"]}
            // href="/pension-you"
          />

          <CardProject
            title="RAG Subsystem"
            description="Retrieval-augmented generation experiments for technical documentation. Indexing, chunking, and evaluation patterns."
            tags={["AI", "RAG", "Python"]}
          />

          <CardProject
            title="Developer Tooling"
            description="Various CLI tools and utilities for improving developer workflows. Focus on reducing cognitive load and automation."
            tags={["CLI", "TypeScript", "Automation"]}
          />
        </div>
      </div>
    </>
  );
}
