import assert from 'node:assert/strict';
import { TutorAgent, evaluateReflection, normalize } from '../public/agent-core.mjs';

assert.equal(normalize('أيوه!'), 'ايوه');

{
  const a = new TutorAgent('fractions');
  const s = a.start();
  assert.equal(s.phase, 'question');
  const r1 = a.handle('one half');
  assert.equal(r1.questionIndex, 1);
  const r2 = a.handle('yes');
  assert.equal(r2.phase, 'reflection');
  const weak = a.handle('okay');
  assert.equal(weak.phase, 'reflection');

  const vague = a.handle('One half is bigger.');
  assert.equal(vague.phase, 'reflection');
  assert.equal(vague.kind, 'retry');
  assert.ok(vague.reflectionEvaluation.score < 70);

  const nonsense = a.handle('I like pizza and chocolate because they taste very good every day.');
  assert.equal(nonsense.phase, 'reflection');
  assert.equal(nonsense.kind, 'retry');

  const done = a.handle('One half is bigger because the same whole is split into fewer equal pieces.');
  assert.equal(done.phase, 'complete');
  assert.ok(done.mastery >= 90);
}

{
  const a = new TutorAgent('fractions');
  a.start();
  const tiny = a.handle('h');
  assert.notEqual(tiny.kind, 'correct');
}

{
  const rubric = evaluateReflection(
    'One half is bigger because the same whole is split into fewer equal pieces.',
    {
      minRequired: 2,
      required: [
        { id: 'comparison', label: 'comparison', phrases: ['one half is bigger'] },
        { id: 'whole', label: 'same whole', phrases: ['same whole'] },
        { id: 'parts', label: 'fewer parts', phrases: ['fewer equal pieces'] }
      ]
    }
  );
  assert.equal(rubric.passed, true);
  assert.ok(rubric.score >= 67);
}

{
  const a = new TutorAgent('foodchain');
  a.start();
  const uncertain = a.handle("I don't know");
  assert.equal(uncertain.kind, 'reteach');
  assert.equal(uncertain.phase, 'question');
}

{
  const a = new TutorAgent('mainidea');
  a.start();
  const hint = a.handle('give me a hint');
  assert.equal(hint.kind, 'hint');
  assert.equal(hint.questionIndex, 0);
}

console.log('agent tests: PASS');
