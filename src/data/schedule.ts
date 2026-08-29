export type SlotKind = "arrival" | "opening" | "closing" | "break" | "social";

// Slots with no `kind` are programme blocks; the page numbers them per day.
export type Slot = {
  start: string;
  end: string;
  title: string;
  kind?: SlotKind;
  // Linked where the name appears inside `title`.
  host?: { name: string; url: string };
  // Logo shown after the title; filename in public/images/logos.
  org?: { name: string; url: string; logo: string; logoClass?: string };
  // Names referencing src/data/speakers.ts, where the org lives. The page
  // sorts them and resolves each name against that list.
  speakers?: string[];
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

// Track descriptions, keyed by slot title. Tracks that run twice in a day
// share one entry; a title with no entry simply renders without a description.
export const trackDescriptions: Record<string, string> = {
  Agents:
    "Protocols, tools, runtimes, planning, and orchestration for building capable, dependable systems that can act.",
  Models:
    "Building and improving AI models through better data, representation choices, training, adaptation, and optimization.",
  "Applied AI":
    "Turning AI into useful products and experiences, from new interfaces and design patterns to practical applications across industries.",
  Evals:
    "Measuring AI behavior, uncovering failures, and improving reliability through testing, observability, and production feedback.",
  Security:
    "Protecting AI systems and their users across privacy, identity, permissions, trust, secure execution, and supply-chain defense.",
};

export const days: Day[] = [
  {
    label: "Day 1",
    date: "September 23",
    slots: [
      { start: "09:00", end: "09:30", title: "Arrival & coffee", kind: "arrival" },
      { start: "09:30", end: "09:45", title: "Opening", kind: "opening" },
      {
        start: "09:45",
        end: "11:15",
        title: "Models",
        speakers: [
          "Prince Canuma",
          "Joan Rodriguez",
          "Chema Garabito",
        ],
      },
      { start: "11:15", end: "11:45", title: "Coffee break", kind: "break" },
      {
        start: "11:45",
        end: "13:00",
        title: "Models",
        speakers: [
          "Duarte Carmo",
          "Sergio Paniego",
          "Bojan Jakimovski",
        ],
      },
      { start: "13:00", end: "14:30", title: "Riverside lunch", kind: "break" },
      {
        start: "14:30",
        end: "16:30",
        title: "Agents",
        speakers: [
          "Matt Carey",
          "Marcelo Lebre",
          "Vitalii Ratushnyi",
          "Harshil Agrawal",
          "Alcides Fonseca",
        ],
      },
      { start: "16:30", end: "17:00", title: "Coffee break", kind: "break" },
      {
        start: "17:00",
        end: "18:30",
        title: "Evals",
        speakers: [
          "Will Burstein",
          "Thom Jenkins",
          "Oğuz Gültepe",
          "Yomi Eluwande",
          "Simão Nogueira",
          "Jack Fitzsimons",
        ],
      },
      { start: "18:30", end: "20:00", title: "Sunset Party", kind: "social" },
    ],
  },
  {
    label: "Day 2",
    date: "September 24",
    slots: [
      { start: "09:00", end: "09:30", title: "Arrival & coffee", kind: "arrival" },
      { start: "09:30", end: "09:45", title: "Opening w/ Cloudflare", kind: "opening" },
      {
        start: "09:45",
        end: "11:30",
        title: "Applied AI",
        speakers: [
          "Steve Ruiz",
          "Daniel Bukac",
          "Piotr Skalski",
          "Cristiana Carpinteiro",
        ],
      },
      { start: "11:30", end: "11:45", title: "Coffee break", kind: "break" },
      {
        start: "11:45",
        end: "13:00",
        title: "Applied AI",
        speakers: [
          "Lukas Wirth",
          "Aayush Kapoor",
          "Luis Monteiro",
        ],
      },
      { start: "13:00", end: "14:30", title: "Riverside lunch", kind: "break" },
      {
        start: "14:30",
        end: "16:00",
        title: "Security",
        speakers: [
          "Diogo Mónica",
          "Afonso Oliveira",
          "Boda Zhao",
          "Nina Torgunakova",
          "Artur Goulão",
        ],
      },
      { start: "16:00", end: "16:30", title: "Coffee break", kind: "break" },
      {
        start: "16:30",
        end: "18:00",
        title: "Whiteboarding session with David Gomes",
        host: { name: "David Gomes", url: "https://x.com/davidgomes" },
      },
      { start: "18:00", end: "18:15", title: "Closing", kind: "closing" },
      { start: "18:15", end: "19:45", title: "Networking", kind: "social" },
    ],
  },
];
