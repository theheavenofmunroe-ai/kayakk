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
// Database imports - conditionally available based on DATABASE_URL
import { db, withRetry } from "./db";
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

// In-memory storage fallback for when database is not available
export class MemStorage implements IStorage {
  private mockBookingInquiries: BookingInquiry[] = [];
  private mockContactMessages: ContactMessage[] = [];
  private mockHeroContent: HeroContent | null = {
    id: "hero-1",
    title: "Experience the Magic of Munroe Island",
    subtitle: "Backwater Boating Paradise",
    description: "Discover hidden lagoons, diverse bird species, and traditional country boat experiences",
    backgroundImage: "/images/backwater-boat-silhouette.jpg",
    primaryButtonText: "Book Experience",
    secondaryButtonText: "Learn More", 
    scrollHintText: "Scroll to explore",
    isActive: true,
    updatedAt: new Date()
  };
  
  private mockAboutContent: AboutContent | null = {
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
    updatedAt: new Date()
  };

  private mockPackages: BoatingPackage[] = [
    {
      id: "sunrise-special",
      packageId: "sunrise-special",
      title: "Sunrise Special",
      duration: "2 Hours",
      price: "₹800",
      originalPrice: "₹1000",
      description: "Experience the magical sunrise over Munroe Island backwaters with traditional breakfast",
      image: "/images/1 (1).jpg",
      features: ["Early morning boat ride (5:30 AM - 7:30 AM)", "Traditional Kerala breakfast on boat", "Bird watching opportunities", "Photography sessions", "Local guide and stories"],
      isPopular: true,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Sunrise Special package",
      sortOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "family-adventure",
      packageId: "family-adventure", 
      title: "Family Adventure",
      duration: "4 Hours",
      price: "₹1200",
      originalPrice: "₹1500",
      description: "Perfect family experience with lunch, activities, and comfortable boat exploration",
      image: "/images/1 (2).jpg",
      features: ["4-hour guided boat tour", "Traditional Kerala lunch", "Fishing experience for kids", "Island hopping", "Cultural village visit", "Swimming opportunities"],
      isPopular: false,
      whatsappLink: "https://api.whatsapp.com/send?phone=919633836839&text=Hi! I want to book Family Adventure package",
      sortOrder: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private mockTestimonials: Testimonial[] = [
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
      createdAt: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private mockGalleryImages: GalleryImage[] = [
    {
      id: "gallery-1",
      title: "Sunrise Boat Ride",
      description: "Beautiful sunrise over backwaters",
      imageUrl: "/images/1 (20).jpg",
      altText: "Sunrise boat ride",
      category: "boat-tours",
      sortOrder: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private mockContactInfo: ContactInfo | null = {
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
    updatedAt: new Date()
  };

  private mockContentSections: Map<string, ContentSection> = new Map([
    ["munroe-island-main", {
      id: "content-1",
      sectionKey: "munroe-island-main",
      title: "Discover Munroe Island",
      content: "Experience the pristine beauty of Kerala's backwaters through our authentic boating adventures.",
      imageUrl: "/images/canal.jpg",
      isActive: true,
      updatedAt: new Date()
    }]
  ]);

  async createBookingInquiry(insertInquiry: InsertBookingInquiry): Promise<BookingInquiry> {
    const inquiry: BookingInquiry = {
      id: `inquiry-${Date.now()}`,
      fullName: insertInquiry.fullName,
      email: insertInquiry.email,
      phone: insertInquiry.phone,
      numberOfGuests: insertInquiry.numberOfGuests,
      checkInDate: insertInquiry.checkInDate || null,
      checkOutDate: insertInquiry.checkOutDate || null,
      experiences: insertInquiry.experiences || null,
      specialRequests: insertInquiry.specialRequests || null,
      createdAt: new Date()
    };
    this.mockBookingInquiries.push(inquiry);
    return inquiry;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: `message-${Date.now()}`,
      ...insertMessage,
      createdAt: new Date()
    };
    this.mockContactMessages.push(message);
    return message;
  }

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    return this.mockBookingInquiries.slice().reverse();
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.mockContactMessages.slice().reverse();
  }

  async getHeroContent(): Promise<HeroContent | null> {
    return this.mockHeroContent;
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    const updatedContent: HeroContent = {
      id: this.mockHeroContent?.id || "hero-1",
      title: content.title || "Heaven of Munroe",
      subtitle: content.subtitle || "Room Stay & Food Boating Service",
      description: content.description || "Experience Authentic Kerala Backwaters",
      backgroundImage: content.backgroundImage || "/images/backwater-boat-silhouette.jpg",
      primaryButtonText: content.primaryButtonText || "Discover Paradise",
      secondaryButtonText: content.secondaryButtonText || "Book Your Journey",
      scrollHintText: content.scrollHintText || "✨ Scroll down to explore our services",
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    this.mockHeroContent = updatedContent;
    return updatedContent;
  }

  async getAboutContent(): Promise<AboutContent | null> {
    return this.mockAboutContent;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const updatedContent: AboutContent = {
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
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    this.mockAboutContent = updatedContent;
    return updatedContent;
  }

  async getBoatingPackages(): Promise<BoatingPackage[]> {
    return this.mockPackages;
  }

  async createBoatingPackage(packageData: InsertBoatingPackage): Promise<BoatingPackage> {
    const newPackage: BoatingPackage = {
      id: `package-${Date.now()}`,
      packageId: packageData.packageId,
      title: packageData.title,
      duration: packageData.duration,
      price: packageData.price,
      originalPrice: packageData.originalPrice || null,
      description: packageData.description,
      image: packageData.image,
      features: packageData.features,
      isPopular: packageData.isPopular !== undefined ? packageData.isPopular : false,
      whatsappLink: packageData.whatsappLink,
      sortOrder: packageData.sortOrder !== undefined ? packageData.sortOrder : 0,
      isActive: packageData.isActive !== undefined ? packageData.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockPackages.push(newPackage);
    return newPackage;
  }

  async updateBoatingPackage(id: string, packageData: Partial<InsertBoatingPackage>): Promise<BoatingPackage> {
    const index = this.mockPackages.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Package not found");
    
    this.mockPackages[index] = {
      ...this.mockPackages[index],
      ...packageData,
      updatedAt: new Date()
    };
    return this.mockPackages[index];
  }

  async deleteBoatingPackage(id: string): Promise<void> {
    const index = this.mockPackages.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPackages.splice(index, 1);
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.mockTestimonials;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name: testimonial.name,
      platform: testimonial.platform,
      rating: testimonial.rating !== undefined ? testimonial.rating : 5,
      review: testimonial.review,
      userImage: testimonial.userImage,
      reviewDate: testimonial.reviewDate,
      sortOrder: testimonial.sortOrder !== undefined ? testimonial.sortOrder : 0,
      isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockTestimonials.push(newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const index = this.mockTestimonials.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Testimonial not found");
    
    this.mockTestimonials[index] = {
      ...this.mockTestimonials[index],
      ...testimonial,
      updatedAt: new Date()
    };
    return this.mockTestimonials[index];
  }

  async deleteTestimonial(id: string): Promise<void> {
    const index = this.mockTestimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTestimonials.splice(index, 1);
    }
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return this.mockGalleryImages;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const newImage: GalleryImage = {
      id: `gallery-${Date.now()}`,
      title: image.title,
      description: image.description || null,
      imageUrl: image.imageUrl,
      altText: image.altText,
      category: image.category || null,
      sortOrder: image.sortOrder !== undefined ? image.sortOrder : 0,
      isActive: image.isActive !== undefined ? image.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockGalleryImages.push(newImage);
    return newImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const index = this.mockGalleryImages.findIndex(g => g.id === id);
    if (index === -1) throw new Error("Gallery image not found");
    
    this.mockGalleryImages[index] = {
      ...this.mockGalleryImages[index],
      ...image,
      updatedAt: new Date()
    };
    return this.mockGalleryImages[index];
  }

  async deleteGalleryImage(id: string): Promise<void> {
    const index = this.mockGalleryImages.findIndex(g => g.id === id);
    if (index !== -1) {
      this.mockGalleryImages.splice(index, 1);
    }
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    return this.mockContactInfo;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const updatedInfo: ContactInfo = {
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
      isActive: info.isActive !== undefined ? info.isActive : true,
      updatedAt: new Date()
    };
    this.mockContactInfo = updatedInfo;
    return updatedInfo;
  }

  async getContentSection(sectionKey: string): Promise<ContentSection | null> {
    return this.mockContentSections.get(sectionKey) || null;
  }

  async updateContentSection(sectionKey: string, content: InsertContentSection): Promise<ContentSection> {
    const section: ContentSection = {
      id: `section-${Date.now()}`,
      sectionKey,
      title: content.title || null,
      content: content.content,
      imageUrl: content.imageUrl || null,
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    this.mockContentSections.set(sectionKey, section);
    return section;
  }
}

export class DatabaseStorage implements IStorage {
  // Existing booking and contact methods
  async createBookingInquiry(insertInquiry: InsertBookingInquiry): Promise<BookingInquiry> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await withRetry(async () => {
      const [inquiry] = await db!
        .insert(bookingInquiries)
        .values(insertInquiry)
        .returning();
      return inquiry;
    });
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await withRetry(async () => {
      return await db!.select().from(bookingInquiries).orderBy(desc(bookingInquiries.createdAt));
    });
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  // Hero Content
  async getHeroContent(): Promise<HeroContent | null> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await withRetry(async () => {
      const [content] = await db!.select().from(heroContent).where(eq(heroContent.isActive, true)).limit(1);
      return content || null;
    });
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    // First, get existing record
    const existing = await this.getHeroContent();
    
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    
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
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [content] = await db.select().from(aboutContent).where(eq(aboutContent.isActive, true)).limit(1);
    return content || null;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    
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
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await db
      .select()
      .from(boatingPackages)
      .where(eq(boatingPackages.isActive, true))
      .orderBy(boatingPackages.sortOrder);
  }

  async createBoatingPackage(packageData: InsertBoatingPackage): Promise<BoatingPackage> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [newPackage] = await db
      .insert(boatingPackages)
      .values(packageData)
      .returning();
    return newPackage;
  }

  async updateBoatingPackage(id: string, packageData: Partial<InsertBoatingPackage>): Promise<BoatingPackage> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [updated] = await db
      .update(boatingPackages)
      .set({ ...packageData, updatedAt: new Date() })
      .where(eq(boatingPackages.id, id))
      .returning();
    return updated;
  }

  async deleteBoatingPackage(id: string): Promise<void> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    await db
      .update(boatingPackages)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(boatingPackages.id, id));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(testimonials.sortOrder);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [updated] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    await db
      .update(testimonials)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(testimonials.id, id));
  }

  // Gallery Images
  async getGalleryImages(): Promise<GalleryImage[]> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isActive, true))
      .orderBy(galleryImages.sortOrder);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [newImage] = await db
      .insert(galleryImages)
      .values(image)
      .returning();
    return newImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [updated] = await db
      .update(galleryImages)
      .set({ ...image, updatedAt: new Date() })
      .where(eq(galleryImages.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    await db
      .update(galleryImages)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(galleryImages.id, id));
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | null> {
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    const [info] = await db.select().from(contactInfo).where(eq(contactInfo.isActive, true)).limit(1);
    return info || null;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const existing = await this.getContactInfo();
    
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    
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
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    return await withRetry(async () => {
      const [section] = await db!
        .select()
        .from(contentSections)
        .where(eq(contentSections.sectionKey, sectionKey))
        .limit(1);
      return section || null;
    });
  }

  async updateContentSection(sectionKey: string, content: InsertContentSection): Promise<ContentSection> {
    const existing = await this.getContentSection(sectionKey);
    
    if (!db) {
      throw new Error('Database not available. Please check your database configuration.');
    }
    
    return await withRetry(async () => {
      if (existing) {
        const [updated] = await db!
          .update(contentSections)
          .set({ ...content, updatedAt: new Date() })
          .where(eq(contentSections.id, existing.id))
          .returning();
        return updated;
      } else {
        const [newSection] = await db!
          .insert(contentSections)
          .values({ ...content, sectionKey })
          .returning();
        return newSection;
      }
    });
  }
}

// In-memory storage implementation for development without database
class InMemoryStorage implements IStorage {
  private bookingInquiries: BookingInquiry[] = [];
  private contactMessages: ContactMessage[] = [];
  private heroContentData: HeroContent | null = null;
  private aboutContentData: AboutContent | null = null;
  private boatingPackagesData: BoatingPackage[] = [];
  private testimonialsData: Testimonial[] = [];
  private galleryImagesData: GalleryImage[] = [];
  private contactInfoData: ContactInfo | null = null;
  private contentSectionsData: Map<string, ContentSection> = new Map();

  async createBookingInquiry(inquiry: InsertBookingInquiry): Promise<BookingInquiry> {
    const newInquiry: BookingInquiry = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      numberOfGuests: inquiry.numberOfGuests,
      checkInDate: inquiry.checkInDate || null,
      checkOutDate: inquiry.checkOutDate || null,
      experiences: inquiry.experiences || null,
      specialRequests: inquiry.specialRequests || null,
      createdAt: new Date()
    };
    this.bookingInquiries.push(newInquiry);
    return newInquiry;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substr(2, 9),
      name: message.name,
      email: message.email,
      message: message.message,
      createdAt: new Date()
    };
    this.contactMessages.push(newMessage);
    return newMessage;
  }

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    return [...this.bookingInquiries].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return [...this.contactMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getHeroContent(): Promise<HeroContent | null> {
    return this.heroContentData;
  }

  async updateHeroContent(content: InsertHeroContent): Promise<HeroContent> {
    this.heroContentData = {
      id: this.heroContentData?.id || Math.random().toString(36).substr(2, 9),
      title: content.title || "Heaven of Munroe",
      subtitle: content.subtitle || "Room Stay & Food Boating Service",
      description: content.description || "Experience Authentic Kerala Backwaters",
      backgroundImage: content.backgroundImage || "/images/backwater-boat-silhouette.jpg",
      primaryButtonText: content.primaryButtonText || "Discover Paradise",
      secondaryButtonText: content.secondaryButtonText || "Book Your Journey",
      scrollHintText: content.scrollHintText || "✨ Scroll down to explore our services",
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    return this.heroContentData;
  }

  async getAboutContent(): Promise<AboutContent | null> {
    return this.aboutContentData;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    this.aboutContentData = {
      id: this.aboutContentData?.id || Math.random().toString(36).substr(2, 9),
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
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    return this.aboutContentData;
  }

  async getBoatingPackages(): Promise<BoatingPackage[]> {
    return [...this.boatingPackagesData];
  }

  async createBoatingPackage(packageData: InsertBoatingPackage): Promise<BoatingPackage> {
    const newPackage: BoatingPackage = {
      id: Math.random().toString(36).substr(2, 9),
      packageId: packageData.packageId,
      title: packageData.title,
      duration: packageData.duration,
      price: packageData.price,
      originalPrice: packageData.originalPrice || null,
      description: packageData.description,
      image: packageData.image,
      features: packageData.features,
      isPopular: packageData.isPopular !== undefined ? packageData.isPopular : false,
      whatsappLink: packageData.whatsappLink,
      sortOrder: packageData.sortOrder !== undefined ? packageData.sortOrder : 0,
      isActive: packageData.isActive !== undefined ? packageData.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.boatingPackagesData.push(newPackage);
    return newPackage;
  }

  async updateBoatingPackage(id: string, packageData: Partial<InsertBoatingPackage>): Promise<BoatingPackage> {
    const index = this.boatingPackagesData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Package not found');
    
    this.boatingPackagesData[index] = {
      ...this.boatingPackagesData[index],
      ...packageData,
      updatedAt: new Date()
    };
    return this.boatingPackagesData[index];
  }

  async deleteBoatingPackage(id: string): Promise<void> {
    const index = this.boatingPackagesData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Package not found');
    this.boatingPackagesData.splice(index, 1);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return [...this.testimonialsData];
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      name: testimonial.name,
      platform: testimonial.platform,
      rating: testimonial.rating !== undefined ? testimonial.rating : 5,
      review: testimonial.review,
      userImage: testimonial.userImage,
      reviewDate: testimonial.reviewDate,
      sortOrder: testimonial.sortOrder !== undefined ? testimonial.sortOrder : 0,
      isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.testimonialsData.push(newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const index = this.testimonialsData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    
    this.testimonialsData[index] = {
      ...this.testimonialsData[index],
      ...testimonial,
      updatedAt: new Date()
    };
    return this.testimonialsData[index];
  }

  async deleteTestimonial(id: string): Promise<void> {
    const index = this.testimonialsData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    this.testimonialsData.splice(index, 1);
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return [...this.galleryImagesData];
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const newImage: GalleryImage = {
      id: Math.random().toString(36).substr(2, 9),
      title: image.title,
      description: image.description || null,
      imageUrl: image.imageUrl,
      altText: image.altText,
      category: image.category || null,
      sortOrder: image.sortOrder !== undefined ? image.sortOrder : 0,
      isActive: image.isActive !== undefined ? image.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryImagesData.push(newImage);
    return newImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const index = this.galleryImagesData.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Image not found');
    
    this.galleryImagesData[index] = {
      ...this.galleryImagesData[index],
      ...image,
      updatedAt: new Date()
    };
    return this.galleryImagesData[index];
  }

  async deleteGalleryImage(id: string): Promise<void> {
    const index = this.galleryImagesData.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Image not found');
    this.galleryImagesData.splice(index, 1);
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    return this.contactInfoData;
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    this.contactInfoData = {
      id: this.contactInfoData?.id || Math.random().toString(36).substr(2, 9),
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
      isActive: info.isActive !== undefined ? info.isActive : true,
      updatedAt: new Date()
    };
    return this.contactInfoData;
  }

  async getContentSection(sectionKey: string): Promise<ContentSection | null> {
    return this.contentSectionsData.get(sectionKey) || null;
  }

  async updateContentSection(sectionKey: string, content: InsertContentSection): Promise<ContentSection> {
    const existing = this.contentSectionsData.get(sectionKey);
    const section: ContentSection = {
      id: existing?.id || Math.random().toString(36).substr(2, 9),
      sectionKey,
      title: content.title || null,
      content: content.content,
      imageUrl: content.imageUrl || null,
      isActive: content.isActive !== undefined ? content.isActive : true,
      updatedAt: new Date()
    };
    this.contentSectionsData.set(sectionKey, section);
    return section;
  }
}

// Choose storage based on database availability
export const storage = db ? new DatabaseStorage() : new MemStorage();

console.log(db ? "Using Database storage" : "Using In-memory storage fallback");
