// astro.config.mjs
import { defineConfig } from "astro/config";

// Frameworks
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// SSR Adapters
import cloudflare from "@astrojs/cloudflare";

// Docs: https://astro.build/config
/**
 * @type {import('astro/config').Config}
 */
export default defineConfig({
  site: "https://project1.kami.wtf",
  integrations: [react(), tailwind()],
  output: "server",
  adapter: cloudflare(),
  // prefetch: true,
  server: { port: 3000 },
});
