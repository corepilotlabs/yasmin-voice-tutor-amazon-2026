import assert from 'node:assert/strict';
import {
  applyLearningSnapshot,
  clearLearningMemory,
  emptyLearningMemory,
  learningMemorySummary,
  loadLearningMemory,
  planNextLearningLoop,
  saveLearningMemory
} from '../public/learning-memory.mjs';

const lessons = ['fractions', 'foodchain', 'mainidea'];
let memory = emptyLearningMemory();

let plan = planNextLearningLoop(memory, lessons);
assert.equal(plan.lessonId, 'fractions');
assert.equal(plan.mode, 'new');

memory = applyLearningSnapshot(memory, {
  phase: 'question',
  mastery: 35,
  strategy: 'Targeted hint',
  lesson: { id: 'fractions' },
  evidence: [{ type: 'needs-support' }]
}, '2026-09-20T00:00:00Z');

plan = planNextLearningLoop(memory, lessons);
assert.equal(plan.lessonId, 'fractions');
assert.equal(plan.mode, 'repair');

memory = applyLearningSnapshot(memory, {
  phase: 'complete',
  mastery: 92,
  strategy: 'Complete with evidence',
  lesson: { id: 'fractions' },
  evidence: [{ type: 'mastery' }, { type: 'mastery' }, { type: 'reflection' }]
}, '2026-09-20T00:01:00Z');

plan = planNextLearningLoop(memory, lessons);
assert.equal(plan.lessonId, 'foodchain');
assert.equal(plan.mode, 'new');

const summary = learningMemorySummary(memory);
assert.equal(summary.sessionsCompleted, 1);
assert.equal(summary.skillsCompleted, 1);

const data = new Map();
const storage = {
  getItem: (key) => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, value),
  removeItem: (key) => data.delete(key)
};
assert.equal(saveLearningMemory(storage, memory), true);
assert.equal(loadLearningMemory(storage).skills.fractions.completed, true);
assert.equal(clearLearningMemory(storage).skills.fractions, undefined);

console.log('learning memory tests: PASS');
