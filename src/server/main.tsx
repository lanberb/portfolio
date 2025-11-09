import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

app.get(
  "*",
  serveStatic({
    root: "./dist",
    manifest: "./dist/portfolio/.vite/manifest.json",
  }),
);

export default app;
