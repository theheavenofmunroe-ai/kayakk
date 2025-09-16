import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingInquirySchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Booking inquiry endpoint
  app.post("/api/booking-inquiry", async (req, res) => {
    try {
      const inquiry = insertBookingInquirySchema.parse(req.body);
      const newInquiry = await storage.createBookingInquiry(inquiry);
      
      // Here you could integrate with email service to send notifications
      console.log("New booking inquiry received:", newInquiry);
      
      res.json({ 
        success: true, 
        message: "Booking inquiry submitted successfully. We'll contact you within 2 hours!", 
        id: newInquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Server error. Please try again later." 
        });
      }
    }
  });

  // Contact message endpoint
  app.post("/api/contact-message", async (req, res) => {
    try {
      const message = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(message);
      
      console.log("New contact message received:", newMessage);
      
      res.json({ 
        success: true, 
        message: "Message sent successfully. We'll respond soon!", 
        id: newMessage.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Server error. Please try again later." 
        });
      }
    }
  });

  // Get all inquiries (admin endpoint)
  app.get("/api/booking-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getBookingInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error" 
      });
    }
  });

  // Get all contact messages (admin endpoint)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
