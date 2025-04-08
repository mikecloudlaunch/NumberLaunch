#!/bin/bash
# Custom build script for Vercel deployment

echo "Starting custom build process..."

# Build the frontend
echo "Building frontend with Vite..."
npm run build

# Create a .vercel/output directory structure
echo "Creating Vercel output structure..."
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions/api

# Copy all static assets from dist to .vercel/output/static
echo "Copying static assets..."
cp -r dist/* .vercel/output/static/

# Create the serverless API function
echo "Creating API function..."
cat > .vercel/output/functions/api.js << 'EOF'
import express from 'express';
import { registerRoutes } from '../server/routes.js';

// Create Express app for serverless function
const app = express();
app.use(express.json());

// Register API routes
registerRoutes(app);

// This file acts as an entry point for Vercel serverless functions
export default function handler(req, res) {
  // Forward the request to our Express app
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
EOF

# Create a Vercel output config
echo "Creating Vercel output config..."
cat > .vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    { "src": "/api/(.*)", "dest": "/api" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOF

echo "Build process completed"