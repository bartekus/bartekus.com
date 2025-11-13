import { SEO } from "~/components/seo/SEO";
import { SectionHeader } from "~/components/ui/section-header";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Bartek Kus, a pragmatic full-stack engineer specializing in identity systems, cloud architecture, and AI-assisted development."
        path="/about"
      />

      <div className="container px-4 py-20 max-w-4xl mx-auto">
        <SectionHeader title="About Me" kicker="A pragmatic engineer focused on resilient systems and sustainable architecture." />

        <div className="prose prose-lg max-w-none space-y-6 text-text-muted">
          <p>
            I'm Bartek Kus, a senior software engineer and founder based in Edmonton, Canada. Over the past decade, I've built
            systems that need to work reliably at scale—from identity verification platforms processing thousands of verifications
            daily to local-first developer infrastructures that run on a single server.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">My Approach</h2>
          <p>
            I believe in building systems that are simple to understand, easy to maintain, and resilient by design. Complexity is the
            enemy of reliability. My work focuses on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Clear architectural boundaries that limit blast radius</li>
            <li>Observability built in from day one, not bolted on later</li>
            <li>Idempotent operations that can be safely retried</li>
            <li>Graceful degradation when dependencies fail</li>
            <li>APIs designed for humans and machines alike</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">What I Work On</h2>
          <p>
            Currently, I'm building <strong>Pension.you</strong>, a private pension platform with integrated life insurance. It's
            designed to be fraud-resistant and compliant with Canadian financial regulations while remaining simple for users.
          </p>
          <p>
            I've also worked extensively with digital identity systems—OIDC for authentication, SSI and DIDs for verifiable
            credentials. At Oliu.id, I helped build identity verification infrastructure that balanced security with user experience.
          </p>
          <p>
            I'm passionate about local-first development platforms that don't require massive cloud infrastructure. My{" "}
            <strong>Encore.ts integration</strong> work demonstrates how to build complete environments with Docker, Traefik, Stripe,
            and Logto—all deployable on a single VPS.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Beyond Code</h2>
          <p>
            I'm exploring how AI can augment development workflows without replacing human judgment. I experiment with RAG systems,
            LLM-assisted code generation, and developer tools that reduce cognitive load.
          </p>
          <p>
            When I'm not writing code, I write about systems design, infrastructure patterns, and practical approaches to software
            architecture. You can find my writing in the{" "}
            <a href="/writing" className="text-primary hover:underline">
              blog section
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Let's Connect</h2>
          <p>
            I'm always interested in conversations about resilient systems, identity infrastructure, or local-first architectures.
            Reach out via{" "}
            <a href="mailto:bart@bartekus.com" className="text-primary hover:underline">
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
