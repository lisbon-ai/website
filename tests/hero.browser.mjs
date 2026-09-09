import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { openBrowserPage } from './browser.mjs';

const reference = JSON.parse(await readFile(new URL('./fixtures/hero-video-layout.json', import.meta.url)));
const page = await openBrowserPage('about:blank');
const url = process.env.WEBSITE_URL ?? 'http://127.0.0.1:4321/';
try {
  await page.command('Page.enable');
  await page.command('Runtime.enable');
  await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const expected of reference.cases) {
    for (const deviceScaleFactor of expected.viewport.width === 390 || expected.viewport.width === 768 ? [1, 2] : [1]) {
      await page.command('Emulation.setDeviceMetricsOverride', { ...expected.viewport, deviceScaleFactor, mobile: false });
      await navigate();
      const poster = await inspect('poster', expected);
      await page.waitFor("document.querySelector('[data-motifs-toggle]')?.hidden === false");
      await page.evaluate(() => document.querySelector('[data-motifs-toggle]').click());
      await page.waitFor("document.querySelector('[data-motifs]')?.dataset.renderer === 'webgl2'");
      await page.evaluate(() => document.querySelector('[data-motifs-toggle]').click());
      const canvas = await inspect('canvas', expected);
      assert.deepEqual(canvas.media, poster.media, 'Live and fallback media boxes must agree.');
      assert.deepEqual(canvas.clip, poster.clip);
      assertBox(canvas.frame, poster.frame, 1e-6, 'Live and fallback framing');
      console.log(`Original-site framing: ${expected.viewport.width}×${expected.viewport.height}, DPR ${deviceScaleFactor}`);
    }
  }
  const pausedFrame = await page.evaluate(() => document.querySelector('[data-motifs]').dataset.frame);
  for (const width of [768, 899, 900, 1024, 600]) {
    const expected = reference.cases.find(item => item.viewport.width === width);
    await page.command('Emulation.setDeviceMetricsOverride', { ...expected.viewport, deviceScaleFactor: 1, mobile: false });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)))));
    await inspect('canvas', expected);
    assert.equal(await page.evaluate(() => document.querySelector('[data-motifs]').dataset.frame), pausedFrame);
  }
  await page.command('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [390, 768, 1440]) {
    const expected = reference.cases.find(item => item.viewport.width === width);
    await page.command('Emulation.setDeviceMetricsOverride', { ...expected.viewport, deviceScaleFactor: 1, mobile: false });
    await navigate();
    await inspect('poster', expected);
    assert.equal(await page.evaluate(() => document.querySelector('[data-motifs-toggle]').hidden), true);
  }
  assert.deepEqual(page.events.filter(event => event.method === 'Runtime.exceptionThrown'), []);
  console.log('Original responsive crop, visible lower-row portions, live/poster and no-JavaScript checks passed.');
} finally { await page.close(); }

async function navigate() {
  await page.command('Page.navigate', { url });
  await page.waitFor("document.readyState === 'complete' && document.querySelector('[data-motifs-poster]')?.naturalWidth > 0");
  await page.evaluate(() => document.fonts.ready.then(() => true));
}

async function inspect(kind, expected) {
  const state = await page.evaluate(kind => {
    const root = document.querySelector('[data-motifs]');
    const media = root.querySelector(`[data-motifs-${kind}]`);
    const box = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
    const css = getComputedStyle(media);
    return {
      hidden: media.hidden, fit: css.objectFit, position: css.objectPosition,
      intrinsic: kind === 'poster' ? { width: media.naturalWidth, height: media.naturalHeight } : { width: media.width, height: media.height },
      media: box(media), clip: box(root), viewportHeight: innerHeight,
      clientWidth: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  }, kind);
  assert.equal(state.hidden, false);
  assert.equal(state.fit, expected.fit);
  assert.equal(state.position, expected.position);
  assert.equal(state.overflow, false);
  const horizontalScale = state.clientWidth / expected.clientWidth;
  const scale = box => ({ ...box, x: box.x * horizontalScale, width: box.width * horizontalScale });
  assertBox(state.media, scale(expected.media), .1, 'Original video element');
  assertBox(state.clip, scale(expected.clip), .1, 'Original clipping container');
  const frame = coverFrame(state.media, state.intrinsic);
  // The original is 2158×2160; the renderer is square. The sub-0.1% aspect
  // difference accounts for at most two CSS pixels across this matrix.
  assertBox(frame, coverFrame(scale(expected.media), reference.intrinsic), 2, 'Painted reference frame');

  // Only check lower-row pixels where the ORIGINAL crop exposes them. Phones
  // and wide/short windows intentionally hide that row. No added scrim should
  // hide a portion that the original layout would show.
  const region = {
    x: Math.max(state.clip.x, frame.x + frame.width * .83),
    y: Math.max(state.clip.y, frame.y + frame.height * .76),
    right: Math.min(state.clip.x + state.clip.width, frame.x + frame.width * .97),
    bottom: Math.min(state.clip.y + state.clip.height, frame.y + frame.height * .90, state.viewportHeight),
  };
  if (region.right - region.x >= 10 && region.bottom - region.y >= 10) await assertPainted(region);
  return { media: state.media, clip: state.clip, frame };
}

function coverFrame(box, intrinsic) {
  const scale = Math.max(box.width / intrinsic.width, box.height / intrinsic.height);
  const width = intrinsic.width * scale, height = intrinsic.height * scale;
  return { x: box.x + (box.width - width) / 2, y: box.y, width, height };
}

function assertBox(actual, expected, tolerance, message) {
  for (const key of ['x', 'y', 'width', 'height']) {
    assert.ok(Math.abs(actual[key] - expected[key]) <= tolerance, `${message} ${key}: ${actual[key]} vs ${expected[key]}`);
  }
}

async function assertPainted(region) {
  const screenshot = await page.command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const coverage = await page.evaluate(async ({ region, png }) => {
    const image = new Image(); image.src = `data:image/png;base64,${png}`; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 100;
    const context = canvas.getContext('2d'), scale = image.width / innerWidth;
    context.drawImage(image, region.x * scale, region.y * scale, (region.right - region.x) * scale,
      (region.bottom - region.y) * scale, 0, 0, 100, 100);
    const pixels = context.getImageData(0, 0, 100, 100).data;
    let painted = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (Math.max(pixels[i] - 4, pixels[i + 1] - 4, pixels[i + 2] - 41) > 12) painted++;
    }
    return painted / 10000;
  }, { region, png: screenshot.data });
  assert.ok(coverage > .05, `The exposed lower-row portion must remain visible (${coverage}).`);
}
