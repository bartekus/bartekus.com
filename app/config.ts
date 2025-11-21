export const siteConfig = {
  brand: "BK",
  title: "Bartek Kus - Pragmatic Full-Stack Engineer",
  heading: "Pragmatic full-stack engineer bridging architecture and execution.",
  description:
    "10+ years building scalable cloud-native systems; high-performance backends; React and TypeScript frontends; DevOps and CI/CD; API design; digital identity and AI-assisted development.",
  url: import.meta.env.VITE_SITE_URL || "https://bartekus.com",
  author: {
    name: "Bartek Kus",
    email: "bartekus@gmail.com",
    twitter: "@bartekus",
    jobTitle: "Senior Software Engineer & Founder",
    location: "Edmonton, Canada",
  },
  social: {
    github: "https://github.com/bartekus",
    linkedin: "https://linkedin.com/in/bartekus",
    x: "https://x.com/bartekus",
    email: "bartekus@gmail.com",
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
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Work", href: "/work" },
    { name: "Writing", href: "/writing" },
  ],
  footerLinks: [
    { name: "Now", href: "/now" },
    { name: "Uses", href: "/uses" },
    { name: "Contact", href: "/contact" },
    { name: "Press", href: "/press" },
    { name: "Resume", href: "/resume" },
  ],
} as const;
