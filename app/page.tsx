"use client";

export default function Home() {
  const testBooking = async () => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Rahul",
        phone: "9876543210",
        serviceType: "Sofa Cleaning",
        location: "https://maps.google.com/test",
        date: "2026-04-05",
        time: "10:00 AM",
        notes: "Call before arrival",
      }),
    });

    const data = await res.json();
    console.log(data);
    alert("Check console");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={testBooking}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Test Booking
      </button>
    </div>
  );
}