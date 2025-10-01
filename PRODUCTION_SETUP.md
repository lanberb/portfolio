# Vite 本番環境セットアップガイド

このドキュメントは、Viteアプリケーションを本番環境で動かすためのPOC（概念実証）の手順を説明します。

## 📋 構成

- **Node.js + Express**: ビルド済みの静的ファイルを配信
- **Docker**: コンテナ化による環境の統一
- **Nginx** (オプション): リバースプロキシとしての利用

## 🚀 クイックスタート

### 方法1: Docker Compose（推奨）

```bash
# アプリケーションのビルドと起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d --build

# 停止
docker-compose down
```

アクセス: http://localhost:3000

### 方法2: Docker Compose + Nginx

```bash
# Nginxをリバースプロキシとして使用
docker-compose -f docker-compose.nginx.yml up --build -d

# 停止
docker-compose -f docker-compose.nginx.yml down
```

アクセス: http://localhost

### 方法3: ローカルビルド + Node.js

```bash
# 依存関係のインストール
pnpm install

# Expressの追加
pnpm add express

# ビルド
pnpm run build

# サーバー起動
node server.js
```

アクセス: http://localhost:3000

## 📁 ファイル構成

```
.
├── server.js                    # 本番用Node.jsサーバー
├── Dockerfile                   # Dockerイメージ定義
├── docker-compose.yml           # Docker Compose設定（基本）
├── docker-compose.nginx.yml     # Docker Compose設定（Nginx付き）
├── nginx.conf                   # Nginx設定ファイル
└── .dockerignore               # Docker除外ファイル
```

## 🔍 機能

### ヘルスチェックエンドポイント

```bash
curl http://localhost:3000/health
```

レスポンス例:
```json
{
  "status": "ok",
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

### SPA ルーティング

すべてのルート（`/*`）は自動的に`index.html`にフォールバックされ、React Routerが適切に動作します。

## 🛠️ カスタマイズ

### ポート変更

**docker-compose.yml**:
```yaml
ports:
  - "8080:3000"  # ホストのポート8080を使用
```

または環境変数で:
```bash
PORT=8080 node server.js
```

### 環境変数

`.env`ファイルを作成:
```env
NODE_ENV=production
PORT=3000
```

## 📊 本番環境のベストプラクティス

### 1. セキュリティ

- 定期的なセキュリティパッチの適用
- HTTPSの使用（Let's Encryptなど）
- セキュリティヘッダーの設定（Nginxが対応済み）

### 2. パフォーマンス

- gzip圧縮の有効化（Nginxが対応済み）
- 静的ファイルのキャッシュ設定
- CDNの利用（CloudFlare、AWS CloudFrontなど）

### 3. モニタリング

- ヘルスチェックの設定（実装済み）
- ログの集約（ELK Stack、CloudWatch Logsなど）
- メトリクスの収集（Prometheus、DataDogなど）

### 4. スケーリング

Kubernetes用のデプロイメント例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vite-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vite-app
  template:
    metadata:
      labels:
        app: vite-app
    spec:
      containers:
      - name: vite-app
        image: your-registry/vite-app:latest
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

## 🧪 テスト

### ローカルでのビルド確認

```bash
# ビルド
pnpm run build

# ビルド成果物の確認
ls -la dist/

# プレビュー（開発用）
pnpm run preview
```

### Docker イメージのビルド確認

```bash
# イメージのビルド
docker build -t vite-app:test .

# イメージサイズの確認
docker images vite-app:test

# コンテナの起動
docker run -p 3000:3000 vite-app:test
```

## 🔧 トラブルシューティング

### ビルドエラー

```bash
# 依存関係のクリーンインストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### Docker ビルドエラー

```bash
# キャッシュなしでビルド
docker-compose build --no-cache

# ログの確認
docker-compose logs -f vite-app
```

### ポートが使用中

```bash
# プロセスの確認
lsof -i :3000

# Dockerコンテナの停止
docker-compose down
```

## 📝 次のステップ

1. **CI/CDパイプラインの構築**
   - GitHub Actions、GitLab CI、CircleCIなど

2. **クラウドデプロイ**
   - AWS (ECS, Fargate, EC2)
   - GCP (Cloud Run, GKE)
   - Azure (Container Instances, AKS)

3. **ドメインとSSL**
   - ドメインの設定
   - SSL証明書の取得と設定

4. **バックエンドAPI連携**
   - 環境変数でのAPI URLの管理
   - CORSの設定

## 📚 参考リンク

- [Vite Documentation](https://vitejs.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
