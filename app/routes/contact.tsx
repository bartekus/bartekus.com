import { Mail, Linkedin, Github } from "lucide-react";
import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";
import { siteConfig } from "~/config";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Bartek Kus for consulting, collaboration, or questions about identity systems and cloud architecture."
        path="/contact"
      />

      <div className="container px-4 py-20 max-w-3xl mx-auto">
        <SectionHeader title="Get in Touch" kicker="Available for consulting, collaboration, and interesting conversations." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-center"
          >
            <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit mx-auto">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Email</h3>
            <p className="text-sm text-text-muted">{siteConfig.social.email}</p>
          </a>

          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-center"
          >
            <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit mx-auto">
              <Linkedin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">LinkedIn</h3>
            <p className="text-sm text-text-muted">Connect professionally</p>
          </a>

          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all text-center"
          >
            <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit mx-auto">
              <Github className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">GitHub</h3>
            <p className="text-sm text-text-muted">View my code</p>
          </a>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-text-muted">
          <h2 className="text-2xl font-semibold text-foreground">What I Can Help With</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Identity system architecture (OIDC, SSI, DIDs)</li>
            <li>Cloud infrastructure and DevOps consulting</li>
            <li>Full-stack application development</li>
            <li>Technical architecture review and advisory</li>
            <li>Early-stage startup technical guidance</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Response Time</h2>
          <p>I typically respond to emails within 24-48 hours. For urgent matters, please mention "urgent" in the subject line.</p>

          <div className="mt-8 p-6 rounded-lg bg-surface-2 border border-border">
            <p className="text-sm text-foreground font-medium mb-2">Looking for my resume?</p>
            <p className="text-sm">
              You can view or download my full resume{" "}
              <a href="/resume" className="text-primary hover:underline">
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
