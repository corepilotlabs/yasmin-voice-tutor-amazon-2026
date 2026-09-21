# Devpost Final Copy — Yasmin Voice Tutor

## Tagline

**A learning agent that proves understanding instead of rewarding conversation.**

## Inspiration

AI tutors can sound convincing while still missing the most important question: did the learner actually understand?

Yasmin started from a practical education problem. A child may say “yes,” repeat a phrase, or reach a correct answer once, while still carrying the misconception into the next exercise. We wanted the tutoring system to behave more like a careful teacher: explain, listen, notice confusion, change strategy, verify the concept, and remember the evidence for the next session.

## What it does

Yasmin Voice Tutor is a voice-first adaptive learning agent for the Alexa+ track.

It runs an explicit learning control loop:

**plan → explain → listen → evaluate → adapt → verify → remember → plan again**

During a lesson, Yasmin can:
- explain a concept with a concrete example;
- detect confusion or uncertainty;
- switch representation instead of simply repeating the same wording;
- give hints without immediately revealing the answer;
- collect multiple pieces of learning evidence;
- reject weak “mastery” signals such as “okay” or generic agreement;
- ask the learner to explain the idea in their own words;
- evaluate that explanation against a transparent concept rubric instead of using answer length as a proxy for understanding;
- identify which concept evidence is present and which evidence is still missing;
- persist compact mastery metadata across sessions;
- plan the next learning loop from weak, missing, or completed evidence.

The judge-facing Agent Control Room exposes Yasmin's current strategy, rubric evidence, and decision so the adaptation is inspectable rather than hidden behind fluent text.

## How we built it

The Alexa+ competition layer is a lightweight Node.js application with a deterministic learning kernel and a self-hosted MCP server over Streamable HTTP.

The MCP layer exposes tools for:
- listing learning loops;
- planning the next session from cross-session evidence;
- starting a stateful learning session;
- processing a learner turn;
- reading current learning state;
- reading the compact learner profile.

A browser-based judge experience adds:
- typed and voice input;
- spoken responses;
- visible mastery and evidence;
- visible planner/evaluator decisions;
- local-only cross-session mastery memory;
- a Presenter Mode where Yasmin introduces and demonstrates the project herself.

The competition branch also adds automated core tests and a real MCP client/server integration test.

## The signature moment

The most important demo moment is intentionally small.

After passing two concept checks, the learner says:

**“Okay.”**

Yasmin does **not** mark mastery.

She asks for an explanation in the learner's own words. Only when the learner produces concept evidence does the learning loop complete.

That behavior expresses the product thesis better than another large language model feature would: **conversation is not evidence of learning.**

## Challenges we ran into

The hardest design problem was deciding what the agent should remember.

Saving entire transcripts would be easy, but it is not the learning state we actually need and is a poor default for a child-focused product. We instead separated conversational content from compact learning evidence.

Another challenge was making adaptation judgeable. If an agent silently changes internal prompts, a reviewer sees only another response. We therefore built the Agent Control Room so the teaching strategy, evidence state, and next decision are visible.

We also had to keep the hackathon work reusable. The competition layer is isolated, while its learning-memory and next-session planning model has a presentation-agnostic counterpart in the main Android codebase.

## Accomplishments that we're proud of

- Built a real Streamable HTTP MCP surface for the Alexa+ track.
- Made the tutoring state survive across tool calls and compact mastery state influence later sessions.
- Created fail-closed mastery behavior instead of rewarding generic agreement.
- Made Yasmin herself the presenter of the judge demo.
- Added deterministic tests plus real MCP client/server integration coverage.
- Kept the judge demo usable without a child account or stored child audio.
- Moved the core planning concept back toward the main Yasmin Android architecture rather than building a disposable hackathon prototype.

## What we learned

The most useful lesson was that an agentic education experience is not defined by how many answers the model can generate. It is defined by the control policy around those answers: when to teach, when to wait, when to change representation, what counts as evidence, and what should be remembered.

MCP also made the separation between conversational surface and learning runtime much clearer. The tutoring logic can remain a reusable capability while Alexa+ or another client orchestrates it.

## What's next for Yasmin Voice Tutor

The next product steps are:
- move the compact learner-memory contract fully into the Android product;
- expand from deterministic judge loops to curriculum-linked lesson graphs;
- add spaced-review scheduling;
- add parent-visible evidence summaries without exposing raw child conversations;
- evaluate teacher-authored explanation strategies across subjects;
- improve production voice quality and multilingual support.

## Significant update during the hackathon window

The broader Yasmin education product concept existed before this hackathon.

During the competition window, this submission added the dedicated Alexa+ layer: the MCP runtime, six learning tools, cross-session mastery memory, judge-facing Agent Control Room, Presenter Mode, smart next-session planning, competition-specific automated testing, documentation, and a reusable Android learning-agent planning contract.

## Primary Track

**Alexa+**

## Product Feedback

See `PRODUCT_FEEDBACK.md` for the complete required tool/API/SDK feedback.

## Friction Log

See `FRICTION_LOG.md` for structured friction entries, workarounds, severity, and actionable suggestions.

## Testing

See `JUDGE_QUICKSTART.md` and `TESTING.md`.

## Privacy

The competition demo does not require a child account. The local learning profile stores compact mastery metadata; it does not retain the child's voice audio or transcript.

## Demo scope

The included lessons are deliberately small and deterministic so reviewers can reproduce the agent's decisions. They demonstrate the learning architecture and are not presented as a complete curriculum.


## Public source and verification

Public submission branch:

`https://github.com/corepilotlabs/odoo18-business-apps/tree/yasmin-amazon-2026`

The complete competition suite has passed on a GitHub-hosted Ubuntu 24.04 runner with Node.js 22, including the deterministic learning engine, presenter flow, cross-session memory, submission-consistency gate, and real MCP client/server integration test.


## Demo Video

https://youtu.be/tv48YY4uPSk
