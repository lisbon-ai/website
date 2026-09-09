import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';

test('the built homepage preserves the native Motifs loader', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const component = await readFile(new URL('../src/components/HeroArtwork.astro', import.meta.url), 'utf8');
  const source = component.match(/<script is:inline type="module">([\s\S]*?)<\/script>/);
  assert.ok(source, 'The versioned runtime must be loaded by a native browser module.');
  assert.doesNotMatch(html, /__VITE_PRELOAD__/, 'Unresolved build placeholders must never be deployed.');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  const loader = scripts.find(([, , text]) => text.includes('[data-motifs]'));
  assert.ok(loader, 'The compiled page must include the Motifs loader.');
  assert.match(loader[1], /\btype="module"/);
  assert.equal(loader[2].trim(), source[1].trim(), 'Astro must leave this runtime-URL import unchanged.');
});
