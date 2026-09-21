# Significant Update During the Hackathon Window

Yasmin existed as an educational product concept before the Amazon Developer Hackathon. The competition entry is not a repackaged pre-existing app. The Alexa+ entry adds a distinct, substantial agent layer built during the submission window.

## Before the hackathon entry

The broader Yasmin Android work already explored:
- curriculum content;
- child-facing lesson flows;
- adaptive explanation policies;
- understanding evidence;
- session planning;
- voice experiments.

## Built specifically for the Amazon submission

The competition branch adds:

1. **Alexa+ / MCP runtime**
   - self-hosted Streamable HTTP MCP;
   - official MCP SDK integration;
   - six judge-testable tools;
   - real MCP client/server integration test.

2. **Cross-session learning memory**
   - stable learner key;
   - compact mastery profile;
   - repair/new/review planning;
   - no transcript or audio retained in the profile.

3. **Judge-facing product experience**
   - responsive voice-first web UI;
   - Agent Control Room;
   - visible planner/evaluator decisions;
   - evidence ledger;
   - smart next-session planner.

4. **Yasmin self-presentation**
   - an automated judge story where Yasmin introduces and demonstrates the product herself;
   - anti-false-mastery proof;
   - cross-session memory proof.

5. **Competition-grade verification**
   - deterministic agent tests;
   - presenter-flow tests;
   - learning-memory tests;
   - runtime tests;
   - MCP end-to-end integration test;
   - CI workflow.

6. **Reusable product work**
   - Kotlin learning-agent memory/planning contract added to the Android codebase;
   - unit tests for repair/new-learning decisions.

## Why this is a significant update

The hackathon work changes the system from a child-facing lesson application into an inspectable learning agent that can be orchestrated through Alexa+/MCP, preserve compact learning state across sessions, and explain its own decisions.
