export type SlotKind = "opening" | "break" | "social";

// Slots with no `kind` are programme blocks; the page numbers them per day.
export type Slot = {
  start: string;
  end: string;
  title: string;
  kind?: SlotKind;
};

export type Day = {
  label: string;
  date: string;
  slots: Slot[];
};

// Times are stored as 24h so they stay unambiguous and sortable; the page
// renders them as 12h.
export const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

// One-sentence track blurbs, keyed by slot title. The page adds the
// full stop. Tracks that run twice in a day share one
// entry; a title with no entry simply renders without a description.
export const trackDescriptions: Record<string, string> = {
  Agents:
    "The protocols, tooling, and runtimes that let agents orchestrate real work",
  Models:
    "How models get built, from data and training through post-training and optimization",
  Evals:
    "Measuring what systems actually do, and keeping them observable and reliable",
  Security:
    "Privacy, identity, and trust, down to the supply chain your models depend on",
  "Applied AI":
    "AI applied to products, interfaces, design, and domain applications",
};

export const days: Day[] = [
  {
    label: "Day 1",
    date: "September 23",
    slots: [
      { start: "09:30", end: "09:45", title: "Opening", kind: "opening" },
      { start: "09:45", end: "11:15", title: "Agents" },
      { start: "11:15", end: "11:45", title: "Coffee break", kind: "break" },
      { start: "11:45", end: "13:00", title: "Agents" },
      { start: "13:00", end: "14:30", title: "Lunch break", kind: "break" },
      { start: "14:30", end: "16:00", title: "Models" },
      { start: "16:00", end: "16:30", title: "Coffee break", kind: "break" },
      { start: "16:30", end: "17:20", title: "Models" },
      { start: "17:20", end: "18:10", title: "Applied AI" },
      { start: "18:10", end: "19:30", title: "Networking", kind: "social" },
    ],
  },
  {
    label: "Day 2",
    date: "September 24",
    slots: [
      { start: "09:30", end: "09:45", title: "Opening w/ Cloudflare", kind: "opening" },
      { start: "09:45", end: "11:15", title: "Applied AI" },
      { start: "11:15", end: "11:45", title: "Coffee break", kind: "break" },
      { start: "11:45", end: "13:00", title: "Evals" },
      { start: "13:00", end: "14:30", title: "Lunch break", kind: "break" },
      { start: "14:30", end: "16:00", title: "Security" },
      { start: "16:00", end: "16:30", title: "Coffee break", kind: "break" },
      { start: "16:30", end: "18:00", title: "Whiteboard session with David" },
      { start: "18:00", end: "19:30", title: "Networking", kind: "social" },
    ],
  },
];
