// astro.config.mjs
import { defineConfig } from 'astro/config';

// Frameworks
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";

// SSR Adapters
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";

// Docs: https://astro.build/config
/**
 * @type {import('astro/config').Config}
 */
export default defineConfig({
  site: "http://localhost:3000",
  integrations: [react(), tailwind()],
  output: "server",
  adapter: node({mode: 'standalone'}),
  // vite: {
  //   ssr: {
  //     external: ["node:fs", "node:path", "node:buffer"],
  //   }
  // },
  // prefetch: true,
  server: { port: 3000 }
});
