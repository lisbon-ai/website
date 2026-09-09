import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { preview } from 'astro';
import { openBrowserPage } from './browser.mjs';

const reference = JSON.parse(await readFile(new URL('./fixtures/hero-video-layout.json', import.meta.url)));
let server, page, url;
before(async () => {
  server = await preview({ root: fileURLToPath(new URL('../', import.meta.url)), logLevel: 'silent', server: { host: '127.0.0.1', port: 0 } });
  url = `http://127.0.0.1:${server.port}/`;
  page = await openBrowserPage('about:blank');
});
after(async () => {
  try { await page?.close(); } finally { await server?.stop(); }
});

test('the built homepage autoplays without a control and centers the responsive framing', { timeout: 120000 }, async () => {
  await page.command('Page.enable');
  await page.command('Runtime.enable');
  await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const expected of reference.cases) {
    for (const deviceScaleFactor of expected.viewport.width === 390 || expected.viewport.width === 768 ? [1, 2] : [1]) {
      await page.command('Emulation.setDeviceMetricsOverride', { ...expected.viewport, deviceScaleFactor, mobile: false });
      await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await navigate();
      const poster = await inspect('poster', expected);
      assert.equal(await page.evaluate(() => document.querySelector('[data-motifs-toggle]')), null);
      await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
      await navigate();
      await page.waitFor("document.querySelector('[data-motifs]')?.dataset.renderer === 'webgl2'");
      await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await page.waitFor("document.querySelector('[data-motifs]').dataset.frame === '309'");
      const canvas = await inspect('canvas', expected);
      assert.deepEqual(canvas.media, poster.media, 'Live and fallback media boxes must agree.');
      assert.deepEqual(canvas.clip, poster.clip);
      assertBox(canvas.frame, poster.frame, 1e-6, 'Live and fallback framing');
      console.log(`Centered framing: ${expected.viewport.width}×${expected.viewport.height}, DPR ${deviceScaleFactor}`);
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
  await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await page.command('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__posterSeen = false;
    function samplePoster() {
      const poster = document.querySelector('[data-motifs-poster]');
      if (poster?.naturalWidth && !poster.hidden && getComputedStyle(poster).visibility !== 'hidden') window.__posterSeen = true;
      requestAnimationFrame(samplePoster);
    }
    requestAnimationFrame(samplePoster);
  ` });
  await page.command('Network.enable');
  await page.command('Network.setCacheDisabled', { cacheDisabled: true });
  await page.command('Fetch.enable', { patterns: [{ urlPattern: '*/motifs.js' }] });
  try {
    await page.command('Page.navigate', { url });
    await page.waitFor("document.querySelector('[data-motifs-poster]')?.naturalWidth > 0");
    await new Promise(resolve => setTimeout(resolve, 500));
    const request = page.events.find(event => event.method === 'Fetch.requestPaused');
    assert.ok(request, 'Hold the runtime request to exercise first paint before initialization.');
    assert.equal(await page.evaluate(() => window.__posterSeen), false);
    assert.equal(await page.evaluate(() => document.querySelector('[data-motifs]').dataset.renderer), 'loading');
    await page.command('Fetch.continueRequest', { requestId: request.params.requestId });
  } finally { await page.command('Fetch.disable'); }
  await page.waitFor("document.querySelector('[data-motifs]')?.dataset.playing === 'true'");
  assert.equal(await page.evaluate(() => window.__posterSeen), false, 'Autoplay must not flash the still before or during initialization.');
  const startedFrame = await page.evaluate(() => document.querySelector('[data-motifs]').dataset.frame);
  await page.waitFor(`document.querySelector('[data-motifs]').dataset.frame !== ${JSON.stringify(startedFrame)}`);
  await page.command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.waitFor("document.querySelector('[data-motifs]').dataset.playing === 'false'");
  const stoppedFrame = await page.evaluate(() => document.querySelector('[data-motifs]').dataset.frame);
  await new Promise(resolve => setTimeout(resolve, 200));
  assert.equal(await page.evaluate(() => document.querySelector('[data-motifs]').dataset.frame), stoppedFrame);

  await page.command('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [390, 768, 1440]) {
    const expected = reference.cases.find(item => item.viewport.width === width);
    await page.command('Emulation.setDeviceMetricsOverride', { ...expected.viewport, deviceScaleFactor: 1, mobile: false });
    await navigate();
    await inspect('poster', expected);
    assert.equal(await page.evaluate(() => document.querySelector('[data-motifs-toggle]')), null);
  }
  assert.deepEqual(page.events.filter(event => event.method === 'Runtime.exceptionThrown'), []);
  console.log('Centered responsive crop, visible lower-row portions, live/poster and no-JavaScript checks passed.');
});

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
  // Keep the 2026 boxes, with the centered fitting confirmed on the 2025 site.
  assert.equal(state.position, '50% 50%');
  assert.equal(state.overflow, false);
  const horizontalScale = state.clientWidth / expected.clientWidth;
  const scale = box => ({ ...box, x: box.x * horizontalScale, width: box.width * horizontalScale });
  assertBox(state.media, scale(expected.media), .1, 'Original video element');
  assertBox(state.clip, scale(expected.clip), .1, 'Original clipping container');
  const frame = coverFrame(state.media, state.intrinsic);
  // The original is 2158×2160; the renderer is square. The sub-0.1% aspect
  // difference accounts for at most two CSS pixels across this matrix.
  assertBox(frame, coverFrame(scale(expected.media), reference.intrinsic), 2, 'Painted reference frame');

  // Check lower-row pixels only where the centered cover exposes them. Mobile
  // still clips the double-height media; no scrim may obscure exposed art.
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
  return { x: box.x + (box.width - width) / 2, y: box.y + (box.height - height) / 2, width, height };
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
