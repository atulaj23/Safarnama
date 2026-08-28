"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Plan Trip" },
  { href: "/destinations", label: "Destinations" },
  { href: "/saved", label: "Saved Trips" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 glass-strong border-b border-white/5"
          : "py-5 bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-500 shadow-[0_6px_24px_-6px_rgba(255,154,60,0.6)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-950" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17c3-7 15-7 18 0" />
              <circle cx="7" cy="17" r="1.4" fill="currentColor" />
              <circle cx="17" cy="17" r="1.4" fill="currentColor" />
              <path d="M11 5l2 4-2-1-2 1 2-4z" fill="currentColor" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-white">Safarnama</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-saffron-400/80">AI · मुसाफ़िर</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1.5">
          {links.map((l) => {
            const active = path === l.href || (l.href === "/plan" && path.startsWith("/plan"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  active
                    ? "bg-white/5 text-white"
                    : "text-neutral-300 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/plan"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold text-sm shadow-[0_10px_30px_-10px_rgba(255,154,60,0.7)] hover:shadow-[0_14px_40px_-10px_rgba(255,154,60,0.9)] transition-all"
          >
            <Compass className="h-4 w-4" />
            Plan Your Trip
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white border border-white/10"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl glass-strong border border-white/10">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2.5 rounded-xl text-neutral-200 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-3 py-2.5 rounded-xl text-neutral-300 hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/plan"
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold"
            >
              <Compass className="h-4 w-4" /> Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
