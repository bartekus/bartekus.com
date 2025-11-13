import { Download, Mail, Linkedin, Github } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEO
        title="Resume"
        description="Resume of Bartek Kus - Senior Software Engineer specializing in identity systems, cloud architecture, and full-stack development."
        path="/resume"
      />

      <div className="container px-4 py-12 max-w-4xl mx-auto">
        {/* Print Button - Hidden on print */}
        <div className="mb-8 print:hidden flex justify-end">
          <Button onClick={handlePrint} variant="outline">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Resume Content */}
        <div className="bg-card border border-border rounded-lg p-8 print:border-0 print:shadow-none">
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-4xl font-bold mb-2">Bartek Kus</h1>
            <p className="text-xl text-text-muted mb-4">Senior Software Engineer & Founder</p>
            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="flex items-center gap-1 hover:text-primary print:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.social.email}
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary print:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary print:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Summary</h2>
            <p className="text-text-muted leading-relaxed">
              Senior full-stack engineer with 10+ years building scalable cloud-native systems, identity verification platforms, and
              developer infrastructure. Expert in TypeScript, React, Node.js, PostgreSQL, and Docker. Specialized in digital identity
              (OIDC, SSI, DIDs), DevOps automation, and resilient system architecture. Proven track record architecting systems
              processing thousands of daily transactions with 99.9%+ uptime.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Experience</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Founder & Technical Lead</h3>
                <p className="text-text-muted">Pension.you • 2023 - Present • Edmonton, Canada</p>
                <ul className="mt-2 space-y-1 text-text-muted list-disc list-inside ml-4">
                  <li>Building private pension platform with life insurance integration</li>
                  <li>Architecting fraud-resistant workflows and compliance automation</li>
                  <li>Full-stack development with React, TypeScript, Node.js, PostgreSQL</li>
                  <li>Implementing identity verification via OIDC and SSI standards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Senior Software Engineer</h3>
                <p className="text-text-muted">Oliu.id • 2021 - 2023 • Remote</p>
                <ul className="mt-2 space-y-1 text-text-muted list-disc list-inside ml-4">
                  <li>Architected identity verification platform processing 5K+ daily verifications</li>
                  <li>Implemented OIDC flows, SSI integration, and fraud detection pipelines</li>
                  <li>Built RESTful APIs with Node.js, TypeScript, and PostgreSQL</li>
                  <li>Maintained 99.9% uptime with comprehensive monitoring and alerting</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Full-Stack Developer</h3>
                <p className="text-text-muted">Various Clients • 2015 - 2021 • Remote</p>
                <ul className="mt-2 space-y-1 text-text-muted list-disc list-inside ml-4">
                  <li>Delivered 20+ web applications for startups and enterprises</li>
                  <li>Specialized in React, TypeScript, Node.js, and cloud infrastructure</li>
                  <li>Designed and implemented RESTful and GraphQL APIs</li>
                  <li>Set up CI/CD pipelines with GitHub Actions and Docker</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Languages & Frameworks</h3>
                <p className="text-text-muted text-sm">TypeScript, JavaScript, React, Node.js, Next.js, Encore.ts</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Databases & Caching</h3>
                <p className="text-text-muted text-sm">PostgreSQL, Redis, Supabase</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">DevOps & Infrastructure</h3>
                <p className="text-text-muted text-sm">Docker, Traefik, GitHub Actions, DigitalOcean, Cloudflare</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Identity & Auth</h3>
                <p className="text-text-muted text-sm">OIDC, OAuth 2.0, SSI, DIDs, Logto, Supabase Auth</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">APIs & Integration</h3>
                <p className="text-text-muted text-sm">REST, GraphQL, Stripe, Webhooks</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Monitoring & Observability</h3>
                <p className="text-text-muted text-sm">Grafana, Prometheus, Sentry, Umami</p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Key Projects</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Local-First Developer Platform</h3>
                <p className="text-text-muted text-sm">
                  Complete dev environment with Encore.ts, Docker, Traefik, Stripe, and Logto. Deployable on single VPS with
                  automated CI/CD.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">RAG Subsystem Research</h3>
                <p className="text-text-muted text-sm">
                  Experimented with retrieval-augmented generation for technical docs. Built indexing pipelines, chunking strategies,
                  and evaluation frameworks.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">Education</h2>
            <div>
              <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-text-muted">University of Alberta • 2010 - 2014</p>
            </div>
          </section>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:text-foreground {
            color: #0B1220 !important;
          }
        }
      `}</style>
    </>
  );
}
