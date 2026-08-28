export type Destination = {
  id: string;
  name: string;
  region: string;
  category: string;
  tagline: string;
  budget: string;
  duration: string;
  image: string;
  lat: number;
  lng: number;
};

export const destinations: Destination[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    category: "heritage",
    tagline: "Pink City palaces, bazaars and royal forts.",
    budget: "₹3,500 – ₹6,000",
    duration: "2–3 days",
    image: "/images/dest-jaipur.svg",
    lat: 26.9124,
    lng: 75.7873,
  },
  {
    id: "goa",
    name: "Goa",
    region: "Goa",
    category: "beach",
    tagline: "Sunsets, beaches and laid-back coastal vibes.",
    budget: "₹4,000 – ₹7,500",
    duration: "3–5 days",
    image: "/images/dest-goa.svg",
    lat: 15.2993,
    lng: 74.124,
  },
  {
    id: "manali",
    name: "Manali",
    region: "Himachal Pradesh",
    category: "mountains",
    tagline: "Snow-capped peaks, pine forests and mountain air.",
    budget: "₹5,000 – ₹9,000",
    duration: "4–6 days",
    image: "/images/dest-manali.svg",
    lat: 32.2396,
    lng: 77.1887,
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    region: "Uttarakhand",
    category: "adventure",
    tagline: "Yoga, rafting and the holy Ganges.",
    budget: "₹3,000 – ₹5,500",
    duration: "2–4 days",
    image: "/images/dest-rishikesh.svg",
    lat: 30.0869,
    lng: 78.2676,
  },
  {
    id: "varanasi",
    name: "Varanasi",
    region: "Uttar Pradesh",
    category: "heritage",
    tagline: "Ancient ghats, evening aarti and timeless lanes.",
    budget: "₹2,500 – ₹4,500",
    duration: "2–3 days",
    image: "/images/dest-varanasi.svg",
    lat: 25.3176,
    lng: 82.9739,
  },
  {
    id: "udaipur",
    name: "Udaipur",
    region: "Rajasthan",
    category: "heritage",
    tagline: "Lake palaces, royal heritage and sunset boat rides.",
    budget: "₹4,000 – ₹7,000",
    duration: "3–4 days",
    image: "/images/dest-udaipur.svg",
    lat: 24.5854,
    lng: 73.7125,
  },
];

export const categories = [
  { id: "mountains", label: "Mountains", emoji: "🏔️" },
  { id: "beaches", label: "Beaches", emoji: "🏖️" },
  { id: "nature", label: "Nature", emoji: "🌲" },
  { id: "heritage", label: "Heritage", emoji: "🏛️" },
  { id: "adventure", label: "Adventure", emoji: "🏕️" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "weekend", label: "Weekend Trips", emoji: "🌅" },
];
