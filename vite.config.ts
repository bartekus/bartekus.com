import { defineConfig, type UserConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => {
  const config: UserConfig = {
    plugins: [
      ViteImageOptimizer({
        jpg: { quality: 70 },
        webp: { quality: 70 },
        avif: { quality: 40 },
      }),
      mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      }),
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
    ],
    build: {
      target: "esnext",
      modulePreload: true,
      cssMinify: "lightningcss",
      sourcemap: false,
      assetsInlineLimit: 4096,
      cssCodeSplit: false,
      minify: isSsrBuild ? false : "esbuild",
    },
    server: {
      host: "::",
      port: 5173,
    },
  };

  return config;
});
