import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import path from "path";
import { type PluginOption, defineConfig } from 'vite';
import { viteInjectSvgPlugin } from './plugins/viteInjectSvgPlugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteInjectSvgPlugin(),
     react() as PluginOption,
     cloudflare() as PluginOption,
    ],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "src/client/main.tsx"),
    },
    ssr: "./src/server/main.tsx",
  },
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
