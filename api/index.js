// Vercel Serverless Function
import express from 'express';
import path from 'path';

// Create Express app for serverless function
const app = express();
app.use(express.json());

// This is a simplified version of our server routes specifically for the Vercel deployment
// It handles the API endpoints that we need for the calculator and contact form

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, recaptchaToken } = req.body;
    
    // Verify reCAPTCHA token if provided
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
      const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
      const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }).toString()
      });
      
      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
      }
    }
    
    // Send email using SendGrid if API key is available
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: 'mike@cloudlaunch.au',
        from: 'noreply@numberlaunch.com',
        subject: `Contact Form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Message:</strong> ${message}`
      });
      
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
    
    // If we don't have SendGrid configured
    return res.status(500).json({ success: false, message: 'Email service not configured' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// This file acts as an entry point for Vercel serverless functions
export default function handler(req, res) {
  // Forward the request to our Express app
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}