import express from 'express';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { handleMcpRequest } from './mcp-server.mjs';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const port = Number(process.env.PORT || 3000);
const app = createMcpExpressApp({ host: '0.0.0.0' });

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('referrer-policy', 'no-referrer');
  res.setHeader('permissions-policy', 'microphone=(self)');
  next();
});

app.get('/health', (_req, res) => {
  res.setHeader('cache-control', 'no-store');
  res.json({
    ok: true,
    service: 'yasmin-voice-tutor',
    version: '0.3.0',
    mcp: {
      endpoint: '/mcp',
      transport: 'Streamable HTTP',
      minimumProtocol: '2025-11-25',
      learningMemory: 'cross-session mastery metadata by learnerKey'
    }
  });
});

app.post('/mcp', handleMcpRequest);
app.get('/mcp', (_req, res) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: { code: -32000, message: 'Use POST for this stateless Streamable HTTP endpoint.' },
    id: null
  });
});
app.delete('/mcp', (_req, res) => {
  res.status(405).json({
    jsonrpc: '2.0',
    error: { code: -32000, message: 'This demo endpoint is stateless at the transport layer.' },
    id: null
  });
});

app.use(express.static(root, {
  etag: true,
  maxAge: '5m',
  setHeaders: (res, path) => {
    if (path.endsWith('index.html')) res.setHeader('cache-control', 'no-store');
  }
}));

app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  res.setHeader('cache-control', 'no-store');
  return res.sendFile(join(root, 'index.html'));
});

app.listen(port, '0.0.0.0', (error) => {
  if (error) {
    console.error('Yasmin server failed to start', error);
    process.exit(1);
  }
  console.log(JSON.stringify({
    event: 'yasmin_hackathon_ready',
    port,
    web: '/',
    mcp: '/mcp'
  }));
});
