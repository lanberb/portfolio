import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import App from "../components/app/App";

const app = new Hono();

app.get("*", async (c) => {
  // React アプリをSSRでレンダリング
  const appHtml = renderToString(
    <App />
  );

  // HTMLテンプレートを返す
  const html = `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/common/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lanberb</title>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <div id="icons" style="display: none;"></div>
    <script type="module" src="/src/client/main.tsx"></script>
  </body>
</html>
  `.trim();

  return c.html(html);
});

export default app;
