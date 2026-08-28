"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Map, LogOut, User as UserIcon } from "lucide-react";
import type { Trip } from "@/db/schema";
import { TripCard } from "@/components/TripCard";

type User = { id: string; name: string; email: string };

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("safarnama_token") : null;
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data.user);
        const tripsRes = await fetch("/api/trips", { headers: { Authorization: `Bearer ${token}` } });
        const tripsData = await tripsRes.json();
        setTrips(tripsData.trips ?? []);
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("safarnama_token");
          localStorage.removeItem("safarnama_user");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("safarnama_token");
      localStorage.removeItem("safarnama_user");
    }
    router.push("/");
  }

  if (!loading && !user) {
    return (
      <div className="pt-32 pb-16 max-w-md mx-auto px-5 lg:px-8 text-center">
        <UserIcon className="h-10 w-10 text-saffron-400 mx-auto" />
        <h1 className="mt-4 font-display text-3xl text-white">Sign in to continue</h1>
        <p className="mt-2 text-neutral-400">Your journeys, saved and personalized.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold text-sm">Sign In</Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm">Create Account</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-5 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-10">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-saffron-400 to-saffron-500 text-ink-950 inline-flex items-center justify-center">
            <span className="font-display text-3xl font-bold">{user?.name?.[0]?.toUpperCase() ?? "?"}</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-300">Welcome back, traveler.</p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl text-white">{user?.name}</h1>
            <p className="mt-1 text-sm text-neutral-400">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/plan" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 text-sm font-semibold">
              <Compass className="h-4 w-4" /> Plan New Trip
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Stat label="Saved Trips" value={trips.length} />
          <Stat label="Destinations Explored" value={new Set(trips.map((t) => t.destination)).size} />
          <Stat label="Total Days Traveled" value={trips.reduce((a, t) => a + t.days, 0)} />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-2xl text-white">Recent Journeys</h2>
        <Link href="/saved" className="text-sm text-saffron-300 hover:text-saffron-400">View all →</Link>
      </div>

      {loading ? (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 h-40 animate-pulse" />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-white/10 p-12 text-center">
          <Map className="h-8 w-8 text-saffron-400 mx-auto" />
          <h3 className="mt-4 font-display text-xl text-white">No trips yet</h3>
          <p className="mt-2 text-sm text-neutral-400">Plan your first journey to see it here.</p>
          <Link href="/plan" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 text-sm font-semibold">
            <Compass className="h-4 w-4" /> Plan Your First Trip
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.slice(0, 6).map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-widest text-neutral-500">{label}</p>
      <p className="mt-2 font-display text-3xl text-white">{value}</p>
    </div>
  );
}
