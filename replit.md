# Heaven of Munroe - Tourism Website

## Overview

Heaven of Munroe is a tourism website for a kayaking and homestay service located on Munroe Island, Kerala. The platform focuses on promoting authentic backwater experiences including kayaking adventures, traditional homestay accommodations, canal boating, houseboat rides, and local cuisine. The website is designed to be conversion-focused and SEO-optimized to attract both domestic and international tourists.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Radix UI primitives for accessible component foundation

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Validation**: Zod schemas shared between frontend and backend
- **Storage**: In-memory storage implementation with interface for easy database migration
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured but using in-memory storage currently)
- **Database Configuration**: Neon Database serverless for production deployment
- **Schema Management**: Drizzle migrations with schema definition in shared directory
- **Data Models**: Booking inquiries and contact messages with proper validation

### Authentication and Authorization
- **Session-based**: Express sessions with PostgreSQL store
- **No user authentication**: Public-facing tourism website with inquiry forms only
- **Rate Limiting**: Not implemented but can be added for form submissions

### API Design
- **RESTful Endpoints**: 
  - POST `/api/booking-inquiry` for tourism booking requests
  - POST `/api/contact-message` for general contact forms
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Validation**: Server-side validation using Zod schemas
- **Response Format**: Consistent JSON responses with success/error indicators

### SEO and Performance Optimizations
- **Meta Tags**: Comprehensive SEO meta tags focused on Munroe Island keywords
- **Font Optimization**: Google Fonts with preconnect for performance
- **Image Optimization**: Unsplash images with responsive sizing and alt text
- **Code Splitting**: Vite's automatic code splitting for optimal loading

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend server framework
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library for consistent iconography

### Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for type safety
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Third-party Services
- **SendGrid**: Email service for contact form notifications (configured but not implemented)
- **WhatsApp Business API**: Direct booking integration via WhatsApp links
- **Google Maps**: Location services for directions and mapping
- **Font Awesome**: Icon library for UI elements

### Deployment and Hosting
- **Replit**: Development and hosting platform
- **Node.js**: Runtime environment for server-side execution
- **Environment Variables**: Configuration management for database and API keys


var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  aboutContent: () => aboutContent,
  boatingPackages: () => boatingPackages,
  bookingInquiries: () => bookingInquiries,
  contactInfo: () => contactInfo,
  contactMessages: () => contactMessages,
  contentSections: () => contentSections,
  galleryImages: () => galleryImages,
  heroContent: () => heroContent,
  insertAboutContentSchema: () => insertAboutContentSchema,
  insertBoatingPackageSchema: () => insertBoatingPackageSchema,
  insertBookingInquirySchema: () => insertBookingInquirySchema,
  insertContactInfoSchema: () => insertContactInfoSchema,
  insertContactMessageSchema: () => insertContactMessageSchema,
  insertContentSectionSchema: () => insertContentSectionSchema,
  insertGalleryImageSchema: () => insertGalleryImageSchema,
  insertHeroContentSchema: () => insertHeroContentSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  testimonials: () => testimonials
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var bookingInquiries = pgTable("booking_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  checkInDate: text("check_in_date").default(""),
  checkOutDate: text("check_out_date").default(""),
  experiences: text("experiences").array().default([]),
  specialRequests: text("special_requests").default(""),
  createdAt: timestamp("created_at").default(sql`now()`).notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull()
});
var heroContent = pgTable("hero_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull().default("Heaven of Munroe"),
  subtitle: text("subtitle").notNull().default("Room Stay & Food Boating Service"),
  description: text("description").notNull().default("Experience Authentic Kerala Backwaters"),
  backgroundImage: text("background_image").notNull().default("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"),
  primaryButtonText: text("primary_button_text").notNull().default("Discover Paradise"),
  secondaryButtonText: text("secondary_button_text").notNull().default("Book Your Journey"),
  scrollHintText: text("scroll_hint_text").notNull().default("\u2728 Scroll down to explore our services"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var aboutContent = pgTable("about_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull().default("Meet Evan - Your Local Host"),
  hostName: text("host_name").notNull().default("Evan"),
  hostImage: text("host_image").notNull().default("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"),
  introText: text("intro_text").notNull().default("Born and raised on the pristine waters of Munroe Island, Evan has spent over two decades mastering the art of backwater navigation and hospitality."),
  description1: text("description_1").notNull().default("His deep connection with the local ecosystem and authentic Kerala culture makes every journey a unique experience filled with stories, local wisdom, and genuine warmth."),
  description2: text("description_2").notNull().default("When you book with Heaven of Munroe, you're not just getting a service - you're becoming part of Evan's extended family."),
  expandedText1: text("expanded_text_1").default("Evan's expertise extends beyond boating - he's also a certified local guide, traditional chef, and cultural ambassador for Munroe Island. His multilingual abilities ensure comfortable communication with guests from around the world."),
  expandedText2: text("expanded_text_2").default("The business started as a family tradition, passed down through generations of fishermen and boat builders. Today, Evan combines this heritage with modern hospitality standards to create unforgettable experiences."),
  languages: text("languages").notNull().default("English, Hindi, Malayalam"),
  certifications: text("certifications").notNull().default("Tourism Board Approved"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var boatingPackages = pgTable("boating_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packageId: text("package_id").notNull().unique(),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  price: text("price").notNull(),
  originalPrice: text("original_price"),
  description: text("description").notNull(),
  image: text("image").notNull(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
  whatsappLink: text("whatsapp_link").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  // Google Maps, TripAdvisor, etc.
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  userImage: text("user_image").notNull(),
  reviewDate: text("review_date").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text").notNull(),
  category: text("category").default("general"),
  // boating, accommodation, food, etc.
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: text("business_name").notNull().default("Heaven of Munroe"),
  phone: text("phone").notNull().default("+91 96338 36839"),
  email: text("email").notNull().default("heavenofmunroe@gmail.com"),
  address: text("address").notNull().default("Munroe Island, Kollam District, Kerala, India"),
  whatsappNumber: text("whatsapp_number").notNull().default("919633836839"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  googleMaps: text("google_maps"),
  description: text("description").notNull().default("Get in touch with us for bookings, inquiries, or any questions about our services."),
  businessHours: text("business_hours").notNull().default("Available 24/7 for bookings and inquiries"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var contentSections = pgTable("content_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionKey: text("section_key").notNull().unique(),
  // services_title, footer_text, etc.
  title: text("title"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull()
});
var insertBookingInquirySchema = createInsertSchema(bookingInquiries).omit({
  id: true,
  createdAt: true
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});
var insertHeroContentSchema = createInsertSchema(heroContent).omit({
  id: true,
  updatedAt: true
});
var insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  updatedAt: true
});
var insertBoatingPackageSchema = createInsertSchema(boatingPackages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  updatedAt: true
});
var insertContentSectionSchema = createInsertSchema(contentSections).omit({
  id: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
var pool = null;
var db = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    // Maximum connections in pool
    idleTimeoutMillis: 3e4,
    // Close idle connections after 30s
    connectionTimeoutMillis: 1e4,
    // Connection timeout 10s
    maxUses: 7500,
    // Maximum uses before connection is closed
    allowExitOnIdle: true
    // Allow process to exit when all connections idle
  });
  db = drizzle({ client: pool, schema: schema_exports });
  pool.on("connect", (client) => {
    console.log("New database client connected");
  });
  pool.on("error", (err, client) => {
    console.error("Database pool error:", err.message);
  });
  console.log("Database connected successfully with improved connection handling");
} else {
  console.warn("DATABASE_URL not found. Running without database connection. Some features may not work.");
}
async function withRetry(operation, maxRetries = 3, baseDelay = 1e3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const isConnectionError = error?.code === "57P01" || // terminated by administrator
      error?.code === "ECONNRESET" || error?.code === "ENOTFOUND" || error?.message?.includes("Connection terminated") || error?.message?.includes("connection closed");
      if (isConnectionError && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Database connection error (attempt ${attempt}/${maxRetries}): ${error.message}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Maximum retries reached");
}

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var MemStorage = class {
  mockBookingInquiries = [];
  mockContactMessages = [];
  mockHeroContent = {
    id: "hero-1",
    title: "Experience the Magic of Munroe Island",
    subtitle: "Backwater Boating Paradise",
    description: "Discover hidden lagoons, diverse bird species, and traditional country boat experiences",
    backgroundImage: "/images/backwater-boat-silhouette.jpg",
    primaryButtonText: "Book Experience",
    secondaryButtonText: "Learn More",
    scrollHintText: "Scroll to explore",
    isActive: true,
    updatedAt: /* @__PURE__ */ new Date()
  };
  mockAboutContent = {
    id: "about-1",
    title: "About Heaven of Munroe",
    hostName: "Local Guides",
    hostImage: "/images/1 (15).jpg",
    introText: "Your gateway to authentic Kerala backwater experiences",
    description1: "Heaven of Munroe offers traditional boating experiences in the pristine backwaters of Munroe Island. Our expert local guides share fascinating stories about the region's rich history and culture.",
    description2: "Perfect for all ages and skill levels, we provide a peaceful journey through nature's paradise with authentic Kerala hospitality.",
    expandedText1: null,
    expandedText2: null,
    languages: "Malayalam, Tamil, English, Hindi",
    certifications: "Tourism Department Certified",
    isActive: true,
    updatedAt: /* @__PURE__ */ new Date()
  };
  mockPackages = [
    {
      id: "sunrise-special",
      packageId: "sunrise-special",
      title: "Sunrise Special",
      duration: "2 Hours",
      price: "\u20B9800",
      originalPrice: "\u20B91000",
      description: "Experience the magical sunrise over Munroe Island backwaters with traditional breakfast",
      image: "/images/1 (1).jpg",
      features: ["Early morning boat ride (5:30 AM - 7:30 AM)", "Traditional Kerala breakfast on boat", "Bird watching opportunities", "Photography sessions", "Local guide and stories"],
      isPopular: true,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Sunrise Special package",
      sortOrder: 1,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    },
    {
      id: "family-adventure",
      packageId: "family-adventure",
      title: "Family Adventure",
      duration: "4 Hours",
      price: "\u20B91200",
      originalPrice: "\u20B91500",
      description: "Perfect family experience with lunch, activities, and comfortable boat exploration",
      image: "/images/1 (2).jpg",
      features: ["4-hour guided boat tour", "Traditional Kerala lunch", "Fishing experience for kids", "Island hopping", "Cultural village visit", "Swimming opportunities"],
      isPopular: false,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Family Adventure package",
      sortOrder: 2,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }
  ];
  mockTestimonials = [
    {
      id: "test-1",
      name: "Sarah Johnson",
      platform: "Google Maps",
      rating: 5,
      review: "Absolutely magical experience! The sunrise boat tour was breathtaking. The traditional breakfast on the boat was delicious and the hospitality was exceptional. Highly recommended!",
      userImage: "",
      reviewDate: "2 weeks ago",
      sortOrder: 1,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    },
    {
      id: "test-2",
      name: "Rajesh Kumar",
      platform: "TripAdvisor",
      rating: 5,
      review: "Best boating experience in Kerala! The family adventure package was perfect for our group. Kids loved the fishing experience and the traditional lunch was amazing.",
      userImage: "",
      reviewDate: "1 month ago",
      sortOrder: 2,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }
  ];
  mockGalleryImages = [
    {
      id: "gallery-1",
      title: "Sunrise Boat Ride",
      description: "Beautiful sunrise over backwaters",
      imageUrl: "/images/1 (20).jpg",
      altText: "Sunrise boat ride",
      category: "boat-tours",
      sortOrder: 1,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }
  ];
  mockContactInfo = {
    id: "contact-1",
    businessName: "Heaven of Munroe",
    description: "Your gateway to authentic Kerala backwater experiences",
    email: "info@heavenofmunroe.com",
    phone: "+91 9633836839",
    whatsappNumber: "919633836839",
    address: "Munroe Island, Kollam, Kerala",
    businessHours: "6:00 AM - 8:00 PM",
    facebook: null,
    instagram: null,
    googleMaps: null,
    isActive: true,
    updatedAt: /* @__PURE__ */ new Date()
  };
  mockContentSections = /* @__PURE__ */ new Map([
    ["munroe-island-main", {
      id: "content-1",
      sectionKey: "munroe-island-main",
      title: "Discover Munroe Island",
      content: "Experience the pristine beauty of Kerala's backwaters through our authentic boating adventures.",
      imageUrl: "/images/canal.jpg",
      isActive: true,
      updatedAt: /* @__PURE__ */ new Date()
    }]
  ]);
  async createBookingInquiry(insertInquiry) {
    const inquiry = {
      id: `inquiry-${Date.now()}`,
      fullName: insertInquiry.fullName,
      email: insertInquiry.email,
      phone: insertInquiry.phone,
      numberOfGuests: insertInquiry.numberOfGuests,
      checkInDate: insertInquiry.checkInDate || null,
      checkOutDate: insertInquiry.checkOutDate || null,
      experiences: insertInquiry.experiences || null,
      specialRequests: insertInquiry.specialRequests || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.mockBookingInquiries.push(inquiry);
    return inquiry;
  }
  async createContactMessage(insertMessage) {
    const message = {
      id: `message-${Date.now()}`,
      ...insertMessage,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.mockContactMessages.push(message);
    return message;
  }
  async getBookingInquiries() {
    return this.mockBookingInquiries.slice().reverse();
  }
  async getContactMessages() {
    return this.mockContactMessages.slice().reverse();
  }
  async getHeroContent() {
    return this.mockHeroContent;
  }
  async updateHeroContent(content) {
    const updatedContent = {
      id: this.mockHeroContent?.id || "hero-1",
      title: content.title || "Heaven of Munroe",
      subtitle: content.subtitle || "Room Stay & Food Boating Service",
      description: content.description || "Experience Authentic Kerala Backwaters",
      backgroundImage: content.backgroundImage || "/images/backwater-boat-silhouette.jpg",
      primaryButtonText: content.primaryButtonText || "Discover Paradise",
      secondaryButtonText: content.secondaryButtonText || "Book Your Journey",
      scrollHintText: content.scrollHintText || "\u2728 Scroll down to explore our services",
      isActive: content.isActive !== void 0 ? content.isActive : true,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockHeroContent = updatedContent;
    return updatedContent;
  }
  async getAboutContent() {
    return this.mockAboutContent;
  }
  async updateAboutContent(content) {
    const updatedContent = {
      id: this.mockAboutContent?.id || "about-1",
      title: content.title || "Meet Evan - Your Local Host",
      hostName: content.hostName || "Evan",
      hostImage: content.hostImage || "/images/1 (15).jpg",
      introText: content.introText || "Born and raised on the pristine waters of Munroe Island",
      description1: content.description1 || "His deep connection with the local ecosystem",
      description2: content.description2 || "When you book with Heaven of Munroe",
      expandedText1: content.expandedText1 || null,
      expandedText2: content.expandedText2 || null,
      languages: content.languages || "English, Hindi, Malayalam",
      certifications: content.certifications || "Tourism Board Approved",
      isActive: content.isActive !== void 0 ? content.isActive : true,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockAboutContent = updatedContent;
    return updatedContent;
  }
  async getBoatingPackages() {
    return this.mockPackages;
  }
  async createBoatingPackage(packageData) {
    const newPackage = {
      id: `package-${Date.now()}`,
      packageId: packageData.packageId,
      title: packageData.title,
      duration: packageData.duration,
      price: packageData.price,
      originalPrice: packageData.originalPrice || null,
      description: packageData.description,
      image: packageData.image,
      features: packageData.features,
      isPopular: packageData.isPopular !== void 0 ? packageData.isPopular : false,
      whatsappLink: packageData.whatsappLink,
      sortOrder: packageData.sortOrder !== void 0 ? packageData.sortOrder : 0,
      isActive: packageData.isActive !== void 0 ? packageData.isActive : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockPackages.push(newPackage);
    return newPackage;
  }
  async updateBoatingPackage(id, packageData) {
    const index = this.mockPackages.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Package not found");
    this.mockPackages[index] = {
      ...this.mockPackages[index],
      ...packageData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.mockPackages[index];
  }
  async deleteBoatingPackage(id) {
    const index = this.mockPackages.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.mockPackages.splice(index, 1);
    }
  }
  async getTestimonials() {
    return this.mockTestimonials;
  }
  async createTestimonial(testimonial) {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name: testimonial.name,
      platform: testimonial.platform,
      rating: testimonial.rating !== void 0 ? testimonial.rating : 5,
      review: testimonial.review,
      userImage: testimonial.userImage,
      reviewDate: testimonial.reviewDate,
      sortOrder: testimonial.sortOrder !== void 0 ? testimonial.sortOrder : 0,
      isActive: testimonial.isActive !== void 0 ? testimonial.isActive : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockTestimonials.push(newTestimonial);
    return newTestimonial;
  }
  async updateTestimonial(id, testimonial) {
    const index = this.mockTestimonials.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Testimonial not found");
    this.mockTestimonials[index] = {
      ...this.mockTestimonials[index],
      ...testimonial,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.mockTestimonials[index];
  }
  async deleteTestimonial(id) {
    const index = this.mockTestimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.mockTestimonials.splice(index, 1);
    }
  }
  async getGalleryImages() {
    return this.mockGalleryImages;
  }
  async createGalleryImage(image) {
    const newImage = {
      id: `gallery-${Date.now()}`,
      title: image.title,
      description: image.description || null,
      imageUrl: image.imageUrl,
      altText: image.altText,
      category: image.category || null,
      sortOrder: image.sortOrder !== void 0 ? image.sortOrder : 0,
      isActive: image.isActive !== void 0 ? image.isActive : true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockGalleryImages.push(newImage);
    return newImage;
  }
  async updateGalleryImage(id, image) {
    const index = this.mockGalleryImages.findIndex((g) => g.id === id);
    if (index === -1) throw new Error("Gallery image not found");
    this.mockGalleryImages[index] = {
      ...this.mockGalleryImages[index],
      ...image,
      updatedAt: /* @__PURE__ */ new Date()
    };
    return this.mockGalleryImages[index];
  }
  async deleteGalleryImage(id) {
    const index = this.mockGalleryImages.findIndex((g) => g.id === id);
    if (index !== -1) {
      this.mockGalleryImages.splice(index, 1);
    }
  }
  async getContactInfo() {
    return this.mockContactInfo;
  }
  async updateContactInfo(info) {
    const updatedInfo = {
      id: this.mockContactInfo?.id || "contact-1",
      businessName: info.businessName || "Heaven of Munroe",
      phone: info.phone || "+91 96338 36839",
      email: info.email || "heavenofmunroe@gmail.com",
      address: info.address || "Munroe Island, Kollam District, Kerala, India",
      whatsappNumber: info.whatsappNumber || "919633836839",
      facebook: info.facebook || null,
      instagram: info.instagram || null,
      googleMaps: info.googleMaps || null,
      description: info.description || "Get in touch with us for bookings, inquiries, or any questions about our services.",
      businessHours: info.businessHours || "Available 24/7 for bookings and inquiries",
      isActive: info.isActive !== void 0 ? info.isActive : true,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockContactInfo = updatedInfo;
    return updatedInfo;
  }
  async getContentSection(sectionKey) {
    return this.mockContentSections.get(sectionKey) || null;
  }
  async updateContentSection(sectionKey, content) {
    const section = {
      id: `section-${Date.now()}`,
      sectionKey,
      title: content.title || null,
      content: content.content,
      imageUrl: content.imageUrl || null,
      isActive: content.isActive !== void 0 ? content.isActive : true,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.mockContentSections.set(sectionKey, section);
    return section;
  }
};
var DatabaseStorage = class {
  // Existing booking and contact methods
  async createBookingInquiry(insertInquiry) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await withRetry(async () => {
      const [inquiry] = await db.insert(bookingInquiries).values(insertInquiry).returning();
      return inquiry;
    });
  }
  async createContactMessage(insertMessage) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
  async getBookingInquiries() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await withRetry(async () => {
      return await db.select().from(bookingInquiries).orderBy(desc(bookingInquiries.createdAt));
    });
  }
  async getContactMessages() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  // Hero Content
  async getHeroContent() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await withRetry(async () => {
      const [content] = await db.select().from(heroContent).where(eq(heroContent.isActive, true)).limit(1);
      return content || null;
    });
  }
  async updateHeroContent(content) {
    const existing = await this.getHeroContent();
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    if (existing) {
      const [updated] = await db.update(heroContent).set({ ...content, updatedAt: /* @__PURE__ */ new Date() }).where(eq(heroContent.id, existing.id)).returning();
      return updated;
    } else {
      const [newContent] = await db.insert(heroContent).values(content).returning();
      return newContent;
    }
  }
  // About Content
  async getAboutContent() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [content] = await db.select().from(aboutContent).where(eq(aboutContent.isActive, true)).limit(1);
    return content || null;
  }
  async updateAboutContent(content) {
    const existing = await this.getAboutContent();
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    if (existing) {
      const [updated] = await db.update(aboutContent).set({ ...content, updatedAt: /* @__PURE__ */ new Date() }).where(eq(aboutContent.id, existing.id)).returning();
      return updated;
    } else {
      const [newContent] = await db.insert(aboutContent).values(content).returning();
      return newContent;
    }
  }
  // Boating Packages
  async getBoatingPackages() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await db.select().from(boatingPackages).where(eq(boatingPackages.isActive, true)).orderBy(boatingPackages.sortOrder);
  }
  async createBoatingPackage(packageData) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [newPackage] = await db.insert(boatingPackages).values(packageData).returning();
    return newPackage;
  }
  async updateBoatingPackage(id, packageData) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [updated] = await db.update(boatingPackages).set({ ...packageData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(boatingPackages.id, id)).returning();
    return updated;
  }
  async deleteBoatingPackage(id) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    await db.update(boatingPackages).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(boatingPackages.id, id));
  }
  // Testimonials
  async getTestimonials() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.sortOrder);
  }
  async createTestimonial(testimonial) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
  async updateTestimonial(id, testimonial) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [updated] = await db.update(testimonials).set({ ...testimonial, updatedAt: /* @__PURE__ */ new Date() }).where(eq(testimonials.id, id)).returning();
    return updated;
  }
  async deleteTestimonial(id) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    await db.update(testimonials).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(testimonials.id, id));
  }
  // Gallery Images
  async getGalleryImages() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await db.select().from(galleryImages).where(eq(galleryImages.isActive, true)).orderBy(galleryImages.sortOrder);
  }
  async createGalleryImage(image) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [newImage] = await db.insert(galleryImages).values(image).returning();
    return newImage;
  }
  async updateGalleryImage(id, image) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [updated] = await db.update(galleryImages).set({ ...image, updatedAt: /* @__PURE__ */ new Date() }).where(eq(galleryImages.id, id)).returning();
    return updated;
  }
  async deleteGalleryImage(id) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    await db.update(galleryImages).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(galleryImages.id, id));
  }
  // Contact Info
  async getContactInfo() {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    const [info] = await db.select().from(contactInfo).where(eq(contactInfo.isActive, true)).limit(1);
    return info || null;
  }
  async updateContactInfo(info) {
    const existing = await this.getContactInfo();
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    if (existing) {
      const [updated] = await db.update(contactInfo).set({ ...info, updatedAt: /* @__PURE__ */ new Date() }).where(eq(contactInfo.id, existing.id)).returning();
      return updated;
    } else {
      const [newInfo] = await db.insert(contactInfo).values(info).returning();
      return newInfo;
    }
  }
  // Content Sections
  async getContentSection(sectionKey) {
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await withRetry(async () => {
      const [section] = await db.select().from(contentSections).where(eq(contentSections.sectionKey, sectionKey)).limit(1);
      return section || null;
    });
  }
  async updateContentSection(sectionKey, content) {
    const existing = await this.getContentSection(sectionKey);
    if (!db) {
      throw new Error("Database not available. Please check your database configuration.");
    }
    return await withRetry(async () => {
      if (existing) {
        const [updated] = await db.update(contentSections).set({ ...content, updatedAt: /* @__PURE__ */ new Date() }).where(eq(contentSections.id, existing.id)).returning();
        return updated;
      } else {
        const [newSection] = await db.insert(contentSections).values({ ...content, sectionKey }).returning();
        return newSection;
      }
    });
  }
};
var storage = db ? new DatabaseStorage() : new MemStorage();
console.log(db ? "Using Database storage" : "Using In-memory storage fallback");

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/booking-inquiry", async (req, res) => {
    try {
      const inquiry = insertBookingInquirySchema.parse(req.body);
      const newInquiry = await storage.createBookingInquiry(inquiry);
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
  app2.post("/api/contact-message", async (req, res) => {
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
  app2.get("/api/hero-content", async (req, res) => {
    try {
      const content = await storage.getHeroContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.put("/api/hero-content", async (req, res) => {
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
  app2.get("/api/about-content", async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.put("/api/about-content", async (req, res) => {
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
  app2.get("/api/boating-packages", async (req, res) => {
    try {
      const packages = await storage.getBoatingPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.post("/api/boating-packages", async (req, res) => {
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
  app2.put("/api/boating-packages/:id", async (req, res) => {
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
  app2.delete("/api/boating-packages/:id", async (req, res) => {
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
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.post("/api/testimonials", async (req, res) => {
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
  app2.put("/api/testimonials/:id", async (req, res) => {
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
  app2.delete("/api/testimonials/:id", async (req, res) => {
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
  app2.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.post("/api/gallery-images", async (req, res) => {
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
  app2.put("/api/gallery-images/:id", async (req, res) => {
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
  app2.delete("/api/gallery-images/:id", async (req, res) => {
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
  app2.get("/api/contact-info", async (req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.put("/api/contact-info", async (req, res) => {
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
  app2.get("/api/content-sections/:key", async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.key);
      res.json(section);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.put("/api/content-sections/:key", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "localhost"
  }, () => {
    log(`serving on port ${port}`);
  });
})();