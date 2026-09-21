# Judge Testing Guide

## Fastest path

1. Run `npm install`.
2. Run `npm run test:core` first (no MCP connection required).
3. Run `npm test` for the full suite including the real MCP integration test.
4. Run `npm start`.
4. Open `http://localhost:3000`.
5. Click **Let Yasmin present**.

That guided flow demonstrates the core idea without requiring setup or a learner account.

## Manual web test

Select **Math — Fractions** and press **Start learning**.

Try this sequence:

1. `I don't understand`
2. `one half`
3. `yes`
4. `okay`
5. `One half is bigger because the same whole is split into fewer equal pieces.`

Expected behavior:

- step 1 changes the teaching strategy;
- steps 2–3 create positive evidence;
- step 4 does **not** complete the lesson;
- step 5 completes the loop with reflection evidence.

## MCP test

Endpoint:

```text
POST /mcp
```

Transport:

```text
Streamable HTTP
```

The project targets the hackathon minimum MCP protocol requirement of `2025-11-25`.

Run:

```bash
npm test
```

`npm run test:core` verifies the deterministic learning engine, presenter, cross-session memory, and runtime. The final `npm test` gate additionally runs a real MCP integration test. It launches the server, connects with `StreamableHTTPClientTransport`, verifies all required tools, completes a learning loop, reads the learner profile, asks Yasmin to plan a second session, and proves that the next session changes because of prior mastery evidence.

## MCP tools

- `yasmin_list_lessons`
- `yasmin_list_lessons`
- `yasmin_plan_next_session`
- `yasmin_start_session`
- `yasmin_tutor_turn`
- `yasmin_get_learning_state`
- `yasmin_get_learner_profile`

## Health endpoint

```text
GET /health
```

It reports the web service version plus the MCP endpoint and minimum protocol target.

## Cross-session memory proof

In the web UI:

1. Complete the Fractions loop.
2. Reload the page.
3. Confirm the **Cross-session learning memory** card still shows mastery metadata.
4. Click **Plan next session**.
5. Confirm Yasmin chooses the next loop from prior evidence.

Only compact mastery metadata is stored locally. Transcript text and voice audio are not part of the learning profile.

## Browser voice note

Speech recognition support varies by browser. Text input is always available and exercises the identical learning engine.

## Private repository access before final submission

If this repository remains private, grant judge access exactly as required by the current hackathon rules before final submission. Verify access from the Devpost/Amazon reviewer accounts and keep the repository available through the judging period.
