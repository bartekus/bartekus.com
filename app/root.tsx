import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/root";

import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/toaster";
import { Sonner } from "~/components/ui/sonner";
import { Umami } from "~/components/analytics/Umami";

import "./app.css";
import { siteConfig } from "~/config";

export function meta(_args: Route.MetaArgs) {
  return [
    {
      title: siteConfig.title,
    },
    {
      name: "description",
      content: siteConfig.heading,
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Static tags */}
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="author" content="Bartek Kus" />

        {/* Open Graph */}
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content={`${siteConfig.url}/og-default.png`} />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.author.twitter} />
        <meta name="twitter:creator" content={siteConfig.author.twitter} />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={`${siteConfig.url}/og-default.png`} />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/*<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />*/}
        {/*<link rel="preload" href="/site.webmanifest" as="manifest" />*/}

        {/* Theme Color */}
        <meta name="theme-color" content="#2D6AE3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#6FA4FF" media="(prefers-color-scheme: dark)" />

        {/* RSS/Atom */}
        {/*<link rel="alternate" type="application/rss+xml" title={`${siteConfig.author.name} RSS Feed`} href="/rss.xml" />*/}
        {/*<link rel="alternate" type="application/atom+xml" title={`${siteConfig.author.name} Atom Feed`} href="/atom.xml" />*/}

        {/* React Router-managed meta/link tags (route-level `meta` / `links` exports) */}
        <Meta />
        <Links />

        {/* CSS & Fonts */}
        <link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <style>{`
        html:not(.hydrated) main,
        html:not(.hydrated) footer {
          visibility: hidden;
        }
      `}</style>
      </head>
      <body>
        <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
          <Header />
          <main id="main-content" className="flex-1" role="main" aria-label="Main content">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Umami />
              {children}
            </TooltipProvider>
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <div>'Loading...'</div>;
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
