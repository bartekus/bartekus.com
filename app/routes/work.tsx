import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { CardProject } from "~/components/ui/card-project";

export default function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Case studies and projects by Bartek Kus, including identity verification, developer platforms, and private pension systems."
        path="/work"
      />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Work"
          kicker="Case studies from identity verification to local-first infrastructure and financial compliance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <CardProject
            title="Oliu.id - Identity Verification Platform"
            description="Built a scalable identity verification system processing thousands of verifications daily. Implemented OIDC flows, SSI integration, and fraud detection pipelines. Focused on regulatory compliance and user privacy."
            tags={["OIDC", "SSI", "DID", "Node.js", "PostgreSQL", "React"]}
            href="/work/oliu-identity"
          />

          <CardProject
            title="Local-First Developer Platform"
            description="Architected a complete development environment using Encore.ts, Traefik, Docker Compose, Stripe, and Logto. Deployable on a single VPS with automated CI/CD via GitHub Actions. Production-ready with observability built in."
            tags={["Encore.ts", "Docker", "Traefik", "Stripe", "Logto", "CI/CD"]}
            href="/work/local-first-platform"
          />

          <CardProject
            title="Pension.you - Private Pension Platform"
            description="Designing a private pension system with integrated life insurance. Building fraud-resistant workflows, regulatory compliance automation, and transparent fee structures. Focus on Canadian financial regulations."
            tags={["FinTech", "Compliance", "React", "Node.js", "PostgreSQL"]}
            href="/pension-you"
          />

          <CardProject
            title="RAG Subsystem Research"
            description="Experimented with retrieval-augmented generation for technical documentation. Built indexing pipelines, chunking strategies, and evaluation frameworks. Explored failure modes and mitigation patterns."
            tags={["AI", "RAG", "Python", "Vector DB", "Embeddings"]}
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto p-8 rounded-lg bg-surface-2 border border-border">
          <h2 className="text-2xl font-semibold mb-4">Want to work together?</h2>
          <p className="text-text-muted mb-6">
            I'm available for consulting on identity systems, cloud architecture, and developer infrastructure. I also advise
            early-stage startups on technical architecture and team building.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Get in touch →
          </a>
        </div>
      </div>
    </>
  );
}
