"use client";

import type { DayPlan } from "@/lib/ai";
import { Clock, MapPin, IndianRupee, Footprints } from "lucide-react";

type Props = {
  days: DayPlan[];
  onRemove?: (dayIndex: number, stopIndex: number) => void;
};

export function ItineraryTimeline({ days, onRemove }: Props) {
  return (
    <div className="relative">
      {days.map((day, di) => (
        <div key={di} className="relative pl-0 sm:pl-10 mb-10 last:mb-0">
          {/* Day header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-3 py-1 text-xs font-medium text-saffron-300">
                DAY {String(day.dayNumber).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl text-white">{day.title}</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Estimated day cost:{" "}
                <span className="text-saffron-400 font-semibold">
                  <IndianRupee className="inline h-3.5 w-3.5" />
                  {day.estimatedDayCost.toLocaleString("en-IN")}
                </span>
              </p>
            </div>
          </div>

          {/* Timeline stops */}
          <div className="mt-5 relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-saffron-400/50 via-white/10 to-transparent hidden sm:block" />
            <ul className="space-y-3">
              {day.stops.map((stop, si) => (
                <li
                  key={si}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-4 sm:ml-4 transition-colors group"
                >
                  <div className="absolute -left-[30px] top-5 h-3 w-3 rounded-full bg-saffron-400 ring-4 ring-saffron-400/20 hidden sm:block" />
                  <div className="flex items-start gap-4">
                    <div className="min-w-[70px] flex items-center gap-2 text-xs text-neutral-400">
                      <Clock className="h-3.5 w-3.5 text-saffron-400" />
                      <span className="font-mono text-saffron-300">{stop.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-forest-400" />
                        <h4 className="font-semibold text-white">{stop.title}</h4>
                      </div>
                      <p className="mt-1 text-sm text-neutral-400">{stop.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                          <IndianRupee className="h-3 w-3 text-saffron-400" />
                          {stop.estimatedCost.toLocaleString("en-IN")} · estimated
                        </span>
                        {stop.travelDuration && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            <Footprints className="h-3 w-3 text-forest-400" />
                            {stop.travelDuration}
                          </span>
                        )}
                        {stop.travelMode && (
                          <span className="capitalize text-neutral-500">via {stop.travelMode}</span>
                        )}
                      </div>
                    </div>
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(di, si)}
                        className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
