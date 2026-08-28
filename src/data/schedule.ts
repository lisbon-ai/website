export type SlotKind = "opening" | "closing" | "break" | "social";

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
      { start: "09:30", end: "09:45", title: "Opening", kind: "opening" },
      {
        start: "09:45",
        end: "11:15",
        title: "Agents",
        speakers: [
          "Lukas Wirth",
          "Marcelo Lebre",
          "Matt Carey",
        ],
      },
      { start: "11:15", end: "11:45", title: "Coffee break", kind: "break" },
      {
        start: "11:45",
        end: "13:00",
        title: "Agents",
        speakers: [
          "Alcides Fonseca",
          "Harshil Agrawal",
        ],
      },
      { start: "13:00", end: "14:30", title: "Riverside lunch", kind: "break" },
      {
        start: "14:30",
        end: "16:00",
        title: "Models",
        speakers: [
          "Chema Garabito",
          "Duarte Carmo",
          "Joan Rodriguez",
        ],
      },
      { start: "16:00", end: "16:30", title: "Coffee break", kind: "break" },
      {
        start: "16:30",
        end: "17:20",
        title: "Models",
        speakers: [
          "Prince Canuma",
          "Bojan Jakimovski",
          "Oğuz Gültepe",
        ],
      },
      {
        start: "17:20",
        end: "18:10",
        title: "Applied AI",
        speakers: [
          "Sergio Paniego",
          "Daniel Bukac",
          "Luis Monteiro",
        ],
      },
      { start: "18:10", end: "19:30", title: "Sunset Party", kind: "social" },
    ],
  },
  {
    label: "Day 2",
    date: "September 24",
    slots: [
      { start: "09:30", end: "09:45", title: "Opening w/ Cloudflare", kind: "opening" },
      {
        start: "09:45",
        end: "11:15",
        title: "Applied AI",
        speakers: [
          "Aayush Kapoor",
          "Piotr Skalski",
          "Cristiana Carpinteiro",
        ],
      },
      { start: "11:15", end: "11:45", title: "Coffee break", kind: "break" },
      {
        start: "11:45",
        end: "13:00",
        title: "Evals",
        speakers: [
          "Will Burstein",
          "Thom Jenkins",
          "Yomi Eluwande",
          "Simão Nogueira",
          "Jack Fitzsimons",
        ],
      },
      { start: "13:00", end: "14:30", title: "Riverside lunch", kind: "break" },
      {
        start: "14:30",
        end: "16:00",
        title: "Security",
        speakers: [
          "Diogo Mónica",
          "Nina Torgunakova",
          "Boda Zhao",
          "Afonso Oliveira",
          "Artur Goulão",
        ],
      },
      { start: "16:00", end: "16:30", title: "Coffee break", kind: "break" },
      {
        start: "16:30",
        end: "17:45",
        title: "Whiteboarding session with David Gomes",
        host: { name: "David Gomes", url: "https://x.com/davidgomes" },
      },
      { start: "17:45", end: "18:00", title: "Closing", kind: "closing" },
      { start: "18:00", end: "19:30", title: "Networking", kind: "social" },
    ],
  },
];
