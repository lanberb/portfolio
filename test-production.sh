#!/bin/bash

# Vite本番環境テストスクリプト

set -e

echo "🧪 Vite本番環境テスト開始..."
echo ""

# カラー出力
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: 依存関係の確認
echo -e "${YELLOW}Step 1: 依存関係の確認...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
else
    echo -e "${RED}✗ Node.jsがインストールされていません${NC}"
    exit 1
fi

if command -v pnpm &> /dev/null; then
    echo -e "${GREEN}✓ pnpm: $(pnpm --version)${NC}"
else
    echo -e "${RED}✗ pnpmがインストールされていません${NC}"
    exit 1
fi

if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker: $(docker --version)${NC}"
else
    echo -e "${YELLOW}⚠ Dockerがインストールされていません（オプション）${NC}"
fi

echo ""

# Step 2: ビルドテスト
echo -e "${YELLOW}Step 2: アプリケーションのビルド...${NC}"
if [ ! -d "node_modules" ]; then
    echo "依存関係をインストール中..."
    pnpm install
fi

pnpm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ ビルド成功${NC}"
    echo "ビルド成果物:"
    ls -lh dist/
else
    echo -e "${RED}✗ ビルド失敗${NC}"
    exit 1
fi

echo ""

# Step 3: サーバーファイルの確認
echo -e "${YELLOW}Step 3: サーバーファイルの確認...${NC}"
if [ -f "server.js" ]; then
    echo -e "${GREEN}✓ server.js が存在します${NC}"
else
    echo -e "${RED}✗ server.js が見つかりません${NC}"
    exit 1
fi

echo ""

# Step 4: Expressのインストール確認
echo -e "${YELLOW}Step 4: Express依存関係の確認...${NC}"
if pnpm list express &> /dev/null; then
    echo -e "${GREEN}✓ Expressがインストールされています${NC}"
else
    echo -e "${YELLOW}⚠ Expressをインストール中...${NC}"
    pnpm add express
    echo -e "${GREEN}✓ Expressのインストール完了${NC}"
fi

echo ""

# Step 5: Dockerファイルの確認
echo -e "${YELLOW}Step 5: Dockerファイルの確認...${NC}"
if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✓ Dockerfile が存在します${NC}"
fi

if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✓ docker-compose.yml が存在します${NC}"
fi

if [ -f "docker-compose.nginx.yml" ]; then
    echo -e "${GREEN}✓ docker-compose.nginx.yml が存在します${NC}"
fi

echo ""

# Step 6: テスト起動
echo -e "${YELLOW}Step 6: ローカルサーバーテスト（5秒間）...${NC}"
node server.js &
SERVER_PID=$!

sleep 3

# ヘルスチェック
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✓ サーバーが正常に起動しました${NC}"
    echo "ヘルスチェック結果:"
    curl -s http://localhost:3000/health | json_pp || curl -s http://localhost:3000/health
else
    echo -e "${RED}✗ サーバーの起動に失敗しました${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# サーバー停止
kill $SERVER_PID 2>/dev/null || true
sleep 1

echo ""
echo -e "${GREEN}✅ すべてのテストが完了しました！${NC}"
echo ""
echo "次のステップ:"
echo "  1. ローカル起動:        pnpm start"
echo "  2. Docker起動:         pnpm run docker:up:build"
echo "  3. Docker + Nginx:     pnpm run docker:nginx:up"
echo ""
echo "詳細は PRODUCTION_SETUP.md を参照してください。"
