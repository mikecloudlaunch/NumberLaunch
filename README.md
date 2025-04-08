# NumberLaunch 🚀

Australian income calculator web application with space theme. Provides accurate tax calculations including superannuation and HECS/HELP repayments.    

## Features  

- Australian income tax calculator with accurate tax brackets
- Support for superannuation calculations (including custom rates and additional contributions)
- HECS/HELP repayment calculation
- Interactive visualization of tax breakdown
- Space-themed dark mode design
- PDF report generation
- Responsive design
- Contact form with reCAPTCHA protection 

## Technology Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js
- Email: SendGrid
- Security: Google reCAPTCHA
- Visualizations: Recharts
- PDF Generation: React-PDF

## Setup Instructions

### Environment Variables

For production deployment, set these environment variables:

- VITE_RECAPTCHA_SITE_KEY: Google reCAPTCHA site key (frontend)
- RECAPTCHA_SECRET_KEY: Google reCAPTCHA secret key (backend)
- SENDGRID_API_KEY: SendGrid API key (email functionality)

### Development

Start development server.

## Deployment

1. Push to GitHub
2. Set environment variables
3. Deploy to Vercel or Netlify
