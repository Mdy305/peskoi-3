#!/bin/bash

echo "🔧 Installing dependencies..."
npm install

echo "🧼 Running ESLint autofix and removing unused code..."
npx eslint src --fix
npx eslint src --rule 'no-unused-vars: ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]'
#!/bin/bash

echo "🚀 MMA SALON – FULL AUTO DEBUG STARTED"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_DIR="./debug-logs"
LOG_FILE="$LOG_DIR/debug_$TIMESTAMP.log"

mkdir -p "$LOG_DIR"

echo "🔧 Step 1: Installing dependencies..."
npm install >> "$LOG_FILE" 2>&1

echo "🔍 Step 2: Auditing for vulnerabilities..."
npm audit fix >> "$LOG_FILE" 2>&1

echo "🧼 Step 3: Running ESLint autofix..."
npx eslint src --fix >> "$LOG_FILE" 2>&1

echo "🧹 Step 4: Removing unused imports + vars..."
npx eslint src --rule 'no-unused-vars: ["error", { "vars": "all", "args": "after-used" }]' --fix >> "$LOG_FILE" 2>&1

echo "✨ Step 5: Running Prettier formatting..."
npx prettier --write src >> "$LOG_FILE" 2>&1

echo "🔐 Step 6: Escaping JSX special characters..."
find ./src -name "*.jsx" -print0 | while IFS= read -r -d '' file; do
  sed -i '' 's/"/&quot;/g' "$file"
done

echo "🔧 Step 7: Building the app..."
npm run build >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
  echo "✅ Build successful. Launching dev server..."
  npm run dev
else
  echo "❌ Build failed. Showing error log:"
  tail -n 30 "$LOG_FILE"
  echo "📄 Full log available at $LOG_FILE"
fi
