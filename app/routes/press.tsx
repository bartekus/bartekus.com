import { Download } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { Button } from "~/components/ui/button";

export default function Press() {
  return (
    <>
      <SEO
        title="Press Kit"
        description="Media resources and information about Bartek Kus including bio, headshots, and company logos."
        path="/press"
      />

      <div className="container px-4 py-20 max-w-4xl mx-auto">
        <SectionHeader title="Press Kit" kicker="Media resources and information for press, podcasts, and speaking engagements." />

        {/* Bio Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Short Bio (120 words)</h2>
          <div className="p-6 rounded-lg bg-surface-2 border border-border">
            <p className="text-text-muted leading-relaxed">
              Bartek Kus is a systems architect based in Edmonton, Canada, working on the trust problem in AI-native software
              delivery: AI can write the code; the unsolved problem is trusting what it wrote. He is the creator of spec-spine, an
              open-source governance engine that refuses code drifting from its owning spec at merge time, and open-agentic-platform,
              a governed control plane where every agent action reconciles to the specification that authorised it. His earlier work
              includes identity verification infrastructure at Oliu.id (OIDC, SSI, DID) and a decade of platform engineering for
              regulated industries. Bartek writes about architecting intent, deterministic gating of probabilistic systems, and
              trust infrastructure.
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2 text-primary">Location</h3>
              <p className="text-text-muted">Edmonton, Canada</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2 text-primary">Experience</h3>
              <p className="text-text-muted">10+ years in software engineering</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2 text-primary">Specialties</h3>
              <p className="text-text-muted">Agentic Governance, Spec-Driven Development, Identity Systems</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2 text-primary">Current Projects</h3>
              <p className="text-text-muted">spec-spine and open-agentic-platform</p>
            </div>
          </div>
        </section>

        {/* Assets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Assets</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">Headshot (High Resolution)</h3>
                  <p className="text-sm text-text-muted">Professional photo, 2400x2400px</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">Logo Assets</h3>
                  <p className="text-sm text-text-muted">SVG and PNG formats, light and dark versions</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Speaking Topics</h2>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Architecting intent vs vibe coding: governing agentic software delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Keeping probabilistic AI behind deterministic gates</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>OWASP ASI 2026 in practice: mapping agentic security controls to a real platform</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Digital identity: OIDC, SSI, and DIDs in practice</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Local-first execution planes for AI-native development</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <div className="p-8 rounded-lg bg-primary/5 border border-primary/20">
          <h2 className="text-xl font-semibold mb-3">Media Inquiries</h2>
          <p className="text-text-muted mb-4">
            For interviews, speaking engagements, or press questions, please reach out via email.
          </p>
          <Button asChild>
            <a href="mailto:bartekus@gmail.com">Contact for Press</a>
          </Button>
        </div>
      </div>
    </>
  );
}
