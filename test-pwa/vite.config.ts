import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/test-pwa/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // Workbox je google library ktorá povoluje offline funkcionalitu
      // a cachovanie súborov
      workbox: {
        // Subory na cashnutie
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Testing PWA App",
        short_name: "PWAapp",
        description: "Love, bread and roses for all!",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/test-pwa/",
        scope: "/test-pwa/",
        start_url: "/",
        // Icons - toto je potrebné pre PWA
        icons: [
          {
            src: "vite.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
