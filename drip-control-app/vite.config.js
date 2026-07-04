import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    // TikTok LIVE Studio's and OBS's browser sources are Chromium-based
    // but can lag behind the latest release. Targeting es2018 instead of
    // Vite's default (very modern) baseline trades a little bit of output
    // size for meaningfully wider compatibility with embedded/older
    // Chromium builds — important since the overlay page has no visible
    // error state if it fails to load on stream.
    target: "es2018",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        overlay: resolve(__dirname, "overlay.html"),
      },
    },
  },
});
