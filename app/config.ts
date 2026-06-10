export const siteConfig = {
  brand: "BK",
  title: "Bartek Kus - Architecting Intent for AI-Native Software",
  heading: "Architecting intent: governance for AI-native software delivery.",
  description:
    "AI can write the code; the unsolved problem is trusting what it wrote. I build the governance layer: specs as law, drift refused at merge, and audit chains a regulator can verify.",
  url: import.meta.env.VITE_SITE_URL || "https://bartekus.com",
  author: {
    name: "Bartek Kus",
    email: "bartekus@gmail.com",
    twitter: "@bartekus",
    jobTitle: "Systems Architect",
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
