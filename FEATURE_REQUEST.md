# Optional Feature Request — Alexa+ / MCP Hackathon

## Request

**Provide a judge-ready MCP conformance and accessibility check for hackathon submissions.**

## Priority

**Important**

## Why it matters

For a self-hosted Alexa+ MCP submission, there are two separate failure classes:

1. the MCP server itself may not satisfy the expected Streamable HTTP / protocol behavior;
2. the repository or endpoint may be technically correct but inaccessible to judges because of reviewer permissions, deployment state, or testing instructions.

A lightweight official command or hosted checker could validate the minimum judging surface before submission.

## Suggested experience

A developer would provide an MCP endpoint or repository path and run something like:

```text
amazon-dev hackathon verify alexa-plus
```

The checker would report:

- reachable Streamable HTTP endpoint;
- negotiated MCP protocol version;
- successful initialize handshake;
- discoverable tools/resources;
- one sample tool call;
- repository setup/run instructions detected;
- private-repository reviewer access checklist;
- demo/testing URL reachability.

## Benefit

This would reduce avoidable Stage 1 failures that are unrelated to the quality of the product idea, while giving developers a clear last-mile submission gate.
