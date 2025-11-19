import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import LightningCSS from "vite-plugin-lightningcss";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import tsconfigPaths from "vite-tsconfig-paths";
import htmlMinimize from "@sergeymakinen/vite-plugin-html-minimize";

export default defineConfig({
  build: {
    target: "esnext",
    modulePreload: true,
    cssMinify: "lightningcss",
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 0,
  },
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 70 },
      webp: { quality: 70 },
      avif: { quality: 40 },
    }),
    LightningCSS({ browserslist: ">= 0.25%" }),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
    htmlMinimize({
      minifierOptions: {
        // options below are safe defaults for React Router v7:
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeOptionalTags: false, // keep this false to avoid breaking JSX hydration
        keepClosingSlash: true,
      },
    }),
  ],
});
