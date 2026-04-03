export type BookingStatus =
  | "New Lead"
  | "Awaiting Advance"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Paid"
  | "Cancelled";

export type PaymentStatus = "Pending" | "Advance Paid" | "Fully Paid" | "Refunded";

export interface Booking {
  bookingId: string;
  name: string;
  phone: string;
  serviceType: string;
  // Location
  address: string;
  mapsLink?: string;
  // Schedule
  date: string;
  time: string;
  // Service details
  sofaSeats: number;
  // Status & payment
  status: BookingStatus;
  advanceAmount: number;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  price: number;
  // Meta
  notes?: string;
  createdAt: string;
}
