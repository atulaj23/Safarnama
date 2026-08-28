import { hasGemini, hasOpenRouter } from "./env";

export type TravelPlanInput = {
  origin: string;
  destination: string;
  startDate?: string;
  days: number;
  travelers: number;
  budget: number;
  travelMode: "train" | "flight" | "bus" | "car" | "any";
  travelStyle: "adventure" | "relaxed" | "culture" | "nature" | "food" | "mixed";
};

export type ItineraryStop = {
  time: string;
  title: string;
  description: string;
  estimatedCost: number;
  travelDuration?: string;
  travelMode?: string;
};

export type DayPlan = {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
  estimatedDayCost: number;
};

export type BudgetBreakdown = {
  transportation: number;
  accommodation: number;
  food: number;
  activities: number;
  localTravel: number;
  emergencyBuffer: number;
};

export type ItineraryOutput = {
  overview: {
    destination: string;
    duration: string;
    travelers: number;
    estimatedTotalCost: number;
    travelMode: string;
    tagline: string;
  };
  days: DayPlan[];
  budget: BudgetBreakdown;
  tips: string[];
  demo: boolean;
};

const PROVIDER: "gemini" | "openrouter" | "demo" = hasGemini()
  ? "gemini"
  : hasOpenRouter()
    ? "openrouter"
    : "demo";

async function callGemini(prompt: string): Promise<string> {
  const { env } = await import("./env");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
      }),
    }
  );
  if (!res.ok) throw new Error("Gemini request failed");
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

async function callOpenRouter(prompt: string): Promise<string> {
  const { env } = await import("./env");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openrouterApiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-lite-001",
      messages: [
        {
          role: "system",
          content:
            "You are Safarnama, an AI travel planner for Indian students. Always respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error("OpenRouter request failed");
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

function buildDemoItinerary(input: TravelPlanInput): ItineraryOutput {
  const perDay = Math.round(input.budget / input.days);
  const days: DayPlan[] = [];
  const baseStops: Omit<ItineraryStop, "time">[] = [
    {
      title: "Arrival & Check-in",
      description: `Arrive in ${input.destination}, settle into an affordable guesthouse near the main market.`,
      estimatedCost: Math.round(perDay * 0.35),
      travelDuration: "30 min",
      travelMode: "walk",
    },
    {
      title: "Local Street-Food Lunch",
      description: "Try local thali / street food staples. Budget-friendly and iconic.",
      estimatedCost: Math.round(perDay * 0.12),
      travelDuration: "15 min",
      travelMode: "walk",
    },
    {
      title: "Heritage Walk & Sightseeing",
      description: `Explore the best-known landmarks of ${input.destination} on a walking loop.`,
      estimatedCost: Math.round(perDay * 0.1),
      travelDuration: "3 hr",
      travelMode: "walk",
    },
    {
      title: "Sunset Viewpoint",
      description: "Head to a scenic viewpoint for golden hour photos.",
      estimatedCost: Math.round(perDay * 0.05),
      travelDuration: "45 min",
      travelMode: input.travelMode === "flight" ? "cab" : "local bus",
    },
    {
      title: "Dinner at Local Eatery",
      description: "A cozy local restaurant — safe, clean, and student-budget friendly.",
      estimatedCost: Math.round(perDay * 0.18),
      travelDuration: "20 min",
      travelMode: "walk",
    },
  ];

  const times = ["09:00", "12:30", "14:00", "17:30", "20:00"];

  for (let i = 0; i < input.days; i++) {
    const dayStops = baseStops.map((s, idx) => ({
      ...s,
      time: times[idx],
      title: i === 0 && idx === 0 ? "Arrival & Check-in" : s.title,
      description:
        i === input.days - 1 && idx === baseStops.length - 1
          ? "Farewell dinner — pack up and reflect on the trip."
          : s.description,
    }));
    days.push({
      dayNumber: i + 1,
      title: i === 0 ? "Arrival Day" : i === input.days - 1 ? "Departure Day" : `Exploring ${input.destination}`,
      stops: dayStops,
      estimatedDayCost: perDay,
    });
  }

  const transportCost = Math.round(input.budget * 0.3);
  const stayCost = Math.round(input.budget * 0.28);
  const foodCost = Math.round(input.budget * 0.2);
  const activitiesCost = Math.round(input.budget * 0.1);
  const localCost = Math.round(input.budget * 0.07);
  const buffer = input.budget - (transportCost + stayCost + foodCost + activitiesCost + localCost);

  return {
    overview: {
      destination: input.destination,
      duration: `${input.days} day${input.days > 1 ? "s" : ""}`,
      travelers: input.travelers,
      estimatedTotalCost: input.budget,
      travelMode: input.travelMode,
      tagline: `A ${input.travelStyle} ${input.days}-day escape to ${input.destination}.`,
    },
    days,
    budget: {
      transportation: transportCost,
      accommodation: stayCost,
      food: foodCost,
      activities: activitiesCost,
      localTravel: localCost,
      emergencyBuffer: buffer > 0 ? buffer : 0,
    },
    tips: [
      "Carry a student ID — many monuments offer 50% discounts.",
      "Book trains via IRCTC at least a week in advance.",
      "Prefer homestays over hotels for authentic local experience.",
      "Keep cash handy — small eateries rarely take UPI in rural areas.",
    ],
    demo: true,
  };
}

function buildPrompt(input: TravelPlanInput, mode: "plan" | "cheaper" | "faster" | "more"): string {
  const modeHint =
    mode === "cheaper"
      ? "Optimize heavily for cost. Choose budget transport, hostels/homestays, street food. Keep key highlights only."
      : mode === "faster"
        ? "Optimize for time — minimize travel between spots, group nearby attractions."
        : mode === "more"
          ? "Pack in as many experiences as possible — more places, more activities, more food stops."
        : "Balance cost, experience and travel time for a student traveler.";

  return `You are Safarnama, an AI travel planner for Indian students.

Generate a JSON itinerary for:
- From: ${input.origin}
- To: ${input.destination}
- Duration: ${input.days} days
- Travelers: ${input.travelers}
- Total Budget (₹): ${input.budget}
- Travel mode: ${input.travelMode}
- Travel style: ${input.travelStyle}
- Start date: ${input.startDate ?? "flexible"}

${modeHint}

Respond with STRICTLY valid JSON (no markdown, no commentary) matching this schema:
{
  "overview": { "destination": string, "duration": string, "travelers": number, "estimatedTotalCost": number, "travelMode": string, "tagline": string },
  "days": [
    {
      "dayNumber": number,
      "title": string,
      "stops": [
        { "time": "HH:MM", "title": string, "description": string, "estimatedCost": number, "travelDuration": string, "travelMode": string }
      ],
      "estimatedDayCost": number
    }
  ],
  "budget": { "transportation": number, "accommodation": number, "food": number, "activities": number, "localTravel": number, "emergencyBuffer": number },
  "tips": [string, string, string, string]
}

Ensure budget numbers sum to roughly the total budget. Use realistic INR student prices. Make descriptions vivid but concise.`;
}

function parseJsonOrThrow(raw: string): ItineraryOutput {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const obj = JSON.parse(cleaned);
  obj.demo = false;
  if (!obj.budget) {
    obj.budget = { transportation: 0, accommodation: 0, food: 0, activities: 0, localTravel: 0, emergencyBuffer: 0 };
  }
  return obj as ItineraryOutput;
}

export async function generateItinerary(
  input: TravelPlanInput,
  mode: "plan" | "cheaper" | "faster" | "more" = "plan"
): Promise<ItineraryOutput> {
  if (PROVIDER === "demo") {
    // simulate latency so loading states feel natural
    await new Promise((r) => setTimeout(r, 900));
    return buildDemoItinerary(input);
  }
  try {
    const prompt = buildPrompt(input, mode);
    const raw = PROVIDER === "gemini" ? await callGemini(prompt) : await callOpenRouter(prompt);
    return parseJsonOrThrow(raw);
  } catch (err) {
    // fall back to demo if provider fails
    return buildDemoItinerary(input);
  }
}

export async function travelChat(
  history: { role: "user" | "assistant"; content: string }[],
  context?: ItineraryOutput
): Promise<string> {
  if (PROVIDER === "demo") {
    await new Promise((r) => setTimeout(r, 500));
    const last = history[history.length - 1]?.content ?? "";
    if (/cheaper|budget|less expensive/i.test(last)) {
      return "I can regenerate with lower-cost stays and street food — tap 'Make It Cheaper' on your trip.";
    }
    if (/pack|what to bring/i.test(last)) {
      return "Pack light: ID, water bottle, sunscreen, a light jacket, comfortable shoes, power bank and a reusable bag.";
    }
    if (/tiring|relax/i.test(last)) {
      return "Try moving heavy sightseeing to the morning and leaving evenings free for cafés and sunset walks.";
    }
    return "I'm in demo mode — connect a GEMINI_API_KEY for deeper answers. Ask me about budgets, packing, or itinerary tweaks!";
  }
  try {
    const sys = `You are Safarnama, a friendly AI travel assistant for Indian students. Keep answers short and practical. ${
      context ? `Current trip context (JSON): ${JSON.stringify(context.overview)}` : ""
    }`;
    if (PROVIDER === "gemini") {
      const { env } = await import("./env");
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: sys }] },
            contents: history.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
          }),
        }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't process that.";
    }
    const { env } = await import("./env");
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.openrouterApiKey}` },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-001",
        messages: [
          { role: "system", content: sys },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that.";
  } catch {
    return "Connection error — please try again in a moment.";
  }
}
