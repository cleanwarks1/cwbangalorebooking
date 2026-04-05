import { generateBookingId } from "@/lib/utils";
import dayjs from "dayjs";
import { appendToSheet, getBookingsByDate } from "../../lib/googleSheets";
import { calculatePrice } from "@/lib/pricing";
import { calculateTotalDuration, getBlockedSlots } from "@/lib/duration";

const ADVANCE_AMOUNT = 250;

function buildServicesSummary(data: any): string {
  const parts: string[] = [];
  if (data.sofaSeats > 0)    parts.push(`Sofa: ${data.sofaSeats} seat${data.sofaSeats > 1 ? "s" : ""}`);
  if (data.recliners > 0)    parts.push(`Recliners: ${data.recliners}`);
  if (data.diningChairs > 0) parts.push(`Dining Chairs: ${data.diningChairs}`);
  if (data.mattresses?.length > 0) parts.push(`Mattress: ${data.mattresses.join(", ")}`);
  if (data.carpetSqft > 0)   parts.push(`Carpet: ${data.carpetSqft} sqft`);
  if (data.carType)          parts.push(`Car: ${data.carType}`);
  return parts.join(", ") || "—";
}

export async function createBooking(data: any) {
  console.log("🔥 createBooking called");

  // ── Step 1: Slot conflict check ──────────────────────────────────────────
  const existingBookings = await getBookingsByDate(data.date);
  const blockedSlots = getBlockedSlots(existingBookings);

  // Check if the new booking's time range overlaps any blocked slot
  const duration = calculateTotalDuration({
    sofaSeats:    data.sofaSeats,
    recliners:    data.recliners,
    diningChairs: data.diningChairs,
    carpetSqft:   data.carpetSqft,
    carType:      data.carType,
  });
  const [nh, nm] = data.time.split(":");
  const newStartMin = parseInt(nh) * 60 + parseInt(nm);
  const newEndMin = newStartMin + duration * 60;

  for (const slot of blockedSlots) {
    const [sh, sm] = slot.split(":");
    const slotMin = parseInt(sh) * 60 + parseInt(sm);
    if (slotMin >= newStartMin && slotMin < newEndMin) {
      throw new Error("SLOT_UNAVAILABLE");
    }
  }

  // ── Step 2: Price & payment ───────────────────────────────────────────────
  const price = calculatePrice(data);
  const hasPaid = Boolean(data.upiTransactionId?.trim());

  const bookingId = generateBookingId();

  const booking = {
    bookingId,
    name: data.name,
    phone: data.phone,
    serviceType: data.serviceType || "Sofa Cleaning",
    address: data.address,
    mapsLink: data.mapsLink || "",
    date: data.date,
    time: data.time,
    sofaSeats: data.sofaSeats || 0,
    status: hasPaid ? "Confirmed" : "Awaiting Advance",
    advanceAmount: ADVANCE_AMOUNT,
    paymentStatus: hasPaid ? "Advance Paid" : "Pending",
    paymentReference: data.upiTransactionId || "",
    price,
    services: buildServicesSummary(data),
    notes: data.notes || "",
    createdAt: dayjs().toISOString(),
  };

  console.log("New Booking:", booking);

  // ── Step 3: Store in Google Sheets ────────────────────────────────────────
  // Column order must match layout in googleSheets.ts
  await appendToSheet([
    booking.bookingId,      // A
    booking.name,           // B
    booking.phone,          // C
    booking.serviceType,    // D
    booking.address,        // E
    booking.mapsLink,       // F
    booking.date,           // G
    booking.time,           // H
    booking.sofaSeats,      // I
    booking.status,         // J
    booking.advanceAmount,  // K
    booking.paymentStatus,  // L
    booking.paymentReference, // M
    booking.price,          // N
    booking.services,       // O
    booking.notes,          // P
    booking.createdAt,      // Q
  ]);

  return booking;
}
