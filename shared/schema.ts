import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookingInquiries = pgTable("booking_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfGuests: integer("number_of_guests").notNull(),
  checkInDate: text("check_in_date").default(""),
  checkOutDate: text("check_out_date").default(""),
  experiences: text("experiences").array().default([]),
  specialRequests: text("special_requests").default(""),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

// Content Management Tables

// Hero Section Content
export const heroContent = pgTable("hero_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull().default("Heaven of Munroe"),
  subtitle: text("subtitle").notNull().default("Room Stay & Food Boating Service"),
  description: text("description").notNull().default("Experience Authentic Kerala Backwaters"),
  backgroundImage: text("background_image").notNull().default("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"),
  primaryButtonText: text("primary_button_text").notNull().default("Discover Paradise"),
  secondaryButtonText: text("secondary_button_text").notNull().default("Book Your Journey"),
  scrollHintText: text("scroll_hint_text").notNull().default("✨ Scroll down to explore our services"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// About Section Content
export const aboutContent = pgTable("about_content", {
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
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Boating Packages
export const boatingPackages = pgTable("boating_packages", {
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
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Testimonials/Reviews
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  platform: text("platform").notNull(), // Google Maps, TripAdvisor, etc.
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  userImage: text("user_image").notNull(),
  reviewDate: text("review_date").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Photo Gallery
export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text").notNull(),
  category: text("category").default("general"), // boating, accommodation, food, etc.
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Contact Information
export const contactInfo = pgTable("contact_info", {
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
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// General Content Sections (for any other editable content)
export const contentSections = pgTable("content_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionKey: text("section_key").notNull().unique(), // services_title, footer_text, etc.
  title: text("title"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Insert Schemas for all tables
export const insertBookingInquirySchema = createInsertSchema(bookingInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertHeroContentSchema = createInsertSchema(heroContent).omit({
  id: true,
  updatedAt: true,
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({
  id: true,
  updatedAt: true,
});

export const insertBoatingPackageSchema = createInsertSchema(boatingPackages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  updatedAt: true,
});

export const insertContentSectionSchema = createInsertSchema(contentSections).omit({
  id: true,
  updatedAt: true,
});

// Types
export type InsertBookingInquiry = z.infer<typeof insertBookingInquirySchema>;
export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertHeroContent = z.infer<typeof insertHeroContentSchema>;
export type HeroContent = typeof heroContent.$inferSelect;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type AboutContent = typeof aboutContent.$inferSelect;

export type InsertBoatingPackage = z.infer<typeof insertBoatingPackageSchema>;
export type BoatingPackage = typeof boatingPackages.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

export type InsertContentSection = z.infer<typeof insertContentSectionSchema>;
export type ContentSection = typeof contentSections.$inferSelect;
