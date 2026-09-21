# Demo Video Script — target 2:45–2:55

The video is a product story led by Yasmin herself. It must prove the four judging criteria even if a judge never opens the repository.

## 0:00–0:12 — Hook: Yasmin introduces the promise

**Visual:** Clean Yasmin home screen. Click **Let Yasmin present**.

**Yasmin says:**

“Hi. I’m Yasmin. I’m not a question-answer bot. I teach, listen, adapt, and I only claim mastery when the learner proves understanding.”

**On screen:** *The learning agent that refuses to fake mastery.*

**Judging proof:** Quality of Idea + Design.

## 0:12–0:28 — Explain the difference

**Yasmin says:**

“A quick correct answer is not the same as understanding. So I separate teaching, evaluation, adaptation, evidence, and memory.”

**Visual:** Agent Control Room + Cross-session Learning Memory visible together.

## 0:28–0:58 — Adaptation proof

Start **Fractions**.

**Learner:** “I don’t understand.”

**Visual:** Strategy changes in the Control Room.

**Caption:** *Different strategy — not the same explanation repeated.*

Let Yasmin deliver the new representation.

**Judging proof:** Technical Implementation + Design.

## 0:58–1:28 — Evidence proof

**Learner:** “One half.”

Yasmin moves to a second check.

**Learner:** “Yes.”

Yasmin asks for an explanation in the learner’s own words.

## 1:28–1:45 — Memorable anti-false-mastery moment

**Learner:** “Okay.”

Pause on screen.

Yasmin refuses to complete the learning loop.

**Caption:** **“Okay” ≠ mastery.**

This is the signature moment. Do not rush it.

## 1:45–2:03 — Completion with evidence

**Learner:**

“One half is bigger because the same whole is split into fewer equal pieces.”

Show:
- reflection evidence;
- completion;
- compact learning memory updated.

## 2:03–2:24 — Cross-session intelligence

Click **Plan next session**.

Show Yasmin selects **Science — Food chain** because Fractions already has strong evidence.

**Yasmin says:**

“I remember learning evidence, not the child’s transcript. The next session is planned from what the learner has actually shown.”

**Judging proof:** Quality of Idea — state across sessions.

## 1:28–1:46 — Alexa+ MCP live proof

**Visual:** real terminal window opens over the running Yasmin UI and executes:

```bash
npm run test:mcp
```

The terminal visibly shows:
- MCP initialize: PASS
- all six discovered Yasmin tools
- initial plan: fractions / new
- false-mastery guard keeping “okay” at reflection
- learner memory retaining completed fractions evidence
- next plan after memory: foodchain / new
- final MCP integration test PASS

**Narration:** explain that the same learning runtime is exposed through a real Streamable HTTP MCP server and that the integration test proves one session changes the next plan.

## 2:42–2:55 — Product impact close

**Visual:** Competition web experience beside the Android Yasmin architecture.

**Yasmin says:**

“This is not a disposable demo. The same evidence-first planning model is designed to improve the main Yasmin learning app across subjects and longer learning journeys.”

End card:

**Yasmin Voice Tutor**
*Teach. Listen. Adapt. Remember. Prove understanding.*

## Recording rules

- Final runtime: **under 3:00**.
- Keep the Agent Control Room and Memory card readable during proof moments.
- No long typing; use prepared short learner turns.
- No copyrighted music or third-party footage.
- Use a clear, owned/authorized Yasmin narration track for the final video; browser TTS is only a runtime fallback.
- Capture the MCP test output at readable zoom.
- Do not spend more than ~18 seconds on architecture.
- The first 12 seconds must work as a standalone hook.
