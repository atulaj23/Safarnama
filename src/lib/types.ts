export type TravelMode = "train" | "flight" | "bus" | "car" | "any";
export type TravelStyle = "adventure" | "relaxed" | "culture" | "nature" | "food" | "mixed";

export type PlannerFormState = {
  origin: string;
  destination: string;
  startDate: string;
  days: number;
  travelers: number;
  budget: number;
  travelMode: TravelMode;
  travelStyle: TravelStyle;
};

export const defaultPlannerState: PlannerFormState = {
  origin: "",
  destination: "",
  startDate: "",
  days: 3,
  travelers: 2,
  budget: 5000,
  travelMode: "train",
  travelStyle: "mixed",
};

export const travelModes: { id: TravelMode; label: string; emoji: string; hint: string }[] = [
  { id: "train", label: "Train", emoji: "🚆", hint: "Best for scenic journeys" },
  { id: "flight", label: "Flight", emoji: "✈️", hint: "Best for saving time" },
  { id: "bus", label: "Bus", emoji: "🚌", hint: "Best for flexible budgets" },
  { id: "car", label: "Car", emoji: "🚗", hint: "Best for road trips" },
  { id: "any", label: "Any", emoji: "✨", hint: "AI decides for you" },
];

export const travelStyles: { id: TravelStyle; label: string; emoji: string }[] = [
  { id: "adventure", label: "Adventure", emoji: "🧗" },
  { id: "relaxed", label: "Relaxed", emoji: "🌿" },
  { id: "culture", label: "Culture", emoji: "🏛️" },
  { id: "nature", label: "Nature", emoji: "🌲" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "mixed", label: "Mixed", emoji: "✨" },
];

export const indianCities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Prayagraj",
  "Varanasi",
  "Goa",
  "Manali",
  "Shimla",
  "Rishikesh",
  "Udaipur",
  "Jodhpur",
  "Leh",
  "Darjeeling",
  "Mysuru",
  "Kochi",
  "Ooty",
  "Agra",
  "Amritsar",
  " Pondicherry",
  "Srinagar",
  "Mount Abu",
  "Andaman",
  "Khajuraho",
].map((c) => c.trim());
