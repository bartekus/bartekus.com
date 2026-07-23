import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function Now() {
  return (
    <>
      <SEO title="Now" description="What Bartek Kus is currently working on and focused on." path="/now" />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="What I'm Doing Now" kicker="Last updated: July 2026" />

        <div className="prose prose-lg max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Current Focus</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Statecraft</strong> - The governed agentic delivery control plane, rebuilt
                ground-up from the open-agentic-platform work and live in production. Tenants, a factory that stamps applications
                from a versioned template contract, a fleet plane operating them on Hetzner k3s, and a governance UI; the platform
                is itself the first production app of its own template.
              </li>
              <li>
                <strong className="text-foreground">enrahitu</strong> - The EnRaHiTu template chassis: Encore.ts + rauthy +
                hiqlite + Turso in one self-contained container with zero managed-infrastructure dependencies. The Encore
                toolchain is vendored and driven as a library; there is no CLI anywhere in the loop.
              </li>
              <li>
                <strong className="text-foreground">spec-spine</strong> - Now governing every repository in the Statecraft
                family, including the rewrite that produced it. Ongoing work on adoption, feedback, and language bindings.
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
