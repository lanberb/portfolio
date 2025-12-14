import { cloudflare } from "@cloudflare/vite-plugin";
import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';
import { injectHtmlsPlugin } from './plugins/viteInjectHTMLlugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     injectHtmlsPlugin(),
     react({
       jsxImportSource: "@emotion/react",
     }),
     cloudflare()
    ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
    },
  },
  ssr: {
    target: "webworker",
  }
});
