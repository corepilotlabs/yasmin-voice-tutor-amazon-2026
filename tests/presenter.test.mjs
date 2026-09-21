import assert from 'node:assert/strict';
import { TutorAgent } from '../public/agent-core.mjs';
import { createJudgeDemo, runDemoStep } from '../public/presenter.mjs';

const agent = new TutorAgent('foodchain');
const steps = createJudgeDemo(agent);
assert.ok(steps.length >= 8);
assert.equal(steps[0].speaker, 'yasmin');
assert.ok(steps.some((step) => step.id === 'anti-false-mastery'));
assert.equal(agent.snapshot().lesson.id, 'fractions');

let final = null;
for (const step of steps) {
  const result = runDemoStep(step);
  if (result?.phase) final = result;
}

assert.equal(final.phase, 'complete');
assert.ok(final.mastery >= 90);
assert.ok(final.evidence.length >= 3);
console.log('presenter tests: PASS');
