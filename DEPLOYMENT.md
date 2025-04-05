# NumberLaunch Deployment Guide

This guide walks you through deploying the NumberLaunch application to Vercel using GitHub.

## Prerequisites

1. A GitHub account
2. A Vercel account
3. Google reCAPTCHA keys
4. SendGrid API key

## GitHub Setup

1. Create a new GitHub repository
2. Push your code to the repository
3. Make sure that all changes are on the main branch for deployment
4. Set the correct author information to ensure Vercel can verify your commits:
   ```bash
   git config --local user.name "Mike CloudLaunch"
   git config --local user.email "mike@cloudlaunch.au"
   ```

## Vercel Deployment

1. Log in to Vercel and click "Add New Project"
2. Import your GitHub repository
3. Configure the project with the following settings:
   - Build Command: `node build-vercel.js`
   - Output Directory: `dist`
   - Framework Preset: `Other`

4. Configure the advanced build settings:
   - Root Directory: `.` (default)
   - Install Command: `npm install`

5. Add Environment Variables:
   - `VITE_RECAPTCHA_SITE_KEY`: Your Google reCAPTCHA site key
   - `RECAPTCHA_SECRET_KEY`: Your Google reCAPTCHA secret key
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `NODE_ENV`: `production`

6. Click "Deploy"

## Important Deployment Files

The deployment relies on these key files:

1. **vercel.json** - Contains the routing configuration for the Vercel platform
2. **build-vercel.js** - Custom build script that creates distribution files and the serverless function
3. **api/index.js** - The serverless function that handles API requests and serves static content

## Troubleshooting Deployment

If you encounter issues during deployment:

1. **Raw code displayed instead of UI**: 
   - Ensure `NODE_ENV` is set to `production` in your Vercel environment variables
   - Check the routing in vercel.json (it should direct all non-API requests to the api/index.js handler)
   - Verify that the dist directory is being properly created during build

2. **API routes not working**: 
   - Verify that the api/index.js file is correctly configured to handle serverless function requests
   - Check the console logs in the Vercel deployment for any errors

3. **Build fails**: 
   - Review the build logs in Vercel to identify specific errors
   - The custom build-vercel.js script will log detailed information about the build process
   - Make sure all dependencies are properly installed

4. **Commit author verification**: 
   - Ensure your git user.email is verified with Vercel/GitHub to prevent deployment permission issues
   - If needed, add your email to the GitHub repository's allowed committers

## Verifying Deployment

After deployment is complete:

1. Click on the generated URL to verify the application is working
2. Test the calculator functionality
3. Test the contact form with reCAPTCHA
4. Verify PDF generation is working

## Custom Domain Setup

If you want to use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your domain and follow the instructions to configure DNS
4. For numberlaunch.com, you'll need to add DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
