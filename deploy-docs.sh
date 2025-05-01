#!/bin/bash

# Variables
SOURCE_REPO="git@github.com:Datanexions/datanexions-docs.git"
TARGET_REPO="git@github.com:Datanexions/documentation.git"
TMP_DIR="/tmp/docusaurus-deploy-$$"
BUILD_DIR="build"
BUILD_DIR_ABS="$(pwd)/$BUILD_DIR"

# Step 1: Build the Docusaurus site
echo "🛠  Build Docusaurus site..."
npm run build

# Step 2: Clone the target GitHub Pages repo
echo "🚚 Cloning target GitHub Pages repo..."
git clone "$TARGET_REPO" "$TMP_DIR"

# Step 3: Copy generated files
echo "⚙️  Copying built site to target repo..."
cd "$TMP_DIR" || exit 1
rm -rf *
cp -r "$BUILD_DIR_ABS"/* ./

# Step 4: Commit and push
echo "📦 Committing and pushing..."
git config user.name "Your Name"
git config user.email "your.email@example.com"
git add --all
git commit -m "Deploy site: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Deployment complete: https://datanexions.github.io"