/**
 * Mock data for the AI Lab concept demo. Fictional hotels — no real API is called.
 */

export type MockHotel = {
  id: string;
  name: string;
  area: string;
  tags: string[];
  room: string;
  rate: number;
  reason: string;
};

export const mockHotels: MockHotel[] = [
  { id: "h1", name: "Seabreeze Resort", area: "Beachfront", tags: ["beach", "family", "pool", "weekend"], room: "Deluxe Ocean View", rate: 180, reason: "Direct beach access and ocean-view rooms available this weekend." },
  { id: "h2", name: "Lagoon House", area: "Beachside", tags: ["beach", "quiet", "couple", "budget"], room: "Garden Bungalow", rate: 110, reason: "Quiet, five minutes to the beach, strong value for two." },
  { id: "h3", name: "Harbour Central", area: "City centre", tags: ["city", "business", "food", "tonight"], room: "Executive King", rate: 140, reason: "Walkable to the business district, late check-in available." },
  { id: "h4", name: "Highland Lodge", area: "Mountains", tags: ["mountain", "nature", "quiet", "couple"], room: "Forest Suite", rate: 160, reason: "Cool climate, trails nearby and a fireplace suite." },
  { id: "h5", name: "Old Quarter Inn", area: "Old town", tags: ["city", "budget", "culture", "food"], room: "Classic Double", rate: 75, reason: "In the historic centre, close to street food and museums." },
  { id: "h6", name: "Palm Family Club", area: "Beachfront", tags: ["beach", "family", "kids", "pool"], room: "Family Connecting", rate: 210, reason: "Kids’ club, connecting rooms and a shallow pool." },
];

export const suggestionPrompts = [
  "I want a room near the beach this weekend.",
  "What hotel should I stay at?",
  "Quiet place in the mountains for two",
  "Cheap hotel in the city centre tonight",
];

const lexicon: Record<string, string[]> = {
  beach: ["beach", "sea", "ocean", "coast"],
  city: ["city", "centre", "center", "downtown"],
  mountain: ["mountain", "hill", "highland", "nature"],
  family: ["family", "kids", "children"],
  couple: ["couple", "two", "romantic", "honeymoon"],
  budget: ["cheap", "budget", "affordable"],
  business: ["business", "work", "meeting"],
  quiet: ["quiet", "calm", "relax"],
  weekend: ["weekend", "saturday", "sunday"],
  tonight: ["tonight", "today", "now"],
};

export type DemoIntent = { signals: string[]; summary: string };

export function detectIntent(input: string): DemoIntent {
  const text = input.toLowerCase();
  const signals = Object.entries(lexicon)
    .filter(([, words]) => words.some((w) => text.includes(w)))
    .map(([k]) => k);

  const place = signals.find((s) => ["beach", "city", "mountain"].includes(s));
  const when = signals.find((s) => ["weekend", "tonight"].includes(s));
  const who = signals.find((s) => ["family", "couple", "business"].includes(s));

  const parts = [
    place ? `location: ${place}` : "location: open",
    when ? `dates: ${when === "weekend" ? "this weekend" : "tonight"}` : "dates: flexible",
    who ? `traveller: ${who}` : null,
    signals.includes("budget") ? "budget: low" : null,
  ].filter(Boolean);

  return { signals, summary: parts.join(" · ") };
}

export function recommend(intent: DemoIntent, limit = 2): MockHotel[] {
  const scored = mockHotels
    .map((h) => ({ h, score: intent.signals.reduce((s, sig) => s + (h.tags.includes(sig) ? (sig === "budget" ? 1.5 : 1) : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.h.rate - b.h.rate);
  return scored.slice(0, limit).map((s) => s.h);
}
