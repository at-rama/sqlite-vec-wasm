import assert from 'node:assert/strict';
import { runtimeNames } from '../build/config.mjs';

export const modes = ['vanilla', 'esm', 'bundler'];
export const vfsNames = ['opfs', 'opfs-wl', 'opfs-sahpool'];
export const productionStages = ['checkout', 'install', 'tools', 'deps', 'smoke', 'build', 'package', 'browser', 'bundle'];
export const browserCases = [
  ...modes.flatMap(mode => ['main', 'worker', 'worker1', 'promiser'].map(kind => `${mode}-${kind}`)),
  'baseline', 'fts5', 'float32', 'hamming', 'sql-negative-controls',
  ...vfsNames.map(name => `restart-${name}`), 'persistence-negative-control', 'final-hashes',
];

export function compareBaseline(expected, actual) {
  for (const [context, inventory] of Object.entries(expected)) {
    assert.ok(actual[context], `Missing baseline context: ${context}`);
    for (const key of ['capi', 'oo1', 'dbMethods', 'exports', 'vfs', 'options', 'functions']) {
      assert.ok(Array.isArray(actual[context][key]), `Missing inventory: ${context}/${key}`);
      assert.deepEqual(inventory[key].filter(value => !actual[context][key].includes(value)), [], `Missing baseline ${context}/${key}`);
    }
  }
  // Explicit baseline initialization installs the SAH pool before recording VFSes.
  const defaults = [...new Set(Object.values(expected).flatMap(i => i.vfs).filter(n => n.startsWith('opfs')))];
  assert.deepEqual(defaults.sort(), [...vfsNames].sort(), 'Reconcile changed upstream default OPFS VFS set; do not skip');
}

export function assertBrowserComplete(report) {
  assert.equal(report.schemaVersion, 1);
  assert.ok(typeof report.browser === 'string' && report.browser.length > 0, 'Missing real browser version');
  assert.ok(report.hosting?.secureContext && report.hosting?.crossOriginIsolated, 'Missing browser hosting prerequisites');
  for (const name of browserCases) assert.equal(report.cases[name]?.status, 'passed', `Incomplete browser case: ${name}`);
  assert.deepEqual(report.runtimeFiles.map(r => r.name).sort(), [...runtimeNames].sort());
}

export function assertApplicable(report, revision, archive) {
  assert.equal(report.schemaVersion, 1);
  assert.equal(report.verdict, 'passed');
  assert.match(revision, /^[0-9a-f]{40}$/);
  assert.equal(report.source?.commit, revision, 'Acceptance revision mismatch; merge ancestry is insufficient');
  assert.equal(report.source?.dirty, false, 'Dirty evaluated source');
  for (const name of productionStages) assert.equal(report.stages[name]?.status, 'passed', `Incomplete production stage: ${name}`);
  assert.deepEqual({ size: report.archive?.size, sha256: report.archive?.sha256 }, { size: archive?.size, sha256: archive?.sha256 }, 'Exact accepted archive mismatch');
  assert.match(archive.sha256, /^[0-9a-f]{64}$/);
  assert.ok(Number.isSafeInteger(archive.size) && archive.size > 0);
  assertBrowserComplete(report.browserResults);
}
