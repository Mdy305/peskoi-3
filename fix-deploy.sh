#!/bin/bash

echo "🧼 Auto-fixing code..."
npm run fix
npm run format

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "🚀 Launching dev server..."
  npm run dev
else
  echo "❌ Build failed. Check code in src/pages/index.jsx for syntax issues."
fi
