import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";

import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/toaster";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { Umami } from "~/components/analytics/Umami";

import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta(_args: Route.MetaArgs) {
  return [
    {
      title: "Bartek Kus - Pragmatic Full-Stack Engineer",
    },
    {
      name: "description",
      content:
        "Senior software engineer specializing in identity systems, cloud architecture, and AI-assisted development. Building resilient systems that scale.",
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
        <title>Bartek Kus - Pragmatic Full-Stack Engineer</title>
        <meta
          name="description"
          content="Senior software engineer specializing in identity systems, cloud architecture, and AI-assisted development. Building resilient systems that scale."
        />
        <meta name="author" content="Bartek Kus" />

        {/* Open Graph */}
        <meta property="og:title" content="Bartek Kus - Pragmatic Full-Stack Engineer" />
        <meta
          property="og:description"
          content="Senior software engineer specializing in identity systems, cloud architecture, and AI-assisted development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bartekus.com" />
        <meta property="og:image" content="https://bartekus.com/og-default.png" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bartekus" />
        <meta name="twitter:creator" content="@bartekus" />
        <meta name="twitter:title" content="Bartek Kus - Pragmatic Full-Stack Engineer" />
        <meta
          name="twitter:description"
          content="Senior software engineer specializing in identity systems, cloud architecture, and AI-assisted development."
        />
        <meta name="twitter:image" content="https://bartekus.com/og-default.png" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#2D6AE3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#6FA4FF" media="(prefers-color-scheme: dark)" />

        {/* RSS/Atom */}
        <link rel="alternate" type="application/rss+xml" title="Bartek Kus RSS Feed" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Bartek Kus Atom Feed" href="/atom.xml" />

        {/* React Router-managed meta/link tags (route-level `meta` / `links` exports) */}
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
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

export default function App() {
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
