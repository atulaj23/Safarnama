import Link from "next/link";
import type { Trip } from "@/db/schema";
import { Calendar, MapPin, IndianRupee } from "lucide-react";

type Props = {
  trip: Trip;
  onDelete?: (id: string) => void;
};

export function TripCard({ trip, onDelete }: Props) {
  const it = trip.itineraryJson as { overview?: { tagline?: string } } | null;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-saffron-300">
          <MapPin className="h-3.5 w-3.5" /> {trip.origin} → {trip.destination}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-neutral-500">
          {trip.travelMode} · {trip.travelStyle}
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl text-white">{trip.destination}</h3>
      <p className="text-sm text-neutral-400 mt-1">
        {it?.overview?.tagline ?? `${trip.days}-day journey for ${trip.travelers} traveler${trip.travelers > 1 ? "s" : ""}`}
      </p>
      <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
          <Calendar className="h-3 w-3" /> {trip.days} days
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-saffron-400/10 text-saffron-300 border border-saffron-400/20">
          <IndianRupee className="h-3 w-3" /> {trip.budget.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/trip/${trip.id}`}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 text-xs font-semibold"
        >
          View
        </Link>
        <Link
          href={`/plan?duplicate=${trip.id}`}
          className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white"
        >
          Duplicate
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(trip.id)}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-rose-500/10 border border-white/10 text-xs text-neutral-300 hover:text-rose-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
