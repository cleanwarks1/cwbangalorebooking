import { NextRequest, NextResponse } from "next/server";
import { getBookingsByDate } from "@/lib/googleSheets";
import { getBlockedSlots } from "@/lib/duration";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ blockedSlots: [] });
  }

  try {
    const bookings = await getBookingsByDate(date);
    const blocked = getBlockedSlots(bookings);
    return NextResponse.json({ blockedSlots: Array.from(blocked) });
  } catch (error) {
    console.error("Slots API error:", error);
    // Fail open — better to show all slots than block the booking flow
    return NextResponse.json({ blockedSlots: [] });
  }
}
