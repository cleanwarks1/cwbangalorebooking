export async function notifyZoho(
  event: string,
  data: Record<string, unknown> = {}
): Promise<void> {
  try {
    await fetch("/api/notify", {
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
