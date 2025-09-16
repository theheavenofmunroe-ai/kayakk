import { type BookingInquiry, type InsertBookingInquiry, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createBookingInquiry(inquiry: InsertBookingInquiry): Promise<BookingInquiry>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getBookingInquiries(): Promise<BookingInquiry[]>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private bookingInquiries: Map<string, BookingInquiry>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.bookingInquiries = new Map();
    this.contactMessages = new Map();
  }

  async createBookingInquiry(insertInquiry: InsertBookingInquiry): Promise<BookingInquiry> {
    const id = randomUUID();
    const inquiry: BookingInquiry = { 
      ...insertInquiry,
      id, 
      createdAt: new Date(),
      checkInDate: insertInquiry.checkInDate || "",
      checkOutDate: insertInquiry.checkOutDate || "",
      experiences: insertInquiry.experiences || [],
      specialRequests: insertInquiry.specialRequests || ""
    };
    this.bookingInquiries.set(id, inquiry);
    return inquiry;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    return Array.from(this.bookingInquiries.values());
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
