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
            title="spec-spine - The Governance Spine, Standalone"
            description="Lifted the governance spine out of a 200-spec platform into a standalone Rust library and CLI. Typed authority over files, sections, and symbols; a PR-time coupling gate that refuses drift; byte-identical release artifacts across four release triples in CI, with a fifth built and shipped. Apache-2.0, on crates.io, npm and PyPI. It governs itself: its own gate runs against its own spec corpus on every pull request."
            tags={["Rust", "Open Source", "Apache-2.0", "CLI"]}
            href="https://github.com/statecrafting/spec-spine"
          />

          <CardProject
            title="The statecrafting family - Small Tools, Explicit Boundaries"
            description="A catalogued family of Apache-2.0 tools for governed software work: statecraft-cli (a local environment for governed agent work; implemented, not yet released), rahi (a Rust chassis for governed cells; 0.7.1 release candidate), rustev (decisions as proposals, never grants; 0.5.0), wire-witness (wire testimony, never authority; 0.1.0 tag), aicortex (governed memory over MCP; being built one spec per pull request) and three released primitives: action-gate, attest-ledger and canonical-keysort-json."
            tags={["Rust", "Governance", "Apache-2.0", "MCP"]}
            href="https://statecraft.ing"
          />

          <CardProject
            title="statecraft-cli - Independent Acceptance for Agent Work"
            description="Designed and implemented a local environment for governed agent work: register a repository, prepare an isolated workspace, supervise an agent through one unit of work, judge the result independently, keep a reviewable account. One machine, one repo, no account, no hosted service. A candidate cannot enlarge its own authority and refusals outlive the process. Specified and tested against local fakes; not yet released or live-qualified."
            tags={["Rust", "Agentic AI", "Local-First"]}
            href="https://github.com/statecrafting/statecraft-cli"
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
