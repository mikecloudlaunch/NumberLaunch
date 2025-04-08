// Custom build script for Vercel deployment
// Using ES modules syntax for Vercel compatibility
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("Starting custom build process...");

try {
  // Build the frontend from client directory
  console.log("Building frontend with Vite from client directory...");
  
  // Check if client directory exists
  if (!fs.existsSync('client')) {
    console.error("Error: 'client' directory not found!");
    process.exit(1);
  }
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Build frontend
  execSync('cd client && vite build', { stdio: 'inherit' });
  
  // Copy client/dist contents to root dist directory
  console.log("Copying built frontend files to root dist directory...");
  
  if (fs.existsSync('client/dist')) {
    // Copy all files from client/dist to root dist
    const clientDistFiles = fs.readdirSync('client/dist');
    for (const file of clientDistFiles) {
      const sourcePath = path.join('client/dist', file);
      const destPath = path.join('dist', file);
      
      // Check if it's a directory or file
      if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directory recursively
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        
        // Copy directory content recursively
        const copyDirRecursively = (src, dest) => {
          const entries = fs.readdirSync(src, { withFileTypes: true });
          
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
              if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
              }
              copyDirRecursively(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
              console.log(`Copied ${srcPath} to ${destPath}`);
            }
          }
        };
        
        // Start recursive copy
        copyDirRecursively(sourcePath, destPath);
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${sourcePath} to ${destPath}`);
      }
    }
  } else {
    console.error("Error: 'client/dist' directory not found after build!");
    process.exit(1);
  }
  
  // Build the server files
  console.log("Building server files with esbuild...");
  
  // Create necessary directories
  if (!fs.existsSync('dist/server')) {
    fs.mkdirSync('dist/server', { recursive: true });
  }
  if (!fs.existsSync('dist/shared')) {
    fs.mkdirSync('dist/shared', { recursive: true });
  }
  
  // Copy JS bridge files directly (they're already JavaScript)
  console.log("Copying JavaScript bridge files...");
  
  try {
    // Copy JS files for module resolution
    if (fs.existsSync('server/storage.js')) {
      fs.copyFileSync('server/storage.js', 'dist/server/storage.js');
      console.log("Copied server/storage.js");
    }
    
    if (fs.existsSync('server/routes.js')) {
      fs.copyFileSync('server/routes.js', 'dist/server/routes.js');
      console.log("Copied server/routes.js");
    }
    
    if (fs.existsSync('server/email.js')) {
      fs.copyFileSync('server/email.js', 'dist/server/email.js');
      console.log("Copied server/email.js");
    }
    
    if (fs.existsSync('shared/schema.js')) {
      fs.copyFileSync('shared/schema.js', 'dist/shared/schema.js');
      console.log("Copied shared/schema.js");
    }
  } catch (err) {
    console.error("Error copying bridge files:", err);
  }
  
  // Build TypeScript files
  console.log("Building TypeScript files with esbuild...");
  execSync('esbuild server/**/*.ts shared/**/*.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

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
  const serverlessFunction = `// Vercel Serverless Function
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

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
  console.log(\`[Vercel] Handling request: \${req.method} \${req.url}\`);
  
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