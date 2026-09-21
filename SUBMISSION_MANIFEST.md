# Submission Manifest — Yasmin Voice Tutor

## Public source

Repository: `corepilotlabs/odoo18-business-apps`  
Branch: `yasmin-amazon-2026`

Public URL:

`https://github.com/corepilotlabs/odoo18-business-apps/tree/yasmin-amazon-2026`

## Technical verification

Status: **PASS**

Verified on GitHub-hosted Ubuntu 24.04 / Node.js 22:

- agent tests;
- Presenter Mode tests;
- cross-session learning-memory tests;
- runtime planning tests;
- Devpost/submission consistency gate;
- real MCP client/server integration test.

## Judge flow

1. Read `README.md`.
2. Open `JUDGE_QUICKSTART.md`.
3. Run `npm install && npm test && npm start`.
4. Use **Let Yasmin present**.
5. Inspect Agent Control Room and evidence ledger.
6. Complete a learning loop.
7. Use **Plan next session**.
8. Inspect MCP endpoint at `/mcp`.

## Media

Automated Judge Media Factory:
- captures real browser states from the tested UI;
- uses the final Yasmin narration;
- produces a narrated MP4 plus evidence screenshots;
- uploads them as a GitHub Actions artifact.

## Submission safety

The branch contains only competition-facing Yasmin material. Unrelated private projects are not exposed to judges.


## Demo video

YouTube (Public): `https://youtu.be/tv48YY4uPSk`
