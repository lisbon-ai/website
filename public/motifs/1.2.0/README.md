# Lisbon AI Motifs — browser build

Generated from https://github.com/lisbon-ai/motifs. The version, selected score,
still timestamp and file hashes are in `manifest.json`. Do not edit this build.
Copy the entire version directory and serve it from your own origin.

Import `mountMotifs` from `motifs.js`. Call it with a host element containing
`[data-motifs-poster]` (an image), `[data-motifs-canvas]` (an initially hidden
canvas), plus an optional `[data-motifs-toggle]` (an initially hidden button). Preserve the
visibility contract with `[hidden] { display: none !important; }` in the host
stylesheet, even when other rules set image/canvas display. It returns a
cleanup function. Give the image and canvas the same CSS box, fitting and
position. Host framing is independent of the renderer's crop. The conference
website uses centered `cover`, following the 2025 reference's vertical alignment.
The supplied `poster.webp` matches the default cropped composition at 10.3 seconds.

The module resolves `alexnet-filters.png` relative to itself. Optional parameters:
`assets` (a URL), `crop` (default true), `focus` (-1 for all, or slot 0–8),
`autoplay` (default true), and `stillTime` (default 10.3). If you change the view or
still time, provide a matching poster. `prefers-reduced-motion: reduce` prevents
autoplay and initial GPU/filter allocation. When supplied, the button permits
explicit play. Without it, reduced motion remains still-only.

Automatic startup uses the `loading` state and hides the poster until the first
render, avoiding a late-pose still followed by the loop's empty opening. Before
loading this module, the host can set `data-renderer="loading"` synchronously
when reduced motion is off, and hide its poster with CSS for that state. Leave
no-JavaScript and reduced-motion posters visible. A module-load failure must
switch to `fallback` and reveal the poster. Runtime failures do this internally.
Explicit Play from a still retains that still while the renderer initializes.
Uncropped study views use progressive Canvas2D minification of the GPU output;
cropped backgrounds draw directly to WebGL. Do not acquire a
rendering context from the presentation canvas yourself.

## Image attribution

`alexnet-filters.png` is the unchanged author-supplied `conv1-96.png` from
Krizhevsky, Sutskever & Hinton (2012), *ImageNet Classification with Deep
Convolutional Neural Networks*, Figure 3. Alex Krizhevsky explicitly permits
reuse of the supplied figures at https://www.cs.toronto.edu/~kriz/.
Archive: https://www.cs.toronto.edu/~kriz/convpaper_figures.zip.

The animation crops, repacks and recolours these learned-filter visualizations.
It does not use a numerical weight tensor or activation map. This permission
is specific to the supplied figures, not a blanket license for unrelated paper
material. Further source and adaptation boundaries are documented in the source
repository. Preserve this attribution when redistributing the build.
