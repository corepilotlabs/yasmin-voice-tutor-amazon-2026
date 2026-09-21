# Judge Quickstart

This page is designed for a reviewer who has only a few minutes.

**Public source branch:** `https://github.com/corepilotlabs/yasmin-voice-tutor-amazon-2026`

## 1. Run the project

```bash
npm install
npm test
npm start
```

Then open the URL printed by the server.

Expected automated gates:

- deterministic teaching-agent tests;
- Presenter Mode tests;
- cross-session memory tests;
- learning-runtime tests;
- real MCP client/server integration test.

## 2. Fastest product path

Click **Let Yasmin present**.

The guided sequence demonstrates:

1. Yasmin explains the product herself.
2. A learner signals confusion.
3. Yasmin changes teaching representation instead of repeating wording.
4. Correct answers create positive evidence.
5. A generic “Okay” is rejected as insufficient mastery evidence.
6. A learner explanation completes the loop.
7. Compact mastery memory updates.
8. **Plan next session** chooses what should happen next from prior evidence.

## 3. Inspect the Alexa+ MCP surface

Health:

```text
GET /health
```

MCP:

```text
POST /mcp
```

Key tools:

- `yasmin_list_lessons`
- `yasmin_plan_next_session`
- `yasmin_start_session`
- `yasmin_tutor_turn`
- `yasmin_get_learning_state`
- `yasmin_get_learner_profile`

The integration test completes one learning loop, reads the learner profile, plans a later session, and verifies that previous mastery changes the next selected lesson.

## 4. Why this is not a generic education chatbot

A generic assistant can generate fluent explanations. Yasmin uses an explicit control loop:

```text
plan → explain → listen → evaluate → adapt → verify → remember → plan again
```

The key product rule is **fail-closed mastery**: the agent does not mark a learning loop complete from agreement, politeness, or uncertainty.

## 5. Significant update

The broader Yasmin product concept existed before the hackathon. The Alexa+/MCP runtime, judge-facing web experience, Presenter Mode, evidence ledger, cross-session mastery memory, smart next-session planner, competition testing, and reusable Android planning contract were added during the hackathon submission window.

See `SIGNIFICANT_UPDATE.md` for the detailed boundary.

## 6. Privacy

No child account is needed for judging. The web demo can persist compact mastery metadata locally, but the learning profile does not retain the child's voice audio or transcript.

## 7. Known demo boundaries

- Browser speech recognition support varies by browser; typed input is always available.
- The bundled lesson set is a focused judge harness, not a full curriculum.
- Production learner-memory synchronization is intentionally outside the competition demo.


## Verified CI

The full `npm test` suite passed on GitHub-hosted Ubuntu / Node.js 22 in the standalone repository. Latest verified run: https://github.com/corepilotlabs/yasmin-voice-tutor-amazon-2026/actions/runs/35628201696
