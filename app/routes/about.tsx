import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Bartek Kus is a systems architect working on governed agentic software delivery: spec-spine, open-agentic-platform, and a decade of trust infrastructure."
        path="/about"
      />

      <div className="container px-4 py-20 max-w-4xl mx-auto">
        <SectionHeader title="About Me" kicker="I work on the trust problem in AI-native software delivery." />

        <div className="prose prose-lg max-w-none space-y-6 text-text-muted">
          <p>
            I'm Bartek Kus, a systems architect based in Edmonton, Canada. For over a decade I've built trust infrastructure:
            identity verification at Oliu.id processing thousands of verifications daily, regulated fintech, and developer platforms
            designed to keep working when their dependencies don't. All of that work now converges on a single question: can you
            trust software you didn't write, produced faster than you can read it?
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
              <a
                href="https://github.com/bartekus/spec-spine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                spec-spine
              </a>
            </strong>{" "}
            is a typed, hash-verifiable authority ledger over a markdown spec corpus. Every spec declares the files, sections, and
            symbols it owns; a PR-time coupling gate refuses code that drifts from its owning spec. It is deterministic to the byte
            across five platforms, written in Rust, Apache-2.0 licensed, installable from crates.io and npm, and it governs itself:
            its own coupling gate runs against its own spec corpus in CI.
          </p>
          <p>
            <strong>
              <a
                href="https://github.com/statecrafting/open-agentic-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                open-agentic-platform
              </a>
            </strong>{" "}
            is where those ideas run at full scale: a governed control plane for AI-native software delivery. Two hundred frozen
            specs compile to a deterministic registry, every agent action reconciles to the spec that authorised it, and every
            pipeline run emits a self-authenticating governance certificate an auditor can verify without trusting the system that
            produced it. Mapping the platform against the OWASP ASI 2026 controls is a single CLI invocation.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">How I Work</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Specs before code: intent is written down, versioned, and hash-frozen before implementation begins</li>
            <li>Gates over reviews: drift between contract and code fails CI, not a meeting</li>
            <li>Humans gate contracts and irreversible boundaries; machines enforce everything in between</li>
            <li>Determinism everywhere: same inputs, byte-identical artifacts, on every platform</li>
            <li>Observability and audit are the substrate, not bolt-ons</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Why Encore.ts, Not Express</h2>
          <p>
            The same worldview decides my backend stack. Express asks every engineer to uphold conventions on every commit:
            middleware order, validation, error shapes, documentation that may or may not match reality.{" "}
            <a href="https://encore.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Encore.ts
            </a>{" "}
            inverts that: declarative, type-safe API contracts that generate the infrastructure, the clients, and the documentation
            from a single source of truth. Contracts a machine can verify beat conventions a human must remember; that holds for
            agent governance, and it holds just as well for a request handler.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Beyond Code</h2>
          <p>
            I write about agentic governance, systems design, and trust infrastructure in the{" "}
            <a href="/writing" className="text-primary hover:underline">
              blog section
            </a>
            ; the place to start is "Architecting intent vs vibe coding".
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
