import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
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

export const insertBookingInquirySchema = createInsertSchema(bookingInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertBookingInquiry = z.infer<typeof insertBookingInquirySchema>;
export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
