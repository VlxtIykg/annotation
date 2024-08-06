// astro.config.mjs
import { defineConfig } from "astro/config";

// Frameworks
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// SSR Adapters
import node from "@astrojs/node";

// Docs: https://astro.build/config
/**
 * @type {import('astro/config').Config}
 */
export default defineConfig({
  site: "https://localhost:3000",
  integrations: [react(), tailwind()],
  output: "server",
  adapter: node({ mode: "standalone" }),
  // prefetch: true,
  server: { port: 3000 },
});
