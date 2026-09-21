import assert from 'node:assert/strict';
import { LearningRuntime } from '../learning-runtime.mjs';

let n = 0;
const runtime = new LearningRuntime({ idFactory: () => `session-${++n}` });
const start = runtime.startSession('fractions', 'judge');

assert.equal(start.sessionId, 'session-1');
assert.equal(start.response.phase, 'question');
assert.equal(start.learnerKey, 'judge');

const confused = runtime.turn(start.sessionId, "I don't understand");
assert.equal(confused.ok, true);
assert.equal(confused.response.kind, 'reteach');

runtime.turn(start.sessionId, 'one half');
runtime.turn(start.sessionId, 'yes');
const falseMastery = runtime.turn(start.sessionId, 'okay');
assert.equal(falseMastery.response.phase, 'reflection');

runtime.turn(
  start.sessionId,
  'One half is bigger because the same whole is split into fewer equal pieces.'
);
const state = runtime.getState(start.sessionId);
assert.equal(state.ok, true);
assert.equal(state.state.phase, 'complete');
assert.ok(state.state.mastery >= 90);
assert.equal(state.memorySummary.sessionsCompleted, 1);

const profile = runtime.getLearnerProfile('judge');
assert.equal(profile.summary.skillsCompleted, 1);
assert.equal(profile.memory.skills.fractions.completed, true);

const plan = runtime.planNextSession('judge');
assert.equal(plan.plan.lessonId, 'foodchain');
assert.equal(plan.plan.mode, 'new');

const next = runtime.startSession('auto', 'judge');
assert.equal(next.selectedLessonId, 'foodchain');

const missing = runtime.turn('missing', 'hello');
assert.equal(missing.ok, false);

console.log('learning runtime tests: PASS');
