import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("work", "routes/work.tsx"),
  route("projects", "routes/projects.tsx"),
  route("writing", "routes/writing.tsx"),
  route("writing/:slug", "routes/blog-post.tsx"),
  route("now", "routes/now.tsx"),
  route("uses", "routes/uses.tsx"),
  route("contact", "routes/contact.tsx"),
  route("press", "routes/press.tsx"),
  route("resume", "routes/resume.tsx"),
  // catch-all "*"
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
