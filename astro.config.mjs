// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // site: "project1.kami.wtf",
  integrations: [react(), tailwind()],
  output: "server",
  adapter: cloudflare(),
  ssr: {
    external: ["node:fs", "node:path", "node:buffer"],
  }
});
