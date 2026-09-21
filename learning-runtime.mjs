import { randomUUID } from 'node:crypto';
import { LESSONS, TutorAgent } from './public/agent-core.mjs';
import {
  applyLearningSnapshot,
  emptyLearningMemory,
  learningMemorySummary,
  planNextLearningLoop
} from './public/learning-memory.mjs';

export class LearningRuntime {
  constructor({ idFactory = randomUUID } = {}) {
    this.idFactory = idFactory;
    this.sessions = new Map();
    this.learners = new Map();
  }

  listLessons() {
    return Object.values(LESSONS).map(({ id, subject, title, objective }) => ({
      id, subject, title, objective
    }));
  }

  learnerMemory(learnerKey = 'judge-demo') {
    const key = String(learnerKey || 'judge-demo');
    if (!this.learners.has(key)) this.learners.set(key, emptyLearningMemory());
    return this.learners.get(key);
  }

  planNextSession(learnerKey = 'judge-demo') {
    const memory = this.learnerMemory(learnerKey);
    const plan = planNextLearningLoop(memory, Object.keys(LESSONS));
    return {
      ok: true,
      learnerKey,
      plan,
      summary: learningMemorySummary(memory)
    };
  }

  getLearnerProfile(learnerKey = 'judge-demo') {
    const memory = this.learnerMemory(learnerKey);
    return {
      ok: true,
      learnerKey,
      memory,
      summary: learningMemorySummary(memory)
    };
  }

  startSession(lessonId = 'fractions', learnerKey = 'judge-demo') {
    const resolvedLesson = lessonId === 'auto'
      ? this.planNextSession(learnerKey).plan.lessonId
      : (LESSONS[lessonId] ? lessonId : 'fractions');

    const sessionId = this.idFactory();
    const agent = new TutorAgent(resolvedLesson);
    this.sessions.set(sessionId, {
      agent,
      learnerKey: String(learnerKey || 'judge-demo'),
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    });
    const response = agent.start();
    this.persistSnapshot(String(learnerKey || 'judge-demo'), response);
    return {
      sessionId,
      learnerKey: String(learnerKey || 'judge-demo'),
      selectedLessonId: resolvedLesson,
      response
    };
  }

  persistSnapshot(learnerKey, snapshot) {
    const current = this.learnerMemory(learnerKey);
    const next = applyLearningSnapshot(current, snapshot);
    this.learners.set(learnerKey, next);
    return next;
  }

  turn(sessionId, learnerUtterance) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return {
        ok: false,
        error: 'unknown_session',
        message: 'Start a Yasmin learning session first.'
      };
    }
    session.lastActiveAt = new Date().toISOString();
    const response = session.agent.handle(learnerUtterance);
    const memory = this.persistSnapshot(session.learnerKey, response);
    return {
      ok: true,
      sessionId,
      learnerKey: session.learnerKey,
      response,
      memorySummary: learningMemorySummary(memory)
    };
  }

  getState(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return {
        ok: false,
        error: 'unknown_session',
        message: 'No learning state exists for that session.'
      };
    }
    return {
      ok: true,
      sessionId,
      learnerKey: session.learnerKey,
      createdAt: session.createdAt,
      lastActiveAt: session.lastActiveAt,
      state: session.agent.snapshot(),
      memorySummary: learningMemorySummary(this.learnerMemory(session.learnerKey))
    };
  }

  resetSession(sessionId, lessonId = null) {
    const session = this.sessions.get(sessionId);
    if (!session) return { ok: false, error: 'unknown_session' };
    if (lessonId && LESSONS[lessonId]) session.agent.selectLesson(lessonId);
    else session.agent.reset();
    session.lastActiveAt = new Date().toISOString();
    return { ok: true, sessionId, state: session.agent.snapshot() };
  }

  clearLearnerProfile(learnerKey = 'judge-demo') {
    const key = String(learnerKey || 'judge-demo');
    this.learners.set(key, emptyLearningMemory());
    return this.getLearnerProfile(key);
  }
}

export const learningRuntime = new LearningRuntime();
