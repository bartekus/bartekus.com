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
        <SectionHeader title="Tools & Setup" kicker="Software, hardware, and services I use daily." />

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Development</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Editor:</strong> VS Code with Vim keybindings
              </li>
              <li>
                <strong className="text-foreground">Terminal:</strong> iTerm2 + zsh + oh-my-zsh
              </li>
              <li>
                <strong className="text-foreground">Version Control:</strong> Git + GitHub
              </li>
              <li>
                <strong className="text-foreground">Database Tools:</strong> TablePlus, pgAdmin
              </li>
              <li>
                <strong className="text-foreground">API Testing:</strong> Bruno, Postman
              </li>
              <li>
                <strong className="text-foreground">Containers:</strong> Docker Desktop, OrbStack
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Stack</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Frontend:</strong> React, TypeScript, Tailwind CSS
              </li>
              <li>
                <strong className="text-foreground">Backend:</strong> Node.js, TypeScript, Encore.ts
              </li>
              <li>
                <strong className="text-foreground">Database:</strong> PostgreSQL, Redis
              </li>
              <li>
                <strong className="text-foreground">Deployment:</strong> Docker, Cloudflare Pages, Vercel
              </li>
              <li>
                <strong className="text-foreground">Monitoring:</strong> Grafana, Prometheus, Sentry
              </li>
              <li>
                <strong className="text-foreground">Auth:</strong> Logto, Supabase Auth
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Hardware</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Laptop:</strong> MacBook Pro M2 Pro, 16GB RAM
              </li>
              <li>
                <strong className="text-foreground">Monitor:</strong> Dell UltraSharp 27" 4K
              </li>
              <li>
                <strong className="text-foreground">Keyboard:</strong> Keychron K8 Pro (Brown switches)
              </li>
              <li>
                <strong className="text-foreground">Mouse:</strong> Logitech MX Master 3S
              </li>
              <li>
                <strong className="text-foreground">Audio:</strong> Sony WH-1000XM5
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Productivity</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Notes:</strong> Obsidian with daily notes
              </li>
              <li>
                <strong className="text-foreground">Tasks:</strong> Linear for projects, Things for personal
              </li>
              <li>
                <strong className="text-foreground">Communication:</strong> Slack, Discord
              </li>
              <li>
                <strong className="text-foreground">Design:</strong> Figma, Excalidraw
              </li>
              <li>
                <strong className="text-foreground">Writing:</strong> iA Writer, Notion
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Services</h2>
            <ul className="space-y-4 text-text-muted">
              <li>
                <strong className="text-foreground">Cloud:</strong> DigitalOcean, Cloudflare, Vercel
              </li>
              <li>
                <strong className="text-foreground">Analytics:</strong> Umami, Plausible
              </li>
              <li>
                <strong className="text-foreground">Email:</strong> Fastmail with custom domain
              </li>
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
