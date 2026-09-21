# Yasmin Voice Tutor — Amazon Developer Hackathon 2026

**Primary track:** Alexa+  
**Project:** Yasmin Voice Tutor  
**Submission type:** Significant update to an existing education product concept  
**Judge entry point:** repository root on branch `yasmin-amazon-2026`

> Yasmin is a learning agent that teaches, listens, adapts, remembers compact mastery evidence across sessions, and refuses to claim understanding without proof.

**CI:** this public branch runs the complete competition test suite on every push.

## Judge quick start

```bash
npm install
npm test
npm start
```

Open the local URL shown by the server and choose **Let Yasmin present** for the guided judge demo.

The Alexa+ integration is a real self-hosted MCP surface over Streamable HTTP at:

```text
/mcp
```

Minimum competition protocol requirement documented by the event: MCP `2025-11-25` or later.

## What to look at first

1. **Presenter Mode** — Yasmin explains and demonstrates herself.
2. **Agent Control Room** — planner/evaluator decision is visible.
3. **Anti-false-mastery behavior** — “Okay” does not count as understanding.
4. **Cross-session learning memory** — compact mastery metadata changes the next-session plan.
5. **MCP tools** — the learning loop is callable as an Alexa+ compatible agent surface.

## Important judge files

- `JUDGE_QUICKSTART.md` — fastest evaluation path
- `DEVPOST_FINAL_COPY.md` — complete project story
- `SIGNIFICANT_UPDATE.md` — what was built during the hackathon window
- `PRODUCT_FEEDBACK.md` — required developer feedback
- `FRICTION_LOG.md` — optional judging-bonus friction log
- `VIDEO_SCRIPT.md` — under-three-minute demonstration plan
- `TESTING.md` — verification procedure
- `JUDGING_MATRIX.md` — evidence mapped to judging criteria

## Privacy model

This public submission branch does not require GitHub collaborator access. The judge demo does not require a child account. Cross-session browser memory stores compact learning metadata such as mastery state and support need. It does **not** retain voice audio or the learner transcript in the learning profile.

## Scope honesty

The bundled lessons are intentionally small, deterministic judge loops. They demonstrate the learning-agent architecture; they are not presented as a complete curriculum.


## Demo video

Public YouTube demo: https://youtu.be/tv48YY4uPSk
