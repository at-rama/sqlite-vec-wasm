import { createRequire } from 'node:module';
import { join } from 'node:path';

// Dependencies live in ignored state; the harness entry point checks tool identities.
export async function launchBrowser() {
  if (process.version !== 'v24.19.0' || !process.env.HARNESS_JS || !process.env.HARNESS_BROWSER) {
    throw new Error('Use bash tools/harness.sh smoke or exec with the qualified environment.');
  }
  const require = createRequire(join(process.env.HARNESS_JS, 'package.json'));
  if (require('playwright-core/package.json').version !== '1.63.0') {
    throw new Error('Expected locked playwright-core 1.63.0; run bash tools/harness.sh deps.');
  }
  const { chromium } = require('playwright-core');
  return chromium.launch({ executablePath: process.env.HARNESS_BROWSER, headless: true });
}
