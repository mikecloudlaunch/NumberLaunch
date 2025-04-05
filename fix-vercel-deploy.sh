#!/bin/bash

# Add your changes
git add vercel.json

# Commit with proper author
git commit -m "Fix: Remove ignoreCommand that was canceling builds" --author="Mike CloudLaunch <mike@cloudlaunch.au>"

echo "Changes committed. Now push these changes to GitHub:"
echo "git push origin main"
