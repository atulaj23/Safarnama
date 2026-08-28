"use client";

import { useState, useMemo } from "react";
import { destinations, categories } from "@/lib/destinations";
import { DestinationCard } from "@/components/DestinationCard";
import { Search } from "lucide-react";

export default function DestinationsPage() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesCat = active === "all" || d.category === active || (active === "weekend" && d.duration.includes("2"));
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-5 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">Destinations</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight">
          Find your next <span className="text-gradient-saffron">adventure.</span>
        </h1>
        <p className="mt-5 text-lg text-neutral-300">
          From Himalayan peaks to coastal sunsets — curated destinations tuned for student budgets.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, regions…"
            className="w-full rounded-full bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-saffron-400/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={"px-4 py-2 rounded-full text-sm border transition " + (active === "all" ? "bg-saffron-400/15 border-saffron-400/30 text-saffron-300" : "bg-white/5 border-white/10 text-neutral-300")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={"px-4 py-2 rounded-full text-sm border transition " + (active === c.id ? "bg-saffron-400/15 border-saffron-400/30 text-saffron-300" : "bg-white/5 border-white/10 text-neutral-300")}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center py-16 rounded-3xl border border-dashed border-white/10">
          <p className="text-neutral-400">No destinations match. Try a different category or search.</p>
        </div>
      )}
    </div>
  );
}
