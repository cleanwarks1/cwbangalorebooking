import { google } from "googleapis";

// ─── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ─── Sheet Column Layout (0-indexed) ─────────────────────────────────────────
// A=0  bookingId
// B=1  name
// C=2  phone
// D=3  serviceType
// E=4  address
// F=5  mapsLink
// G=6  date
// H=7  time
// I=8  sofaSeats
// J=9  status
// K=10 advanceAmount
// L=11 paymentStatus
// M=12 paymentReference
// N=13 price
// O=14 services (summary of all items booked)
// P=15 notes
// Q=16 createdAt

// ─── Append a new row ─────────────────────────────────────────────────────────

export async function appendToSheet(data: any[]) {
  try {
    console.log("Sending to Google Sheets...");
    const sheets = google.sheets({ version: "v4", auth: getAuth() });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [data] },
    });

    console.log("✅ Added to sheet");
  } catch (error) {
    console.error("❌ Google Sheets Error:", error);
  }
}

// ─── Read bookings for a specific date ───────────────────────────────────────

export async function getBookingsByDate(
  date: string
): Promise<Array<{ time: string; sofaSeats: number }>> {
  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:P",
    });

    const rows = res.data.values ?? [];

    return rows
      .filter((row) => row[6] === date && row[9] !== "Cancelled")
      .map((row) => ({
        time: row[7] ?? "",
        sofaSeats: parseInt(row[8]) || 3,
      }));
  } catch (error) {
    console.error("❌ Google Sheets Read Error:", error);
    return [];
  }
}
