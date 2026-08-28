import Link from "next/link";
import { Compass, Map, Sparkles, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    {
      title: "Plan",
      links: [
        { label: "Plan Trip", href: "/plan" },
        { label: "Destinations", href: "/destinations" },
        { label: "Saved Trips", href: "/saved" },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "How It Works", href: "/#how" },
        { label: "AI Assistant", href: "/plan" },
        { label: "Budget Planner", href: "/plan" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/#about" },
        { label: "Contact", href: "/#cta" },
        { label: "Privacy", href: "/#privacy" },
        { label: "Terms", href: "/#terms" },
      ],
    },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-gradient-to-b from-transparent to-ink-950">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-500 text-ink-950">
                <Compass className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">Safarnama</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-saffron-400/80">Pocket-Friendly Travel</span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-neutral-400 max-w-xs">
              AI-powered travel planning made for students and budget travelers. Discover, plan and explore — your story, perfectly routed.
            </p>
            <p className="mt-4 font-display text-lg text-neutral-300">मुसाफ़िरों की दुनिया</p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Email" className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 inline-flex items-center justify-center transition">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Maps" className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 inline-flex items-center justify-center transition">
                <Map className="h-4 w-4" />
              </a>
              <a href="#" aria-label="AI" className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 inline-flex items-center justify-center transition">
                <Sparkles className="h-4 w-4" />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-neutral-400 hover:text-saffron-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">© {year} Safarnama. Crafted for wanderers on a budget.</p>
          <p className="text-xs text-neutral-500">All prices are AI-generated estimates.</p>
        </div>
      </div>
    </footer>
  );
}
