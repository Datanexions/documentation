#!/bin/bash

set -e

echo "🛠  Building Docusaurus site..."

npm run build

echo "🚀 Publishing to GitHub Pages (gh-pages branch)..."

npx gh-pages -d build -b gh-pages

echo "✅ Done. Site published at: https://datanexions.github.io/documentation/"