#!/bin/bash

# Comprehensive script to fix Vercel deployment issues
# Created for NumberLaunch project

echo "NumberLaunch Vercel Deployment Fix"
echo "=================================="
echo 

# 1. Make sure git author is configured
echo "Setting up Git author information..."
git config --global user.name "Mike CloudLaunch"
git config --global user.email "mike@cloudlaunch.au"

# 2. Add all the changes to git
echo "Adding deployment changes to git..."
git add build-vercel.js vercel-build.js server/storage.js server/email.js server/routes.js shared/schema.js vercel.json api/index.js build-vercel.package.json

# 3. Commit with the proper author
echo "Committing changes with proper author information..."
git commit -m "Fix: Improve module resolution and deployment configuration for Vercel" --author="Mike CloudLaunch <mike@cloudlaunch.au>"

# 4. Provide instructions for the next steps
echo 
echo "DEPLOYMENT INSTRUCTIONS:"
echo "======================="
echo "1. Push these changes to GitHub:"
echo "   git push origin main"
echo 
echo "2. Go to Vercel and deploy from the main branch"
echo "   Make sure to set NODE_ENV=production in your Environment Variables"
echo
echo "3. If you encounter any issues, check the function logs in the Vercel dashboard"
echo 

