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

  app.put("/api/hero-content", async (req, res) => {
    try {
      const content = insertHeroContentSchema.parse(req.body);
      const updatedContent = await storage.updateHeroContent(content);
      res.json({ 
        success: true, 
        message: "Hero content updated successfully", 
        content: updatedContent 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid content data", 
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

  // About Content
  app.get("/api/about-content", async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.put("/api/about-content", async (req, res) => {
    try {
      const content = insertAboutContentSchema.parse(req.body);
      const updatedContent = await storage.updateAboutContent(content);
      res.json({ 
        success: true, 
        message: "About content updated successfully", 
        content: updatedContent 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid content data", 
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

  // Boating Packages
  app.get("/api/boating-packages", async (req, res) => {
    try {
      const packages = await storage.getBoatingPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/api/boating-packages", async (req, res) => {
    try {
      const packageData = insertBoatingPackageSchema.parse(req.body);
      const newPackage = await storage.createBoatingPackage(packageData);
      res.json({ 
        success: true, 
        message: "Boating package created successfully", 
        package: newPackage 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid package data", 
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

  app.put("/api/boating-packages/:id", async (req, res) => {
    try {
      const packageData = insertBoatingPackageSchema.partial().parse(req.body);
      const updatedPackage = await storage.updateBoatingPackage(req.params.id, packageData);
      res.json({ 
        success: true, 
        message: "Boating package updated successfully", 
        package: updatedPackage 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid package data", 
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

  app.delete("/api/boating-packages/:id", async (req, res) => {
    try {
      await storage.deleteBoatingPackage(req.params.id);
      res.json({ 
        success: true, 
        message: "Boating package deleted successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error. Please try again later." 
      });
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

  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonial = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonial);
      res.json({ 
        success: true, 
        message: "Testimonial created successfully", 
        testimonial: newTestimonial 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid testimonial data", 
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

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = insertTestimonialSchema.partial().parse(req.body);
      const updatedTestimonial = await storage.updateTestimonial(req.params.id, testimonial);
      res.json({ 
        success: true, 
        message: "Testimonial updated successfully", 
        testimonial: updatedTestimonial 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid testimonial data", 
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

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ 
        success: true, 
        message: "Testimonial deleted successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error. Please try again later." 
      });
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

  app.put("/api/gallery-images/:id", async (req, res) => {
    try {
      const imageData = insertGalleryImageSchema.partial().parse(req.body);
      const updatedImage = await storage.updateGalleryImage(req.params.id, imageData);
      res.json({ 
        success: true, 
        message: "Gallery image updated successfully", 
        image: updatedImage 
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

  app.delete("/api/gallery-images/:id", async (req, res) => {
    try {
      await storage.deleteGalleryImage(req.params.id);
      res.json({ 
        success: true, 
        message: "Gallery image deleted successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Server error. Please try again later." 
      });
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

  app.put("/api/contact-info", async (req, res) => {
    try {
      const info = insertContactInfoSchema.parse(req.body);
      const updatedInfo = await storage.updateContactInfo(info);
      res.json({ 
        success: true, 
        message: "Contact info updated successfully", 
        info: updatedInfo 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid contact info data", 
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

  // Content Sections
  app.get("/api/content-sections/:key", async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.key);
      res.json(section);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.put("/api/content-sections/:key", async (req, res) => {
    try {
      const content = insertContentSectionSchema.parse(req.body);
      const updatedSection = await storage.updateContentSection(req.params.key, content);
      res.json({ 
        success: true, 
        message: "Content section updated successfully", 
        section: updatedSection 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid content data", 
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

  const httpServer = createServer(app);
  return httpServer;
}
