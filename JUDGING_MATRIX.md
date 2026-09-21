# Judging Matrix

## 1. Technical Implementation

**Evidence in the project**

- Real MCP server using the official TypeScript SDK.
- Streamable HTTP endpoint.
- Application learning state preserved across MCP tool calls by session ID.
- Cross-session mastery memory preserved by `learnerKey`, with next-session planning that changes after evidence.
- Six explicit MCP tools with structured outputs.
- Deterministic planner/evaluator behavior.
- Concept-rubric reflection evaluation that reports matched and missing evidence rather than treating long text as mastery.
- Unit tests plus real MCP client/server integration test.
- Health endpoint exposing MCP runtime information.

**Judge proof**

The final demo includes a live terminal proof running `npm run test:mcp`, showing MCP initialization, six discovered tools, the false-mastery guard, cross-session memory, and the next-session plan changing from fractions to food chain. Judges can also run `npm test` and inspect `mcp-server.mjs` and `learning-runtime.mjs`.

## 2. Design

**Evidence in the project**

- Voice-first interaction with text fallback.
- A judge-guided self-presentation led by Yasmin herself.
- A visible cross-session memory card and one-click smart next-session planner.
- Child-facing conversation separated from judge-facing reasoning.
- Clear lesson selection and progress.
- “Agent Control Room” explains why the system changed strategy.
- No account required for the hackathon demo.

**Judge proof**

Click **Let Yasmin present** and watch the same UI transition from explanation to confusion recovery to evidence-based completion.

## 3. Potential Impact

**Specific need**

Children can appear successful without demonstrating understanding. Parents and educators also struggle to know why an AI tutor decided a learner “got it.”

**Product direction**

Yasmin treats understanding as accumulated evidence rather than one answer. The architecture can expand to multiple subjects, languages, curriculum packs, and parent-facing progress explanations.

**Beyond the hackathon**

The broader Yasmin Android application already contains adaptive explanation, evidence, diagnostics, and session-planning concepts. Competition improvements are intended for backport into that product.

## 4. Quality of the Idea

**Why it is more than Q&A**

- maintains state across turns and separate learning sessions;
- changes teaching method after confusion;
- uses a planner/evaluator loop;
- explicitly rejects false mastery;
- keeps partial explanations open until enough rubric evidence is present;
- requires learner reflection;
- makes decision evidence inspectable;
- lets Yasmin herself present and prove the product;
- stores compact mastery metadata rather than relying on raw chat history.

The memorable product claim is testable:

> **Yasmin refuses to call “okay” understanding.**
