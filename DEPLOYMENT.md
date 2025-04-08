# NumberLaunch Deployment Guide  

This guide addresses specific issues with deploying NumberLaunch to Vercel and provides solutions.

## Key Deployment Issues & Solutions

### 1. Git Author Verification

**Problem**: Commits made in Replit may have different author information than your GitHub account, causing verification issues.

**Solution**:
- Make critical deployment-related changes directly through GitHub web interface
- These commits will be automatically verified with your GitHub profile picture

### 2. Ignored Build Step Problem

**Problem**: The deployment fails with an error: "Deployment has been canceled as a result of running the command defined in the 'Ignored Build Step' setting."

**Solution**:
- Remove the `ignoreCommand` parameter from vercel.json
- Configure Vercel project settings to use automatic detection for ignored builds

### 3. Deployment Project Setup

For a successful deployment:

1. In the Vercel dashboard, create a new project
2. Import your GitHub repository
3. Configure the following settings:
   - Build Command: `node build-vercel.js`
   - Output Directory: `dist`
   - Root Directory: `.` (default)
   - Install Command: `npm install`

4. Add these environment variables:
   - `NODE_ENV`: `production`
   - `VITE_RECAPTCHA_SITE_KEY`: Your Google reCAPTCHA site key
   - `RECAPTCHA_SECRET_KEY`: Your Google reCAPTCHA secret key
   - `SENDGRID_API_KEY`: Your SendGrid API key

5. Deploy with these settings

## Key Deployment Files

The deployment relies on three critical files:

1. **vercel.json** - Configures routing and project settings
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "build-vercel.js",
      "use": "@vercel/node",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    { 
      "src": "/api(.*)", 
      "dest": "/api/index.js" 
    },
    {
      "handle": "filesystem"
    },
    { 
      "src": "/(.*)", 
      "dest": "/api/index.js" 
    }
  ],
  "github": {
    "silent": false,
    "autoJobCancelation": false,
    "enabled": true
  },
  "git": {
    "deploymentEnabled": {
      "main": true,
      "NL": true
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **build-vercel.js** - Custom build script that creates the distribution files
3. **api/index.js** - Serverless function that handles API requests and serves static content

## Troubleshooting Tips

If you encounter issues:

1. **Check Deployment Logs**: Look for errors in the Vercel deployment logs
2. **Verify Git Commits**: Ensure commits have green checkmarks or profile pictures in GitHub
3. **Test Locally**: Run `node build-vercel.js` locally to test the build process
4. **Check Environment Variables**: Verify all required environment variables are set
5. **Clean Build Cache**: Try clearing the Vercel build cache and redeploying

## Quick Fix for Canceled Deployments

If deployment is still being canceled:

1. Check Vercel project settings for any "Ignored Build Step" configuration
2. Remove any custom commands in this setting, or set it to "None"
3. In vercel.json, ensure there is no `ignoreCommand` parameter

## Releasing Updates

For future updates:

1. Make changes to your codebase
2. For critical files (vercel.json, build-vercel.js, api/index.js), edit directly through GitHub
3. For all other files, commit as usual
4. Vercel will automatically deploy changes from the main branch
