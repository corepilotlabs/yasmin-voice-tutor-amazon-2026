import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const files = {
  submission: await readFile(new URL('../DEVPOST_FINAL_COPY.md', import.meta.url), 'utf8'),
  judging: await readFile(new URL('../JUDGING_MATRIX.md', import.meta.url), 'utf8'),
  significant: await readFile(new URL('../SIGNIFICANT_UPDATE.md', import.meta.url), 'utf8'),
  feedback: await readFile(new URL('../PRODUCT_FEEDBACK.md', import.meta.url), 'utf8'),
  friction: await readFile(new URL('../FRICTION_LOG.md', import.meta.url), 'utf8'),
  video: await readFile(new URL('../FINAL_VIDEO_NARRATION.md', import.meta.url), 'utf8')
};

const requiredSubmissionSections = [
  '## Inspiration',
  '## What it does',
  '## How we built it',
  '## Challenges we ran into',
  "## Accomplishments that we're proud of",
  '## What we learned',
  "## What's next for Yasmin Voice Tutor",
  '## Significant update during the hackathon window',
  '## Product Feedback',
  '## Friction Log',
  '## Privacy'
];

for (const section of requiredSubmissionSections) {
  assert.ok(files.submission.includes(section), `missing Devpost section: ${section}`);
}

assert.match(files.submission, /Alexa\+/);
assert.match(files.submission, /Streamable HTTP/i);
assert.match(files.submission, /six learning tools/i);
assert.match(files.judging, /Six explicit MCP tools/i);
assert.match(files.significant, /six judge-testable tools/i);
assert.match(files.feedback, /@modelcontextprotocol\/sdk.*1\.30\.0/i);
assert.match(files.friction, /2025-11-25/);
assert.match(files.video, /Agreement is not evidence/i);

const prohibitedClaims = [
  /guaranteed learning/i,
  /production-grade voice/i,
  /stores the child's transcript/i
];

assert.ok(
  /not presented as a complete curriculum/i.test(files.submission),
  'Devpost copy must explicitly state that the demo is not a complete curriculum'
);

for (const pattern of prohibitedClaims) {
  assert.ok(!pattern.test(files.submission), `unsafe or unsupported claim: ${pattern}`);
}

console.log('submission consistency tests: PASS');
