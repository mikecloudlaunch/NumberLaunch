// Enhanced script to invoke the build-vercel.js script for Vercel deployment
// Using ES modules syntax for Vercel compatibility

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("=== VERCEL BUILD PROCESS STARTING ===");
console.log("Current directory:", process.cwd());
console.log("Node version:", process.version);
console.log("Files in current directory:", fs.readdirSync('.').join(', '));

try {
  // Make sure we have the build script
  if (!fs.existsSync('build-vercel.js')) {
    console.error('ERROR: build-vercel.js not found!');
    process.exit(1);
  }

  // Run the main build script with ESM mode enabled
  console.log("\nRunning build-vercel.js as ESM module...");
  // Use --experimental-json-modules flag to ensure JSON import works
  execSync('node --experimental-json-modules build-vercel.js', { stdio: 'inherit' });
  
  // Verify dist directory was created
  if (!fs.existsSync('dist')) {
    console.error('ERROR: dist directory was not created!');
    process.exit(1);
  }
  
  // Verify that index.html exists in the dist directory
  if (!fs.existsSync(path.join('dist', 'index.html'))) {
    console.error('ERROR: index.html is missing from dist directory!');
    // Check if it's in client/dist instead
    if (fs.existsSync(path.join('client', 'dist', 'index.html'))) {
      console.log("\nFound index.html in client/dist, copying to dist directory...");
      fs.copyFileSync(
        path.join('client', 'dist', 'index.html'),
        path.join('dist', 'index.html')
      );
      console.log("Copied index.html to dist directory");
    } else {
      console.error('FATAL: Could not find index.html in client/dist either!');
      process.exit(1);
    }
  }
  
  // Copy the api directory content to dist/api for completeness
  if (fs.existsSync('api')) {
    console.log("\nCopying API files to dist/api...");
    if (!fs.existsSync('dist/api')) {
      fs.mkdirSync('dist/api', { recursive: true });
    }
    
    const apiFiles = fs.readdirSync('api');
    for (const file of apiFiles) {
      if (file.endsWith('.js')) {
        fs.copyFileSync(
          path.join('api', file),
          path.join('dist/api', file)
        );
        console.log(`Copied api/${file} to dist/api/${file}`);
      }
    }
  }
  
  // Log the contents of the dist directory for debugging
  console.log("\nContents of dist directory:");
  if (fs.existsSync('dist')) {
    const distContents = fs.readdirSync('dist');
    console.log(distContents);
  }
  
  console.log("\n=== VERCEL BUILD PROCESS COMPLETED SUCCESSFULLY ===");
} catch (error) {
  console.error('\nERROR running build script:', error);
  process.exit(1);
}