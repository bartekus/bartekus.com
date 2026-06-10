import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { CardProject } from "~/components/ui/card-project";

export default function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Selected work by Bartek Kus: governed agentic delivery, open-source governance tooling, and identity verification infrastructure."
        path="/work"
      />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Work"
          kicker="From identity verification to governed agentic software delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <CardProject
            title="open-agentic-platform - Governed Control Plane"
            description="A governed control plane for AI-native software delivery. 200 hash-verifiable specs compile to a deterministic registry; a PR-time gate refuses spec/code drift; every pipeline run emits a self-authenticating governance certificate, with OWASP ASI 2026 control-to-spec traceability from a single CLI invocation."
            tags={["Agentic AI", "Governance", "Rust", "TypeScript", "AGPL-3.0"]}
            href="https://github.com/stagecraft-ing/open-agentic-platform"
          />

          <CardProject
            title="spec-spine - The Governance Spine, Standalone"
            description="Lifted the governance spine out of a 200-spec platform into a standalone Rust library and CLI. Typed authority over files, sections, and symbols; byte-identical output across five platforms; Apache-2.0 on crates.io and npm. It governs itself: its own coupling gate runs against its own spec corpus in CI."
            tags={["Rust", "Open Source", "Apache-2.0", "CLI"]}
            href="https://github.com/bartekus/spec-spine"
          />

          <CardProject
            title="OPC - Local-First Execution Plane"
            description="A Tauri v2 + React desktop cockpit where humans and agents share one execution surface: local workspaces, git context, structural and semantic analysis, snapshots, and human approval gates. The agentic execution plane stays on your machine; no SaaS in the trust path."
            tags={["Tauri", "Rust", "React", "Local-First"]}
          />

          <CardProject
            title="Oliu.id - Identity Verification Platform"
            description="Built a scalable identity verification system processing thousands of verifications daily. Implemented OIDC flows, SSI integration, and fraud detection pipelines. Focused on regulatory compliance and user privacy; the trust-infrastructure lineage behind the governance work."
            tags={["OIDC", "SSI", "DID", "Node.js", "PostgreSQL"]}
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto p-8 rounded-lg bg-surface-2 border border-border">
          <h2 className="text-2xl font-semibold mb-4">Want to work together?</h2>
          <p className="text-text-muted mb-6">
            I'm available for consulting on governed agentic delivery, spec-driven development, and identity systems. I also advise
            teams introducing AI agents into regulated environments.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Get in touch →
          </a>
        </div>
      </div>
    </>
  );
}
