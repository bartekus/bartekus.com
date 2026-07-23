import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { CardProject } from "~/components/ui/card-project";

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="Open source governance tooling, trust infrastructure, and agentic delivery experiments by Bartek Kus."
        path="/projects"
      />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Projects"
          title="Things I'm Building"
          kicker="Open source governance tooling, trust infrastructure, and experiments in agentic software delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <CardProject
            title="spec-spine"
            description="A typed, hash-verifiable authority ledger over a markdown spec corpus. Refuses code that drifts from its owning spec at PR time; deterministic to the byte across five platforms; governs itself. Rust, Apache-2.0, on crates.io and npm."
            tags={["Rust", "Governance", "Open Source"]}
            href="https://github.com/statecrafting/spec-spine"
          />

          <CardProject
            title="Statecraft"
            description="The governed agentic delivery control plane: tenants, a factory that stamps applications from a versioned template contract, a fleet plane that operates them, and a governance UI. Itself the first production app of its own template; every change bound to the spec that authorised it."
            tags={["Agentic AI", "Governance", "Audit"]}
            href="https://github.com/statecrafting/statecraft"
          />

          <CardProject
            title="Oliu.id"
            description="Identity verification platform with OIDC, SSI, and DID support. Production-ready with fraud detection and regulatory compliance."
            tags={["Identity", "OIDC", "SSI"]}
          />

          <CardProject
            title="Encore.ts Integrations"
            description="Complete integration guides for Encore.ts with Stripe, Logto, Traefik, and Docker. Typed backend contracts over middleware convention, deployable on a single VPS."
            tags={["TypeScript", "Encore.ts", "DevOps"]}
          />

          <CardProject
            title="enrahitu"
            description="EnRaHiTu (Encore.ts + rauthy + hiqlite + Turso/libSQL): a self-contained, single-container application core with zero managed-infrastructure dependencies. The template chassis the Statecraft factory stamps; typed APIs, a real OIDC provider, and embedded Raft-replicated SQLite in one image."
            tags={["TypeScript", "Encore.ts", "Template"]}
            href="https://github.com/statecrafting/enrahitu"
          />

          <CardProject
            title="RAG Subsystem"
            description="Retrieval-augmented generation experiments for technical documentation. Indexing, chunking, and evaluation patterns."
            tags={["AI", "RAG", "Python"]}
          />
        </div>
      </div>
    </>
  );
}
