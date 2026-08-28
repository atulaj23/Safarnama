import type { BudgetBreakdown } from "@/lib/ai";
import { IndianRupee, Plane, Home, Utensils, Ticket, Map, Shield } from "lucide-react";

type Props = {
  budget: BudgetBreakdown;
  total: number;
};

const items: { key: keyof BudgetBreakdown; label: string; icon: typeof Plane; color: string }[] = [
  { key: "transportation", label: "Transportation", icon: Plane, color: "text-saffron-400" },
  { key: "accommodation", label: "Accommodation", icon: Home, color: "text-forest-400" },
  { key: "food", label: "Food", icon: Utensils, color: "text-amber-300" },
  { key: "activities", label: "Activities", icon: Ticket, color: "text-sky-300" },
  { key: "localTravel", label: "Local Travel", icon: Map, color: "text-purple-300" },
  { key: "emergencyBuffer", label: "Emergency Buffer", icon: Shield, color: "text-rose-300" },
];

export function BudgetBreakdown({ budget, total }: Props) {
  const actualTotal = Object.values(budget).reduce((a, b) => a + b, 0) || total;
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-6 sm:p-8">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Total Estimated Budget</p>
          <div className="mt-2 flex items-baseline gap-1">
            <IndianRupee className="h-6 w-6 text-saffron-400" />
            <span className="font-display text-5xl sm:text-6xl font-semibold text-white">
              {actualTotal.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">AI-estimated · subject to change</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          const value = budget[it.key];
          const pct = Math.round((value / actualTotal) * 100);
          return (
            <div key={it.key} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${it.color}`} />
                  <span className="text-xs uppercase tracking-wider text-neutral-400">{it.label}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{pct}%</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <IndianRupee className="h-3 w-3 text-neutral-400" />
                <span className="font-display text-2xl text-white">{value.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-saffron-500"
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
