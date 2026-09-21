# Product Feedback — Amazon Developer Hackathon 2026

## Tools / APIs / SDKs used

### Model Context Protocol TypeScript SDK

**Use:** self-hosted Yasmin MCP server, tool registration, Streamable HTTP transport, client integration test.

**What worked well**

- The separation between tools, resources, and transport is clear.
- `McpServer.registerTool` maps naturally to Yasmin’s learning actions.
- Streamable HTTP fits a remote agent service better than a process-local protocol.
- Structured tool results make it easy to expose both a human-readable response and inspectable learning state.
- Official runnable examples are more useful than isolated snippets.

**What needs work**

The current documentation spans two protocol eras:

- the 2025 protocol family, including `2025-11-25`;
- the newer 2026 protocol family.

For a hackathon that explicitly names `2025-11-25` as the minimum acceptable version, it takes extra reading to determine which SDK line/example should be used for the safest judging path.

A hackathon-specific “known-good Alexa+ MCP starter” pinned to a tested SDK version would reduce onboarding risk. This submission pins `@modelcontextprotocol/sdk` to `1.30.0` and verifies the transport with a real client/server integration test.

**Onboarding**

Good after the protocol-version decision was made. The main friction was choosing the correct current implementation path, not understanding the MCP concepts themselves.

**Would we build with it again?**

Yes. The tool model is a strong fit for separating the conversational client from a reusable learning runtime. The competition build now uses that separation to keep active session state by session ID and compact cross-session mastery evidence by learner key.

### Browser Speech Recognition / Speech Synthesis

**Use:** hands-free judge demo and learner voice interaction.

**What worked well**

- Extremely fast path to a voice-first prototype.
- No additional account or paid API required for the demo.
- Text fallback can use the exact same learning engine.

**What needs work**

Speech-recognition availability and quality vary across browsers, so a judged web experience cannot rely on it as the only input path.

**Would we build with it again?**

Yes for prototyping and demo fallback. A production child-learning product needs a more controlled voice pipeline.

## Overall developer experience

The open MCP path is attractive because the learning runtime stays portable. Yasmin’s planner/evaluator can serve a web client, an Alexa+-style agent client, or the main Android application without rewriting the pedagogical logic.
