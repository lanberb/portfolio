# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# pnpmのインストール
RUN npm install -g pnpm

# 依存関係のインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ソースコードのコピーとビルド
COPY . .
RUN pnpm run build

# 本番ステージ
FROM node:20-alpine AS production

WORKDIR /app

# pnpmのインストール
RUN npm install -g pnpm

# 本番用の依存関係のみインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile && \
    pnpm add express

# ビルド成果物とサーバーファイルのコピー
COPY --from=builder /app/dist ./dist
COPY server.js ./

# ポート公開
EXPOSE 3000

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

# アプリケーション起動
CMD ["node", "server.js"]
