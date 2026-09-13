import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { preview } from 'astro';
import { openBrowserPage } from './browser.mjs';

let server, page;
before(async () => {
  server = await preview({ root: fileURLToPath(new URL('../', import.meta.url)), logLevel: 'silent', server: { host: '127.0.0.1', port: 0 } });
  page = await openBrowserPage('about:blank');
  await page.command('Page.enable');
  await page.command('Runtime.enable');
});
after(async () => {
  try { await page?.close(); } finally { await server?.stop(); }
});

test('schedule hosts show canonical affiliations without changing sponsor-only bylines', async () => {
  for (const width of [1440, 390, 320]) {
    await page.command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 900 });
    await page.command('Page.navigate', { url: `http://127.0.0.1:${server.port}/schedule/` });
    await page.waitFor("document.readyState === 'complete' && !!document.querySelector('a[href=\"https://x.com/davidgomes\"]')");
    await page.evaluate(() => document.querySelector('img[alt="David Gomes"]').scrollIntoView({ block: 'center' }));
    await page.waitFor("document.querySelector('img[alt=\"David Gomes\"]')?.naturalWidth > 0");
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const state = await page.evaluate(() => {
      const name = document.querySelector('a[href="https://x.com/davidgomes"]');
      const subtitle = name.parentElement, slot = name.closest('li');
      const sponsor = document.querySelector('a[href="https://yld.com"]');
      const image = slot.querySelector('img');
      const box = subtitle.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(subtitle);
      return {
        text: subtitle.textContent.replace(/\s+/g, ' ').trim(),
        links: [...subtitle.querySelectorAll('a')].map(a => [a.textContent.trim(), a.getAttribute('href')]),
        title: subtitle.previousElementSibling.textContent,
        time: slot.firstElementChild.textContent.trim(),
        images: slot.querySelectorAll('img, [role="img"]').length,
        image: [image.getAttribute('src'), image.alt, image.clientWidth, image.clientHeight, image.naturalWidth > 0],
        sponsor: sponsor.parentElement.textContent.trim(),
        sponsorLinks: sponsor.parentElement.querySelectorAll('a').length,
        clipped: [...range.getClientRects()].some(r => r.left < box.left - 1 || r.right > box.right + 1 || r.bottom > box.bottom + 1),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    assert.equal(state.text, 'Tell us about your side project with David Gomes · SpaceXAI');
    assert.deepEqual(state.links, [['David Gomes', 'https://x.com/davidgomes'], ['SpaceXAI', 'https://x.ai']]);
    assert.equal(state.title, 'Coffee break');
    assert.equal(state.time, '4:15 PM – 5:45 PM');
    assert.equal(state.images, 1);
    const size = width >= 900 ? 72 : 56;
    assert.deepEqual(state.image, ['/images/speakers/david.png', 'David Gomes', size, size, true]);
    assert.equal(state.sponsor, 'Powered by YLD');
    assert.equal(state.sponsorLinks, 1);
    assert.equal(state.clipped, false);
    assert.equal(state.overflow, false);
  }
});
