// This is a special build script for Vercel

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build command
console.log('Building frontend...');
execSync('vite build', { stdio: 'inherit' });

console.log('Building backend...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

// Create the api directory if it doesn't exist
if (!fs.existsSync('api')) {
  fs.mkdirSync('api');
}

// Create a serverless function entry point
console.log('Creating serverless function entry point...');
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
}
`;

fs.writeFileSync(path.join('api', 'index.js'), serverlessFunction);

console.log('Build completed successfully!');