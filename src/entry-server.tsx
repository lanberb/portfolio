import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import App from "./components/app/App";

export async function render(url: string) {
  // Emotionのキャッシュを作成
  const cache = createCache({ key: "css" });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // アプリをレンダリング
  const html = renderToString(
    <StrictMode>
      <CacheProvider value={cache}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </CacheProvider>
    </StrictMode>
  );

  // Emotionのクリティカルスタイルを抽出
  const chunks = extractCriticalToChunks(html);
  const css = constructStyleTagsFromChunks(chunks);

  return { html, css };
}