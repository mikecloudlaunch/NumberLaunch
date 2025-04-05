#!/bin/bash

# Add your changes
git add build-vercel.js server/storage.js server/email.js server/routes.js shared/schema.js

# Commit with proper author
git commit -m "Fix: Improve module resolution for Vercel deployment" --author="Mike CloudLaunch <mike@cloudlaunch.au>"

echo "Changes committed. Now push these changes to GitHub:"
echo "git push origin main"
