import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function Now() {
  return (
    <>
      <SEO title="Now" description="What Bartek Kus is currently working on and focused on." path="/now" />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="What I'm Doing Now" kicker="Last updated: June 2026" />

        <div className="prose prose-lg max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Focus</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">spec-spine</strong> - Just shipped v0.1.0: a standalone, Apache-2.0 release of
                the governance spine as a Rust library and CLI, on crates.io and npm with prebuilt binaries for five platforms. Now
                focused on the adoption guide, early adopter feedback, and language bindings.
              </li>
              <li>
                <strong className="text-foreground">open-agentic-platform</strong> - Deep in the factory governance envelope:
                signing authority, run-grants, and certificate countersigning. The spec corpus just crossed 200 specifications,
                every one compiled, gated, and traceable to code.
              </li>
              <li>
                <strong className="text-foreground">OWASP ASI 2026</strong> - Maintaining the control-to-spec traceability mapping
                and writing about what mapping a real platform against the agentic security controls taught me.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Learning</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>Multi-agent orchestration at scale: worktree isolation, checkpoints, adversarial verification</li>
              <li>Deterministic release engineering: byte-identical artifacts across five target triples</li>
              <li>Embedded Raft consensus (hiqlite) for single-binary durable services</li>
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
