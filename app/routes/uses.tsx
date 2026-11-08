import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function Uses() {
  return (
    <>
      <SEO
        title="Uses"
        description="Tools, software, and hardware that Bartek Kus uses for development and productivity."
        path="/uses"
      />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="Tools & Setup" kicker="Software, hardware, and services I use daily. Last updated: November 2026." />

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Development</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Editors:</strong> JetBrains RustRover and WebStorm
              </li>
              <li>
                <strong className="text-foreground">Agent harnesses:</strong> Claude Code and Codex, driven through MCP servers
                and per-repository instructions; agents work in isolated git worktrees
              </li>
              {/* TODO(bart): confirm terminal app */}
              <li>
                <strong className="text-foreground">Terminal:</strong> iTerm2 + zsh
              </li>
              <li>
                <strong className="text-foreground">Version Control:</strong> Git + GitHub, SSH-signed commits, GitHub Actions
              </li>
              <li>
                <strong className="text-foreground">Toolchains:</strong> Rust stable + cargo, Node 24 + npm, TypeScript
              </li>
              <li>
                <strong className="text-foreground">Containers:</strong> Docker, single-container images with preflight, migrate,
                backup and restore built in
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Stack</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Systems:</strong> Rust (axum, tokio, serde), deny-by-default kernels, hash-chained
                ledgers
              </li>
              <li>
                <strong className="text-foreground">Frontend:</strong> React, TypeScript, React Router, Tailwind CSS
              </li>
              <li>
                <strong className="text-foreground">Data:</strong> hiqlite (replicated SQLite with in-process Raft) and PostgreSQL
              </li>
              <li>
                <strong className="text-foreground">Identity:</strong> rauthy as the OIDC provider, co-deployed behind the app's own
                origin
              </li>
              <li>
                <strong className="text-foreground">Infrastructure:</strong> Kubernetes, Helm, Flux, Terraform
              </li>
              <li>
                <strong className="text-foreground">Observability:</strong> OpenTelemetry traces, metrics and probes
              </li>
              <li>
                <strong className="text-foreground">Governance:</strong> spec-spine on every repository, statecraft-cli from a checkout
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Hardware</h2>
            <ul className="space-y-4 text-text-muted">
              {/* TODO(bart): confirm exact model and memory */}
              <li>
                <strong className="text-foreground">Laptop:</strong> MacBook Pro, Apple silicon, macOS
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Monitor:</strong> Dell UltraSharp 27" 4K
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Keyboard:</strong> Keychron K8 Pro (Brown switches)
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Mouse:</strong> Logitech MX Master 3S
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Audio:</strong> Sony WH-1000XM5
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Productivity</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Notes and specs:</strong> Markdown in the repository, governed by spec-spine;
                durable memory in aicortex once it is usable
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Design:</strong> Figma, Excalidraw
              </li>
              <li>
                <strong className="text-foreground">Writing:</strong> MDX essays in this repository, drafted in the editor
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Services</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">This site:</strong> Cloudflare Pages, static build, no server
              </li>
              <li>
                <strong className="text-foreground">Registries:</strong> crates.io, npm and PyPI, published from CI with provenance
              </li>
              <li>
                <strong className="text-foreground">Analytics:</strong> Umami
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Email:</strong> Fastmail with custom domain
              </li>
              {/* TODO(bart): confirm */}
              <li>
                <strong className="text-foreground">Backups:</strong> Restic + B2
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
