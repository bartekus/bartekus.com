import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Shield, Code, Sparkles } from "lucide-react";

import { Button } from "~/components/ui/button";
import { PostCard } from "~/components/ui/post-card";
import { SectionHeader } from "~/components/ui/section-header";
import { SEO } from "~/components/seo/SEO";
import { siteConfig } from "~/config";
import { postSummaries } from "~/lib/posts";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

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
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6 text-balance">{siteConfig.heading}</h1>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto text-balance">{siteConfig.description}</p>
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
            <h2 className="text-xl font-semibold mb-2">Governed agentic delivery</h2>
            <p className="text-text-muted">
              Creator of spec-spine and Statecraft: specs as law, drift refused at merge, and audit chains an auditor
              can verify independently.
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
            <h2 className="text-xl font-semibold mb-2">Trust infrastructure</h2>
            <p className="text-text-muted">
              A decade of digital identity (OIDC, SSI, DID) and regulated fintech. Identity asked whether people can be trusted;
              governance asks the same of machine-generated change.
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
            <h2 className="text-xl font-semibold mb-2">Typed contracts everywhere</h2>
            <p className="text-text-muted">
              Encore.ts backends instead of Express, Rust toolchains, deterministic compilers: systems that prove what they claim
              instead of asking for trust.
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
            kicker="Thoughts on agentic governance, systems design, identity, and trust infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {postSummaries.slice(0, 3).map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                readingTime={post.readingTime}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
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
