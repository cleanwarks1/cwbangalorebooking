import { NextRequest, NextResponse } from "next/server";
import { handleCreateBooking } from "@/modules/booking/booking.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await handleCreateBooking(body);

    if ("error" in result) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}