"use client";

import { Train, Plane, Bus, Car, Sparkles } from "lucide-react";
import type { TravelMode } from "@/lib/types";

export function TravelModeVisual({ mode }: { mode: TravelMode }) {
  if (mode === "train") return <TrainScene />;
  if (mode === "flight") return <PlaneScene />;
  if (mode === "bus") return <BusScene />;
  if (mode === "car") return <CarScene />;
  return <AnyScene />;
}

function BaseScene({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative h-full min-h-[140px] rounded-2xl overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(255,154,60,0.12), transparent 60%), linear-gradient(180deg, #0a0c11 0%, #11141b 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 30px, rgba(255,255,255,0.04) 30px 31px)"
      }} />
      <div className="relative h-full flex items-end justify-center pb-3">{children}</div>
      <div className="absolute top-3 left-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </div>
    </div>
  );
}

function TrainScene() {
  return (
    <BaseScene label="Scenic rail journey">
      <div className="w-full h-14 relative">
        {/* tracks */}
        <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* train */}
        <div className="absolute bottom-2 left-0 w-40 h-10 animate-train">
          <svg viewBox="0 0 160 40" className="w-full h-full">
            <path d="M4 30 Q 6 18 20 16 L 140 16 Q 152 16 158 28 L 158 32 L 4 32 Z" fill="#e6e9ef" />
            <rect x="22" y="22" width="132" height="4" fill="#ff9a3c" />
            <g fill="#1a1f29">
              <rect x="28" y="20" width="10" height="6" rx="1" />
              <rect x="44" y="20" width="10" height="6" rx="1" />
              <rect x="60" y="20" width="10" height="6" rx="1" />
              <rect x="76" y="20" width="10" height="6" rx="1" />
              <rect x="92" y="20" width="10" height="6" rx="1" />
              <rect x="108" y="20" width="10" height="6" rx="1" />
              <rect x="124" y="20" width="10" height="6" rx="1" />
            </g>
            <circle cx="12" cy="26" r="1.5" fill="#ffe9b8" />
          </svg>
        </div>
      </div>
    </BaseScene>
  );
}

function PlaneScene() {
  return (
    <BaseScene label="Time-saving flight">
      <div className="relative w-full h-28">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-[35%] left-0 animate-plane">
          <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)]">
            <path d="M10 44 L58 38 L70 28 L72 32 L64 42 L72 46 L72 52 L60 50 L50 58 L46 58 L50 48 L12 48 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-neutral-400">✈︎ direct · fastest option</div>
      </div>
    </BaseScene>
  );
}

function BusScene() {
  return (
    <BaseScene label="Flexible road journey">
      <div className="relative w-full h-20">
        <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-4 left-0 w-28 h-10 animate-train" style={{ animationDuration: "22s" }}>
          <svg viewBox="0 0 120 40" className="w-full h-full">
            <rect x="4" y="8" width="112" height="24" rx="4" fill="#ff9a3c" />
            <rect x="10" y="12" width="100" height="10" fill="#1a1f29" />
            <circle cx="26" cy="34" r="4" fill="#1a1f29" />
            <circle cx="94" cy="34" r="4" fill="#1a1f29" />
          </svg>
        </div>
      </div>
    </BaseScene>
  );
}

function CarScene() {
  return (
    <BaseScene label="Road-trip vibes">
      <div className="relative w-full h-20">
        <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-4 left-0 w-20 h-8 animate-train" style={{ animationDuration: "14s" }}>
          <svg viewBox="0 0 80 32" className="w-full h-full">
            <path d="M4 24 L 14 12 L 52 12 L 68 22 L 76 22 L 76 28 L 4 28 Z" fill="#2aa06b" />
            <path d="M18 14 L 24 14 L 24 22 L 18 22 Z" fill="#1a1f29" />
            <path d="M28 14 L 48 14 L 54 22 L 28 22 Z" fill="#1a1f29" />
            <circle cx="20" cy="28" r="3" fill="#1a1f29" />
            <circle cx="60" cy="28" r="3" fill="#1a1f29" />
          </svg>
        </div>
      </div>
    </BaseScene>
  );
}

function AnyScene() {
  return (
    <BaseScene label="AI decides">
      <div className="w-full h-28 flex flex-col items-center justify-center gap-3 text-center">
        <div className="h-12 w-12 rounded-full bg-saffron-400/15 text-saffron-300 inline-flex items-center justify-center">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <p className="text-xs text-neutral-400 max-w-xs">AI will pick the best mode based on your budget, distance and duration.</p>
      </div>
    </BaseScene>
  );
}
