#!/bin/bash

echo "🧼 Running ESLint auto-fix..."
npx eslint . --fix

echo "✅ ESLint fix complete."

echo "📂 Opening project folder..."
code .
