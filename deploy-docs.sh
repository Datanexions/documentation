#!/usr/bin/env bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm use 18
echo "🛠  Building Docusaurus site..."
npm run build

tar -cvf docs.tar -C ./build .
echo "🚀 Publishing to docs.datanexions.com"
scp docs.tar docs.datanexions.com:/tmp/

ssh docs.datanexions.com "
set -e
sudo systemctl stop streamsf
echo "Removing old documentation files..."
sudo rm -rf /usr/share/nginx/docusaurus/*
echo "Extracting documentation archive..."
sudo tar --warning=no-unknown-keyword -xf /tmp/docs.tar -C /usr/share/nginx/docusaurus
sudo chown -R root:root /usr/share/nginx/docusaurus
echo "Starting nginx service..."
sudo systemctl restart nginx
"

echo "✅ Done. Site published at: https://docs.datanexions.com"