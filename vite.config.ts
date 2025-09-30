import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
    },
  },
  build: {
    outDir: "dist/client",
  },
  ssr: {
    // SSRビルド時の外部化設定
    noExternal: ["@emotion/react", "@emotion/styled"],
  },
});
