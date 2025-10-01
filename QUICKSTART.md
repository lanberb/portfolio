# 🚀 Cloudflare Pages POC - クイックスタート

## 即座にデプロイする方法

### ステップ 1: 依存関係をインストール
```bash
pnpm install
```

### ステップ 2: ローカルでテスト（オプション）
```bash
pnpm dev
# ブラウザで http://localhost:5173 を開く
```

### ステップ 3: ビルド
```bash
pnpm build
```

### ステップ 4: Cloudflareにデプロイ

#### 方法A: Wranglerを使用（コマンドライン）
```bash
# 初回のみ：Cloudflareにログイン
npx wrangler login

# デプロイ
pnpm run deploy
```

#### 方法B: GitHubとダッシュボードを使用
1. GitHubにプッシュ
   ```bash
   git add .
   git commit -m "Setup Cloudflare Pages"
   git push origin main
   ```

2. [Cloudflare Dashboard](https://dash.cloudflare.com/)にアクセス

3. **Pages** → **Create a project** → **Connect to Git**

4. リポジトリを選択して以下を設定：
   - **Framework preset**: Vite
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   
5. **Save and Deploy** をクリック

## ✅ 完了！

数分後、あなたのアプリケーションが Cloudflare のグローバルネットワークで公開されます。

デプロイ後、以下のような URL が生成されます：
```
https://portfolio-poc.pages.dev
```

## 📁 プロジェクト構成

```
/workspace
├── dist/                    # ビルド出力（自動生成）
│   ├── _redirects          # SPAルーティング設定
│   ├── index.html
│   └── assets/
├── public/                  # 静的ファイル
│   ├── _redirects          # ソース（ビルド時にdistへコピー）
│   └── assets/
├── src/                     # ソースコード
│   ├── components/
│   ├── lib/
│   └── styles/
├── wrangler.toml           # Cloudflare設定
├── cloudflare-pages.json   # Pages詳細設定
├── vite.config.ts          # Viteビルド設定
└── package.json            # 依存関係とスクリプト
```

## 🔧 利用可能なスクリプト

```bash
pnpm dev              # 開発サーバー起動
pnpm build            # 本番ビルド
pnpm preview          # ビルドをローカルでプレビュー
pnpm deploy           # Cloudflareにデプロイ
pnpm deploy:prod      # 本番環境にデプロイ
pnpm lint             # コードチェック
```

## 🌐 主な機能

- ✅ **React 19** + TypeScript
- ✅ **React Router** によるSPAルーティング
- ✅ **Emotion** でスタイリング
- ✅ **Three.js** 3Dグラフィックス対応
- ✅ **ダークモード** 対応
- ✅ **Cloudflare Pages** 完全対応
- ✅ **自動HTTPS** & グローバルCDN

## 🐛 よくある質問

### Q: ビルドエラーが出る
```bash
# キャッシュクリア
rm -rf node_modules dist
pnpm install
pnpm build
```

### Q: ルーティングが動かない
- `public/_redirects` ファイルがあることを確認
- ビルド後 `dist/_redirects` に含まれていることを確認

### Q: デプロイできない
```bash
# Wranglerを再インストール
pnpm add -D wrangler@latest

# 再認証
npx wrangler logout
npx wrangler login
```

## 📚 詳細ドキュメント

より詳しい情報は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

---

**Happy Deploying! 🎉**
