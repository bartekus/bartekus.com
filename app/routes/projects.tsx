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
            href="https://github.com/bartekus/spec-spine"
          />

          <CardProject
            title="open-agentic-platform"
            description="A governed control plane for AI-native software delivery: 200 hash-verifiable specs compiled to a deterministic registry, agent actions reconciled to the specs that authorised them, self-authenticating governance certificates, and OWASP ASI 2026 traceability."
            tags={["Agentic AI", "Governance", "Audit"]}
            href="https://github.com/stagecraft-ing/open-agentic-platform"
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
            title="OPC - Local-First Cockpit"
            description="Tauri v2 + React desktop cockpit for governed agent execution: local workspaces, git context, snapshots, and human approval gates. The execution plane of open-agentic-platform; your code and your agents stay on your machine."
            tags={["Tauri", "Local-First", "Desktop"]}
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
