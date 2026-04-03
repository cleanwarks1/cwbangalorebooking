import { z } from "zod";

export const bookingSchema = z.object({
  // Customer
  name: z.string().min(2),
  phone: z.string().min(10),
  // Service
  serviceType: z.string(),
  sofaSeats: z.number().min(0).optional(),
  recliners: z.number().min(0).optional(),
  diningChairs: z.number().min(0).optional(),
  mattresses: z.array(z.string()).optional(),
  carpetSqft: z.number().min(0).optional(),
  carType: z.string().optional(),
  // Location (split into two fields)
  address: z.string().min(3),
  mapsLink: z.string().optional(),
  // Schedule
  date: z.string(),
  time: z.string(),
  // Payment
  upiTransactionId: z.string().optional(),
  price: z.number().optional(),
  // Notes
  notes: z.string().optional(),
});
