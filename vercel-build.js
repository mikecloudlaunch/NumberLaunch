// This is a special build script for Vercel

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build command for the frontend first
console.log('Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// Make sure the output directory exists
if (!fs.existsSync('dist')) {
  console.log('Creating dist directory...');
  fs.mkdirSync('dist');
}

// Build the backend
console.log('Building backend...');
execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

// Create the api directory if it doesn't exist
if (!fs.existsSync('api')) {
  console.log('Creating api directory...');
  fs.mkdirSync('api');
}

// Create a serverless function entry point
console.log('Creating serverless function entry point...');
const serverlessFunction = `
// Vercel Serverless Function
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import path from 'path';

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

// Log the contents of the dist directory to verify what's there
console.log('Checking build outputs...');
try {
  console.log('Contents of dist directory:');
  const distContents = fs.readdirSync('dist');
  console.log(distContents);
  
  if (fs.existsSync('dist/index.html')) {
    console.log('✅ index.html exists in dist folder');
  } else {
    console.log('❌ index.html MISSING from dist folder');
  }
  
  if (fs.existsSync('dist/assets')) {
    console.log('✅ assets directory exists');
    console.log('Assets contents:');
    console.log(fs.readdirSync('dist/assets'));
  } else {
    console.log('❌ assets directory MISSING');
  }
} catch (err) {
  console.error('Error checking build outputs:', err);
}

console.log('Build completed successfully!');