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

## Vercel Deployment

1. Log in to Vercel and click "Add New Project"
2. Import your GitHub repository
3. Configure the project with:
   - Build Command: npm run build
   - Output Directory: dist

4. Add Environment Variables:
   - VITE_RECAPTCHA_SITE_KEY: Your Google reCAPTCHA site key
   - RECAPTCHA_SECRET_KEY: Your Google reCAPTCHA secret key
   - SENDGRID_API_KEY: Your SendGrid API key

5. Click "Deploy"

## Verifying Deployment

After deployment is complete:

1. Click on the generated URL to verify the application is working
2. Test the calculator functionality
3. Test the contact form with reCAPTCHA
4. Verify PDF generation is working

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your domain and follow the instructions to configure DNS
