import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "~/config";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { Button } from "~/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <nav className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 font-bold text-lg">
          {/*<span className="gradient-text">{siteConfig.title}</span>*/}
          <span className="gradient-text">BK</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-text-muted hover:text-foreground transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 glass"
          >
            <div className="container space-y-1 py-4 px-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-text-muted hover:text-foreground hover:bg-surface-2 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
