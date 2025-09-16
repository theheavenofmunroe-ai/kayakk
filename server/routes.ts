import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookingInquirySchema, 
  insertContactMessageSchema,
  insertHeroContentSchema,
  insertAboutContentSchema,
  insertBoatingPackageSchema,
  insertTestimonialSchema,
  insertGalleryImageSchema,
  insertContactInfoSchema,
  insertContentSectionSchema
} from "@shared/schema";
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

  // Admin endpoints removed for security - sensitive customer data should not be publicly accessible

  // CONTENT MANAGEMENT API ROUTES

  // Hero Content
  app.get("/api/hero-content", async (req, res) => {
    try {
      const content = await storage.getHeroContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // About Content
  app.get("/api/about-content", async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Boating Packages
  app.get("/api/boating-packages", async (req, res) => {
    try {
      const packages = await storage.getBoatingPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Gallery Images
  app.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/api/gallery-images", async (req, res) => {
    try {
      const image = insertGalleryImageSchema.parse(req.body);
      const newImage = await storage.createGalleryImage(image);
      res.json({ 
        success: true, 
        message: "Gallery image created successfully", 
        image: newImage 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid image data", 
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

  // Contact Info
  app.get("/api/contact-info", async (req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Content Sections
  app.get("/api/content-sections/:key", async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.key);
      res.json(section);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
