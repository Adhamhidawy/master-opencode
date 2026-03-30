#!/bin/bash
set -e

echo "=== Deploy Master OpenCode to GitHub Pages ==="

REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || echo "")

if [ -z "$REPO_DIR" ]; then
  echo "Initializing git repo..."
  git init
  REPO_DIR=$(pwd)
fi

BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if git remote | grep -q "^origin$"; then
  REMOTE=$(git remote get-url origin)
  echo "Remote: $REMOTE"
else
  echo ""
  echo "No remote configured."
  echo "Create a repo on GitHub, then run:"
  echo "  git remote add origin https://github.com/adhamhidawy/master-opencode.git"
  echo "  ./deploy.sh"
  exit 1
fi

echo "Deploying from branch: $BRANCH"
echo ""

if ! git diff --quiet HEAD -- index.html 2>/dev/null || [ -z "$(git log --oneline -1 2>/dev/null)" ]; then
  echo "Committing changes..."
  git add index.html deploy.sh
  git commit -m "Update Master OpenCode site" || true
fi

echo "Pushing to origin/$BRANCH..."
git push -u origin "$BRANCH" 2>/dev/null || git push origin "$BRANCH"

if command -v gh &>/dev/null; then
  echo ""
  echo "Creating GitHub Pages deployment via gh CLI..."
  gh api "repos/{owner}/{repo}/pages" -f source.branch="$BRANCH" -f source.path="/" 2>/dev/null || \
  echo "Pages may already be configured. Check your repo settings."
  echo ""
  echo "Your site will be live at:"
  gh api "repos/{owner}/{repo}/pages" --jq '.html_url' 2>/dev/null || echo "https://adhamhidawy.github.io/master-opencode/"
else
  echo ""
  echo "gh CLI not found. To enable GitHub Pages:"
  echo "1. Go to your repo on GitHub"
  echo "2. Settings -> Pages"
  echo "3. Source: Deploy from branch -> $BRANCH -> / (root)"
  echo "4. Save"
fi

echo ""
echo "Done!"
