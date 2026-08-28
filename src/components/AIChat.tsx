"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Safarnama. Ask me anything — destinations, budgets, packing, or how to make a trip cheaper." },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      if (typeof window !== "undefined") document.body.style.overflow = "";
    };
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...history, { role: "user", content: text }];
    setHistory(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/travel/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: next }),
      });
      const data = await res.json();
      setHistory((h) => [...h, { role: "assistant", content: data.reply ?? "Sorry, please try again." }]);
    } catch {
      setHistory((h) => [...h, { role: "assistant", content: "Connection error — please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = ["What should I visit in Jaipur?", "Can I do this trip under ₹3000?", "What should I pack?"];

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 font-semibold text-sm px-5 py-3.5 shadow-[0_18px_40px_-10px_rgba(255,154,60,0.7)] hover:shadow-[0_22px_50px_-10px_rgba(255,154,60,0.9)] transition-all"
        aria-label="Ask Safarnama"
      >
        <span className="relative">
          <Sparkles className="h-4 w-4" />
          <span className="absolute inset-0 rounded-full bg-saffron-400 animate-[pulse-ring_1.6s_ease-out_infinite]" />
        </span>
        Ask Safarnama
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex md:items-end md:justify-end items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-md h-[70vh] md:h-[640px] glass-strong rounded-3xl border border-white/10 flex flex-col shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-500 text-ink-950">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-white font-semibold leading-tight">Safarnama Assistant</p>
                  <p className="text-[11px] text-neutral-400">Powered by AI · answers may be estimated</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {history.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] px-4 py-2.5 rounded-2xl bg-saffron-500 text-ink-950 text-sm"
                        : "max-w-[85%] px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-200 text-sm"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {history.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1 focus-within:border-saffron-400/50">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about destinations, budgets…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none py-2"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="h-9 w-9 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400 text-ink-950 inline-flex items-center justify-center disabled:opacity-50"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
