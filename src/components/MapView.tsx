"use client";

import { MapPin } from "lucide-react";

type Point = { name: string; lat: number; lng: number; kind?: "origin" | "destination" | "stop" };

type Props = {
  points: Point[];
  title?: string;
};

export function MapView({ points, title }: Props) {
  if (!points || points.length === 0) {
    return <Fallback title={title} reason="No locations to display." />;
  }

  // Compute simple center & bounds
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const latSpan = Math.max(maxLat - minLat, 0.5);
  const lngSpan = Math.max(maxLng - minLng, 0.5);

  // Simple equirectangular projection onto a 100x100 SVG canvas
  const W = 100;
  const H = 70;
  const pad = 6;
  const project = (p: Point) => {
    const x = pad + ((p.lng - (centerLng - lngSpan / 2)) / lngSpan) * (W - pad * 2);
    const y = pad + ((centerLat + latSpan / 2 - p.lat) / latSpan) * (H - pad * 2);
    return { x, y };
  };

  const projected = points.map((p) => ({ ...p, ...project(p) }));
  const path = projected.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-8">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Route Visualization</p>
          <h3 className="mt-1 font-display text-2xl text-white">{title ?? "Your journey on the map"}</h3>
        </div>
        <span className="text-xs text-neutral-500">Lightweight route preview</span>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-64 sm:h-80">
          <defs>
            <linearGradient id="route" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff9a3c" />
              <stop offset="100%" stopColor="#2aa06b" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff9a3c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ff9a3c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid */}
          <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.2">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={"h" + i} x1="0" x2={W} y1={(i * H) / 8} y2={(i * H) / 8} />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={"v" + i} x1={(i * W) / 12} x2={(i * W) / 12} y1="0" y2={H} />
            ))}
          </g>

          {/* Route path */}
          <path d={path} fill="none" stroke="url(#route)" strokeWidth="0.8" strokeDasharray="1.2 1" />

          {/* Points */}
          {projected.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="2.5" fill="url(#glow)" />
              <circle
                cx={p.x}
                cy={p.y}
                r="1"
                fill={p.kind === "origin" ? "#ff9a3c" : p.kind === "destination" ? "#2aa06b" : "#ffffff"}
                stroke="#0a0c11"
                strokeWidth="0.3"
              />
              <text
                x={p.x}
                y={p.y - 2.2}
                textAnchor="middle"
                fontSize="2.4"
                fill="#e7e9ee"
                fontFamily="system-ui"
              >
                {p.name}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-saffron-400" /> Origin</span>
            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-forest-400" /> Destination</span>
            <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Stop</span>
          </div>
          <span className="text-neutral-500">Route preview · live map can be enabled with Mapbox</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {points.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <MapPin className="h-3 w-3 text-saffron-400" />
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Fallback({ title, reason }: { title?: string; reason?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-8">
      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">{title ?? "Route"}</p>
      <h3 className="mt-1 font-display text-2xl text-white">Live map</h3>
      <div className="mt-4 aspect-[16/9] rounded-2xl border border-dashed border-white/15 flex flex-col items-center justify-center text-center p-6">
        <MapPin className="h-8 w-8 text-saffron-400" />
        <p className="mt-3 text-sm text-neutral-300">
          {reason ?? "Live map available after Mapbox configuration."}
        </p>
        <p className="mt-1 text-xs text-neutral-500">The rest of your trip continues to work normally.</p>
      </div>
    </div>
  );
}
