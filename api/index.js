// Vercel Serverless Function
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import path from 'path';
import fs from 'fs';

// Create Express app for serverless function
const app = express();
app.use(express.json());

// Register API routes
registerRoutes(app);

// Serve static files from the dist directory if running in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist');
  
  // Check if dist directory exists
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    
    // Serve index.html for any non-api routes (SPA fallback)
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }
}

// This file acts as an entry point for Vercel serverless functions
export default function handler(req, res) {
  // Log the request for debugging
  console.log(`[Vercel] Handling request: ${req.method} ${req.url}`);
  
  // Forward the request to our Express app
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}