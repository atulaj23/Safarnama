"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      if (typeof window !== "undefined") {
        localStorage.setItem("safarnama_token", data.token);
        localStorage.setItem("safarnama_user", JSON.stringify(data.user));
      }
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 pb-16 max-w-md mx-auto px-5 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-500 text-ink-950">
          <LogIn className="h-5 w-5" />
        </div>
        <h1 className="mt-4 font-display text-3xl text-white">Welcome back, traveler.</h1>
        <p className="mt-2 text-neutral-400 text-sm">Sign in to save and revisit your journeys.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block rounded-2xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-saffron-400/50">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              <Mail className="h-3.5 w-3.5 text-saffron-400" /> Email
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1.5 bg-transparent text-white outline-none"
              placeholder="you@example.com"
            />
          </label>
          <label className="block rounded-2xl border border-white/10 bg-black/30 px-4 py-3 focus-within:border-saffron-400/50">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              <Lock className="h-3.5 w-3.5 text-saffron-400" /> Password
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1.5 bg-transparent text-white outline-none"
              placeholder="Min 6 characters"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold py-3 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400 text-center">
          New here?{" "}
          <Link href="/signup" className="text-saffron-300 hover:text-saffron-400">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
