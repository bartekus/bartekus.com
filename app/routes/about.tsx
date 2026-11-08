import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

function Repo({ name }: { name: string }) {
  return (
    <a
      href={`https://github.com/statecrafting/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {name}
    </a>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Bartek Kus is a systems architect working on governed agentic software delivery: spec-spine, the statecrafting tool family, and a decade of trust infrastructure."
        path="/about"
      />

      <div className="container px-4 py-20 max-w-4xl mx-auto">
        <SectionHeader title="About Me" kicker="I work on the trust problem in AI-native software delivery." />

        <div className="prose prose-lg max-w-none space-y-6 text-text-muted">
          <p>
            I'm Bartek Kus, a systems architect based in Edmonton, Canada. For over a decade I've built trust infrastructure:
            identity verification at Oliu.id (OIDC, SSI, DID), platform engineering in regulated fintech, and a stint as Solution
            Architect for the Government of Alberta. It is one problem at three scales: can this person be trusted, can this system
            be trusted, and now, can machine-generated change be trusted?
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">The Problem I Work On</h2>
          <p>
            AI agents can generate code faster than any human can review it. The industry's default answer is vibe coding: prompt,
            accept, iterate, and hope. Intent lives in chat scrollback, the artifact is the only durable record, and nobody can say
            afterwards why the code is the way it is. That works for prototypes and fails the moment software carries liability.
          </p>
          <p>
            My answer is <strong>architecting intent</strong>: the human authors a contract, the contract compiles into
            machine-verifiable truth, and code that drifts from its contract is refused at merge; mechanically, not by convention.
            Humans gate the contracts, the approvals, and the irreversible boundaries. Machinery enforces everything in between.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">What I Build</h2>
          <p>
            <strong>
              <Repo name="spec-spine" />
            </strong>{" "}
            is a typed, hash-verifiable authority ledger over a markdown spec corpus. Every spec declares the files, sections, and
            symbols it owns; a PR-time coupling gate refuses code that drifts from its owning spec. It is written in Rust,
            Apache-2.0 licensed, and installable from crates.io, npm and PyPI. Its release artifacts are byte-identical across four
            release triples in CI, with a fifth built and shipped. It governs itself: its own coupling gate runs against its own
            spec corpus on every pull request.
          </p>
          <p>
            Around it sits the <strong>statecrafting</strong> family: small tools with explicit boundaries, each owning its own
            specifications, catalogued at{" "}
            <a href="https://statecraft.ing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              statecraft.ing
            </a>
            . A library capability, a release and a deployed service are separate claims, so each tool below carries its grade.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <Repo name="statecraft-cli" />: a local environment for governed agent work. Register a repository, prepare an isolated
              workspace, supervise an agent through one unit of work, judge the result independently, keep a reviewable account.
              Specified, implemented and tested; not yet released.
            </li>
            <li>
              <Repo name="rahi" />: the Rust chassis for governed cells: identity (co-deployed rauthy), replicated state (hiqlite),
              a hash-chained decision ledger, a deny-by-default capability kernel, and single-container packaging. Released as a
              0.7.1 release candidate on crates.io; the supported topology is a single node.
            </li>
            <li>
              <Repo name="aicortex" />: persistent, governed memory for AI clients over MCP. Recalled content is always data, never
              an instruction unless a human promoted it. Specified; being built one spec per pull request.
            </li>
            <li>
              <Repo name="rustev" />: an embeddable Rust engine for making, evaluating and recording decisions over partially
              trusted information. It produces proposals, never grants. Released: 0.5.0 on crates.io.
            </li>
            <li>
              <Repo name="wire-witness" />: captures provider wire exchanges and produces attributed observations with custody
              facts. Testimony, never authority. Tagged 0.1.0; not yet on crates.io.
            </li>
            <li>
              Three primitives, each released on crates.io: <Repo name="action-gate" /> (a pure, deterministic decision gate),{" "}
              <Repo name="attest-ledger" /> (an append-only, hash-linked, Ed25519-signed record ledger with an independent verifier)
              and <Repo name="canonical-keysort-json" /> (deterministic key order so record hashes agree everywhere).
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">How I Work</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Specs before code: intent is written down, versioned, and hash-frozen before implementation begins</li>
            <li>Gates over reviews: drift between contract and code fails CI, not a meeting</li>
            <li>Humans gate contracts and irreversible boundaries; machines enforce everything in between</li>
            <li>Determinism where it matters: same inputs, byte-identical artifacts, verified in CI</li>
            <li>Claims carry their grade: specified, implemented, tested, released and deployed are different statements</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Typed Contracts Over Convention</h2>
          <p>
            The same worldview decides my stack. Convention asks every engineer to uphold the same rules on every commit:
            middleware order, validation, error shapes, documentation that may or may not match reality. A typed contract inverts
            that: the shape of a request, a record or a decision is declared once, checked by a compiler, and the infrastructure,
            clients and documentation derive from it. That is why most of the family is Rust, why rahi's capability kernel denies by
            default, and why spec-spine refuses rather than warns. Contracts a machine can verify beat conventions a human must
            remember; that holds for agent governance, and it holds just as well for a request handler.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Beyond Code</h2>
          <p>
            I write about agentic governance, systems design, and trust infrastructure in the{" "}
            <a href="/writing" className="text-primary hover:underline">
              blog section
            </a>
            ; the place to start is "Architecting intent vs vibe coding". I also contribute to{" "}
            <a href="https://github.com/sebadob/rauthy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              rauthy
            </a>{" "}
            and{" "}
            <a href="https://github.com/sebadob/hiqlite" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              hiqlite
            </a>
            , the two projects rahi co-deploys and embeds.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Let's Connect</h2>
          <p>
            I'm always interested in conversations about governed agentic delivery, spec-driven development, or identity
            infrastructure. Reach out via{" "}
            <a href="mailto:bartekus@gmail.com" className="text-primary hover:underline">
              email
            </a>{" "}
            or connect on{" "}
            <a
              href="https://linkedin.com/in/bartekus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
