import { Link } from "react-router";
import { Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "~/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-2 mt-10">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-lg text-primary">Bartek Kus</span>
            </div>
            <p className="text-sm text-text-muted max-w-xs">
              Pragmatic full-stack engineer building resilient systems and exploring identity, local-first infrastructure, and
              AI-assisted development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-text-muted hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="text-text-muted hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <a href="/rss.xml" className="text-sm text-text-muted hover:text-foreground transition-colors">
                RSS Feed
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-text-muted">
          <p>&copy; {currentYear} Bartek Kus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
