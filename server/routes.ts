import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaxCalculationSchema } from "@shared/schema";
import { z } from "zod";
import { emailSchema, sendEmail, initMailService } from "./email";
import fetch from "node-fetch";

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    // Always use Google's test secret key for development
    // For Production: Replace with your real reCAPTCHA secret key
    // You can use environment variables like:
    // const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
    const recaptchaSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Google's official test secret key
    
    console.log('Verifying reCAPTCHA with token length:', token.length);
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const data = await response.json() as { success: boolean };
    
    console.log('reCAPTCHA verification result:', data);
    
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for NumberLaunch application
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "NumberLaunch API is running" });
  });

  // Tax calculation endpoints
  // Save a tax calculation
  app.post("/api/calculations", async (req, res) => {
    try {
      // Validate the request body against our schema
      const validationResult = insertTaxCalculationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid calculation data",
          errors: validationResult.error.errors
        });
      }
      
      // Store the calculation
      const calculation = await storage.createTaxCalculation(validationResult.data);
      
      res.status(201).json({
        success: true,
        message: "Calculation saved successfully",
        data: calculation
      });
    } catch (error) {
      console.error("Failed to save calculation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save calculation"
      });
    }
  });
  
  // Get all tax calculations for a user
  app.get("/api/calculations/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID"
        });
      }
      
      const calculations = await storage.getTaxCalculationsByUserId(userId);
      
      res.json({
        success: true,
        data: calculations
      });
    } catch (error) {
      console.error("Failed to retrieve calculations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve calculations"
      });
    }
  });
  
  // Get a specific tax calculation
  app.get("/api/calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid calculation ID"
        });
      }
      
      const calculation = await storage.getTaxCalculation(id);
      
      if (!calculation) {
        return res.status(404).json({
          success: false,
          message: "Calculation not found"
        });
      }
      
      res.json({
        success: true,
        data: calculation
      });
    } catch (error) {
      console.error("Failed to retrieve calculation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve calculation"
      });
    }
  });
  
  // Update a tax calculation
  app.put("/api/calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid calculation ID"
        });
      }
      
      // Validate the request body - partial validation for updates
      const validationSchema = insertTaxCalculationSchema.partial();
      const validationResult = validationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid calculation data",
          errors: validationResult.error.errors
        });
      }
      
      const updatedCalculation = await storage.updateTaxCalculation(id, validationResult.data);
      
      if (!updatedCalculation) {
        return res.status(404).json({
          success: false,
          message: "Calculation not found"
        });
      }
      
      res.json({
        success: true,
        message: "Calculation updated successfully",
        data: updatedCalculation
      });
    } catch (error) {
      console.error("Failed to update calculation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update calculation"
      });
    }
  });
  
  // Delete a tax calculation
  app.delete("/api/calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid calculation ID"
        });
      }
      
      const success = await storage.deleteTaxCalculation(id);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Calculation not found"
        });
      }
      
      res.json({
        success: true,
        message: "Calculation deleted successfully"
      });
    } catch (error) {
      console.error("Failed to delete calculation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete calculation"
      });
    }
  });

  // User registration - simplified version for future expansion
  app.post("/api/users/register", async (req, res) => {
    try {
      // This is a placeholder for future user registration functionality
      res.status(201).json({
        success: true,
        message: "User registration endpoint - to be implemented"
      });
    } catch (error) {
      console.error("Failed to register user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to register user"
      });
    }
  });

  // Contact form email endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validationResult = emailSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact form data",
          errors: validationResult.error.errors
        });
      }
      
      // Verify reCAPTCHA token
      const { captchaToken } = validationResult.data;
      if (!captchaToken) {
        return res.status(400).json({
          success: false,
          message: "CAPTCHA verification failed - token missing"
        });
      }
      
      const isValidCaptcha = await verifyRecaptcha(captchaToken);
      if (!isValidCaptcha) {
        return res.status(400).json({
          success: false,
          message: "CAPTCHA verification failed - please try again"
        });
      }
      
      // Send the email
      const result = await sendEmail(validationResult.data);
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: result.message
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Email sent successfully"
      });
    } catch (error) {
      console.error("Failed to send contact email:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send contact email"
      });
    }
  });

  // Test endpoint for PDF tax bracket formatting
  app.get("/api/pdf/format-check", (req, res) => {
    try {
      const taxBracketSample = [
        { bracket: "$0 - $18,200", amount: 0, rate: 0 },
        { bracket: "$18,201 - $45,000", amount: 5092, rate: 0.19 },
        { bracket: "$45,001 - $120,000", amount: 16250, rate: 0.325 },
        { bracket: "$120,001 - $180,000", amount: 29467, rate: 0.37 },
        { bracket: "$180,001+", amount: 51667, rate: 0.45 }
      ];
      
      const formattedBrackets = taxBracketSample.map(bracket => {
        let rateDisplay = "";
        if (bracket.rate === 0.325) {
          rateDisplay = "32.5c";
        } else if (bracket.rate === 0) {
          rateDisplay = "0c";
        } else if (bracket.rate === 0.19) {
          rateDisplay = "19c";
        } else if (bracket.rate === 0.37) {
          rateDisplay = "37c";
        } else if (bracket.rate === 0.45) {
          rateDisplay = "45c";
        } else {
          rateDisplay = `${bracket.rate * 100}c`;
        }
        
        return {
          ...bracket,
          rateDisplay
        };
      });
      
      res.json({
        success: true,
        message: "PDF tax bracket formatting check",
        data: formattedBrackets
      });
    } catch (error) {
      console.error("Error in PDF format check:", error);
      res.status(500).json({
        success: false,
        message: "Error checking PDF formatting"
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
