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
        <span className={`text-gray-400 text-xs flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
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
            <img src="/80x80-no-shade.png" alt="Cleanwarks" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-gray-900 text-base">Cleanwarks</span>
          </div>
          <button
            onClick={openBooking}
            className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-600 active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 pt-14 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide">
            ⭐ 4.9 Google Rating &nbsp;·&nbsp; 500+ Happy Customers
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4 tracking-tight">
            Professional Sofa Cleaning<br className="hidden sm:block" />
            <span className="text-orange-400"> in Bangalore</span>
          </h1>
          <p className="text-slate-300 text-lg mb-3 leading-relaxed">
            Machine-powered deep cleaning that extracts allergens, dust mites, and stains
            — not just pushes them around. Trained & verified team, at your doorstep.
          </p>
          <p className="text-white font-bold text-xl mb-8">Starts ₹500/seat.</p>

          <button
            onClick={openBooking}
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-orange-600 active:scale-95 transition-all shadow-2xl shadow-orange-500/30 w-full sm:w-auto"
          >
            Book Your Slot Now →
          </button>
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
              <div key={b.label} className="bg-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-200">
                <span className="mr-1.5">{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="bg-orange-500 text-white px-4 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { num: "500+", label: "Sofas Cleaned" },
            { num: "7+", label: "Years Experience" },
            { num: "4.9★", label: "Google Rating" },
            { num: "20+", label: "Areas in Bangalore" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-black">{s.num}</p>
              <p className="text-orange-100 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem Section ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
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
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3">How It Works</h2>
          <p className="text-slate-500 text-center mb-12 text-lg">Three simple steps. We handle everything else.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Book Online", desc: "Pick your services and preferred slot. Takes less than 2 minutes. Instant confirmation." },
              { step: "02", title: "We Come to You", desc: "Our trained & verified team arrives on time with all professional equipment. No preparation needed." },
              { step: "03", title: "Deep Clean Done", desc: "Machine-extraction cleaning that actually removes dirt. Dries in 4–6 hours, then enjoy your fresh sofa." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg shadow-orange-500/25">
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

      {/* ── Why Cleanwarks ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-3">Why Choose Cleanwarks?</h2>
          <p className="text-slate-400 text-center mb-10 text-lg">We&apos;re not just another cleaning service.</p>
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
                desc: "Not happy with the results? We&apos;ll re-clean at no extra cost. Your satisfaction is our only measure of success.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 rounded-2xl p-5 flex gap-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 text-center mb-10 text-lg">No hidden charges. Exactly what you see is what you pay.</p>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {[
              { service: "Sofa — per seat", price: "₹500", note: "3-seater ₹1,200 · 5-seater ₹2,000" },
              { service: "Recliner — per unit", price: "₹700", note: "" },
              { service: "Dining Chair — per chair", price: "₹100", note: "" },
              { service: "Carpet Cleaning", price: "₹25/sqft", note: "Lower rates for larger areas" },
              { service: "Car Seats — Hatchback", price: "₹1,500", note: "" },
              { service: "Car Seats — Sedan", price: "₹1,800", note: "" },
              { service: "Car Seats — SUV / MUV", price: "₹2,400+", note: "" },
            ].map((row, i) => (
              <div key={row.service} className={`flex items-center justify-between px-6 py-4 ${i !== 0 ? "border-t border-gray-50" : ""}`}>
                <div>
                  <p className="text-sm font-medium text-slate-800">{row.service}</p>
                  {row.note && <p className="text-xs text-slate-400 mt-0.5">{row.note}</p>}
                </div>
                <span className="font-bold text-slate-900 text-base">{row.price}</span>
              </div>
            ))}
            <div className="bg-orange-50 border-t border-orange-100 px-6 py-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-orange-900">Minimum visit charge</p>
              <span className="font-black text-orange-600 text-base">₹2,000</span>
            </div>
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
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-3">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-slate-500 text-sm ml-2 font-medium">4.9 on Google</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Reya Mathew", text: "Very professional team. They came on time, worked efficiently and the sofa looks brand new. Will definitely book again!" },
              { name: "Arun Joy", text: "Excellent service! The machines they use are really effective — stains I thought were permanent are completely gone. Highly recommended." },
              { name: "Pramod Prabhakaran", text: "Well-trained team. They knew exactly how to handle my velvet sofa without damaging it. Results were amazing." },
              { name: "Soumya Rajan", text: "Booking was simple, the team was punctual, and the sofa looks incredible. Will definitely use again." },
              { name: "Thomson Cyriac", text: "Very friendly and professional staff. Thorough cleaning, no damage to fabric at all. Great value for money." },
            ].map((review) => (
              <div key={review.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
                <p className="text-slate-900 text-sm font-bold">{review.name}</p>
                <p className="text-slate-400 text-xs">Verified Google Review</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Areas ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-3">We Serve Across Bangalore</h2>
          <p className="text-slate-500 mb-8">Covering 20+ neighbourhoods. Enter your area during booking to confirm.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "HSR Layout", "Koramangala", "Indiranagar", "Whitefield", "Marathahalli",
              "Electronic City", "JP Nagar", "BTM Layout", "Bannerghatta Road", "Sarjapur Road",
              "Hebbal", "Yelahanka", "Bellandur", "Brookefield", "Kadugodi",
              "Nagarbhavi", "Rajajinagar", "Jayanagar", "Basavanagudi", "Malleswaram",
            ].map((area) => (
              <span key={area} className="bg-white border border-gray-200 text-slate-600 text-sm px-3 py-1.5 rounded-full">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
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
      <section className="bg-orange-500 px-4 py-16 text-center text-white">
        <div className="max-w-xl mx-auto">
          <p className="text-orange-200 text-sm font-semibold uppercase tracking-wide mb-3">Ready for a fresh sofa?</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Book Your Cleaning Today</h2>
          <p className="text-orange-100 text-lg mb-8">
            Slots are limited. Verified team. Professional results. At your doorstep.
          </p>
          <button
            onClick={openBooking}
            className="bg-white text-orange-600 px-8 py-4 rounded-2xl text-lg font-black hover:bg-orange-50 active:scale-95 transition-all shadow-xl w-full sm:w-auto"
          >
            Book Now — Starts ₹500/seat
          </button>
          <p className="text-orange-200 text-xs mt-4">Free cancellation · No hidden charges · Verified team</p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 px-4 py-8 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/80x80-no-shade.png" alt="Cleanwarks" className="w-6 h-6 rounded" />
          <span className="font-bold text-white">Cleanwarks</span>
        </div>
        <p>Professional Cleaning Services · Bangalore</p>
        <p className="mt-2 text-slate-500 text-xs">© 2026 Cleanwarks. All rights reserved.</p>
      </footer>

      {/* ── Sticky Mobile CTA ──────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 pb-safe">
        <button
          onClick={openBooking}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-base hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
        >
          Book Now — Starts ₹500/seat
        </button>
      </div>

      {/* ── Booking Drawer ─────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Panel */}
          <div className="relative w-full sm:max-w-lg sm:mx-4 bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            {/* Drawer header */}
            <div className="sticky top-0 bg-white px-5 pt-3 pb-3 flex items-center justify-between border-b border-gray-100 z-10">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Cleanwarks Bangalore</p>
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
            {/* Form */}
            <div className="px-4 pt-4 pb-10">
              <BookingForm showHeader={false} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
