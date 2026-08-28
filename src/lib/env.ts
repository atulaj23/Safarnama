export const env = {
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  openrouterApiKey: process.env.OPENROUTER_API_KEY ?? "",
  mapboxToken: process.env.MAPBOX_TOKEN ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "safarnama-dev-secret-change-me",
  databaseUrl: process.env.DATABASE_URL ?? "",
};

export function hasGemini() {
  return !!env.geminiApiKey;
}
export function hasOpenRouter() {
  return !!env.openrouterApiKey;
}
export function hasMapbox() {
  return !!env.mapboxToken;
}
