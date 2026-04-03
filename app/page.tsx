"use client";

import { useState } from "react";
import BookingForm from "@/app/components/BookingForm";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">{question}</span>
        <span className={`text-orange-500 text-xs flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-gray-50 text-slate-500 text-sm leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openBooking = () => setDrawerOpen(true);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky Header ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/80x80-no-shade.png" alt="Clean Warks" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-gray-900 text-base">Clean Warks</span>
          </div>
          <button
            onClick={openBooking}
            className="border-2 border-orange-500 text-orange-500 bg-transparent px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 pt-14 pb-16">
        <div className="max-w-2xl mx-auto text-center">

          {/* Trust badge */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              background: "#ffffff",
              borderRadius: "100px",
              padding: "8px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              color: "#0f172a",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#f59e0b" }}>⭐</span>
            4.9 Google Rating &nbsp;·&nbsp; 500+ Happy Customers
          </div>

          <h1
            className="font-black leading-tight mb-4 tracking-tight"
            style={{ fontSize: "clamp(36px, 5.5vw, 60px)" }}
          >
            Professional Sofa Cleaning
            <br className="hidden sm:block" />
            <span className="text-orange-400 italic"> in Bangalore</span>
          </h1>

          <p className="text-slate-300 text-lg mb-3 leading-relaxed">
            Machine-powered deep cleaning that extracts allergens, dust mites, and stains
            — not just pushes them around. Trained &amp; verified team, at your doorstep.
          </p>
          <p className="text-white font-bold text-xl mb-8">Starts ₹500/seat.</p>

          {/* Primary CTA — opens booking popup */}
          <button
            onClick={openBooking}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-orange-600 active:scale-95 transition-all shadow-2xl shadow-orange-500/30 w-full sm:w-auto"
          >
            Book Your Slot Now →
          </button>

          {/* Secondary WhatsApp CTA */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/917034455665?text=Hi%2C+I%27d+like+to+book+sofa+cleaning+in+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-hero"
            >
              💬 Or book via WhatsApp
            </a>
          </div>

          <p className="text-slate-400 text-xs mt-3">
            Free cancellation · No hidden charges · Available Mon–Sat, 8 AM – 8 PM
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { icon: "✓", label: "Verified Team" },
              { icon: "🔬", label: "Machine-Based" },
              { icon: "🏠", label: "At Your Doorstep" },
              { icon: "💰", label: "No Hidden Costs" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-xl px-3 py-2.5 text-sm text-slate-200"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <span className="mr-1.5">{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-6" style={{ background: "#1e293b" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { num: "500+", label: "Sofas Cleaned" },
            { num: "7+", label: "Years Experience" },
            { num: "4.9★", label: "Google Rating" },
            { num: "20+", label: "Areas in Bangalore" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="font-black text-orange-500"
                style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800 }}
              >
                {s.num}
              </p>
              <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem Section ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Is Your Sofa <span className="text-orange-500">Actually</span> Clean?
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
            The average sofa hosts millions of dust mites, bacteria, and allergens — invisible to the eye, but harmful to your family every single day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "🦠",
                title: "Dust Mites & Bacteria",
                desc: "Up to 1 million dust mites live in the average sofa. They trigger allergies, skin rashes, and respiratory issues — especially in children.",
              },
              {
                emoji: "🐾",
                title: "Pet Hair & Dander",
                desc: "Pet allergens embed deep in sofa fibres. Surface cleaning barely scratches the surface — professional extraction is the only real fix.",
              },
              {
                emoji: "☕",
                title: "Stains & Bad Odours",
                desc: "Food spills, sweat, and moisture create stubborn stains and lingering smells that won't go away no matter how much you spray.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 text-left shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-base">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            How It Works
          </h2>
          <p className="text-slate-500 text-center mb-12 text-lg">Three simple steps. We handle everything else.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Book Online", desc: "Pick your services and preferred slot. Takes less than 2 minutes. Instant confirmation." },
              { step: "02", title: "We Come to You", desc: "Our trained & verified team arrives on time with all professional equipment. No preparation needed." },
              { step: "03", title: "Deep Clean Done", desc: "Machine-extraction cleaning that actually removes dirt. Dries in 4–6 hours, then enjoy your fresh sofa." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-16 h-16 flex items-center justify-center text-2xl font-black mx-auto mb-4"
                  style={{
                    background: "#1e293b",
                    border: "2px solid #f97316",
                    borderRadius: "50%",
                    color: "#f97316",
                  }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={openBooking}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
            >
              Book Now — Pick Your Slot
            </button>
          </div>
        </div>
      </section>

      {/* ── Why Choose Clean Warks ─────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-black text-center mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Why Choose Clean Warks?
          </h2>
          <p className="text-slate-400 text-center mb-10 text-lg">We're not just another cleaning service.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Machine Hot-Water Extraction",
                desc: "Professional-grade machines — not spray bottles and brushes. We extract dirt, bacteria, and allergens from deep within the fabric.",
              },
              {
                title: "Trained & Verified Team",
                desc: "Every technician is background-checked, uniformed, and trained on fabric-safe cleaning techniques before they enter your home.",
              },
              {
                title: "Premium Imported Solutions",
                desc: "Safe, effective cleaning agents that are gentle on your fabric but tough on stains and allergens. No cheap substitutes.",
              },
              {
                title: "All Fabric Types Covered",
                desc: "Cotton, linen, polyester, microfibre, velvet — we assess your fabric and adjust technique for the best results.",
              },
              {
                title: "Transparent Pricing",
                desc: "What you see online is exactly what you pay. No surprise charges, no upselling at your doorstep.",
              },
              {
                title: "100% Satisfaction Guarantee",
                desc: "Not happy with the results? We'll re-clean at no extra cost. Your satisfaction is our only measure of success.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 rounded-2xl p-5 flex gap-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#16a34a" }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16" style={{ background: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-center mb-10 text-lg">No hidden charges. Exactly what you see is what you pay.</p>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Sofa row — highlighted "Most Booked" */}
            <div
              className="relative flex items-center justify-between px-6 py-4"
              style={{
                border: "2px solid #f97316",
                boxShadow: "0 4px 20px rgba(249,115,22,0.12)",
                borderRadius: "inherit",
              }}
            >
              <div>
                <p className="text-sm font-medium text-slate-800">Sofa — per seat</p>
                <p className="text-xs text-slate-400 mt-0.5">3-seater ₹1,200 · 5-seater ₹2,000</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-white font-semibold"
                  style={{
                    background: "#f97316",
                    fontSize: "11px",
                    borderRadius: "100px",
                    padding: "3px 10px",
                  }}
                >
                  Most Booked
                </span>
                <span className="font-bold text-slate-900 text-base">₹500</span>
              </div>
            </div>

            {/* Remaining rows */}
            {[
              { service: "Recliner — per unit", price: "₹700", note: "" },
              { service: "Dining Chair — per chair", price: "₹100", note: "" },
              { service: "Carpet Cleaning", price: "₹25/sqft", note: "Lower rates for larger areas" },
              { service: "Car Seats — Hatchback", price: "₹1,500", note: "" },
              { service: "Car Seats — Sedan", price: "₹1,800", note: "" },
              { service: "Car Seats — SUV / MUV", price: "₹2,400+", note: "" },
            ].map((row) => (
              <div key={row.service} className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
                <div>
                  <p className="text-sm font-medium text-slate-800">{row.service}</p>
                  {row.note && <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>}
                </div>
                <span className="font-bold text-slate-900 text-base">{row.price}</span>
              </div>
            ))}
          </div>

          {/* Minimum visit charge — info box */}
          <div
            className="flex items-center justify-between mt-4"
            style={{ background: "#f1f5f9", borderRadius: "8px", padding: "12px 16px" }}
          >
            <p className="text-sm font-semibold text-slate-700">ℹ️ &nbsp;Minimum visit charge</p>
            <span className="font-black text-slate-800 text-base">₹2,000</span>
          </div>

          {/* Popular Combo */}
          <div
            className="mt-6"
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <p className="text-sm font-semibold text-orange-700 mb-1">🔥 Popular Combo</p>
            <p className="font-bold text-slate-900 text-base mb-1">3-Seater Sofa + 4 Dining Chairs</p>
            <p className="text-slate-600 text-sm mb-4">
              ₹1,200 + ₹400 = <strong>₹1,600 total</strong>
            </p>
            <button
              onClick={openBooking}
              className="text-white font-bold text-sm"
              style={{
                background: "#f97316",
                borderRadius: "8px",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Book This Combo →
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={openBooking}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
            >
              Book Now — Get Your Instant Estimate
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-5 h-5" style={{ color: "#f59e0b" }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-slate-500 text-sm ml-2 font-medium">4.9 on Google</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Reya Mathew",          initials: "RM", color: "#3b82f6", text: "Very professional team. They came on time, worked efficiently and the sofa looks brand new. Will definitely book again!" },
              { name: "Arun Joy",             initials: "AJ", color: "#8b5cf6", text: "Excellent service! The machines they use are really effective — stains I thought were permanent are completely gone. Highly recommended." },
              { name: "Pramod Prabhakaran",   initials: "PP", color: "#10b981", text: "Well-trained team. They knew exactly how to handle my velvet sofa without damaging it. Results were amazing." },
              { name: "Soumya Rajan",         initials: "SR", color: "#f59e0b", text: "Booking was simple, the team was punctual, and the sofa looks incredible. Will definitely use again." },
              { name: "Thomson Cyriac",       initials: "TC", color: "#ef4444", text: "Very friendly and professional staff. Thorough cleaning, no damage to fabric at all. Great value for money." },
            ].map((review) => (
              <div key={review.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 relative">
                {/* Google Review label top-right */}
                <p
                  className="absolute top-4 right-4"
                  style={{ fontSize: "11px", color: "#94a3b8" }}
                >
                  Google Review
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: "#f59e0b" }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center text-white font-bold"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: review.color,
                      fontSize: "14px",
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-bold">{review.name}</p>
                    <p className="text-slate-400 text-xs">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View all reviews */}
          <div className="text-center mt-8">
            <a
              href="https://g.page/r/CcleanwarksGoogleReviews"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f97316", fontSize: "14px" }}
            >
              View all Clean Warks reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ── Service Areas ──────────────────────────────────────────────────── */}
      <section className="px-4 py-16" style={{ background: "#1e293b" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-black text-white mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            We Serve Across Bangalore
          </h2>
          <p className="text-slate-300 mb-8">Covering 20+ neighbourhoods. Enter your area during booking to confirm.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "HSR Layout", "Koramangala", "Indiranagar", "Whitefield", "Marathahalli",
              "Electronic City", "JP Nagar", "BTM Layout", "Bannerghatta Road", "Sarjapur Road",
              "Hebbal", "Yelahanka", "Bellandur", "Brookefield", "Kadugodi",
              "Nagarbhavi", "Rajajinagar", "Jayanagar", "Basavanagudi", "Malleswaram",
            ].map((area) => (
              <span
                key={area}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  borderRadius: "100px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  display: "inline-block",
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-black text-slate-900 text-center mb-10"
            style={{ letterSpacing: "-0.02em" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              { q: "How long does sofa cleaning take?", a: "Typically 30–60 minutes for a standard 3-seater sofa, depending on size and condition. Our team will give you a precise estimate on arrival." },
              { q: "How long does the sofa take to dry?", a: "The sofa will be slightly damp after cleaning and dries completely in 4–6 hours. We recommend keeping windows open for good ventilation." },
              { q: "Is the cleaning safe for my sofa fabric?", a: "Yes. We work with cotton, linen, polyester, microfibre, and most fabric types. We assess your fabric before starting and adjust our technique accordingly to avoid any damage." },
              { q: "Do I need to be present during the service?", a: "Yes, we recommend being home. Our team will need access to the sofa and may need your guidance on specific stains or delicate areas." },
              { q: "What if I'm not satisfied with the results?", a: "We offer a 100% satisfaction guarantee. If you're not happy, we'll re-clean at no extra cost — no questions asked." },
              { q: "What areas in Bangalore do you cover?", a: "We cover 20+ areas including HSR Layout, Koramangala, Indiranagar, Whitefield, JP Nagar, Electronic City, BTM Layout, and more. Book and we'll confirm your pincode." },
              { q: "How does payment work?", a: "A small ₹250 advance is paid via UPI to confirm your slot. The remaining balance is collected on the day of service after the job is done." },
            ].map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 text-center text-white" style={{ background: "#1e293b" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-3">Ready for a fresh sofa?</p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Book Your Cleaning Today
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Slots are limited. Verified team. Professional results. At your doorstep.
          </p>
          <button
            onClick={openBooking}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-orange-600 active:scale-95 transition-all shadow-xl w-full sm:w-auto"
          >
            Book Now — Starts ₹500/seat
          </button>
          <p className="text-slate-400 text-xs mt-4">Free cancellation · No hidden charges · Verified team</p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="px-4 py-8 text-center text-sm text-slate-400" style={{ background: "#020617" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/80x80-no-shade.png" alt="Clean Warks" className="w-6 h-6 rounded" />
          <span className="font-bold text-white">Clean Warks</span>
        </div>
        <p>Professional Cleaning Services · Bangalore</p>
        <p className="mt-2 text-slate-500 text-xs">© 2026 Clean Warks. All rights reserved.</p>
      </footer>

      {/* ── Floating WhatsApp (mobile only) ────────────────────────────────── */}
      <a
        href="https://wa.me/917034455665?text=Hi%2C+I%27d+like+to+book+sofa+cleaning+in+Bangalore"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>

      {/* ── Sticky Mobile Bottom Bar ────────────────────────────────────────── */}
      <div className="mobile-cta-bar">
        <a href="tel:+917034455665" className="mobile-btn-call">📞 Call Us</a>
        <button className="mobile-btn-book" onClick={openBooking}>
          Book Now — ₹500/seat
        </button>
      </div>

      {/* ── Booking Drawer ─────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full sm:max-w-lg sm:mx-4 bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="sticky top-0 bg-white px-5 pt-3 pb-3 flex items-center justify-between border-b border-gray-100 z-10">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Clean Warks Bangalore</p>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">Book a Cleaning</h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="px-4 pt-4 pb-10">
              <BookingForm showHeader={false} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
