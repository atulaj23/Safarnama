"use client";

import { Sparkles } from "lucide-react";

const messages = [
  "Reading your travel preferences…",
  "Finding the best route…",
  "Balancing your budget…",
  "Building your itinerary…",
  "Your journey is almost ready…",
];

export function LoadingState() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 overflow-hidden p-10">
      <div className="absolute inset-0 animate-shimmer opacity-30" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative h-16 w-16 rounded-full bg-saffron-400/15 inline-flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-saffron-400 animate-pulse" />
          <span className="absolute inset-0 rounded-full border border-saffron-400/40 animate-[pulse-ring_1.6s_ease-out_infinite]" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-white">Planning your journey…</h3>
        <div className="mt-6 space-y-2 text-sm text-neutral-400">
          {messages.map((m, i) => (
            <p key={m} className="animate-pulse" style={{ animationDelay: `${i * 300}ms` }}>
              {m}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
