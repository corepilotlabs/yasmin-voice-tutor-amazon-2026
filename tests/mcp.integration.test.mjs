import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const port = 31847;
const base = `http://127.0.0.1:${port}`;
const learnerKey = 'integration-judge';

const child = spawn(process.execPath, ['server.mjs'], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe']
});

let logs = '';
child.stdout.on('data', (chunk) => { logs += chunk.toString(); });
child.stderr.on('data', (chunk) => { logs += chunk.toString(); });

async function waitForHealth() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(`${base}/health`);
      if (response.ok) return response.json();
    } catch {}
    await sleep(150);
  }
  throw new Error(`Yasmin server did not become healthy. Logs: ${logs}`);
}

async function call(client, name, args) {
  const result = await client.callTool({ name, arguments: args });
  assert.equal(result.isError, undefined);
  return result.structuredContent;
}

const client = new Client(
  { name: 'yasmin-hackathon-smoke-test', version: '1.0.0' },
  { capabilities: {} }
);

try {
  const health = await waitForHealth();
  assert.equal(health.ok, true);
  assert.equal(health.mcp.minimumProtocol, '2025-11-25');

  const transport = new StreamableHTTPClientTransport(new URL(`${base}/mcp`));
  await client.connect(transport);

  const tools = await client.listTools();
  const names = new Set(tools.tools.map((tool) => tool.name));
  for (const required of [
    'yasmin_list_lessons',
    'yasmin_plan_next_session',
    'yasmin_start_session',
    'yasmin_tutor_turn',
    'yasmin_get_learning_state',
    'yasmin_get_learner_profile'
  ]) {
    assert.ok(names.has(required), `missing MCP tool: ${required}`);
  }

  const firstPlan = await call(client, 'yasmin_plan_next_session', { learnerKey });
  assert.equal(firstPlan.plan.lessonId, 'fractions');
  assert.equal(firstPlan.plan.mode, 'new');

  const started = await call(client, 'yasmin_start_session', {
    learnerKey,
    lessonId: 'auto'
  });
  const sessionId = started.sessionId;
  assert.ok(sessionId);
  assert.equal(started.selectedLessonId, 'fractions');

  const adapted = await call(client, 'yasmin_tutor_turn', {
    sessionId,
    learnerUtterance: "I don't understand"
  });
  assert.equal(adapted.response.kind, 'reteach');

  await call(client, 'yasmin_tutor_turn', { sessionId, learnerUtterance: 'one half' });
  await call(client, 'yasmin_tutor_turn', { sessionId, learnerUtterance: 'yes' });

  const falseMastery = await call(client, 'yasmin_tutor_turn', {
    sessionId,
    learnerUtterance: 'okay'
  });
  assert.equal(falseMastery.response.phase, 'reflection');

  const completed = await call(client, 'yasmin_tutor_turn', {
    sessionId,
    learnerUtterance: 'One half is bigger because the same whole is split into fewer equal pieces.'
  });
  assert.equal(completed.response.phase, 'complete');

  const profile = await call(client, 'yasmin_get_learner_profile', { learnerKey });
  assert.equal(profile.memory.skills.fractions.completed, true);
  assert.equal(profile.summary.skillsCompleted, 1);

  const secondPlan = await call(client, 'yasmin_plan_next_session', { learnerKey });
  assert.equal(secondPlan.plan.lessonId, 'foodchain');
  assert.equal(secondPlan.plan.mode, 'new');

  const secondSession = await call(client, 'yasmin_start_session', {
    learnerKey,
    lessonId: 'auto'
  });
  assert.equal(secondSession.selectedLessonId, 'foodchain');

  const state = await call(client, 'yasmin_get_learning_state', {
    sessionId: secondSession.sessionId
  });
  assert.equal(state.state.lesson.id, 'foodchain');

  console.log('MCP integration test: PASS — adaptive state and cross-session planning verified');
} finally {
  await client.close().catch(() => {});
  child.kill('SIGTERM');
}
