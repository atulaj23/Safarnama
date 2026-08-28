"use client";

import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { BudgetBreakdown } from "@/components/BudgetBreakdown";
import { MapView } from "@/components/MapView";
import { destinations } from "@/lib/destinations";
import { Sparkles, Download, Share2 } from "lucide-react";
import { jsPDF } from "jspdf";
import type { ItineraryOutput } from "@/lib/ai";

type TripData = {
  id: string;
  origin: string;
  destination: string;
  startDate?: string;
  days: number;
  travelers: number;
  budget: number;
  travelMode: string;
  travelStyle: string;
  itinerary: ItineraryOutput | null;
  createdAt: string;
};

export function TripDetailView({ trip }: { trip: TripData }) {
  if (!trip.itinerary) {
    return (
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <p className="text-neutral-400">This trip's itinerary is unavailable.</p>
      </div>
    );
  }

  const dest = destinations.find((d) => d.name.toLowerCase() === trip.destination.toLowerCase());
  const points = [
    { name: trip.origin, lat: 25.4358, lng: 81.8463, kind: "origin" as const },
    ...(dest ? [{ name: dest.name, lat: dest.lat, lng: dest.lng, kind: "destination" as const }] : []),
  ];

  function download() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Safarnama", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("AI-Generated Itinerary", 14, 27);
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text(`${trip.origin} → ${trip.destination}`, 14, 42);
    doc.setFontSize(10);
    doc.text(`${trip.days} days · ${trip.travelers} travelers · ₹${trip.budget.toLocaleString("en-IN")}`, 14, 50);
    let y = 64;
    doc.setFontSize(12);
    doc.text("Budget", 14, y);
    y += 8;
    doc.setFontSize(10);
    const b = trip.itinerary!.budget;
    ([
      ["Transportation", b.transportation],
      ["Accommodation", b.accommodation],
      ["Food", b.food],
      ["Activities", b.activities],
      ["Local Travel", b.localTravel],
      ["Emergency Buffer", b.emergencyBuffer],
    ] as const).forEach(([l, v]) => {
      if (y > 275) { doc.addPage(); y = 20; }
      doc.text(`${l}: ₹${v.toLocaleString("en-IN")}`, 16, y);
      y += 6;
    });
    trip.itinerary!.days.forEach((day) => {
      if (y > 250) { doc.addPage(); y = 20; }
      y += 4;
      doc.setFontSize(12);
      doc.text(`Day ${day.dayNumber} — ${day.title}`, 14, y);
      y += 6;
      doc.setFontSize(10);
      day.stops.forEach((s) => {
        if (y > 275) { doc.addPage(); y = 20; }
        doc.text(`${s.time} · ${s.title}`, 16, y);
        y += 5;
        const split = doc.splitTextToSize(s.description, 170) as string[];
        doc.setTextColor(80);
        doc.text(split, 18, y);
        y += split.length * 5;
        doc.setTextColor(0);
        y += 2;
      });
    });
    doc.save(`safarnama-${trip.destination.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  }

  async function share() {
    const url = `${window.location.origin}/trip/${trip.id}`;
    await navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  }

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-5 lg:px-8 space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">
            {trip.itinerary.demo ? "Demo" : "AI-Generated"} · {trip.origin} → {trip.destination}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-white tracking-tight">{trip.itinerary.overview.tagline}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 capitalize">{trip.travelMode}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{trip.days} days</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{trip.travelers} travelers</span>
            <span className="px-2.5 py-1 rounded-full bg-saffron-400/10 text-saffron-300 border border-saffron-400/20">
              ₹{trip.budget.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={share} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button onClick={download} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">
            <Download className="h-3.5 w-3.5" /> PDF
          </button>
        </div>
      </div>

      <MapView points={points} title={`${trip.origin} → ${trip.destination}`} />
      <BudgetBreakdown budget={trip.itinerary.budget} total={trip.budget} />

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-saffron-300">
          <Sparkles className="h-3.5 w-3.5" /> Itinerary
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white tracking-tight">Day-by-day plan</h2>
        <div className="mt-8">
          <ItineraryTimeline days={trip.itinerary.days} />
        </div>
      </div>

      {trip.itinerary.tips && trip.itinerary.tips.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h3 className="font-display text-2xl text-white">Travel tips</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            {trip.itinerary.tips.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-saffron-400 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
