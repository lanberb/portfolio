# Cloudflare Pages デプロイメントガイド

このプロジェクトはCloudflare Pagesで動作するように構成されたReact + TypeScript + ViteのPOC（Proof of Concept）です。

## 🚀 デプロイ方法

### 前提条件

1. Cloudflareアカウント（無料でOK）
2. Node.js (v18以上推奨)
3. pnpm がインストールされていること

### オプション1: Wranglerを使用したコマンドラインデプロイ

1. **依存関係をインストール**
   ```bash
   pnpm install
   ```

2. **Cloudflareにログイン**
   ```bash
   npx wrangler login
   ```

3. **ビルドとデプロイ**
   ```bash
   pnpm run deploy
   ```
   
   または本番環境へ：
   ```bash
   pnpm run deploy:prod
   ```

### オプション2: Cloudflare Dashboardを使用したGitベースのデプロイ

1. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Add Cloudflare Pages configuration"
   git push origin main
   ```

2. **Cloudflare Dashboardでプロジェクトを作成**
   - [Cloudflare Dashboard](https://dash.cloudflare.com/) にアクセス
   - "Pages" セクションに移動
   - "Create a project" をクリック
   - GitHubリポジトリを接続

3. **ビルド設定を構成**
   - **Framework preset**: `Vite`
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Node version**: `20`

4. **デプロイ**
   - "Save and Deploy" をクリック
   - 以降、mainブランチへのプッシュで自動デプロイされます

## 📝 構成ファイル

### `wrangler.toml`
Cloudflare Pages/Workersの設定ファイルです。プロジェクト名や環境設定を管理します。

### `public/_redirects`
SPAルーティングのためのリダイレクト設定。すべてのルートを`index.html`にリダイレクトします。

### `vite.config.ts`
Viteのビルド設定。Cloudflare Pagesに最適化されています。

## 🔧 ローカル開発

```bash
# 開発サーバーを起動
pnpm dev

# ビルドをローカルでテスト
pnpm build
pnpm preview
```

## 📦 含まれる機能

- ✅ React 19 + TypeScript
- ✅ React Router によるSPAルーティング
- ✅ Emotion によるCSS-in-JS
- ✅ Three.js による3Dグラフィックス
- ✅ ダークモード対応
- ✅ レスポンシブデザイン
- ✅ Cloudflare Pagesでの本番稼働対応

## 🌐 環境変数（必要に応じて）

環境変数が必要な場合は、Cloudflare Dashboardの「Settings > Environment variables」から設定できます。

```bash
# .env.example を作成して必要な変数を記述
VITE_API_URL=https://api.example.com
```

## 🔗 有用なリンク

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Vite Documentation](https://vitejs.dev/)

## 📊 パフォーマンス

Cloudflare Pagesの利点：
- 世界中のエッジネットワークでの配信
- 自動HTTPS
- 無制限の帯域幅（無料プラン）
- 高速なビルドとデプロイ
- Git統合による自動デプロイ

## 🐛 トラブルシューティング

### ルーティングが正しく機能しない
- `public/_redirects` ファイルが正しくビルド出力に含まれているか確認
- SPAモードでReact Routerが正しく設定されているか確認

### ビルドエラー
```bash
# キャッシュをクリア
rm -rf node_modules dist
pnpm install
pnpm build
```

### デプロイエラー
```bash
# Wranglerを最新バージョンに更新
pnpm add -D wrangler@latest

# 再認証
npx wrangler logout
npx wrangler login
```
