import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight, Shield, Code, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { CardProject } from "~/components/ui/card-project";
import { PostCard } from "~/components/ui/post-card";
import { SectionHeader } from "~/components/ui/section-header";
import { SEO } from "~/components/seo/SEO";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
// }

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <SEO />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-radial pt-20 pb-32 film-grain">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6 text-balance">Pragmatic full-stack engineer bridging architecture and execution.</h1>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto text-balance">
              10+ years building scalable cloud-native systems; high-performance backends; React and TypeScript frontends; DevOps and
              CI/CD; API design; digital identity and AI-assisted development.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/work">
                  View Work
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/writing">Read Writing</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/projects">Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="group p-8 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all spotlight-hover"
          >
            <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
              <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Identity at scale</h3>
            <p className="text-text-muted">
              Deep experience with OIDC, SSI, and DID. Built identity verification platforms processing thousands of verifications
              daily.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="group p-8 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all spotlight-hover"
          >
            <div className="mb-4 p-3 rounded-lg bg-accent/10 w-fit">
              <Code className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Local-first developer platforms</h3>
            <p className="text-text-muted">
              Architected complete dev platforms using Encore.ts, Docker, Traefik, Stripe, and Logto—all deployable on a single
              droplet.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
            className="group p-8 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all spotlight-hover"
          >
            <div className="mb-4 p-3 rounded-lg bg-success/10 w-fit">
              <Sparkles className="h-6 w-6 text-success" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Designing Pension.you</h3>
            <p className="text-text-muted">
              Building a private pension platform with life insurance integration. Focused on fraud resilience and regulatory
              compliance. {/*<Link to="/pension-you" className="text-primary hover:underline">*/}
              {/*  Learn more →*/}
              {/*</Link>*/}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest Writing */}
      <section className="py-20 bg-surface-2/50">
        <div className="container px-4">
          <SectionHeader
            eyebrow="Blog"
            title="Latest Writing"
            kicker="Thoughts on systems design, identity, infrastructure, and AI-assisted development."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PostCard
              title="Design principles for resilient systems"
              description="Simplicity, observability, blast radius, idempotency, and graceful degradation."
              date="2024-01-15"
              readingTime={8}
              tags={["Systems Design", "Architecture"]}
              slug="design-principles-resilient-systems"
            />
            <PostCard
              title="Local-first developer platforms on a single droplet"
              description="Building complete dev environments with Encore.ts, Traefik, Docker Compose, and more."
              date="2024-01-10"
              readingTime={12}
              tags={["DevOps", "Infrastructure"]}
              slug="local-first-developer-platforms"
            />
            <PostCard
              title="Identity in practice: OIDC, SSI, and DID"
              description="Practical guidance on when to use each identity standard, without the hype."
              date="2024-01-05"
              readingTime={10}
              tags={["Identity", "Security"]}
              slug="identity-in-practice"
            />
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/writing">
                View All Posts
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
