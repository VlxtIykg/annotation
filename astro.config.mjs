// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:3000",
  integrations: [react(), tailwind()],
  output: "hybrid",
  adapter: node({mode: 'standalone',}),
  vite: {
    ssr: {
      external: ["node:fs", "node:path", "node:buffer"],
    }
  },
  prefetch: true,
  server: { port: 3000 }
});
