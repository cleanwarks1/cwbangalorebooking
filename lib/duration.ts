// ─── Duration Calculation (sofa seats only) ───────────────────────────────────
// Used internally by getBlockedSlots when reading existing bookings from sheet.

export function calculateDuration(sofaSeats: number): number {
  return sofaSeats * 1.5;
}

// ─── Total Duration (all services) ───────────────────────────────────────────
// Used in the booking page UI and new-booking slot conflict check.
//
// Time estimates per service:
//   Sofa seats  — 1.5h per seat
//   Recliners   — +45 min each
//   Dining chairs — +15 min each
//   Carpet      — ≤50 sqft: +30 min | ≤150: +1h | ≤300: +1.5h | >300: +2h
//   Car         — Hatchback: +1.5h | Sedan: +2h | SUV: +2.5h | Luxury: +3h

type ServiceData = {
  sofaSeats?: number;
  recliners?: number;
  diningChairs?: number;
  mattressCount?: number;
  carpetSqft?: number;
  carType?: string;
};

const CAR_DURATION: Record<string, number> = {
  hatchback: 1.5,
  sedan: 2,
  suv: 2.5,
  luxury: 3,
};

export function calculateTotalDuration(data: ServiceData): number {
  let total = 0;

  const seats = data.sofaSeats ?? 0;
  if (seats > 0) total += calculateDuration(seats);

  if (data.recliners)     total += data.recliners * 0.75;
  if (data.diningChairs)  total += data.diningChairs * 0.25;
  if (data.mattressCount) total += data.mattressCount * 1;

  const sqft = data.carpetSqft ?? 0;
  if (sqft > 0) {
    if      (sqft <= 50)  total += 0.5;
    else if (sqft <= 150) total += 1;
    else if (sqft <= 300) total += 1.5;
    else                  total += 2;
  }

  if (data.carType) total += CAR_DURATION[data.carType] ?? 0;

  // Minimum 1.5h — avoids collapsing to 0 when only minor items are selected
  return Math.max(total, 1.5);
}

// ─── Available Time Slots (8 AM – 8 PM, 30-min intervals) ────────────────────

export const ALL_SLOTS = [
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00",
];

// ─── Format "14:30" → "2:30 PM" ──────────────────────────────────────────────

export function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// ─── Compute blocked slots from existing bookings ─────────────────────────────
// A slot is "blocked" if it falls within [bookingStart, bookingStart + duration + 30min buffer]

export function getBlockedSlots(
  bookings: Array<{ time: string; sofaSeats: number }>
): Set<string> {
  const blocked = new Set<string>();

  for (const b of bookings) {
    const duration = calculateDuration(b.sofaSeats);
    const [hStr, mStr] = b.time.split(":");
    const startMin = parseInt(hStr) * 60 + parseInt(mStr);
    const endMin = startMin + duration * 60 + 30; // +30 min buffer

    for (const slot of ALL_SLOTS) {
      const [sh, sm] = slot.split(":");
      const slotMin = parseInt(sh) * 60 + parseInt(sm);
      if (slotMin >= startMin && slotMin < endMin) {
        blocked.add(slot);
      }
    }
  }

  return blocked;
}
