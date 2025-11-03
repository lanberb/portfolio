import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { viteInjectSvgPlugin } from "./plugins/viteInjectSvgPlugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteInjectSvgPlugin()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "src/client/main.tsx"),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
    },
  },
});
