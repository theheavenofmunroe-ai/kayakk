import { 
  type BookingInquiry, type InsertBookingInquiry, 
  type ContactMessage, type InsertContactMessage,
  type HeroContent, type InsertHeroContent,
  type AboutContent, type InsertAboutContent,
  type BoatingPackage, type InsertBoatingPackage,
  type Testimonial, type InsertTestimonial,
  type GalleryImage, type InsertGalleryImage,
  type ContactInfo, type InsertContactInfo,
  type ContentSection, type InsertContentSection,
  bookingInquiries, contactMessages, heroContent, aboutContent,
  boatingPackages, testimonials, galleryImages, contactInfo, contentSections
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Existing booking and contact methods
  createBookingInquiry(inquiry: InsertBookingInquiry): Promise<BookingInquiry>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getBookingInquiries(): Promise<BookingInquiry[]>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Content management methods
  getHeroContent(): Promise<HeroContent | null>;
  updateHeroContent(content: InsertHeroContent): Promise<HeroContent>;
  
  getAboutContent(): Promise<AboutContent | null>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;
  
  getBoatingPackages(): Promise<BoatingPackage[]>;
  createBoatingPackage(packageData: InsertBoatingPackage): Promise<BoatingPackage>;
  updateBoatingPackage(id: string, packageData: Partial<InsertBoatingPackage>): Promise<BoatingPackage>;
  deleteBoatingPackage(id: string): Promise<void>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;
  
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<void>;
  
  getContactInfo(): Promise<ContactInfo | null>;
  updateContactInfo(info: InsertContactInfo): Promise<ContactInfo>;
  
  getContentSection(sectionKey: string): Promise<ContentSection | null>;
  updateContentSection(sectionKey: string, content: InsertContentSection): Promise<ContentSection>;
}

export class DatabaseStorage implements IStorage {
  // Existing booking and contact methods
  async createBookingInquiry(insertInquiry: InsertBookingInquiry): Promise<BookingInquiry> {
    const [inquiry] = await db
      .insert(bookingInquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    return await db.select().from(bookingInquiries).orderBy(desc(bookingInquiries.createdAt));
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  // Hero Content
  async getHeroContent(): Promise<HeroContent | null> {
    const [content] = await db.select().from(heroContent).where(eq(heroContent.isActive, true)).limit(1);
    return content || null;
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    // First, get existing record
    const existing = await this.getHeroContent();
    
    if (existing) {
      // Update existing
      const [updated] = await db
        .update(heroContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(heroContent.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new
      const [newContent] = await db
        .insert(heroContent)
        .values(content)
        .returning();
      return newContent;
    }
  }

  // About Content
  async getAboutContent(): Promise<AboutContent | null> {
    const [content] = await db.select().from(aboutContent).where(eq(aboutContent.isActive, true)).limit(1);
    return content || null;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (existing) {
      const [updated] = await db
        .update(aboutContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newContent] = await db
        .insert(aboutContent)
        .values(content)
        .returning();
      return newContent;
    }
  }

  // Boating Packages
  async getBoatingPackages(): Promise<BoatingPackage[]> {
    return await db
      .select()
      .from(boatingPackages)
      .where(eq(boatingPackages.isActive, true))
      .orderBy(boatingPackages.sortOrder);
  }

  async createBoatingPackage(packageData: InsertBoatingPackage): Promise<BoatingPackage> {
    const [newPackage] = await db
      .insert(boatingPackages)
      .values(packageData)
      .returning();
    return newPackage;
  }

  async updateBoatingPackage(id: string, packageData: Partial<InsertBoatingPackage>): Promise<BoatingPackage> {
    const [updated] = await db
      .update(boatingPackages)
      .set({ ...packageData, updatedAt: new Date() })
      .where(eq(boatingPackages.id, id))
      .returning();
    return updated;
  }

  async deleteBoatingPackage(id: string): Promise<void> {
    await db
      .update(boatingPackages)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(boatingPackages.id, id));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(testimonials.sortOrder);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updated] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db
      .update(testimonials)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(testimonials.id, id));
  }

  // Gallery Images
  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isActive, true))
      .orderBy(galleryImages.sortOrder);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [newImage] = await db
      .insert(galleryImages)
      .values(image)
      .returning();
    return newImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const [updated] = await db
      .update(galleryImages)
      .set({ ...image, updatedAt: new Date() })
      .where(eq(galleryImages.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await db
      .update(galleryImages)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(galleryImages.id, id));
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | null> {
    const [info] = await db.select().from(contactInfo).where(eq(contactInfo.isActive, true)).limit(1);
    return info || null;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const existing = await this.getContactInfo();
    
    if (existing) {
      const [updated] = await db
        .update(contactInfo)
        .set({ ...info, updatedAt: new Date() })
        .where(eq(contactInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newInfo] = await db
        .insert(contactInfo)
        .values(info)
        .returning();
      return newInfo;
    }
  }

  // Content Sections
  async getContentSection(sectionKey: string): Promise<ContentSection | null> {
    const [section] = await db
      .select()
      .from(contentSections)
      .where(eq(contentSections.sectionKey, sectionKey))
      .limit(1);
    return section || null;
  }

  async updateContentSection(sectionKey: string, content: InsertContentSection): Promise<ContentSection> {
    const existing = await this.getContentSection(sectionKey);
    
    if (existing) {
      const [updated] = await db
        .update(contentSections)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(contentSections.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSection] = await db
        .insert(contentSections)
        .values({ ...content, sectionKey })
        .returning();
      return newSection;
    }
  }
}

export const storage = new DatabaseStorage();
