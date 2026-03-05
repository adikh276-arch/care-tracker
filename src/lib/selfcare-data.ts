export interface SelfCareEntry {
  date: string; // ISO date string YYYY-MM-DD
  didSelfCare: boolean | null;
  activities: string[];
  duration: string;
  preventionReasons: string[];
  helpfulType: string;
  mood: string;
  moodEmoji: string;
}

export const ACTIVITIES = [
  "Exercise", "Meditation", "Journaling", "Reading",
  "Rest / Nap", "Skincare", "Healthy Meal", "Nature / Walk",
  "Social Time", "Hobby", "Therapy", "Digital Detox",
];

export const DURATIONS = [
  "< 10 minutes", "10–30 minutes", "30–60 minutes", "1+ hour",
];

export const PREVENTION_REASONS = [
  "Busy schedule", "Low energy", "Stress", "Forgot",
  "No motivation", "Not feeling well", "Lack of time", "Emotional overwhelm",
];

export const HELPFUL_TYPES = [
  "Rest", "Relaxation", "Physical activity",
  "Talking to someone", "Quiet time", "Creative activity",
];

export const MOODS = [
  { emoji: "😀", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Stressed" },
  { emoji: "😴", label: "Tired" },
];

export const POSITIVE_STATEMENTS = [
  "You showed up for yourself today. That's powerful. 🌿",
  "Self-care isn't selfish — it's essential. Well done. 💚",
  "Every small act of care builds a stronger you. 🌱",
  "You invested in yourself today. That matters. ✨",
  "Taking care of you is the best thing you did today. 🍃",
];

export const SUPPORTIVE_STATEMENTS = [
  "It's okay. Tomorrow is a fresh start. Be gentle with yourself. 🤍",
  "Not every day will be perfect, and that's perfectly fine. 🕊️",
  "You're doing your best. That's always enough. 💛",
  "Rest is also a form of self-care. Give yourself grace. 🌸",
  "Acknowledging today takes courage. You're already growing. 🌷",
];

export function getStoredEntries(): SelfCareEntry[] {
  try {
    const data = localStorage.getItem("selfcare-entries");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: SelfCareEntry) {
  const entries = getStoredEntries();
  const idx = entries.findIndex((e) => e.date === entry.date);
  if (idx >= 0) entries[idx] = entry;
  else entries.push(entry);
  localStorage.setItem("selfcare-entries", JSON.stringify(entries));
}

export function getLast7Days(): SelfCareEntry[] {
  const entries = getStoredEntries();
  const today = new Date();
  const days: SelfCareEntry[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const found = entries.find((e) => e.date === dateStr);
    if (found) days.push(found);
  }
  return days;
}

import i18n from "@/i18n";

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(i18n.language, { weekday: "short", month: "short", day: "numeric" });
}
