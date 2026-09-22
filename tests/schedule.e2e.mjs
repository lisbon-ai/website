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

test('schedule titles link only organization names and preserve plain text', async () => {
  const expected = [
    { title: 'Opening', time: '9:30 AM – 9:45 AM', links: [] },
    { title: 'Opening w/ Cloudflare', time: '9:30 AM – 9:45 AM', links: [['Cloudflare', 'https://www.cloudflare.com/']] },
    { title: 'Intro to CNCA (BSC AI Factory)', time: '12:55 PM – 1:00 PM', links: [['CNCA', 'https://www.acnca.pt/'], ['BSC AI Factory', 'https://bsc-aifactory.eu/']] },
  ];
  for (const width of [1440, 390, 320]) {
    await page.command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 900 });
    await page.command('Page.navigate', { url: `http://127.0.0.1:${server.port}/schedule/` });
    await page.waitFor("document.readyState === 'complete' && !!document.querySelector('li.scroll-mt-24')");
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const state = await page.evaluate(titles => {
      const slots = [...document.querySelectorAll('li.scroll-mt-24')];
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        titles: titles.map(text => {
          const slot = slots.find(slot => slot.children[1].firstElementChild.textContent === text);
          if (!slot) return null;
          const title = slot.children[1].firstElementChild;
          const box = title.getBoundingClientRect(), range = document.createRange();
          range.selectNodeContents(title);
          return {
            title: title.textContent,
            time: slot.firstElementChild.textContent.trim(),
            links: [...title.querySelectorAll('a')].map(a => [a.textContent, a.getAttribute('href')]),
            forcedTargets: [...title.querySelectorAll('a')].some(a => a.hasAttribute('target')),
            images: slot.querySelectorAll('img, [role="img"]').length,
            clipped: [...range.getClientRects()].some(r => r.left < box.left - 1 || r.right > box.right + 1 || r.bottom > box.bottom + 1),
          };
        }),
      };
    }, expected.map(({ title }) => title));
    assert.equal(state.overflow, false);
    assert.deepEqual(state.titles, expected.map(slot => ({ ...slot, forcedTargets: false, images: 0, clipped: false })));
    for (const [name, url] of expected.flatMap(slot => slot.links)) {
      await page.evaluate(url => {
        const links = [...document.querySelectorAll('a[href]')];
        links[links.findIndex(a => a.getAttribute('href') === url) - 1].focus();
      }, url);
      await page.command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await page.command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      const focused = await page.evaluate(() => {
        const a = document.activeElement, style = getComputedStyle(a);
        return { name: a.textContent, href: a.getAttribute('href'), visible: a.matches(':focus-visible'), outline: style.outlineStyle, width: style.outlineWidth, decoration: style.textDecorationLine };
      });
      assert.deepEqual(focused, { name, href: url, visible: true, outline: 'solid', width: '1px', decoration: 'underline' });
    }
    const { nodes } = await page.command('Accessibility.getFullAXTree');
    for (const [name] of expected.flatMap(slot => slot.links)) {
      assert.ok(nodes.some(node => node.role?.value === 'link' && node.name?.value === name), `${name}: accessible link name`);
    }
  }
});

test('Alcides closes Security after the earlier Day 2 lunch, with matching talks and portraits', async () => {
  const agents = ['Matt Carey', 'Harshil Agrawal', 'Marcelo Lebre', 'Vitalii Ratushnyi', 'Peter Kirkham', 'Pedro Rodrigues'];
  const security = ['Diogo Mónica', 'Afonso Oliveira', 'Boda Zhao', 'Nina Torgunakova', 'Artur Goulão', 'Alcides Fonseca'];
  const day2Times = [
    '9:00 AM – 9:30 AM', '9:30 AM – 9:45 AM', '9:45 AM – 11:15 AM',
    '11:15 AM – 11:45 AM', '11:45 AM – 12:55 PM', '12:55 PM – 1:00 PM',
    '1:00 PM – 2:30 PM', '2:30 PM – 4:00 PM', '4:00 PM – 4:15 PM',
    '4:15 PM – 5:45 PM', '5:45 PM – 8:00 PM',
  ];
  for (const width of [1440, 390, 320]) {
    await page.command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 900 });
    await page.command('Page.navigate', { url: `http://127.0.0.1:${server.port}/schedule/` });
    await page.waitFor("document.readyState === 'complete' && !!document.querySelector('#security')");
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const schedule = await page.evaluate(() => {
      const blocks = [...document.querySelectorAll('li.scroll-mt-24')];
      const names = id => [...document.querySelectorAll(`#${id} > div > ul > li`)].map(li => li.querySelector('.text-sm > span').textContent.trim());
      const images = [...document.querySelectorAll('#security img')];
      const title = document.querySelector('#security a[href="/talks/#alcides-fonseca"]');
      const range = document.createRange();
      range.selectNodeContents(title);
      const box = title.parentElement.getBoundingClientRect();
      return {
        agents: names('agents'), security: names('security'),
        day2Times: [...document.querySelector('#security').parentElement.children].map(li => li.firstElementChild.firstElementChild.textContent.trim()),
        alcidesCount: document.querySelectorAll('a[href="/talks/#alcides-fonseca"]').length,
        portraits: images.map(img => img.alt),
        portraitsFit: images.every(img => {
          const r = img.getBoundingClientRect(), parent = img.parentElement.getBoundingClientRect();
          return img.naturalWidth > 0 && r.left >= parent.left && r.right <= parent.right && r.bottom <= parent.bottom;
        }),
        title: title.textContent.trim(),
        clipped: [...range.getClientRects()].some(r => r.left < box.left - 1 || r.right > box.right + 1 || r.bottom > box.bottom + 1),
        overflow: document.documentElement.scrollWidth > innerWidth,
        talks: blocks.flatMap(slot => [...slot.querySelectorAll('a[href^="/talks/#"]')].map(a => ({
          id: a.hash.slice(1), track: slot.firstElementChild.lastElementChild.textContent.trim(),
        }))),
      };
    });
    assert.deepEqual(schedule.agents, agents);
    assert.deepEqual(schedule.security, security);
    assert.deepEqual(schedule.day2Times, day2Times);
    assert.equal(schedule.alcidesCount, 1);
    assert.deepEqual(schedule.portraits, security);
    assert.equal(schedule.portraitsFit, true);
    assert.equal(schedule.title, 'Guardrailing your Agents with Types and Logic');
    assert.equal(schedule.clipped, false);
    assert.equal(schedule.overflow, false);

    await page.command('Page.navigate', { url: `http://127.0.0.1:${server.port}/talks/#alcides-fonseca` });
    await page.waitFor("document.readyState === 'complete' && !!document.querySelector('#alcides-fonseca')");
    const talks = await page.evaluate(() => ({
      entries: [...document.querySelectorAll('li[id]')].map(li => ({ id: li.id, track: li.firstElementChild.lastElementChild.textContent.trim() })),
      target: document.querySelector(':target')?.id,
      previous: document.querySelector('#alcides-fonseca').previousElementSibling.id,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    assert.deepEqual(talks.entries, schedule.talks);
    assert.deepEqual(talks.entries.at(-1), { id: 'alcides-fonseca', track: 'Security' });
    assert.equal(talks.target, 'alcides-fonseca');
    assert.equal(talks.previous, 'artur-goulao');
    assert.equal(talks.overflow, false);
  }
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
