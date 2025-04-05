// Custom build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("Starting custom build process...");

try {
  // Build the frontend
  console.log("Building frontend with Vite...");
  execSync('vite build', { stdio: 'inherit' });

  // Check if dist directory exists
  if (!fs.existsSync('dist')) {
    console.error("Error: 'dist' directory was not created during build!");
    process.exit(1);
  }

  // Check if index.html exists in dist
  if (!fs.existsSync(path.join('dist', 'index.html'))) {
    console.error("Error: 'index.html' is missing from dist directory!");
    process.exit(1);
  }

  // Create a redirect in root for Vercel
  console.log("Creating Vercel compatibility files...");
  const vercelConfigContent = `{
    "version": 2,
    "routes": [
      { "handle": "filesystem" },
      { "src": "/api/(.*)", "dest": "/api/index.js" },
      { "src": "/(.*)", "dest": "/index.html" }
    ]
  }`;
  
  // Write to dist directory for build
  fs.writeFileSync(path.join('dist', 'vercel.json'), vercelConfigContent);
  
  // Create an api directory if it doesn't exist
  if (!fs.existsSync('api')) {
    fs.mkdirSync('api');
  }
  
  // Create the serverless function for API
  const serverlessFunction = `
  // Vercel Serverless Function
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
  }`;
  
  fs.writeFileSync(path.join('api', 'index.js'), serverlessFunction);
  
  // Log success
  console.log("Build completed successfully!");
  
  // Log the contents of the dist directory
  console.log("Contents of dist directory:");
  const distContents = fs.readdirSync('dist');
  console.log(distContents);
  
  if (fs.existsSync('dist/assets')) {
    console.log("Contents of dist/assets directory:");
    const assetContents = fs.readdirSync('dist/assets');
    console.log(assetContents);
  }
  
} catch (error) {
  console.error("Build process failed:", error);
  process.exit(1);
}