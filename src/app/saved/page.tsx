"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TripCard } from "@/components/TripCard";
import { MapPin, Plus, Compass } from "lucide-react";
import Link from "next/link";
import type { Trip } from "@/db/schema";

export default function SavedTripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("safarnama_token") : null;
      if (!token) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      setAuthed(true);
      try {
        const res = await fetch("/api/trips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTrips(data.trips ?? []);
      } catch {
        setTrips([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function del(id: string) {
    const token = typeof window !== "undefined" ? localStorage.getItem("safarnama_token") : null;
    if (!token) return;
    if (!confirm("Delete this trip?")) return;
    await fetch(`/api/trips/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }

  if (!authed && !loading) {
    return (
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-saffron-400/15 text-saffron-300">
          <MapPin className="h-6 w-6" />
        </div>
        <h1 className="mt-5 font-display text-4xl text-white">Saved Trips</h1>
        <p className="mt-3 text-neutral-400">Sign in to save and revisit your journeys.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold text-sm">
            Sign In
          </Link>
          <Link href="/plan" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm">
            Plan a trip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-5 lg:px-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">Your journeys</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-white">Saved Trips</h1>
          <p className="mt-2 text-neutral-400">{trips.length} {trips.length === 1 ? "trip" : "trips"} saved</p>
        </div>
        <Link
          href="/plan"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 px-5 py-2.5 font-semibold text-sm"
        >
          <Plus className="h-4 w-4" /> Plan New Trip
        </Link>
      </div>

      {loading ? (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 h-40 animate-pulse" />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <Compass className="h-8 w-8 text-saffron-400 mx-auto" />
          <h3 className="mt-4 font-display text-2xl text-white">No trips saved yet.</h3>
          <p className="mt-2 text-neutral-400">Plan your first journey and save it here.</p>
          <Link
            href="/plan"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 text-sm font-semibold"
          >
            <Plus className="h-4 w-4" /> Plan Your First Trip
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.map((t) => (
            <TripCard key={t.id} trip={t} onDelete={del} />
          ))}
        </div>
      )}
    </div>
  );
}
