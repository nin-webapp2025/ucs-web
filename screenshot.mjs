// Screenshot helper for the UCS Premier Consults website.
// Usage:  node screenshot.mjs http://localhost:3000 [label]
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented, never overwritten).
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const OUT_DIR = join(ROOT, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3].replace(/[^a-z0-9-_]/gi, '')}` : '';

async function nextIndex() {
  try {
    const files = await readdir(OUT_DIR);
    const nums = files
      .map(f => /^screenshot-(\d+)/.exec(f))
      .filter(Boolean)
      .map(m => Number(m[1]));
    return nums.length ? Math.max(...nums) + 1 : 1;
  } catch {
    return 1;
  }
}

(async () => {
  await mkdir(OUT_DIR, { recursive: true });
  const n = await nextIndex();
  const outFile = join(OUT_DIR, `screenshot-${n}${label}.png`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // give fonts / lazy content a moment
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: outFile, fullPage: true });
    console.log(`Saved ${outFile}`);
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error('Screenshot failed:', err.message);
  process.exit(1);
});
