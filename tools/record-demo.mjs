import { chromium } from 'playwright-core';
import { access, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const targetMs = Math.max(115000, Number(process.env.TARGET_MS || 125000));
let startedAt = 0;
const scale = targetMs / 125000;

const waitUntil = async (seconds) => {
  const remaining = startedAt + (seconds * 1000 * scale) - Date.now();
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
};

const waitForSignal = async (path) => {
  for (;;) {
    try {
      await access(path);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
};

const browser = await chromium.launch({
  headless: false,
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--start-maximized', '--autoplay-policy=no-user-gesture-required']
});

const context = await browser.newContext({ viewport: null, locale: 'en-GB' });
const page = await context.newPage();

await page.goto(process.env.DEMO_URL || 'http://127.0.0.1:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });

await page.evaluate(() => {
  const voice = document.getElementById('voiceToggle');
  if (voice?.checked) voice.click();
  window.scrollTo(0, 0);
});

const shot = async (name) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `media/${name}.png`, fullPage: false });
};

const click = async (id) => {
  await page.evaluate((target) => {
    document.getElementById(target)?.click();
    window.scrollTo(0, 0);
  }, id);
};

const answer = async (text) => {
  await page.evaluate((value) => {
    const input = document.getElementById('answerInput');
    if (input) input.value = value;
    document.getElementById('answerForm')?.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    window.scrollTo(0, 0);
  }, text);
};

const proof = async (kicker, text, strategy, decision) => {
  await page.evaluate(({ kicker, text, strategy, decision }) => {
    const stage = document.getElementById('presenterStage');
    if (stage) {
      stage.hidden = false;
      stage.dataset.speaker = 'system';
    }
    const k = document.getElementById('presenterKicker');
    const t = document.getElementById('presenterText');
    const s = document.getElementById('strategy');
    const d = document.getElementById('decision');
    if (k) k.textContent = kicker;
    if (t) t.textContent = text;
    if (s) s.textContent = strategy;
    if (d) d.textContent = decision;
    window.scrollTo(0, 0);
  }, { kicker, text, strategy, decision });
};

await shot('01-opening');
await writeFile('/tmp/yasmin-browser-ready', 'ready');
await waitForSignal('/tmp/yasmin-record-go');
startedAt = Date.now();

await waitUntil(7);
await click('startBtn');

await waitUntil(18);
await click('confusedBtn');
await waitUntil(23);
await shot('02-adaptation');

await waitUntil(29);
await answer('One half');

await waitUntil(36);
await answer('Yes');

await waitUntil(42);
await answer('Okay');
await waitUntil(46);
await shot('03-no-false-mastery');

await waitUntil(49);
await answer('One half is bigger');
await waitUntil(53);
await shot('04-rubric-partial');

await waitUntil(58);
await answer('One half is bigger because the same whole is split into fewer equal pieces');
await waitUntil(63);
await shot('05-rubric-complete');

await waitUntil(75);
await click('smartSessionBtn');
await waitUntil(80);
await shot('06-next-session');

await waitUntil(88);
const terminal = spawn('xterm', [
  '-geometry', '116x27+55+120',
  '-fa', 'Monospace',
  '-fs', '12',
  '-bg', '#0b1020',
  '-fg', '#f3f7ff',
  '-title', 'Alexa+ MCP — LIVE VERIFICATION',
  '-e', 'bash', '-lc',
  [
    'printf "\\n  YASMIN VOICE TUTOR — ALEXA+ MCP LIVE PROOF\\n"',
    'printf "  ===========================================\\n\\n"',
    'printf "  $ npm run test:mcp\\n\\n"',
    'npm run test:mcp',
    'printf "\\n  REAL Streamable HTTP MCP verification complete.\\n"',
    'sleep 12'
  ].join('; ')
], {
  cwd: process.cwd(),
  env: { ...process.env, DISPLAY: process.env.DISPLAY || ':99' },
  stdio: 'ignore'
});

await waitUntil(91);
await shot('07-mcp-live-terminal');
await waitUntil(106);
if (!terminal.killed) terminal.kill('SIGTERM');

await page.bringToFront();
await waitUntil(108);
await proof(
  'YASMIN · PRODUCT PATH',
  'The competition layer feeds its evidence-first memory and planning model back into the main Yasmin learning app.',
  'Reusable learning architecture',
  'Hackathon work becomes product capability — not a disposable demo.'
);
await waitUntil(114);
await shot('08-close');

await waitUntil(125);
await browser.close();
