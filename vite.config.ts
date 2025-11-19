import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

export default defineConfig({
  build: {
    target: "esnext",
    modulePreload: true,
    cssMinify: "lightningcss", // best for Tailwind v4
    minify: "esbuild",
    sourcemap: false,
  },
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    ViteImageOptimizer({
      webp: { quality: 80 },
      avif: { quality: 50 },
    }),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
