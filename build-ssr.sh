#!/bin/bash

# SSRビルドスクリプト

echo "Building client..."
vite build --outDir dist/client

echo "Building server..."
vite build --ssr src/entry-server.tsx --outDir dist/server

echo "Build complete!"
echo "To run: node server-prod.js"