import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],

      manifest: {
        name: "SellSpot",
        short_name: "SellSpot",
        description: "Buy and Sell Products Easily",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "./pwaicons.jpeg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./pwaicons.jpeg",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./pwaicons.jpeg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});