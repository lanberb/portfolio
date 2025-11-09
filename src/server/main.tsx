import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

app.get(
  "*",
  serveStatic({
    root: "./dist",
    manifest: "",
  }),
);

export default app;
