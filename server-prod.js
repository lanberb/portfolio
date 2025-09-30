import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// SSR対象のルート（/blogのみ）
const SSR_ROUTES = ['/blog']

async function createServer() {
  const app = express()

  // 本番環境用の静的ファイル配信
  app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // /blogページのみSSR、その他はSPAとして提供
      if (!SSR_ROUTES.some(route => url.startsWith(route))) {
        // SPA用のHTMLを返す
        const template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        )
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
        return
      }

      // SSR用の処理
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )

      // サーバーサイドエントリーを読み込み
      const { render } = await import('./dist/server/entry-server.js')

      // アプリをレンダリング
      const { html: appHtml, css } = await render(url)

      // emotionのCSSを注入
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-head-->`, css)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

createServer()