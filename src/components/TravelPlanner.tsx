"use client";

import { useMemo, useState } from "react";
import { MapPin, Calendar, Users, IndianRupee, Plane, Train, Bus, Car, Sparkles, ArrowRight } from "lucide-react";
import { travelModes, travelStyles, indianCities, type PlannerFormState, type TravelMode, type TravelStyle } from "@/lib/types";
import { TravelModeVisual } from "./TravelModeVisual";

type Props = {
  initial?: Partial<PlannerFormState>;
  onSubmit: (data: PlannerFormState) => void;
  loading?: boolean;
};

export function TravelPlanner({ initial, onSubmit, loading }: Props) {
  const [form, setForm] = useState<PlannerFormState>({
    origin: initial?.origin ?? "",
    destination: initial?.destination ?? "",
    startDate: initial?.startDate ?? "",
    days: initial?.days ?? 3,
    travelers: initial?.travelers ?? 2,
    budget: initial?.budget ?? 5000,
    travelMode: (initial?.travelMode as TravelMode) ?? "train",
    travelStyle: (initial?.travelStyle as TravelStyle) ?? "mixed",
  });

  const [originOpen, setOriginOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  const originSuggestions = useMemo(
    () => indianCities.filter((c) => form.origin && c.toLowerCase().includes(form.origin.toLowerCase())).slice(0, 6),
    [form.origin]
  );
  const destSuggestions = useMemo(
    () => indianCities.filter((c) => form.destination && c.toLowerCase().includes(form.destination.toLowerCase())).slice(0, 6),
    [form.destination]
  );

  const activeMode = travelModes.find((m) => m.id === form.travelMode)!;

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-6 sm:p-10 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-saffron-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-forest-500/10 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-saffron-400/30 bg-saffron-400/10 px-3.5 py-1 text-xs font-medium text-saffron-300">
          <Sparkles className="h-3.5 w-3.5" /> AI TRAVEL PLANNER
        </div>
        <h2 className="mt-5 font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
          Where will your next story <span className="text-gradient-saffron">begin</span>?
        </h2>
        <p className="mt-3 text-neutral-400 max-w-xl">
          Tell us your destination, budget and travel preferences. Safarnama will plan the rest.
        </p>

        {/* Mode visual preview */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-black/30 p-4 min-h-[140px] overflow-hidden relative">
          <TravelModeVisual mode={form.travelMode} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* FROM */}
          <Field label="FROM" icon={<MapPin className="h-4 w-4" />}>
            <div className="relative">
              <input
                value={form.origin}
                onChange={(e) => {
                  setForm({ ...form, origin: e.target.value });
                  setOriginOpen(true);
                }}
                onFocus={() => setOriginOpen(true)}
                onBlur={() => setTimeout(() => setOriginOpen(false), 180)}
                placeholder="Starting city"
                className="w-full bg-transparent text-white placeholder:text-neutral-500 outline-none"
              />
              {originOpen && originSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full rounded-xl glass-strong border border-white/10 p-1 shadow-xl">
                  {originSuggestions.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onMouseDown={() => {
                          setForm({ ...form, origin: c });
                          setOriginOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Field>

          {/* TO */}
          <Field label="TO" icon={<MapPin className="h-4 w-4" />}>
            <div className="relative">
              <input
                value={form.destination}
                onChange={(e) => {
                  setForm({ ...form, destination: e.target.value });
                  setDestOpen(true);
                }}
                onFocus={() => setDestOpen(true)}
                onBlur={() => setTimeout(() => setDestOpen(false), 180)}
                placeholder="Destination"
                className="w-full bg-transparent text-white placeholder:text-neutral-500 outline-none"
              />
              {destOpen && destSuggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full rounded-xl glass-strong border border-white/10 p-1 shadow-xl">
                  {destSuggestions.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onMouseDown={() => {
                          setForm({ ...form, destination: c });
                          setDestOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/5"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Field>

          <Field label="TRAVEL DATE" icon={<Calendar className="h-4 w-4" />}>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full bg-transparent text-white outline-none [color-scheme:dark]"
            />
          </Field>

          <Field label="NUMBER OF DAYS" icon={<Calendar className="h-4 w-4" />}>
            <select
              value={form.days}
              onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
              className="w-full bg-transparent text-white outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((n) => (
                <option key={n} value={n} className="bg-ink-900">
                  {n} {n === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
          </Field>

          <Field label="TRAVELERS" icon={<Users className="h-4 w-4" />}>
            <NumberStepper
              value={form.travelers}
              onChange={(v) => setForm({ ...form, travelers: v })}
              min={1}
              max={20}
            />
          </Field>

          <Field label="TOTAL BUDGET" icon={<IndianRupee className="h-4 w-4" />}>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-saffron-400" />
              <input
                type="number"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                className="w-full bg-transparent text-white outline-none"
              />
            </div>
          </Field>
        </div>

        {/* Travel mode */}
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Travel Preference</p>
          <div className="flex flex-wrap gap-2">
            {travelModes.map((m) => {
              const Icon =
                m.id === "train" ? Train : m.id === "flight" ? Plane : m.id === "bus" ? Bus : m.id === "car" ? Car : Sparkles;
              const active = m.id === form.travelMode;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setForm({ ...form, travelMode: m.id })}
                  className={
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all " +
                    (active
                      ? "border-saffron-400/50 bg-saffron-400/10 text-saffron-300"
                      : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-neutral-400">{activeMode.hint}</p>
        </div>

        {/* Travel style */}
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Travel Style</p>
          <div className="flex flex-wrap gap-2">
            {travelStyles.map((s) => {
              const active = s.id === form.travelStyle;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setForm({ ...form, travelStyle: s.id })}
                  className={
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all " +
                    (active
                      ? "border-forest-400/50 bg-forest-400/10 text-forest-400"
                      : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10")
                  }
                >
                  <span>{s.emoji}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSubmit(form)}
          disabled={loading || !form.origin || !form.destination}
          className="mt-8 group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 px-7 py-4 text-sm font-semibold text-ink-950 shadow-[0_14px_40px_-10px_rgba(255,154,60,0.7)] hover:shadow-[0_18px_50px_-10px_rgba(255,154,60,0.9)] transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950 animate-spin" />
              Planning your journey…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate My Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-saffron-400/50 transition">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
        <span className="text-saffron-400">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function NumberStepper({ value, onChange, min, max }: { value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 text-white"
      >
        −
      </button>
      <span className="font-display text-xl text-white">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 text-white"
      >
        +
      </button>
    </div>
  );
}
