import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_ZOHO_WEBHOOK ||
  "https://flow.zoho.in/60030301239/flow/webhook/incoming?zapikey=1001.11a9ec14dca016a551daa24d56486cd7.2fb8427af9cd4ebffa0b87bf7898a4fe&isdebug=false";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Silent fail — never block the user experience
    return NextResponse.json({ ok: false });
  }
}
