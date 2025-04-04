import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for NumberLaunch application
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "NumberLaunch API is running" });
  });

  // Tax calculation endpoint - for future expansion when needed
  app.post("/api/calculate", (req, res) => {
    try {
      // For now, all calculations are done client-side
      // This endpoint is prepared for future server-side calculations if needed
      res.json({
        success: true,
        message: "Calculation processed"
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to process calculation"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
