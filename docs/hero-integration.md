# Homepage Motifs integration

The homepage consumes the refined **Later red** score with PT01's selected
**Smaller + denser** material from the separate `lisbon-ai/motifs` project.
Release 1.1 uses 128 samples per tile edge and size `.50 × 128 / 104`: about 26%
narrower dots and 51% more candidate sampling points than release 1.0, without
changing the motifs, colour score, clocks or flowers. The renderer, source ledger, nine-motif
catalogue, experiments and model/GPU tests have one owner there.

## Pinned build

`src/components/HeroArtwork.astro` loads `public/motifs/1.2.0/motifs.js` from this
website's own origin. The adjacent image, 10.3-second poster, attribution and
integrity manifest are copied as a unit from `motifs/public/releases/1.2.0/`.
Release 1.2 changes startup presentation and makes the host toggle optional;
the 1.1 material, still, score and timing are unchanged.
No iframe, external runtime service, video or GitHub fetch is involved. The
conference website deliberately has no link to the study.

Do not edit generated files. For an update, build and test a new version in
Motifs, copy its whole release directory and change the component's version.
`npm test` checks the copied manifest, file hashes and component contract using
Node alone. `npm run test:e2e` builds the site and opens the compiled homepage in
a managed browser. CI runs both and uploads that tested build only after all
checks pass.

The host loader is a native `<script is:inline type="module">`. Motifs is already
a self-contained build loaded from a runtime URL, not a source dependency for
Vite to rewrite. Processing this import with the website's Astro 7.0.6 / Vite
8.1.3 toolchain left an unresolved `__VITE_PRELOAD__` placeholder in the compiled
page. That stopped initialization before the runtime or its fallback handler
could run. The inline module avoids that build rewrite. The integrated browser
test verifies actual startup and playback rather than matching the loader's
source text or looking for one particular build placeholder.

The first local verification missed this because the installed website packages
were stale (Astro 6.3.1 / Vite 7.3.2), despite newer versions in the checked-in
manifest and lockfile. Sync dependencies from `bun.lock` before building. This
fix keeps the existing dependency versions and the immutable Motifs release.

## Presentation

Desktop artwork width and centered `cover` fitting follow direct measurements
of https://2025.lisbonai.org/. The previous 2026 container was 80% wide, making
the drawing about 14% larger on wide screens. It now uses 70%.

- Below 900px, the artwork container still occupies the hero's top half. The media
  is twice the container height, full width, centered, and uses `object-fit: cover`.
- At 900px and above, the container occupies the right 70% of the full hero height.
  The media fills it with the same centered `cover` fitting.
- Header and hero together fill the initial viewport (`100svh`). Shared header
  height tokens preserve its existing 81px mobile / 61px desktop dimensions at
  the default font size. The header remains sticky beyond the hero.
- Desktop bottom padding is 32px instead of 96px. Mobile stays at 52px. At
  1512×982 this lowers the content by about 101px and puts the next divider at
  y=982. Short windows may grow beyond the fold rather than clip the content.

The artwork remains centered in its container. Height is the space below the
2026 header, not the 2025 video's full viewport height. `cover` still clips art
in some configurations.
Do not replace this with `contain` to force all nine motifs into view: that makes
intermediate sizes much smaller and shifts the composition to the right. No added
scrim obscures the image. Poster and canvas have identical presentation, without
changing motif masks, colours, timing or the renderer. The headline, buttons,
sponsor layout and footer remain otherwise unchanged.

## Startup, accessibility and lifecycle

A synchronous inline script marks automatic startup before the image is parsed.
CSS hides that image while `data-renderer="loading"` and reduced motion is off.
The runtime keeps it hidden until the first frame. Module or renderer failure
reveals the still. This avoids showing the 10.3-second pose and then jumping back
to the loop's opening. It does not remove network/GPU setup time or skip authored
entrance frames: the navy background remains while preparing the animation.

- Reduced motion is the OS/browser's `prefers-reduced-motion: reduce` preference,
  not a speed or battery heuristic. Initial reduced-motion mode shows the
  **10.3-second still**, with no filter download, WebGL setup or animation loop.
- No JavaScript, a failed module/image load or unavailable WebGL retains the
  same local still.
  Network failures require a reload to retry; graphics-context restoration can
  recover automatically.
- The decorative image has empty alt text and the canvas is hidden from assistive
  technology. The conference hero has no page-level playback control, as requested;
  the study retains its accessible Play/Pause controls. Reduced-motion support
  does not provide a manual pause mechanism for other visitors.
- Changing the preference to reduce pauses at the selected still frame. Disabling
  the preference again does not silently override that pause; reload to autoplay.
- Offscreen, hidden tabs and persisted page suspension stop the loop without
  catching up unseen time. Ordinary page teardown disposes listeners and GPU
  resources. Context restoration preserves playback intent and position.
- Output is sampled at 30 FPS from elapsed time, capped at 1600² pixels and DPR 2.
  Display refresh rate does not change the loop duration. Layout is measured on
  resize/resume, not on every animation frame.

## Verification

`npm test` runs the fast Node tests without building the website or requiring a
browser. Browser coverage is a separate, opt-in local task:

```sh
bun install --frozen-lockfile
npm test
npm run test:e2e
```

CI runs both commands. The end-to-end task builds once, and the Pages artifact is
uploaded only after its browser checks pass. No browser is downloaded by either
test command.

`tests/hero.e2e.mjs` is a regular Node test. It starts Astro's static preview on an
unused loopback port and a fresh headless Chrome/Chromium process with its own
unused debugging port and temporary profile. Hooks close both processes and
remove the profile after success or failure. It never attaches to a developer's
browser or uses a previously running website.

Chrome/Chromium is discovered on `PATH` or in standard macOS application paths.
`CHROME_PATH` can specify another executable. A missing browser fails
`test:e2e` rather than skipping coverage, but does not affect `npm test`.
GitHub's Ubuntu runner already includes Chrome. Both local and CI checks use SwiftShader for WebGL without requiring a physical
GPU. These are Chromium integration checks, not Firefox, Safari or physical-phone
certification.

`tests/fixtures/hero-video-2025-layout.json` records direct measurements of the
2025 video at 390, 600, 768, 899, 900, 1024, 1280, 1440, 1512 and 1920px widths.
It replaces the previous 2026 80%-width / 90vh fixture as the desktop-width
reference. The host suite checks that width and centered fitting, unchanged
header dimensions, the divider at the fold, sponsor spacing, and live/still
boxes. It separately retains the mobile half-height clipping policy and checks
that short windows can grow and that the header stays sticky after the hero. It checks absent playback controls, ordinary
autoplay, advancing frames and reduced-motion pause, compares poster/live framing,
exercises DPR 2 and no-JavaScript states, and samples exposed lower-row pixels.
It holds the runtime request to check that autoplay never flashes the poster
before initialization. Uncaught browser errors fail the test. A two-pixel
painted-frame tolerance accounts for the original 2158×2160 video's almost-square
aspect ratio versus the square renderer.

The first integration's bottom scrim hid art. An earlier correction
inappropriately forced `contain` and right alignment. Neither is part of the
current framing: this change reduces the desktop container's width instead.

The Motifs release browser suite checks the actual bundled module against source
pixels at 10.3 seconds, exact winning uniforms, no-GPU reduced motion, explicit
play/pause, resize/DPR, offscreen and real tab visibility, synthetic persisted
page events, context loss/restoration, loading failure, unavailable WebGL and
teardown during pending initialization. This is not a claim of actual BFCache
admission or physical-device certification.

Extraction and the new build toolchain also retain all 8,400 historical frame
fingerprints, 658 probes and seven comparison posters. The original reference
video is preserved in Motifs, distinct from this site's generated poster.
