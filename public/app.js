import { LESSONS, TutorAgent } from './agent-core.mjs';
import { JUDGE_DEMO, createJudgeDemo, runDemoStep } from './presenter.mjs';
import {
  applyLearningSnapshot,
  clearLearningMemory,
  learningMemorySummary,
  loadLearningMemory,
  planNextLearningLoop,
  saveLearningMemory
} from './learning-memory.mjs';

const $ = (id) => document.getElementById(id);
const agent = new TutorAgent('fractions');
let recognition = null;
let listening = false;
let voiceEnabled = true;
let availableVoices = [];
let safeStorage = null;
try { safeStorage = window.localStorage; } catch {}
let learningMemory = loadLearningMemory(safeStorage);

const els = {
  transcript: $('transcript'),
  lessonTitle: $('lessonTitle'),
  lessonObjective: $('lessonObjective'),
  masteryBar: $('masteryBar'),
  masteryValue: $('masteryValue'),
  phase: $('phase'),
  strategy: $('strategy'),
  decision: $('decision'),
  evidence: $('evidence'),
  micBtn: $('micBtn'),
  startBtn: $('startBtn'),
  hintBtn: $('hintBtn'),
  confusedBtn: $('confusedBtn'),
  form: $('answerForm'),
  input: $('answerInput'),
  voiceToggle: $('voiceToggle'),
  status: $('voiceStatus'),
  memoryCount: $('memoryCount'),
  judgeDemoTitle: $('judgeDemoTitle'),
  judgeDemoBtn: $('judgeDemoBtn'),
  stopDemoBtn: $('stopDemoBtn'),
  demoProgressText: $('demoProgressText'),
  demoProgressBar: $('demoProgressBar'),
  presenterStage: $('presenterStage'),
  presenterKicker: $('presenterKicker'),
  presenterText: $('presenterText'),
  smartSessionBtn: $('smartSessionBtn'),
  clearMemoryBtn: $('clearMemoryBtn'),
  memorySummary: $('learningMemorySummary'),
  memoryReason: $('learningMemoryReason')
};

let demoRunId = 0;
let demoRunning = false;

function addMessage(role, text, kind = '') {
  const row = document.createElement('div');
  row.className = `message ${role} ${kind}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'yasmin' ? 'Y' : 'You';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  row.append(avatar, bubble);
  els.transcript.append(row);
  els.transcript.scrollTop = els.transcript.scrollHeight;
}

function refreshVoices() {
  if (!('speechSynthesis' in window)) return;
  availableVoices = window.speechSynthesis.getVoices() || [];
}

function preferredVoice(lang) {
  const prefix = lang.toLowerCase().slice(0, 2);
  const candidates = availableVoices.filter((voice) =>
    String(voice.lang || '').toLowerCase().startsWith(prefix)
  );
  const preferredNames = prefix === 'ar'
    ? /hoda|salma|zeina|arabic|female/i
    : /sonia|aria|jenny|samantha|zira|serena|female|natural|neural/i;
  return candidates.find((voice) => preferredNames.test(voice.name))
    || candidates.find((voice) => voice.localService)
    || candidates[0]
    || null;
}

function speak(text) {
  if (!voiceEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u0600-\u06ff]/.test(text) ? 'ar-EG' : 'en-GB';
  utterance.voice = preferredVoice(utterance.lang);
  utterance.rate = 0.93;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopJudgeDemo({ keepStage = false } = {}) {
  demoRunId += 1;
  demoRunning = false;
  els.judgeDemoBtn.disabled = false;
  els.judgeDemoBtn.textContent = '▶ Let Yasmin present';
  els.stopDemoBtn.hidden = true;
  if (!keepStage) els.presenterStage.hidden = true;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function setPresenterStep(step, index, total) {
  els.presenterStage.hidden = false;
  els.presenterStage.dataset.speaker = step.speaker;
  els.presenterKicker.textContent = step.speaker === 'yasmin'
    ? 'Yasmin is presenting'
    : step.speaker === 'learner'
      ? 'Live learner turn'
      : 'Agent proof';
  els.presenterText.textContent = step.text;
  const percent = Math.round(((index + 1) / total) * 100);
  els.demoProgressBar.style.width = `${percent}%`;
  els.demoProgressText.textContent = `Step ${index + 1} of ${total} · ${JUDGE_DEMO.durationLabel}`;
}

async function runJudgeDemoFlow() {
  stopJudgeDemo({ keepStage: true });
  const runId = demoRunId;
  demoRunning = true;
  els.judgeDemoBtn.disabled = true;
  els.judgeDemoBtn.textContent = 'Yasmin is presenting…';
  els.stopDemoBtn.hidden = false;
  els.transcript.innerHTML = '';

  document.querySelectorAll('.lesson-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.lesson === 'fractions');
  });

  const steps = createJudgeDemo(agent);
  render(agent.snapshot());

  for (let index = 0; index < steps.length; index += 1) {
    if (!demoRunning || runId !== demoRunId) return;
    const step = steps[index];
    setPresenterStep(step, index, steps.length);

    if (step.speaker === 'learner') {
      addMessage('learner', step.text);
    } else if (step.speaker === 'yasmin') {
      addMessage('yasmin', step.text, 'presenter');
    }

    const result = runDemoStep(step);
    if (result?.phase) {
      render(result);
      if (step.run) consume(result);
    }

    if (step.speaker === 'yasmin') speak(step.text);

    const pause = step.speaker === 'yasmin' ? 5200 : step.speaker === 'system' ? 2800 : 3900;
    await delay(pause);
  }

  if (!demoRunning || runId !== demoRunId) return;
  demoRunning = false;
  els.judgeDemoBtn.disabled = false;
  els.judgeDemoBtn.textContent = '↻ Replay Yasmin presentation';
  els.stopDemoBtn.hidden = true;
  els.demoProgressText.textContent = 'Demo complete · now try Yasmin yourself';
  els.demoProgressBar.style.width = '100%';
  els.presenterKicker.textContent = 'Demo complete';
  els.presenterText.textContent = 'The judge can now ask Yasmin questions or inspect the Agent Control Room.';
}

function renderLearningMemory() {
  const summary = learningMemorySummary(learningMemory);
  const plan = planNextLearningLoop(learningMemory, Object.keys(LESSONS));

  if (!summary.skillsSeen) {
    els.memorySummary.textContent = 'No saved learning evidence yet.';
  } else {
    els.memorySummary.textContent =
      `${summary.skillsCompleted}/${summary.skillsSeen} loops completed · ${summary.averageBestMastery}% average best evidence`;
  }

  els.memoryReason.textContent = plan.lessonId
    ? `Next: ${LESSONS[plan.lessonId]?.title || plan.lessonId}. ${plan.reason}`
    : 'No learning loop is available.';
}

function persistLearningSnapshot(snapshot) {
  if (!snapshot?.lesson?.id || snapshot.phase === 'idle') return;
  learningMemory = applyLearningSnapshot(learningMemory, snapshot);
  saveLearningMemory(safeStorage, learningMemory);
  renderLearningMemory();
}

function chooseLessonCard(lessonId) {
  document.querySelectorAll('.lesson-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.lesson === lessonId);
  });
}

function render(snapshot) {
  els.lessonTitle.textContent = `${snapshot.lesson.icon} ${snapshot.lesson.title}`;
  els.lessonObjective.textContent = snapshot.lesson.objective;
  els.masteryBar.style.width = `${snapshot.mastery}%`;
  els.masteryValue.textContent = `${snapshot.mastery}%`;
  els.phase.textContent = snapshot.phase.replace('-', ' ');
  els.strategy.textContent = snapshot.strategy;
  els.decision.textContent = snapshot.lastDecision;
  els.memoryCount.textContent = String(snapshot.evidence.length);
  els.evidence.innerHTML = '';
  if (!snapshot.evidence.length) {
    const li = document.createElement('li');
    li.className = 'muted';
    li.textContent = 'No mastery claim yet — Yasmin waits for evidence.';
    els.evidence.append(li);
  } else {
    snapshot.evidence.slice(-4).reverse().forEach((item) => {
      const li = document.createElement('li');
      li.className = item.type;
      li.textContent = item.label;
      els.evidence.append(li);
    });
  }
}

function consume(result) {
  addMessage('yasmin', result.text, result.kind);
  render(result);
  persistLearningSnapshot(result);
  speak(result.text);
}

function sendLearner(text) {
  const value = String(text || '').trim();
  if (!value) return;
  addMessage('learner', value);
  els.input.value = '';
  consume(agent.handle(value));
}

function configureRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    els.status.textContent = 'Voice input unavailable in this browser — text input still works.';
    els.micBtn.disabled = true;
    return;
  }
  recognition = new Recognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  recognition.lang = 'en-GB';
  recognition.onstart = () => {
    listening = true;
    els.micBtn.classList.add('listening');
    els.micBtn.setAttribute('aria-pressed', 'true');
    els.status.textContent = 'Listening… say your answer naturally.';
  };
  recognition.onend = () => {
    listening = false;
    els.micBtn.classList.remove('listening');
    els.micBtn.setAttribute('aria-pressed', 'false');
    els.status.textContent = 'Voice ready. You can also type at any time.';
  };
  recognition.onerror = (event) => {
    els.status.textContent = `Voice input did not complete (${event.error}). Type your answer or try again.`;
  };
  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    if (transcript) sendLearner(transcript);
  };
}

Object.values(LESSONS).forEach((lesson) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `lesson-card${lesson.id === 'fractions' ? ' active' : ''}`;
  button.dataset.lesson = lesson.id;
  button.innerHTML = `<span class="lesson-icon">${lesson.icon}</span><span><strong>${lesson.subject}</strong><small>${lesson.title}</small></span>`;
  button.addEventListener('click', () => {
    if (demoRunning) stopJudgeDemo();
    chooseLessonCard(lesson.id);
    agent.selectLesson(lesson.id);
    els.transcript.innerHTML = '';
    addMessage('yasmin', `Ready for ${lesson.title}. Press “Start learning” when you are ready.`);
    render(agent.snapshot());
  });
  $('lessonList').append(button);
});

els.startBtn.addEventListener('click', () => {
  if (demoRunning) stopJudgeDemo();
  consume(agent.start());
});
els.hintBtn.addEventListener('click', () => {
  if (demoRunning) stopJudgeDemo();
  sendLearner('Give me a hint');
});
els.confusedBtn.addEventListener('click', () => {
  if (demoRunning) stopJudgeDemo();
  sendLearner("I don't understand");
});
els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (demoRunning) stopJudgeDemo();
  sendLearner(els.input.value);
});
els.micBtn.addEventListener('click', () => {
  if (!recognition) return;
  try {
    if (listening) recognition.stop();
    else recognition.start();
  } catch {
    els.status.textContent = 'Voice input is already changing state. Try again in a moment.';
  }
});
els.voiceToggle.addEventListener('change', () => {
  voiceEnabled = els.voiceToggle.checked;
  if (!voiceEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel();
});
els.smartSessionBtn.addEventListener('click', () => {
  if (demoRunning) stopJudgeDemo();
  const plan = planNextLearningLoop(learningMemory, Object.keys(LESSONS));
  if (!plan.lessonId) return;
  const lesson = LESSONS[plan.lessonId];
  chooseLessonCard(plan.lessonId);
  agent.selectLesson(plan.lessonId);
  els.transcript.innerHTML = '';
  addMessage('yasmin', `I planned ${lesson.title} next. ${plan.reason}`, 'presenter');
  consume(agent.start());
});

els.clearMemoryBtn.addEventListener('click', () => {
  learningMemory = clearLearningMemory(safeStorage);
  renderLearningMemory();
  addMessage('yasmin', 'Local learning memory cleared. No transcript or audio was stored.', 'presenter');
});

els.judgeDemoTitle.textContent = JUDGE_DEMO.title;
els.judgeDemoBtn.addEventListener('click', () => runJudgeDemoFlow());
els.stopDemoBtn.addEventListener('click', () => {
  stopJudgeDemo();
  els.demoProgressText.textContent = 'Demo stopped · you can explore manually';
});

refreshVoices();
if ('speechSynthesis' in window) {
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
}
configureRecognition();
render(agent.snapshot());
renderLearningMemory();
addMessage('yasmin', 'Hi — I’m Yasmin. I won’t just give you answers. I’ll explain, check what you understood, and change strategy when you need help.');
