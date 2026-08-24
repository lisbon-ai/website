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
      { start: "16:30", end: "18:00", title: "Cafe Cursor" },
      { start: "18:00", end: "19:30", title: "Networking", kind: "social" },
    ],
  },
];
