import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { launchBrowser } from './browser.mjs';
import { serveAssets } from './server.mjs';

test('qualified browser and isolated HTTP fixture (not product acceptance)', { timeout: 30_000 }, async t => {
  const work = fileURLToPath(new URL('../../.work/', import.meta.url));
  const directory = await mkdtemp(join(work, 'harness-smoke-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await Promise.all([
    writeFile(join(directory, 'index.html'), '<!doctype html><title>Harness fixture</title>'),
    writeFile(join(directory, 'fixture.mjs'), 'export const value = 42;'),
    writeFile(join(directory, 'fixture.js'), 'globalThis.harnessFixture = true;'),
    // Neutral empty WASM module, unrelated to SQLite or generated product assets.
    writeFile(join(directory, 'fixture.wasm'), new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0])),
  ]);
  const server = await serveAssets(directory);
  t.after(server.close);
  const browser = await launchBrowser();
  t.after(() => browser.close());
  assert.equal(browser.version(), '153.0.8010.12');
  const page = await browser.newPage();
  await page.goto(server.origin);
  const result = await page.evaluate(async () => {
    const module = await import('/fixture.mjs?query=must-not-be-a-filename');
    const types = await Promise.all(['fixture.mjs', 'fixture.js', 'fixture.wasm'].map(async name => {
      const response = await fetch(`/${name}?query=42`);
      if (!response.ok) throw new Error(`Fixture unavailable: ${name}`);
      if (name.endsWith('.wasm')) await WebAssembly.compile(await response.arrayBuffer());
      return response.headers.get('content-type');
    }));
    return {
      title: document.title,
      value: module.value,
      isolated: crossOriginIsolated,
      secure: isSecureContext,
      shared: typeof SharedArrayBuffer,
      types,
    };
  });
  assert.deepEqual(result, {
    title: 'Harness fixture', value: 42, isolated: true, secure: true, shared: 'function',
    types: ['text/javascript', 'text/javascript', 'application/wasm'],
  });
  const missing = await fetch(`${server.origin}/absent?query=42`);
  assert.equal(missing.status, 404);
  console.log(`Harness smoke: Chrome ${browser.version()}, loopback HTTP, COOP same-origin, COEP require-corp.`);
});
