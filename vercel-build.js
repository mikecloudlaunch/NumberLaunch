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
  
  console.log("\n=== VERCEL BUILD PROCESS COMPLETED SUCCESSFULLY ===");
} catch (error) {
  console.error('\nERROR running build script:', error);
  process.exit(1);
}