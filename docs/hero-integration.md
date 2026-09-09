# Homepage Motifs integration

The homepage consumes the refined **Later red** score with PT01's selected
**Smaller + denser** material from the separate `lisbon-ai/motifs` project.
Release 1.1 uses 128 samples per tile edge and size `.50 × 128 / 104`: about 26%
narrower dots and 51% more candidate sampling points than release 1.0, without
changing the motifs, colour score, clocks or flowers. The renderer, source ledger, nine-motif
catalogue, experiments and model/GPU tests have one owner there.

## Pinned build

`src/components/HeroArtwork.astro` loads `public/motifs/1.1.0/motifs.js` from this
website's own origin. The adjacent image, 10.3-second poster, attribution and
integrity manifest are copied as a unit from `motifs/public/releases/1.1.0/`.
No iframe, external runtime service, video or GitHub fetch is involved. The
conference website deliberately has no link to the study.

Do not edit generated files. For an update, build and test a new version in
Motifs, copy its whole release directory and change the component's version.
`npm test` checks the copied manifest, file hashes and component contract.
After building, `npm run test:build` verifies the actual emitted loader. Both
checks run in CI before deployment.

The host loader is a native `<script is:inline type="module">`. Motifs is already
a self-contained build loaded from a runtime URL, not a source dependency for
Vite to rewrite. Processing this import with the website's Astro 7.0.6 / Vite
8.1.3 toolchain left an unresolved `__VITE_PRELOAD__` placeholder in the compiled
page. That stopped initialization before the runtime or its fallback handler
could run. The inline module avoids that build rewrite, and the output test
asserts that Astro preserves its source exactly.

The first local verification missed this because the installed website packages
were stale (Astro 6.3.1 / Vite 7.3.2), despite newer versions in the checked-in
manifest and lockfile. Sync dependencies from `bun.lock` before building. This
fix keeps the existing dependency versions and the immutable Motifs release.

## Presentation

Framing follows direct measurements of the original live website:

- Below 900px, the artwork container occupies the hero's top half. The media is
  twice the container height, full width, top-centered, and uses `object-fit: cover`.
- At 900px and above, the container occupies the right 80% of the full hero height.
  The media fills it with the same top-centered `cover` fitting.

The original intentionally clips the lower row in some window configurations.
Do not replace this with `contain` to force all nine motifs into view: that makes
intermediate sizes much smaller and shifts the composition to the right. No added
scrim obscures the image. Poster and canvas have identical presentation, without
changing motif masks, colours, timing or the renderer. The headline, buttons,
sponsor layout and footer remain otherwise unchanged.

## Accessibility and lifecycle

- Reduced motion is the OS/browser's `prefers-reduced-motion: reduce` preference,
  not a speed or battery heuristic. Initial reduced-motion mode shows the
  **10.3-second still**, with no filter download, WebGL setup or animation loop.
- No JavaScript, a failed module/image load or unavailable WebGL retains the
  same local still. A failed renderer does not expose a nonfunctional button.
  Network failures require a reload to retry; graphics-context restoration can
  recover automatically.
- The decorative image has empty alt text and the canvas is hidden from assistive
  technology. The Play/Pause button remains a real keyboard-accessible control.
- Explicit Play permits motion even with reduced motion enabled. Changing the
  preference to reduce pauses at the selected still frame. Disabling the
  preference again does not silently override that pause.
- Offscreen, hidden tabs and persisted page suspension stop the loop without
  catching up unseen time. Ordinary page teardown disposes listeners and GPU
  resources. Context restoration preserves playback intent and position.
- Output is sampled at 30 FPS from elapsed time, capped at 1600² pixels and DPR 2.
  Display refresh rate does not change the loop duration. Layout is measured on
  resize/resume, not on every animation frame.

## Verification

With the site running and Chrome's debugging port available:

```sh
CHROME_DEBUG_URL=http://127.0.0.1:9223 npm run test:hero-browser
# Set WEBSITE_URL to check a built or hosted preview instead of localhost:4321.
```

`tests/fixtures/hero-video-layout.json` records measurements of the live original
at 390, 600, 768, 899, 900, 1024, 1280, 1440 and 1920px widths, with varied heights.
The host suite compares media boxes, clipping boxes and painted-frame positions
against that independent fixture. It also compares poster/live framing, exercises
DPR 2 and no-JavaScript states, and samples lower-row pixels where the original
crop exposes them. A two-pixel painted-frame tolerance accounts for the original
2158×2160 video's almost-square aspect ratio versus the square renderer.

The first integration's bottom scrim hid art. The first correction then
inappropriately forced `contain` and right alignment. The fixture guards the
actual original layout rather than either of those intermediate implementations.

The Motifs release browser suite checks the actual bundled module against source
pixels at 10.3 seconds, exact winning uniforms, no-GPU reduced motion, explicit
play/pause, resize/DPR, offscreen and real tab visibility, synthetic persisted
page events, context loss/restoration, loading failure, unavailable WebGL and
teardown during pending initialization. This is not a claim of actual BFCache
admission or physical-device certification.

Extraction and the new build toolchain also retain all 8,400 historical frame
fingerprints, 658 probes and seven comparison posters. The original reference
video is preserved in Motifs, distinct from this site's generated poster.
