import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const component = await readFile(new URL('../src/components/HeroArtwork.astro', import.meta.url), 'utf8');
const version = component.match(/motifs\/([^/]+)\//)[1];
const release = new URL(`../public/motifs/${version}/`, import.meta.url);

test('the pinned Motifs build is complete and unmodified', async () => {
  const manifest = JSON.parse(await readFile(new URL('manifest.json', release), 'utf8'));
  assert.equal(manifest.version, version);
  assert.equal(manifest.stillTime, 10.3);
  assert.equal(manifest.crop, true);
  assert.equal(manifest.zoom, 0.96);
  assert.match(manifest.treatment, /PT01 \/ Smaller \+ denser/);
  for (const [name, expected] of Object.entries(manifest.files)) {
    const bytes = await readFile(new URL(name, release));
    assert.equal(bytes.length, expected.bytes, name);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, name);
  }
  const module = await import(new URL('motifs.js', release));
  assert.equal(module.HOMEPAGE_STILL_TIME, 10.3);
  assert.equal(typeof module.mountMotifs, 'function');
});

test('the hero links to both daily recaps above the headline', async () => {
  const hero = await readFile(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
  const badge = hero.slice(hero.indexOf('<span>Watch the recap</span>'), hero.indexOf('<h1'));
  assert.ok(badge.startsWith('<span>Watch the recap</span>'));
  const links = [...badge.matchAll(/<a\s+href="([^"]+)"\s+aria-label="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  assert.deepEqual(links.map(([, href, label, content]) => [href, label, content.replace(/<[^>]+>/g, '').trim()]), [
    ['https://x.com/lisbonai_/status/2102754898647609419', 'Watch the Day 1 recap', 'Day 1 ↗'],
    ['https://x.com/lisbonai_/status/2103036958499029218', 'Watch the Day 2 recap', 'Day 2 ↗'],
  ]);
});

test('the homepage keeps an accessible local still without a video or study link', async () => {
  const hero = await readFile(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../src/components/Footer.astro', import.meta.url), 'utf8');
  assert.match(hero, /<HeroArtwork\s*\/>/);
  assert.doesNotMatch(hero, /<video/);
  assert.match(component, /data-motifs-poster/);
  assert.match(component, /data-motifs-canvas hidden aria-hidden="true"/);
  assert.doesNotMatch(component, /<button|data-motifs-toggle/);
  assert.match(component, /object-cover object-center/);
  const prepaint = component.indexOf('document.currentScript.parentElement.dataset.renderer = "loading"');
  assert.ok(prepaint >= 0 && prepaint < component.indexOf('<img'));
  assert.doesNotMatch(hero + component + footer, /href=[^\n]*(?:hero-lab|github\.com\/lisbon-ai\/motifs|github\.io\/motifs)/);
});
