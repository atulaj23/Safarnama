"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TravelPlanner } from "@/components/TravelPlanner";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { BudgetBreakdown } from "@/components/BudgetBreakdown";
import { MapView } from "@/components/MapView";
import type { ItineraryOutput } from "@/lib/ai";
import type { PlannerFormState } from "@/lib/types";
import { Sparkles, TrendingDown, TrendingUp, Compass as CompassIcon, Download, Share2, Save, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/destinations";
import { jsPDF } from "jspdf";

function PlanInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState<PlannerFormState | null>(null);
  const [result, setResult] = useState<ItineraryOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const to = params.get("to");
    if (to) setForm((prev) => ({ ...(prev ?? defaultForm()), destination: to }));
  }, [params]);

  async function handleSubmit(data: PlannerFormState) {
    setForm(data);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/travel/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Could not generate itinerary");
      const json = (await res.json()) as ItineraryOutput;
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate itinerary");
    } finally {
      setLoading(false);
    }
  }

  async function optimize(mode: "cheaper" | "faster" | "more") {
    if (!form) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/travel/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode }),
      });
      if (!res.ok) throw new Error("Optimization failed");
      const json = (await res.json()) as ItineraryOutput;
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Optimization failed");
    } finally {
      setLoading(false);
    }
  }

  async function saveTrip() {
    if (!form || !result) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("safarnama_token") : null;
    if (!token) {
      alert("Please sign in to save trips.");
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          startDate: form.startDate,
          days: form.days,
          travelers: form.travelers,
          budget: form.budget,
          travelMode: form.travelMode,
          travelStyle: form.travelStyle,
          itineraryJson: result,
        }),
      });
      const json = await res.json();
      if (json.trip?.id) {
        router.push(`/trip/${json.trip.id}`);
      }
    } catch {
      alert("Could not save trip.");
    }
  }

  function downloadPdf() {
    if (!form || !result) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Safarnama", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("AI-Generated Itinerary", 14, 27);

    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text(`${form.origin} → ${form.destination}`, 14, 42);
    doc.setFontSize(10);
    doc.text(`${form.days} days · ${form.travelers} traveler${form.travelers > 1 ? "s" : ""} · ₹${form.budget.toLocaleString("en-IN")} budget`, 14, 50);

    let y = 64;
    doc.setFontSize(12);
    doc.text("Budget Breakdown", 14, y);
    y += 8;
    doc.setFontSize(10);
    const b = result.budget;
    const lines = [
      ["Transportation", b.transportation],
      ["Accommodation", b.accommodation],
      ["Food", b.food],
      ["Activities", b.activities],
      ["Local Travel", b.localTravel],
      ["Emergency Buffer", b.emergencyBuffer],
    ] as const;
    lines.forEach(([label, val]) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${label}: ₹${val.toLocaleString("en-IN")}`, 16, y);
      y += 6;
    });

    result.days.forEach((day) => {
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
        doc.text(`₹${s.estimatedCost.toLocaleString("en-IN")}`, 16, y);
        y += 6;
      });
    });

    doc.save(`safarnama-${form.destination.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  }

  async function shareTrip() {
    if (!form || !result) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("safarnama_token") : null;
    if (!token) {
      alert("Please sign in to share trips.");
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          startDate: form.startDate,
          days: form.days,
          travelers: form.travelers,
          budget: form.budget,
          travelMode: form.travelMode,
          travelStyle: form.travelStyle,
          itineraryJson: result,
        }),
      });
      const json = await res.json();
      if (json.trip?.id) {
        const url = `${window.location.origin}/trip/${json.trip.id}`;
        await navigator.clipboard.writeText(url);
        alert(`Shareable link copied: ${url}`);
      }
    } catch {
      alert("Could not share trip.");
    }
  }

  if (loading) {
    return (
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-5 lg:px-8">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-5 lg:px-8">
        <ErrorState message={error} onRetry={() => form && handleSubmit(form)} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="pt-28 pb-16 max-w-6xl mx-auto px-5 lg:px-8">
        <TravelPlanner onSubmit={handleSubmit} initial={form ?? undefined} />
      </div>
    );
  }

  const destObj = destinations.find((d) => d.name.toLowerCase() === form!.destination.toLowerCase());
  const mapPoints = [
    { name: form!.origin, lat: 25.4358, lng: 81.8463, kind: "origin" as const },
    ...(destObj
      ? [{ name: destObj.name, lat: destObj.lat, lng: destObj.lng, kind: "destination" as const }]
      : []),
  ];

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-5 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">
            {result.demo ? "Demo Mode" : "AI-Generated"} · {form!.origin} → {form!.destination}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl text-white tracking-tight">{result.overview.tagline}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 capitalize">{form!.travelMode}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{form!.days} days</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{form!.travelers} travelers</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={saveTrip} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button onClick={shareTrip} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button onClick={downloadPdf} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10">
            <Download className="h-3.5 w-3.5" /> PDF
          </button>
        </div>
      </div>

      {/* Map */}
      <MapView points={mapPoints} title={`${form!.origin} → ${form!.destination}`} />

      {/* Budget */}
      <BudgetBreakdown budget={result.budget} total={form!.budget} />

      {/* Optimization buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => optimize("cheaper")} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 hover:bg-emerald-500/15 text-sm">
          <TrendingDown className="h-4 w-4" /> Make It Cheaper
        </button>
        <button onClick={() => optimize("faster")} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20 hover:bg-sky-500/15 text-sm">
          <ArrowRight className="h-4 w-4" /> Make It Faster
        </button>
        <button onClick={() => optimize("more")} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-400/20 hover:bg-purple-500/15 text-sm">
          <TrendingUp className="h-4 w-4" /> More Experiences
        </button>
        <button onClick={() => { setResult(null); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 text-sm ml-auto">
          <CompassIcon className="h-4 w-4" /> Edit Trip
        </button>
      </div>

      {/* Itinerary */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-saffron-300">
          <Sparkles className="h-3.5 w-3.5" /> Itinerary
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-white tracking-tight">Day-by-day plan</h2>
        <div className="mt-8">
          <ItineraryTimeline
            days={result.days}
            onRemove={(di, si) => {
              setResult((r) => {
                if (!r) return r;
                const newDays = r.days.map((d, idx) => {
                  if (idx !== di) return d;
                  const newStops = d.stops.filter((_, i) => i !== si);
                  const newCost = newStops.reduce((a, s) => a + s.estimatedCost, 0);
                  return { ...d, stops: newStops, estimatedDayCost: newCost };
                });
                const newTotal = newDays.reduce((a, d) => a + d.estimatedDayCost, 0);
                return { ...r, days: newDays, overview: { ...r.overview, estimatedTotalCost: newTotal } };
              });
            }}
          />
        </div>
      </div>

      {/* Tips */}
      {result.tips && result.tips.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h3 className="font-display text-2xl text-white">Travel tips</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            {result.tips.map((t, i) => (
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

function defaultForm(): PlannerFormState {
  return { origin: "", destination: "", startDate: "", days: 3, travelers: 2, budget: 5000, travelMode: "train", travelStyle: "mixed" };
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-16 max-w-3xl mx-auto px-5 lg:px-8"><LoadingState /></div>}>
      <PlanInner />
    </Suspense>
  );
}
