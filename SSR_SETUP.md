# SSR設定ガイド - /blogページのみSSR

このプロジェクトでは、Vite + React + emotionで **特定のページ（/blog）のみSSR** を実現しています。

## 🎯 実装内容

### SSR対象ページ
- `/blog` - サーバーサイドレンダリング（SSR）
- その他のページ（`/`, `/about` など） - 通常のSPA

## 📁 追加ファイル

### 1. `server.js`
開発用SSRサーバー。`/blog`ページのみSSRし、それ以外はSPAとして提供します。

```javascript
const SSR_ROUTES = ['/blog']  // SSR対象のルートを指定
```

### 2. `src/entry-server.tsx`
サーバーサイドのエントリーポイント。
- React DOMのサーバーレンダリング
- emotionのクリティカルCSSの抽出
- StaticRouterを使用してSSR対応

### 3. `index.html` (修正)
SSR用のプレースホルダーを追加：
- `<!--app-head-->` - emotionのCSSが挿入される
- `<!--app-html-->` - レンダリング済みHTMLが挿入される

### 4. `src/components/app/main.tsx` (修正)
ハイドレーション対応：
- SSR済みコンテンツがある場合は `hydrateRoot` を使用
- ない場合は通常の `createRoot` を使用

## 🚀 使い方

### 開発サーバー起動（SSR有効）
```bash
pnpm run dev
```
http://localhost:5173 でアクセス

- `/blog` にアクセス → **SSRされたHTML**が返される
- `/` や `/about` にアクセス → 通常のSPAとして動作

### 通常のSPA開発サーバー（SSR無効）
```bash
pnpm run dev:spa
```

### 本番ビルド（SSR対応）
```bash
pnpm run build:ssr
```

これで以下が生成されます：
- `dist/client/` - クライアント用ビルド
- `dist/server/` - サーバー用ビルド

### 本番サーバー起動
```bash
pnpm start
```
http://localhost:3000 でアクセス

### 通常のSPAビルド（SSR無効）
```bash
pnpm run build
```

## 🔧 SSR対象ページの追加方法

`server.js`の`SSR_ROUTES`配列に追加：

```javascript
const SSR_ROUTES = [
  '/blog',
  '/about',      // aboutページもSSRする場合
  '/products',   // productsページもSSRする場合
]
```

## 💡 技術詳細

### emotionとSSRの統合
1. サーバー側で`@emotion/cache`を使ってスタイルを収集
2. `@emotion/server`でクリティカルCSSを抽出
3. HTMLに`<style>`タグとして注入
4. クライアント側でハイドレーション時にスタイルを再利用

### ルーティング
- サーバー側：`StaticRouter`（react-router-dom/server）
- クライアント側：`BrowserRouter`（react-router-dom）

## 📦 追加された依存関係

```json
{
  "dependencies": {
    "@emotion/cache": "^11.14.0",
    "@emotion/server": "^11.11.0",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.3"
  }
}
```

## ⚠️ 注意点

1. **サーバー専用コード**: `window`や`document`などのブラウザAPIは`/blog`ページでは条件付きで使用してください
   ```tsx
   if (typeof window !== 'undefined') {
     // ブラウザ専用コード
   }
   ```

2. **useEffect**: データフェッチングなどは`useEffect`内で行えばクライアント側のみ実行されます

3. **動的インポート**: 必要に応じて`React.lazy`で遅延ロード可能

## 🎨 emotion スタイルの動作

- **SSR時**: サーバーでレンダリングされたHTMLに`<style>`タグが含まれる
- **ハイドレーション時**: 既存のスタイルを再利用し、重複を防ぐ
- **CSR時**（SPA）: 通常通りクライアントでスタイルを注入