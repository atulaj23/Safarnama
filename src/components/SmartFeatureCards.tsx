"use client";

import { Sparkles, Wallet, MapPinned, Clock, Utensils, Compass } from "lucide-react";

export function SmartFeatureCards() {
  return (
    <div className="pointer-events-none absolute right-5 lg:right-8 bottom-24 md:bottom-32 hidden md:flex flex-col gap-4 w-[320px]">
      <div className="pointer-events-auto glass rounded-2xl p-5 border border-white/10 animate-float-slow">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-400/15 text-saffron-300">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-saffron-300/80">Smart Itinerary</p>
            <p className="text-white font-semibold text-sm">Personalized day-by-day plan</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-xs text-neutral-300">
          <li className="flex items-center gap-2"><MapPinned className="h-3.5 w-3.5 text-saffron-400" /> Places to visit</li>
          <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-saffron-400" /> Best time for each</li>
          <li className="flex items-center gap-2"><Compass className="h-3.5 w-3.5 text-saffron-400" /> Hand-picked activities</li>
        </ul>
      </div>

      <div className="pointer-events-auto glass rounded-2xl p-5 border border-white/10 animate-float-delayed">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forest-400/15 text-forest-400">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-forest-400">Budget Planner</p>
            <p className="text-white font-semibold text-sm">Know where every rupee goes</p>
          </div>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-neutral-300">
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron-400" /> Travel</li>
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-saffron-400" /> Stay</li>
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-forest-400" /> Food</li>
          <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-forest-400" /> Activities</li>
        </ul>
      </div>
    </div>
  );
}

export function SmartFeatureCardsMobile() {
  return (
    <div className="md:hidden grid grid-cols-1 gap-4 mt-8">
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-400/15 text-saffron-300">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-saffron-300/80">Smart Itinerary</p>
            <p className="text-white font-semibold text-sm">Personalized day-by-day plan</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-300">
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Places</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Best time</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Activities</span>
        </div>
      </div>
      <div className="glass rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forest-400/15 text-forest-400">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-forest-400">Budget Planner</p>
            <p className="text-white font-semibold text-sm">Know where every rupee goes</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-300">
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Travel</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Stay</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Food</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Activities</span>
        </div>
      </div>
    </div>
  );
}
