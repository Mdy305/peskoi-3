#!/bin/bash

echo "🚀  Starting FULL Peskoi Autobuild + Deployment"
echo "----------------------------------------------"

# STEP 1: FIX .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.vercel
.DS_Store
EOF

echo "✅ .gitignore fixed"

# STEP 2: RESET GIT INDEX
echo "🧹 Cleaning Git index..."
git rm -r --cached . >/dev/null 2>&1

# STEP 3: ADD ALL FILES
echo "📦 Adding project files..."
git add .

# STEP 4: COMMIT
echo "📝 Creating commit..."
git commit -m "Auto-deploy: full clean build and push" >/dev/null 2>&1

# STEP 5: FORCE PUSH to GitHub
echo "⬆️  Pushing to GitHub (main branch)..."
git push --force origin main

# STEP 6: DEPLOY TO VERCEL
echo "🌐 Deploying to Vercel production..."
vercel --prod --force

echo "----------------------------------------------"
echo "🎉 Deployment Finished!"
echo "Visit your production URL above."
echo "----------------------------------------------"
