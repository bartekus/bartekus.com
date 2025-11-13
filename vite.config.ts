import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

export default defineConfig({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
