export const MEMORY_KEY = 'yasmin-learning-memory-v1';

export function emptyLearningMemory() {
  return {
    version: 1,
    sessionsCompleted: 0,
    skills: {}
  };
}

export function normalizeLearningMemory(value) {
  const base = emptyLearningMemory();
  if (!value || typeof value !== 'object') return base;
  const skills = {};
  for (const [lessonId, raw] of Object.entries(value.skills || {})) {
    if (!raw || typeof raw !== 'object') continue;
    skills[lessonId] = {
      lessonId,
      bestMastery: clampPercent(raw.bestMastery),
      lastMastery: clampPercent(raw.lastMastery),
      completed: Boolean(raw.completed),
      needsSupport: Boolean(raw.needsSupport),
      evidenceCount: Math.max(0, Number(raw.evidenceCount) || 0),
      lastStrategy: String(raw.lastStrategy || ''),
      updatedAt: String(raw.updatedAt || '')
    };
  }
  return {
    version: 1,
    sessionsCompleted: Math.max(0, Number(value.sessionsCompleted) || 0),
    skills
  };
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

export function applyLearningSnapshot(memory, snapshot, now = new Date().toISOString()) {
  const next = normalizeLearningMemory(memory);
  const lessonId = snapshot?.lesson?.id;
  if (!lessonId || !snapshot || snapshot.phase === 'idle') return next;

  const previous = next.skills[lessonId] || {
    lessonId,
    bestMastery: 0,
    lastMastery: 0,
    completed: false,
    needsSupport: false,
    evidenceCount: 0,
    lastStrategy: '',
    updatedAt: ''
  };

  const evidence = Array.isArray(snapshot.evidence) ? snapshot.evidence : [];
  const hasSupportSignal = evidence.some((item) => item?.type === 'needs-support');
  const completedNow = snapshot.phase === 'complete';

  next.skills[lessonId] = {
    lessonId,
    bestMastery: Math.max(previous.bestMastery, clampPercent(snapshot.mastery)),
    lastMastery: clampPercent(snapshot.mastery),
    completed: previous.completed || completedNow,
    needsSupport: completedNow ? false : (hasSupportSignal || (evidence.length > 0 && clampPercent(snapshot.mastery) < 55)),
    evidenceCount: Math.max(previous.evidenceCount, evidence.length),
    lastStrategy: String(snapshot.strategy || previous.lastStrategy || ''),
    updatedAt: now
  };

  if (completedNow && !previous.completed) {
    next.sessionsCompleted += 1;
  }

  return next;
}

export function planNextLearningLoop(memory, lessonIds) {
  const normalized = normalizeLearningMemory(memory);
  const ordered = [...lessonIds];

  const support = ordered
    .map((id, order) => ({ id, order, state: normalized.skills[id] }))
    .filter((x) => x.state && !x.state.completed && (x.state.needsSupport || x.state.bestMastery < 70))
    .sort((a, b) => a.state.bestMastery - b.state.bestMastery || a.order - b.order)[0];

  if (support) {
    return {
      lessonId: support.id,
      reason: 'Yasmin found unfinished or weak evidence, so she repairs that concept before adding new learning.',
      mode: 'repair'
    };
  }

  const unseen = ordered.find((id) => !normalized.skills[id]);
  if (unseen) {
    return {
      lessonId: unseen,
      reason: 'No repair is due, so Yasmin selects a learning loop with no prior evidence.',
      mode: 'new'
    };
  }

  const weakest = ordered
    .map((id, order) => ({ id, order, state: normalized.skills[id] }))
    .sort((a, b) => a.state.bestMastery - b.state.bestMastery || a.order - b.order)[0];

  return {
    lessonId: weakest?.id || ordered[0] || null,
    reason: 'All demo loops have evidence, so Yasmin schedules the weakest current mastery for spaced reinforcement.',
    mode: 'review'
  };
}

export function learningMemorySummary(memory) {
  const normalized = normalizeLearningMemory(memory);
  const skills = Object.values(normalized.skills);
  return {
    sessionsCompleted: normalized.sessionsCompleted,
    skillsSeen: skills.length,
    skillsCompleted: skills.filter((x) => x.completed).length,
    needsSupport: skills.filter((x) => x.needsSupport).length,
    averageBestMastery: skills.length
      ? Math.round(skills.reduce((sum, x) => sum + x.bestMastery, 0) / skills.length)
      : 0
  };
}

export function loadLearningMemory(storage) {
  try {
    return normalizeLearningMemory(JSON.parse(storage?.getItem(MEMORY_KEY) || 'null'));
  } catch {
    return emptyLearningMemory();
  }
}

export function saveLearningMemory(storage, memory) {
  try {
    storage?.setItem(MEMORY_KEY, JSON.stringify(normalizeLearningMemory(memory)));
    return true;
  } catch {
    return false;
  }
}

export function clearLearningMemory(storage) {
  try {
    storage?.removeItem(MEMORY_KEY);
  } catch {}
  return emptyLearningMemory();
}
