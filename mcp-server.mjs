import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { learningRuntime } from './learning-runtime.mjs';

function asToolResult(payload) {
  return {
    content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload
  };
}

export function createYasminMcpServer() {
  const server = new McpServer(
    {
      name: 'yasmin-learning-agent',
      version: '0.3.0'
    },
    {
      capabilities: { logging: {} },
      instructions:
        'Yasmin is an adaptive tutoring agent. Use a stable learnerKey across sessions, call yasmin_plan_next_session, start a session, pass learner turns to yasmin_tutor_turn, and inspect evidence before claiming mastery.'
    }
  );

  server.registerTool(
    'yasmin_list_lessons',
    {
      title: 'List Yasmin demo lessons',
      description: 'List auditable demo learning loops available to Yasmin.',
      outputSchema: {
        lessons: z.array(z.object({
          id: z.string(),
          subject: z.string(),
          title: z.string(),
          objective: z.string()
        }))
      }
    },
    async () => asToolResult({ lessons: learningRuntime.listLessons() })
  );

  server.registerTool(
    'yasmin_plan_next_session',
    {
      title: 'Plan the next learning session',
      description: 'Use cross-session learning evidence to choose repair, new learning, or review.',
      inputSchema: {
        learnerKey: z.string().default('judge-demo')
      }
    },
    async ({ learnerKey }) => asToolResult(learningRuntime.planNextSession(learnerKey))
  );

  server.registerTool(
    'yasmin_start_session',
    {
      title: 'Start adaptive learning session',
      description: 'Create a stateful Yasmin learning session. Use lessonId=auto to follow the learning-memory plan.',
      inputSchema: {
        learnerKey: z.string().default('judge-demo'),
        lessonId: z.string().default('auto')
      }
    },
    async ({ lessonId, learnerKey }) => asToolResult(learningRuntime.startSession(lessonId, learnerKey))
  );

  server.registerTool(
    'yasmin_tutor_turn',
    {
      title: 'Process learner turn',
      description:
        'Evaluate one learner utterance, update learning evidence, adapt the teaching strategy, and return Yasmin’s next response.',
      inputSchema: {
        sessionId: z.string(),
        learnerUtterance: z.string().min(1)
      }
    },
    async ({ sessionId, learnerUtterance }) => {
      const result = learningRuntime.turn(sessionId, learnerUtterance);
      return result.ok
        ? asToolResult(result)
        : { ...asToolResult(result), isError: true };
    }
  );

  server.registerTool(
    'yasmin_get_learning_state',
    {
      title: 'Inspect current learning state',
      description:
        'Read the current learning phase, strategy, mastery evidence, planner/evaluator decision, and memory summary for a session.',
      inputSchema: {
        sessionId: z.string()
      }
    },
    async ({ sessionId }) => {
      const result = learningRuntime.getState(sessionId);
      return result.ok
        ? asToolResult(result)
        : { ...asToolResult(result), isError: true };
    }
  );

  server.registerTool(
    'yasmin_get_learner_profile',
    {
      title: 'Inspect cross-session learner memory',
      description:
        'Read compact learning evidence across sessions. The profile stores mastery metadata, not learner transcript or audio.',
      inputSchema: {
        learnerKey: z.string().default('judge-demo')
      }
    },
    async ({ learnerKey }) => asToolResult(learningRuntime.getLearnerProfile(learnerKey))
  );

  server.registerResource(
    'yasmin-architecture',
    'yasmin://architecture',
    {
      title: 'Yasmin learning-agent architecture',
      description: 'Judge-facing architecture summary for the hackathon build.',
      mimeType: 'application/json'
    },
    async (uri) => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify({
          product: 'Yasmin Voice Tutor',
          track: 'Alexa+',
          interaction: 'voice-first adaptive tutoring',
          loop: ['plan', 'explain', 'listen', 'evaluate', 'adapt', 'collect evidence', 'reflect', 'remember'],
          guardrail: 'No mastery claim from generic acknowledgement or uncertainty.',
          sessionState: 'Learning state persists across MCP tool calls by session ID.',
          crossSessionMemory: 'A stable learnerKey carries compact mastery evidence into the next session.',
          privacy: 'The learning profile stores mastery metadata only; learner utterances and audio are not retained in the profile.'
        }, null, 2)
      }]
    })
  );

  return server;
}

export async function handleMcpRequest(req, res) {
  const server = createYasminMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Yasmin MCP request failed', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal MCP error' },
        id: null
      });
    }
  } finally {
    res.on('close', async () => {
      await transport.close().catch(() => {});
      await server.close().catch(() => {});
    });
  }
}
