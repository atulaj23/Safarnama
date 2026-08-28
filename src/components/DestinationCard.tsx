import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/lib/destinations";
import { MapPin, Calendar } from "lucide-react";

type Props = {
  destination: Destination;
};

export function DestinationCard({ destination }: Props) {
  return (
    <Link
      href={`/plan?to=${encodeURIComponent(destination.name)}`}
      className="group relative block rounded-3xl overflow-hidden border border-white/10 bg-ink-900 transition-transform hover:-translate-y-1"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-saffron-500/20 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-saffron-300">
          <MapPin className="h-3 w-3" />
          {destination.region}
        </div>
        <h3 className="mt-2 font-display text-2xl text-white">{destination.name}</h3>
        <p className="mt-1 text-sm text-neutral-300 line-clamp-2">{destination.tagline}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/10">
              <Calendar className="h-3 w-3" /> {destination.duration}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-saffron-400/15 text-saffron-300 border border-saffron-400/20">
              {destination.budget}
            </span>
          </div>
          <span className="text-xs font-semibold text-saffron-300 opacity-0 group-hover:opacity-100 transition">
            Plan →
          </span>
        </div>
      </div>
    </Link>
  );
}
