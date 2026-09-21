import { TutorAgent } from './agent-core.mjs';

export const JUDGE_DEMO = {
  title: 'Meet Yasmin — a tutor that proves understanding',
  durationLabel: '≈ 2 minutes',
  promise: 'A voice-first learning agent that explains, listens, evaluates, adapts, and refuses to claim mastery without evidence.'
};

export function createJudgeDemo(agent = new TutorAgent('fractions')) {
  agent.selectLesson('fractions');

  return [
    {
      id: 'meet',
      speaker: 'yasmin',
      kind: 'presenter',
      text: "Hi. I'm Yasmin. I'm not a question-answer bot. My job is to teach a child, notice when understanding breaks, change how I explain, and only claim mastery when I have evidence.",
      snapshot: () => agent.snapshot()
    },
    {
      id: 'problem',
      speaker: 'yasmin',
      kind: 'presenter',
      text: "A common tutoring failure is confusing a quick correct answer with real understanding. I separate teaching from evaluation, and I keep a learning state across the conversation.",
      snapshot: () => agent.snapshot()
    },
    {
      id: 'start',
      speaker: 'system',
      kind: 'live-proof',
      text: 'Live proof: Yasmin starts a fractions lesson and asks a diagnostic question.',
      run: () => agent.start()
    },
    {
      id: 'confusion',
      speaker: 'learner',
      kind: 'live-proof',
      text: "I don't understand.",
      run: () => agent.handle("I don't understand")
    },
    {
      id: 'adapt',
      speaker: 'system',
      kind: 'presenter',
      text: 'Watch the Agent Control Room: the strategy changes instead of repeating the same wording.',
      snapshot: () => agent.snapshot()
    },
    {
      id: 'evidence-1',
      speaker: 'learner',
      kind: 'live-proof',
      text: 'One half.',
      run: () => agent.handle('one half')
    },
    {
      id: 'evidence-2',
      speaker: 'learner',
      kind: 'live-proof',
      text: 'Yes, two quarters are equal to one half.',
      run: () => agent.handle('yes')
    },
    {
      id: 'anti-false-mastery',
      speaker: 'learner',
      kind: 'live-proof',
      text: 'Okay.',
      run: () => agent.handle('okay')
    },
    {
      id: 'reflection',
      speaker: 'learner',
      kind: 'live-proof',
      text: 'One half is bigger because the same whole is split into fewer equal pieces.',
      run: () => agent.handle('One half is bigger because the same whole is split into fewer equal pieces.')
    },
    {
      id: 'memory',
      speaker: 'system',
      kind: 'presenter',
      text: 'The completed evidence is now compact learning memory. The next session can be planned from mastery state instead of chat history.',
      snapshot: () => agent.snapshot()
    },
    {
      id: 'close',
      speaker: 'yasmin',
      kind: 'presenter',
      text: "That is the difference. I do not reward agreement; I look for evidence. I remember compact mastery signals across sessions without keeping the child's transcript or audio, and I use that evidence to decide what should happen next. The same architecture is designed to move back into the main Yasmin app.",
      snapshot: () => agent.snapshot()
    }
  ];
}

export function runDemoStep(step) {
  if (typeof step.run === 'function') return step.run();
  if (typeof step.snapshot === 'function') return step.snapshot();
  return step.snapshot || null;
}
