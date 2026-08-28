"use client";

import Link from "next/link";
import {
  Sparkles,
  Wallet,
  Map as MapIcon,
  Compass,
  Utensils,
  MessageCircle,
  ArrowRight,
  IndianRupee,
  Clock,
  MapPin,
  Footprints,
} from "lucide-react";
import Image from "next/image";

export function LandingSections() {
  return (
    <>
      {/* Section 1: Problem */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">The problem</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight">
              Travel planning <span className="text-gradient-saffron">shouldn't feel like homework.</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-300">
              Generic recommendations. Limitless tabs. Hours lost comparing transport, stays and food.
              Students shouldn't need a full-time job to plan a weekend trip.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              { n: "01", t: "Too much time", d: "Planning a 3-day trip can eat an entire weekend." },
              { n: "02", t: "Generic suggestions", d: "Cookie-cutter travel guides miss what matters to you." },
              { n: "03", t: "Budget anxiety", d: "Hard to know what a realistic student budget actually looks like." },
            ].map((i) => (
              <div key={i.n} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-display text-5xl text-saffron-400">{i.n}</span>
                <h3 className="mt-3 font-display text-xl text-white">{i.t}</h3>
                <p className="mt-2 text-sm text-neutral-400">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section id="how" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-forest-400">Everything you need</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight">
              Everything you need <span className="text-gradient-saffron">for the journey.</span>
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Sparkles, t: "Smart Itinerary", d: "A day-by-day plan tuned to your style and pace." },
              { icon: Wallet, t: "Budget Planner", d: "Know where every rupee goes, with honest estimates." },
              { icon: MapIcon, t: "Smart Routes", d: "Visualize your journey from first stop to the last." },
              { icon: Compass, t: "Destination Discovery", d: "Mountains, beaches, heritage and food — all in one place." },
              { icon: Utensils, t: "Local Experiences", d: "Real food, real places, real memories." },
              { icon: MessageCircle, t: "AI Travel Assistant", d: "Ask anything. Adjust on the fly." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.t}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-saffron-400/15 to-saffron-500/5 text-saffron-300 inline-flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-white">{f.t}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{f.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: How */}
      <section className="relative py-24 sm:py-32 border-y border-white/5 bg-gradient-to-b from-ink-950 via-ink-900/40 to-ink-950">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">How it works</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight">
              Tell us what you want. <br />
              <span className="text-gradient-saffron">We'll plan the rest.</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Tell us where", d: "Origin, destination, dates, days, budget, travel mode, travel style." },
              { n: "2", t: "AI plans", d: "Safarnama generates a complete day-by-day itinerary and honest budget." },
              { n: "3", t: "You explore", d: "Tweak, optimize or regenerate until it's exactly your trip." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <span className="font-display text-6xl text-gradient-saffron">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-neutral-400">{s.d}</p>
              </div>
            ))}
          </div>

          <Link
            href="/plan"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-saffron-300 hover:text-saffron-400"
          >
            Try the planner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Section 4: Sample Itinerary */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-forest-400">A glimpse</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
              Your journey, <span className="text-gradient-saffron">generated.</span>
            </h2>
            <p className="mt-5 text-neutral-400 max-w-lg">
              From a single idea, Safarnama builds a complete itinerary — time-blocked, costed, and tuned for your style.
            </p>
            <div className="mt-8 relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/5]">
              <Image src="/images/dest-rishikesh.svg" alt="Rishikesh example" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs text-saffron-300 uppercase tracking-widest">Example · Rishikesh</p>
                <p className="mt-2 font-display text-2xl text-white">3-day Ganges escape</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Sample Day 01</span>
              <span className="text-xs text-neutral-500">AI-estimated</span>
            </div>
            <h3 className="mt-2 font-display text-2xl text-white">Arrival & first wander</h3>
            <div className="mt-6 space-y-3">
              {[
                { t: "09:00", title: "Arrive in Rishikesh", d: "Settle into a riverside hostel.", c: 450, dur: "—", mode: "walk" },
                { t: "11:30", title: "Laxman Jhula walk", d: "Cross the iconic suspension bridge, temples and cafes.", c: 100, dur: "2 hr", mode: "walk" },
                { t: "14:00", title: "Lunch at a local dhaba", d: "Dal, roti, fresh lassi — student budget friendly.", c: 220, dur: "1 hr", mode: "—", },
                { t: "16:30", title: "Ganga Aarti at Triveni Ghat", d: "Witness the evening ritual on the ghats.", c: 50, dur: "1.5 hr", mode: "walk" },
                { t: "19:30", title: "Riverside dinner", d: "Simple thali with mountain views.", c: 280, dur: "1 hr", mode: "—" },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="min-w-[58px] text-xs font-mono text-saffron-300 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {s.t}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-forest-400" />
                      <h4 className="text-sm font-semibold text-white">{s.title}</h4>
                    </div>
                    <p className="mt-1 text-xs text-neutral-400">{s.d}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="inline-flex items-center gap-1"><IndianRupee className="h-3 w-3" />{s.c}</span>
                      {s.dur !== "—" && <span className="inline-flex items-center gap-1"><Footprints className="h-3 w-3" />{s.dur}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-saffron-400/20 bg-saffron-400/5 p-4 flex items-center justify-between">
              <span className="text-xs text-saffron-300 uppercase tracking-widest">Day Total</span>
              <span className="flex items-baseline gap-1 text-xl font-display text-white">
                <IndianRupee className="h-4 w-4 text-saffron-400" /> 1,100
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Budget */}
      <section className="relative py-24 sm:py-32 border-y border-white/5 bg-gradient-to-b from-ink-950 via-ink-900/40 to-ink-950">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">Built for budgets</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight">
              Built for travelers who <span className="text-gradient-saffron">care about their budget.</span>
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { t: "Budget optimization", d: "One tap to make any itinerary cheaper, faster, or fuller." },
              { t: "Student-friendly", d: "Realistic prices for hostels, street food, and student tickets." },
              { t: "Flexible modes", d: "Train, flight, bus, car — or let AI choose the best." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-display text-xl text-white">{c.t}</h3>
                <p className="mt-2 text-sm text-neutral-400">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">Your next story is waiting.</p>
          <h2 className="mt-4 font-display text-4xl sm:text-7xl font-semibold text-white tracking-tight">
            Ready to write <br /> <span className="text-gradient-saffron">your next story?</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            Tell us where you want to go. Safarnama will plan the journey.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 px-7 py-4 text-sm font-semibold text-ink-950 shadow-[0_14px_40px_-10px_rgba(255,154,60,0.6)]"
            >
              <Sparkles className="h-4 w-4" /> Start Planning →
            </Link>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
