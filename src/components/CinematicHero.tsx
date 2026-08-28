"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Map as MapIcon, Compass } from "lucide-react";
import { SmartFeatureCards } from "./SmartFeatureCards";

export function CinematicHero() {
  return (
    <section
      aria-label="Cinematic hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden grain"
    >
      {/* Base landscape image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-desktop.svg"
          alt="Cinematic Indian mountain landscape with a moving train at golden sunrise"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center scale-[1.04]"
        />
        {/* Darken for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* Drifting mist layers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-60"
          style={{
            background:
              "radial-gradient(120% 60% at 20% 100%, rgba(255,154,60,0.15), transparent 60%), radial-gradient(80% 60% at 80% 100%, rgba(139,124,255,0.12), transparent 60%)",
          }}
        />
      </div>

      {/* Floating mist particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[18%] left-[10%] h-24 w-64 rounded-full bg-white/10 blur-3xl animate-drift" />
        <div className="absolute top-[40%] right-[8%] h-32 w-80 rounded-full bg-saffron-400/10 blur-3xl animate-drift" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-[18%] left-[30%] h-24 w-72 rounded-full bg-forest-400/10 blur-3xl animate-drift" style={{ animationDelay: "6s" }} />
      </div>

      {/* Aircraft flying through clouds */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute top-[14%] left-0 w-20 h-20 animate-plane">
          <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_18px_rgba(255,255,255,0.35)]">
            <path d="M10 44 L58 38 L70 28 L72 32 L64 42 L72 46 L72 52 L60 50 L50 58 L46 58 L50 48 L12 48 Z" fill="white" opacity="0.9" />
            <path d="M70 30 L78 28 L78 32 Z" fill="white" opacity="0.7" />
          </svg>
          <div className="absolute top-1/2 -left-4 h-px w-24 bg-gradient-to-l from-white/0 via-white/60 to-white/0" />
        </div>
      </div>

      {/* Moving train — cinematic overlay with CSS animation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] md:bottom-[24%] h-24 md:h-32">
        <div className="relative h-full w-full">
          {/* railway track shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/40 to-transparent" />

          <div className="absolute bottom-2 h-20 md:h-28 animate-train will-change-transform">
            <TrainSVG />
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette" />

      {/* Hero content */}
      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="w-full max-w-7xl mx-auto px-5 lg:px-8 pb-16 md:pb-0 pt-28 md:pt-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-black/30 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-saffron-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI-POWERED TRAVEL PLANNER
            </div>

            <h1 className="mt-6 font-display text-[44px] sm:text-6xl lg:text-[84px] leading-[1.02] font-semibold tracking-tight text-white">
              Your Journey.
              <br />
              Perfectly Planned.
              <br />
              <span className="text-gradient-saffron">By AI.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-200/85 max-w-xl">
              Plan smarter journeys, discover unforgettable places, and travel more without breaking your budget.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/plan"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_14px_40px_-10px_rgba(255,154,60,0.6)] hover:shadow-[0_18px_50px_-10px_rgba(255,154,60,0.9)] transition-all"
              >
                <Compass className="h-4 w-4" />
                Plan My Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition"
              >
                <MapIcon className="h-4 w-4" />
                Explore Destinations
              </Link>
            </div>

            <p className="mt-5 text-xs text-neutral-400 tracking-wide">
              Built for students · Budget-friendly · AI-powered
            </p>
          </div>

          {/* Floating smart cards (desktop only) */}
          <SmartFeatureCards />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 opacity-80">
        <div className="h-8 w-5 rounded-full border border-white/25 flex items-start justify-center p-1">
          <div className="h-1.5 w-1 rounded-full bg-saffron-400 animate-bounce" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Scroll</span>
      </div>
    </section>
  );
}

function TrainSVG() {
  return (
    <svg viewBox="0 0 320 100" className="h-full w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)]" aria-hidden>
      {/* soft reflection */}
      <defs>
        <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e6e9ef" />
          <stop offset="100%" stopColor="#9aa0ad" />
        </linearGradient>
        <linearGradient id="stripe" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#ff9a3c" />
          <stop offset="50%" stopColor="#ffb066" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
        <linearGradient id="window" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1f29" />
          <stop offset="100%" stopColor="#0a0c11" />
        </linearGradient>
        <filter id="motion" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4 0" />
        </filter>
      </defs>

      <g filter="url(#motion)">
        {/* Main body */}
        <path
          d="M10 70 Q 14 44 40 40 L 220 40 Q 260 40 280 56 L 290 70 Z"
          fill="url(#body)"
        />
        {/* Nose cone highlight */}
        <path d="M10 70 Q 14 52 30 46 L 40 46 L 40 64 L 14 68 Z" fill="#ffffff" opacity="0.9" />
        {/* Saffron stripe */}
        <path d="M22 62 L 288 62 L 290 70 L 18 70 Z" fill="url(#stripe)" />
        {/* Windows */}
        <g fill="url(#window)">
          <rect x="50" y="48" width="22" height="10" rx="2" />
          <rect x="78" y="48" width="22" height="10" rx="2" />
          <rect x="106" y="48" width="22" height="10" rx="2" />
          <rect x="134" y="48" width="22" height="10" rx="2" />
          <rect x="162" y="48" width="22" height="10" rx="2" />
          <rect x="190" y="48" width="22" height="10" rx="2" />
          <rect x="218" y="48" width="22" height="10" rx="2" />
        </g>
        {/* Cockpit window */}
        <path d="M20 58 L 38 48 L 44 48 L 44 60 L 22 62 Z" fill="#1a1f29" />
        {/* Headlight */}
        <circle cx="18" cy="62" r="2.5" fill="#ffe9b8">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="1.2s" repeatCount="indefinite" />
        </circle>
        {/* Panel lines */}
        <g stroke="#0a0c11" strokeOpacity="0.25" strokeWidth="0.6">
          <line x1="46" y1="44" x2="46" y2="70" />
          <line x1="246" y1="44" x2="246" y2="70" />
        </g>
      </g>

      {/* Wheels spinning */}
      <g>
        <g transform="translate(60 80)">
          <circle r="7" fill="#1a1f29" />
          <circle r="7" fill="none" stroke="#3a4150" strokeWidth="1" />
          <g className="animate-wheel">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#9aa0ad" strokeWidth="1.2" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#9aa0ad" strokeWidth="1.2" />
          </g>
        </g>
        <g transform="translate(130 80)">
          <circle r="7" fill="#1a1f29" />
          <circle r="7" fill="none" stroke="#3a4150" strokeWidth="1" />
          <g className="animate-wheel">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#9aa0ad" strokeWidth="1.2" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#9aa0ad" strokeWidth="1.2" />
          </g>
        </g>
        <g transform="translate(200 80)">
          <circle r="7" fill="#1a1f29" />
          <circle r="7" fill="none" stroke="#3a4150" strokeWidth="1" />
          <g className="animate-wheel">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#9aa0ad" strokeWidth="1.2" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#9aa0ad" strokeWidth="1.2" />
          </g>
        </g>
        <g transform="translate(250 80)">
          <circle r="7" fill="#1a1f29" />
          <circle r="7" fill="none" stroke="#3a4150" strokeWidth="1" />
          <g className="animate-wheel">
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#9aa0ad" strokeWidth="1.2" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#9aa0ad" strokeWidth="1.2" />
          </g>
        </g>
      </g>
    </svg>
  );
}
