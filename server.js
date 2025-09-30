import fs from 'node:fs/promises'
import express from 'express'
import { createServer as createViteServer } from 'vite'

// SSR対象のルート（/blogのみ）
const SSR_ROUTES = ['/blog']

async function createServer() {
  const app = express()

  // Vite開発サーバーをミドルウェアモードで作成
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // /blogページのみSSR、その他はSPAとして提供
      if (!SSR_ROUTES.some(route => url.startsWith(route))) {
        // SPA用のHTMLを返す
        let template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
        return
      }

      // SSR用の処理
      let template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      // サーバーサイドエントリーを読み込み
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // アプリをレンダリング
      const { html: appHtml, css } = await render(url)

      // emotionのCSSを注入
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-head-->`, `<style data-emotion>${css}</style>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log('Server running at http://localhost:5173')
  })
}

createServer()