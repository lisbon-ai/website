# Lisbon AI 2026

**The annual summit for people shipping AI in the real world.**
September 23–24, 2026 · Centro Champalimaud, Belém · Lisbon, Portugal

[Website](https://lisbonai.org) · [Get tickets](https://tickets.lisbonai.org/) · [Join our Discord](https://discord.gg/ExnMf8wTPU)

![Centro Champalimaud, Belém — Lisbon AI 2026 venue](https://raw.githubusercontent.com/lisbon-ai/website/main/public/images/venue/2.jpg)


---

## What it is

Lisbon AI is two days of code, talks, and hallway hacking with the people actually building it. No hype decks, no rubber-chicken dinners. Top labs, founding teams, and engineers deploying models in production, all in one room.

It started in 2025 as a not-so-quiet group chat of hackers reminiscing about LXJS and wondering why there wasn't a European, builder-first AI gathering. We fixed that then, and we're back for more in 2026. 

Bring your laptop!

## The basics

| | |
|---|---|
| **Dates** | September 23–24, 2026 |
| **Venue** | [Centro Champalimaud — Center for the Unknown](https://www.fchampalimaud.org/), Belém, Lisbon |
| **Size** | ~400 builders |
| **Tickets** | [tickets.lisbonai.org](https://tickets.lisbonai.org/) |

## What we care about

- **Community-run.** Organized by people who ship open-source for a living. Volunteer-based.
- **Open-source by default.** Every speaker presents the code. Every talk is live-streamed and most are published after the event.
- **Single-track, multi-track fun.** One stage so nobody has FOMO; plenty of side rooms so everybody finds their crowd.
- **Ethical by design.** [Code of conduct](https://lisbonai.org/conduct), diverse curation, and scholarships baked in.

## Get involved

- **Attend:** [join the waiting list](https://tickets.lisbonai.org/) — we're rolling out 2026 tickets in waves.
- **Sponsor:** [sponsors@lisbonai.org](mailto:sponsors@lisbonai.org)
- **Speak / volunteer / say hi:** [info@lisbonai.org](mailto:info@lisbonai.org)
- **Hang out:** [@lisbonai_](https://x.com/lisbonai_) on X, and [our Discord](https://discord.gg/ExnMf8wTPU)

---

## About this repo

This is the source for [lisbonai.org](https://lisbonai.org) — built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). If you want to build the website locally:

```bash
# Assuming you're on bun (Node 22+ also works):
bun install
bun dev
```

### Hero animation

The homepage uses a pinned, locally served WebGL build from
[lisbon-ai/motifs](https://github.com/lisbon-ai/motifs). It is the selected refined
Later red score with PT01's Smaller + denser material, not a video. Reduced motion, unavailable WebGL or disabled
JavaScript show the matching **10.3-second still**. Playback pauses offscreen and
in hidden tabs. The decorative hero has no playback button. Autoplay begins
without flashing the still first. Centered fitting and 70%-wide desktop artwork
follow the 2025 reference. The header and hero fill the initial viewport, with
short windows allowed to grow rather than clip the content.

`src/components/HeroArtwork.astro` owns the site's layout and responsive video framing.
`public/motifs/1.2.0/` contains the generated build, filter image, poster,
attribution and integrity manifest. Do not edit the generated files here.
Copy a new version directory from Motifs and update the component's version.
There is no runtime GitHub request and no public-facing link to the study.

The nine-motif catalogue, source renderer, research notes, interactive experiments
and rendering tests belong to the separate Motifs project. The original reference
video is retained there, not loaded or shipped by this website.

`npm test` runs the fast Node tests. It verifies the pinned files and component
contract without building the site or requiring a browser.

For end-to-end checks, sync dependencies with `bun install --frozen-lockfile` and
run `npm run test:e2e`. This builds the site and tests it in Chrome/Chromium.
Only this opt-in task requires a browser. Set `CHROME_PATH` if it is not in a
standard macOS location or on `PATH`. No running server or debugging session is
needed. The tests launch and clean up their own server, browser and temporary
profile. CI runs both commands before uploading the tested build.

See [the integration notes](docs/hero-integration.md) for framing, fallbacks and
checks.
