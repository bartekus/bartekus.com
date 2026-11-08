import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { CardProject } from "~/components/ui/card-project";

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="Open source governance tooling and trust infrastructure by Bartek Kus: spec-spine and the statecrafting tool family."
        path="/projects"
      />

      <div className="container px-4 py-20">
        <SectionHeader
          eyebrow="Projects"
          title="Things I'm Building"
          kicker="Tools for governed software work: authored intent, explicit authority and evidence you can inspect. Each card carries its grade; a release and a deployed service are separate claims."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <CardProject
            title="spec-spine"
            description="A typed, hash-verifiable authority ledger over a markdown spec corpus. Refuses code that drifts from its owning spec at PR time; byte-identical across four release triples in CI; governs itself. Released: 0.32.0 on crates.io, npm and PyPI."
            tags={["Rust", "Governance", "Released"]}
            href="https://github.com/statecrafting/spec-spine"
          />

          <CardProject
            title="statecraft-cli"
            description="A local environment for governed agent work: register a repository, prepare an isolated workspace, supervise an agent through one unit of work, judge the result independently, keep a reviewable account. One machine, one repo, no hosted service. Specified, implemented and tested; not yet released."
            tags={["Rust", "Agentic AI", "Unreleased"]}
            href="https://github.com/statecrafting/statecraft-cli"
          />

          <CardProject
            title="rahi"
            description="The Rust chassis for governed cells: co-deployed rauthy for identity, hiqlite for replicated state, a hash-chained decision ledger, a deny-by-default capability kernel, an axum edge, single-container packaging. An app extends the chassis, never forks it. Released: 0.7.1 release candidate on crates.io; supported topology N=1."
            tags={["Rust", "Identity", "Release candidate"]}
            href="https://github.com/statecrafting/rahi"
          />

          <CardProject
            title="aicortex"
            description="Persistent, governed memory for AI clients over MCP: one store, one protocol, any client. Records carry provenance and a trust class; recalled content is data, never an instruction unless a human promoted it. A governed cell on rahi. Specified; being built one spec per pull request."
            tags={["Rust", "MCP", "In progress"]}
            href="https://github.com/statecrafting/aicortex"
          />

          <CardProject
            title="rustev"
            description="An embeddable Rust engine for making, evaluating and recording decisions over evolving, partially trusted information. Exact computation in Rust, semantic questions answered by backends that disclose what they can return, explicit abstention, an evidence record per decision. Proposals, never grants. Released: 0.5.0 on crates.io."
            tags={["Rust", "Decisions", "Released"]}
            href="https://github.com/statecrafting/rustev"
          />

          <CardProject
            title="wire-witness"
            description="Captures provider wire exchanges and produces attributed observations with custody facts. The output is testimony; it never grants authority to execute, admit evidence, change policy or decide acceptance. HTTP/1.1 transport, metadata-only retention by default. Tagged 0.1.0; not yet on crates.io."
            tags={["Rust", "Observability", "Tagged"]}
            href="https://github.com/statecrafting/wire-witness"
          />

          <CardProject
            title="Three primitives: action-gate, attest-ledger, canonical-keysort-json"
            description="Small Apache-2.0 crates you can audit in an afternoon. action-gate: a pure, deterministic decision gate over a check registry (0.3.0). attest-ledger: an append-only, hash-linked, Ed25519-signed ledger with a verifier that does not trust the producer (0.2.0). canonical-keysort-json: deterministic key order so record hashes agree everywhere (0.1.1). All on crates.io."
            tags={["Rust", "Primitives", "Released"]}
            href="https://github.com/statecrafting/attest-ledger"
          />

          <CardProject
            title="Oliu.id"
            description="Identity verification platform with OIDC, SSI, and DID support, processing thousands of verifications daily with fraud detection and regulatory compliance. The trust-infrastructure lineage behind the governance work."
            tags={["Identity", "OIDC", "SSI"]}
          />
        </div>

        <p className="mt-12 text-center text-text-muted">
          The full catalog, with each repository's specifications, is at{" "}
          <a href="https://statecraft.ing/registry" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            statecraft.ing/registry
          </a>
          .
        </p>
      </div>
    </>
  );
}
