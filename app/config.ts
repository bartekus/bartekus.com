export const siteConfig = {
  title: "Bartek Kus",
  description: "Pragmatic full-stack engineer; identity; local-first infra; AI-assisted dev.",
  url: import.meta.env.VITE_SITE_URL || "https://bartekus.com",
  author: {
    name: "Bartek Kus",
    email: "bart@bartekus.com",
    jobTitle: "Senior Software Engineer & Founder",
    location: "Edmonton, Canada",
  },
  social: {
    github: "https://github.com/bartekus",
    linkedin: "https://linkedin.com/in/bartekus",
    x: "https://x.com/bartekus",
    email: "bart@bartekus.com",
  },
  giscus: {
    repo: import.meta.env.VITE_GISCUS_REPO || "",
    repoId: import.meta.env.VITE_GISCUS_REPO_ID || "",
    category: import.meta.env.VITE_GISCUS_CATEGORY || "",
    categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID || "",
  },
  umami: {
    websiteId: import.meta.env.VITE_UMAMI_WEBSITE_ID || "",
    src: import.meta.env.VITE_UMAMI_SRC || "",
  },
  contact: {
    formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  },
  navigation: [
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Writing", href: "/writing" },
    { name: "About", href: "/about" },
  ],
  footerLinks: [
    { name: "Now", href: "/now" },
    { name: "Uses", href: "/uses" },
    { name: "Contact", href: "/contact" },
    { name: "Press", href: "/press" },
    { name: "Resume", href: "/resume" },
  ],
} as const;
