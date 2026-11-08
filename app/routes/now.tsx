import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function Now() {
  return (
    <>
      <SEO title="Now" description="What Bartek Kus is currently working on and focused on." path="/now" />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="What I'm Doing Now" kicker="Last updated: November 2026" />

        <div className="prose prose-lg max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Focus</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">rustev</strong> - 0.5.0 just shipped to crates.io: a decision engine that
                produces proposals, never grants. Live re-execution is specified but not implemented yet.
              </li>
              <li>
                <strong className="text-foreground">rahi</strong> - 0.7.x release candidate. The supported topology is a single
                node; the three-node qualification on Kubernetes is still open, and I will not call it supported until it has run.
              </li>
              <li>
                <strong className="text-foreground">aicortex</strong> - governed memory for AI clients over MCP, being built one spec
                per pull request on top of rahi. Specified; not usable yet.
              </li>
              <li>
                <strong className="text-foreground">statecraft-cli</strong> - implemented and tested against local fakes, not
                released. Publication is deliberately deferred until a managed session has been qualified for real.
              </li>
              <li>
                <strong className="text-foreground">spec-spine</strong> - 0.32 on crates.io, npm and PyPI, governing every
                repository in the family including itself.
              </li>
              <li>
                <strong className="text-foreground">Writing</strong> - an essay per tool explaining what it is, what it refuses to
                be, and what grade its claims carry. See <a href="/writing" className="text-primary hover:underline">Writing</a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Learning</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>Independent acceptance: judging an agent's result without trusting the agent's own account of it</li>
              <li>Deterministic release engineering: byte-identical artifacts across release triples</li>
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
