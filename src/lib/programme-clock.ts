// Where the programme stands right now, shared by the lobby display (/tv)
// and the stream page (/live). Pure functions over the slot data so each
// page keeps its own markup; both feed it the same start/end strings the
// schedule stores ("HH:MM", 24h, zero-padded, so they compare as text).

export type Phase = "before" | "during" | "after";
export type SlotState = "past" | "now" | "next" | "later";

// The laptop or the viewer may sit in any timezone; the programme runs on
// Lisbon's.
const lisbon = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Lisbon", ...options });
const dateFormat = lisbon({ year: "numeric", month: "2-digit", day: "2-digit" });
const timeFormat = lisbon({ hour: "2-digit", minute: "2-digit", hour12: false });
const clockFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Lisbon",
  hour: "numeric",
  minute: "2-digit",
});

const partsOf = (format: Intl.DateTimeFormat, date: Date) =>
  Object.fromEntries(
    format.formatToParts(date).map(({ type, value }) => [type, value]),
  );

export const lisbonNow = (now = new Date()) => {
  const d = partsOf(dateFormat, now);
  const t = partsOf(timeFormat, now);
  return {
    date: `${d.year}-${d.month}-${d.day}`,
    // en-GB with hour12 off can still print midnight as "24".
    time: `${t.hour === "24" ? "00" : t.hour}:${t.minute}`,
    // "9:41 AM", for a clock face.
    clock: clockFormat.format(now),
  };
};

export type Forced = { day?: string | null; time?: string | null };

// Which day to show and how to read the clock against it. Outside the two
// days the nearest one is shown as a whole: the eve of the conference
// previews the first day, and afterwards the last day stays on its wrap.
// A forced day or time is a preview, which skips that.
export const resolveDay = <T extends { key: string; date: string }>(
  days: T[],
  now: { date: string; time: string },
  forced: Forced = {},
): { day: T; phase: Phase; time: string } => {
  if (forced.day || forced.time) {
    const day = days.find((d) => d.key === forced.day) ?? days[0];
    return { day, phase: "during", time: forced.time ?? now.time };
  }
  const match = days.find((d) => d.date === now.date);
  if (match) return { day: match, phase: "during", time: now.time };
  // Off-day phases pin the time outside the programme so every slot reads
  // as upcoming or done.
  if (now.date < days[0].date) return { day: days[0], phase: "before", time: "00:00" };
  return { day: days[days.length - 1], phase: "after", time: "24:00" };
};

// The running slot, the one after it, and a state per slot. Before doors
// open the first slot is what matters; after the last one the day is done.
export const slotStates = (
  slots: { start: string; end: string }[],
  time: string,
  phase: Phase = "during",
) => {
  const nowIndex = slots.findIndex((s) => s.start <= time && time < s.end);
  const afterEnd = slots.length > 0 && time >= slots[slots.length - 1].end;
  const nextIndex =
    nowIndex >= 0
      ? nowIndex + 1 < slots.length
        ? nowIndex + 1
        : -1
      : afterEnd
        ? -1
        : slots.findIndex((s) => s.start > time);
  // The eve of the conference lists tomorrow plainly, without a "next".
  const flagNext = phase === "before" ? -1 : nextIndex;
  const states: SlotState[] = slots.map((_, index) =>
    index === nowIndex
      ? "now"
      : index === flagNext
        ? "next"
        : afterEnd || index < nowIndex
          ? "past"
          : "later",
  );
  return { nowIndex, nextIndex, afterEnd, states };
};
