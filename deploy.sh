#!/bin/bash
# Fitness App - Deployment to Render.com

echo "🚀 Fitness App Live Hosting Setup"
echo "=================================="
echo ""

# Check if git is configured
echo "Checking Git configuration..."
git config user.name > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Git not configured. Please run:"
  echo "   git config --global user.name 'Your Name'"
  echo "   git config --global user.email 'your@email.com'"
  exit 1
fi

# Stage changes
echo ""
echo "📦 Staging changes..."
git add -A
git status

# Commit changes
echo ""
echo "📝 Creating deployment commit..."
git commit -m "Add live hosting configuration for Render.com deployment

- Add production environment configuration
- Update API configuration for multi-environment support
- Add Render.yaml deployment manifest
- Update client pages to use environment variables
- Add comprehensive hosting guide

Ready for deployment to Render.com"

# Display next steps
echo ""
echo "✅ Changes committed!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub:"
echo "   git push origin master"
echo ""
echo "2. Go to https://render.com"
echo "3. Sign in with GitHub"
echo "4. Deploy Backend Service"
echo "5. Deploy Frontend Service"
echo ""
echo "📖 See LIVE_HOSTING_GUIDE.md for detailed instructions"
echo ""
