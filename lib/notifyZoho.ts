const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_ZOHO_WEBHOOK ||
  "https://flow.zoho.in/60030301239/flow/webhook/incoming?zapikey=1001.11a9ec14dca016a551daa24d56486cd7.2fb8427af9cd4ebffa0b87bf7898a4fe&isdebug=false";

export async function notifyZoho(
  event: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        source: "cleanwarks-landing",
        ...data,
      }),
    });
  } catch (err) {
    // Silent fail — never block the user experience for a notification error
    console.warn("Zoho webhook failed:", err);
  }
}
