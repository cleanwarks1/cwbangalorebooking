"use client";

import { useState, useEffect, useCallback } from "react";
import { calculatePrice } from "@/lib/pricing";
import { calculateTotalDuration, ALL_SLOTS, formatSlot } from "@/lib/duration";

// ─── Config ───────────────────────────────────────────────────────────────────

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID ?? "9745751033@ibl";
const BOOKING_OPENS = "2026-04-06"; // No slots available before this date
const ADVANCE = 250;
const SOFA_PRICES: Record<number, number> = {
  1: 500,
  2: 900,
  3: 1200,
  4: 1600,
  5: 2000,
};
const CAR_PRICES: Record<string, number> = {
  hatchback: 1500,
  sedan: 1800,
  suv: 2400,
  luxury: 3000,
};
const CAR_LABELS: Record<string, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  suv: "SUV",
  luxury: "Luxury / MUV",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  phone: string;
  sofaSeats: number;
  recliners: number;
  diningChairs: number;
  carpetSqft: number;
  carType: string;
  address: string;
  mapsLink: string;
  date: string;
  time: string;
  upiTransactionId: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  sofaSeats: 0,
  recliners: 0,
  diningChairs: 0,
  carpetSqft: 0,
  carType: "",
  address: "",
  mapsLink: "",
  date: "",
  time: "",
  upiTransactionId: "",
  notes: "",
};

// ─── Price Breakdown ──────────────────────────────────────────────────────────

function getPriceLines(form: FormState) {
  const lines: { label: string; amount: number }[] = [];

  if (form.sofaSeats > 0) {
    const amt = SOFA_PRICES[form.sofaSeats] ?? form.sofaSeats * 400;
    lines.push({
      label: `Sofa — ${form.sofaSeats} seat${form.sofaSeats > 1 ? "s" : ""}`,
      amount: amt,
    });
  }
  if (form.recliners > 0) {
    lines.push({ label: `Recliners × ${form.recliners}`, amount: form.recliners * 700 });
  }
  if (form.diningChairs > 0) {
    lines.push({ label: `Dining Chairs × ${form.diningChairs}`, amount: form.diningChairs * 100 });
  }
  if (form.carpetSqft > 0) {
    let rate = 25;
    if (form.carpetSqft > 50) rate = 20;
    if (form.carpetSqft > 150) rate = 16;
    if (form.carpetSqft > 300) rate = 13;
    const amt = Math.max(500, form.carpetSqft * rate);
    lines.push({ label: `Carpet — ${form.carpetSqft} sq ft`, amount: amt });
  }
  if (form.carType) {
    const amt = CAR_PRICES[form.carType] ?? 0;
    lines.push({ label: `Car Seat — ${CAR_LABELS[form.carType] ?? form.carType}`, amount: amt });
  }

  return lines;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState("");
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<{
    bookingId: string;
    paymentStatus: string;
    price: number;
  } | null>(null);

  // ── Derived values ─────────────────────────────────────────────────────────

  const price = calculatePrice({
    ...form,
    serviceType: "Sofa Cleaning",
    mattresses: [],
  });
  const balance = Math.max(0, price - ADVANCE);
  const priceLines = getPriceLines(form);
  const duration = calculateTotalDuration({
    sofaSeats:    form.sofaSeats,
    recliners:    form.recliners,
    diningChairs: form.diningChairs,
    carpetSqft:   form.carpetSqft,
    carType:      form.carType,
  });
  // today is set client-side only to avoid SSR/client hydration mismatch
  const minDate = today && today > BOOKING_OPENS ? today : BOOKING_OPENS;

  // Slots that are displayable: ends before 7 PM, not in the past (for today)
  const displayableSlots = ALL_SLOTS.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    const slotMin = h * 60 + m;
    // Must complete before 7 PM
    if (slotMin + duration * 60 > 20 * 60) return false;
    // For today, skip past slots
    if (form.date === today) {
      const d = new Date();
      d.setHours(h, m, 0, 0);
      if (d <= new Date()) return false;
    }
    return true;
  });

  // A slot is available if no blocked slot falls within the new booking's window
  const blockedMinutes = new Set(
    blockedSlots.map((s) => {
      const [h, m] = s.split(":").map(Number);
      return h * 60 + m;
    })
  );

  function isSlotAvailable(slot: string): boolean {
    const [h, m] = slot.split(":").map(Number);
    const startMin = h * 60 + m;
    const endMin = startMin + duration * 60;
    for (const bMin of blockedMinutes) {
      if (bMin >= startMin && bMin < endMin) return false;
    }
    return true;
  }

  const availableCount = displayableSlots.filter(isSlotAvailable).length;

  // ── Set today client-side (avoids SSR hydration mismatch) ────────────────

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  // ── Fetch blocked slots when date changes ──────────────────────────────────

  useEffect(() => {
    if (!form.date) {
      setBlockedSlots([]);
      return;
    }
    setSlotsLoading(true);
    fetch(`/api/bookings/slots?date=${form.date}`)
      .then((r) => r.json())
      .then((d) => setBlockedSlots(d.blockedSlots ?? []))
      .catch(() => setBlockedSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [form.date]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleCounter = useCallback(
    (name: "sofaSeats" | "recliners" | "diningChairs" | "carpetSqft", value: number) => {
      setForm((prev) => ({
        ...prev,
        [name]: Math.max(0, value),
        // Reset time when sofa count changes — viable slots may change
        ...(name === "sofaSeats" ? { time: "" } : {}),
      }));
    },
    []
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, date: e.target.value, time: "" }));
    setError("");
  };

  const handleCopyUPI = () => {
    try {
      navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fallback — UPI ID is visible for manual copy
    }
  };

  const handleSubmit = async () => {
    setError("");

    // ── Client-side validation ────────────────────────────────────────────
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (form.phone.replace(/\D/g, "").length < 10)
      return setError("Please enter a valid 10-digit phone number.");
    const hasService =
      form.sofaSeats > 0 || form.carpetSqft > 0 || form.carType !== "";
    if (!hasService)
      return setError("Please select at least one item to clean.");
    if (!form.address.trim())
      return setError("Please enter your address.");
    if (!form.date) return setError("Please select a service date.");
    if (!form.time) return setError("Please select a time slot.");

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceType: "Sofa Cleaning",
          mattresses: [],
          price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted({
        bookingId: data.booking.bookingId,
        paymentStatus: data.booking.paymentStatus,
        price: data.booking.price,
      });
      setForm(initialForm);
    } catch {
      setError("Network error. Please check your connection and try again.");
    }

    setLoading(false);
  };

  // ── Success Screen ─────────────────────────────────────────────────────────

  if (submitted) {
    const isPaid = submitted.paymentStatus === "Advance Paid";
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                isPaid ? "bg-green-50" : "bg-amber-50"
              }`}
            >
              {isPaid ? (
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {isPaid ? "Booking Confirmed!" : "Request Received!"}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {isPaid
                ? "Your advance payment is noted. Our team will reach out within 30 minutes."
                : "Please complete the ₹250 UPI advance to lock in your slot. Our team will contact you shortly."}
            </p>

            {/* Booking ID */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs text-gray-400 mb-1">Booking Reference</p>
              <p className="font-mono font-bold text-gray-900 text-base tracking-wide">
                {submitted.bookingId}
              </p>
            </div>

            {/* Summary */}
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Total</span>
              <span className="font-semibold text-gray-900">
                ₹{submitted.price.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Status</span>
              <span
                className={`font-semibold ${
                  isPaid ? "text-green-600" : "text-amber-600"
                }`}
              >
                {submitted.paymentStatus}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Screenshot this for your records.
            </p>

            <button
              onClick={() => setSubmitted(null)}
              className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="w-full max-w-lg mx-auto space-y-4">

        {/* ── Header ── */}
        <div className="text-center pb-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            CleanWarks Bangalore
          </p>
          <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
            Book a Cleaning
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Sofa · Carpet · Car seats · At your doorstep
          </p>
        </div>

        {/* ── 01 Customer Details ── */}
        <Card step="01" title="Your Details">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={inputCls}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={inputCls}
          />
        </Card>

        {/* ── 02 Service Details ── */}
        <Card step="02" title="Service Details">
          {/* Service label — always Sofa Cleaning */}
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-3.5 py-2 rounded-xl text-sm font-medium">
            <span>🛋️</span>
            <span>Sofa Cleaning</span>
          </div>

          <div className="h-px bg-gray-100" />

          <CounterRow
            label="Sofa Seats"
            subLabel="3-seater sofa = 3 seats"
            value={form.sofaSeats}
            onChange={(v) => handleCounter("sofaSeats", v)}
          />
          <CounterRow
            label="Recliners"
            subLabel="₹700 per recliner"
            value={form.recliners}
            onChange={(v) => handleCounter("recliners", v)}
          />
          <CounterRow
            label="Dining Chairs"
            subLabel="₹100 per chair"
            value={form.diningChairs}
            onChange={(v) => handleCounter("diningChairs", v)}
          />

          <div className="h-px bg-gray-100" />

          {/* Carpet Cleaning */}
          <div className="flex items-center justify-between py-0.5">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm font-medium text-gray-800">Carpet Cleaning</p>
              <p className="text-xs text-gray-400 mt-0.5">Enter total area in sq ft</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <input
                type="number"
                name="carpetSqft"
                value={form.carpetSqft || ""}
                placeholder="0"
                min={0}
                onChange={(e) =>
                  handleCounter("carpetSqft", parseInt(e.target.value) || 0)
                }
                className="w-24 border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400 transition"
              />
              <span className="text-xs text-gray-400 w-8">sq ft</span>
            </div>
          </div>

          {/* Car Seat Cleaning */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-1.5">Car Seat Cleaning</p>
            <select
              name="carType"
              value={form.carType}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">No Car</option>
              <option value="hatchback">Hatchback — ₹1,500</option>
              <option value="sedan">Sedan — ₹1,800</option>
              <option value="suv">SUV — ₹2,400</option>
              <option value="luxury">Luxury / MUV — ₹3,000</option>
            </select>
          </div>

          {priceLines.length > 0 && (
            <p className="text-xs text-gray-400 pt-0.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Estimated duration: {duration % 1 === 0 ? duration : duration.toFixed(1)} hours
            </p>
          )}
        </Card>

        {/* ── 03 Address ── */}
        <Card step="03" title="Your Address">
          <input
            name="address"
            placeholder="Flat/house, building, street, area"
            value={form.address}
            onChange={handleChange}
            className={inputCls}
          />
          <input
            name="mapsLink"
            placeholder="Google Maps link (optional but helpful)"
            value={form.mapsLink}
            onChange={handleChange}
            className={inputCls}
          />
          <p className="text-xs text-gray-400">
            A Maps pin helps our team arrive faster.
          </p>
        </Card>

        {/* ── 04 Schedule ── */}
        <Card step="04" title="Pick a Date & Time">
          <input
            type="date"
            name="date"
            value={form.date}
            min={minDate}
            onChange={handleDateChange}
            className={inputCls}
          />

          {form.date && (
            <div className="space-y-3 pt-1">
              {slotsLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-1">
                  <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
                  Checking availability…
                </div>
              ) : displayableSlots.length === 0 ? (
                <p className="text-sm text-red-500 py-1">
                  No slots available for this date. Please pick another day.
                </p>
              ) : (
                <>
                  <p className="text-xs text-gray-400">
                    {availableCount} slot{availableCount !== 1 ? "s" : ""} available
                    {priceLines.length > 0 && (
                      <span className="ml-1">
                        · {duration % 1 === 0 ? duration : duration.toFixed(1)}h per booking
                      </span>
                    )}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {displayableSlots.map((slot) => {
                      const available = isSlotAvailable(slot);
                      const selected = form.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!available}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, time: slot }))
                          }
                          className={[
                            "py-2.5 rounded-xl text-xs font-medium transition select-none",
                            !available
                              ? "bg-gray-100 text-gray-300 line-through cursor-not-allowed"
                              : selected
                              ? "bg-gray-900 text-white shadow-sm"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400",
                          ].join(" ")}
                        >
                          {formatSlot(slot)}
                        </button>
                      );
                    })}
                  </div>
                  {availableCount === 0 && (
                    <p className="text-sm text-red-500 text-center pt-1">
                      All slots are booked for this date. Please try another day.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </Card>

        {/* ── 05 Price Summary ── */}
        <Card step="05" title="Price Summary">
          {priceLines.length === 0 ? (
            <p className="text-sm text-gray-400 py-1">
              Add items above to see your price estimate.
            </p>
          ) : (
            <div className="space-y-2.5">
              {/* Line items */}
              {priceLines.map((line) => (
                <div key={line.label} className="flex justify-between text-sm">
                  <span className="text-gray-600">{line.label}</span>
                  <span className="font-medium text-gray-900">
                    ₹{line.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className="h-px bg-gray-100" />

              {/* Total */}
              <div className="flex justify-between text-sm font-bold text-gray-900">
                <span>Total</span>
                <span>₹{price.toLocaleString("en-IN")}</span>
              </div>

              {/* Advance */}
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700 font-medium">
                  Advance (pay now)
                </span>
                <span className="text-emerald-700 font-bold">
                  ₹{ADVANCE.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Balance */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>Balance on service day</span>
                <span>₹{balance.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </Card>

        {/* ── 06 Advance Payment ── */}
        <Card step="06" title="Advance Payment">
          {/* Notice */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-900">
              ₹250 advance required to confirm your slot
            </p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              This is adjusted in your final bill. Pay via UPI and paste the
              transaction ID below.
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2 py-1">
            <img
              src="/upi-qr.png"
              alt="Scan to pay ₹250 advance"
              className="w-44 h-44 rounded-2xl border border-gray-100"
            />
            <p className="text-xs text-gray-400">Scan with any UPI app to pay</p>
          </div>

          {/* UPI ID */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <div>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                UPI ID
              </p>
              <p className="font-mono font-bold text-gray-900 text-sm select-all">
                {UPI_ID}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyUPI}
              className={[
                "text-xs font-medium px-3 py-1.5 rounded-lg border transition",
                copied
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
              ].join(" ")}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          {/* Transaction ID input */}
          <input
            name="upiTransactionId"
            placeholder="UPI Transaction ID (e.g. 407812345678)"
            value={form.upiTransactionId}
            onChange={handleChange}
            className={inputCls}
          />

          <p className="text-xs text-gray-400">
            Haven&apos;t paid yet? You can still submit — our team will call to
            collect the advance before confirming your slot.
          </p>
        </Card>

        {/* ── Notes (optional, no card) ── */}
        <textarea
          name="notes"
          placeholder="Special instructions — fabric type, stains, access details, etc."
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className={inputCls}
        />

        {/* ── Error Banner ── */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {/* ── Submit Button ── */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold text-base hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Confirming…
            </span>
          ) : (
            `Confirm Booking${
              priceLines.length > 0
                ? ` — ₹${price.toLocaleString("en-IN")}`
                : ""
            }`
          )}
        </button>

        <p className="text-center text-xs text-gray-400 pb-6">
          Free cancellation up to 2 hours before the service.
        </p>

      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full border border-gray-200 bg-white px-3.5 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400 transition";

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 leading-none">
          {step}
        </span>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── CounterRow ───────────────────────────────────────────────────────────────

function CounterRow({
  label,
  subLabel,
  value,
  onChange,
}: {
  label: string;
  subLabel?: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {subLabel && (
          <p className="text-xs text-gray-400 mt-0.5">{subLabel}</p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value === 0}
          className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 text-xl flex items-center justify-center hover:bg-gray-50 disabled:opacity-25 transition"
        >
          −
        </button>
        <span className="w-5 text-center font-bold text-gray-900 tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-9 h-9 rounded-full bg-gray-900 text-white text-xl flex items-center justify-center hover:bg-black transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
