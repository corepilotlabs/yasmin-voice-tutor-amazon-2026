# Product Feedback / Friction Log

Evidence only. Entries below describe friction actually encountered while building the competition branch.

| Date | Surface | Task attempted | Expected | Actual friction | Severity | Workaround | Actionable suggestion |
|---|---|---|---|---|---|---|---|
| 2026-09-20 | MCP TypeScript SDK + Alexa+ hackathon requirements | Choose a current TypeScript SDK path that satisfies the hackathon minimum MCP protocol `2025-11-25` and Streamable HTTP requirement | One obvious current quickstart matching the required protocol | Current MCP documentation spans the legacy 2025 protocol family and the newer 2026 protocol family. The hackathon requirement is explicit, but selecting the safest current SDK/example requires reading the protocol-version and v1/v2 documentation together. | Medium | Pin `@modelcontextprotocol/sdk@1.30.0`, use Streamable HTTP, expose the minimum target in `/health`, and add a real client/server integration test. | Publish a hackathon-specific Alexa+ MCP starter repository with a pinned SDK version, expected protocol handshake, one tool, and a judge-ready smoke test. |

| 2026-09-20 | Hackathon private-repository judging access | Prepare a private GitHub repository so Amazon and Devpost can test the Alexa+ submission | One stable reviewer identity or reviewer group to grant access to | The September 16 submission update requires access for six named Amazon GitHub accounts plus `testing@devpost.com`. Older project notes did not contain the current reviewer list, so this had to be re-verified against the live rules before submission. | Medium | Added a dedicated `JUDGE_ACCESS.md`, checked each named GitHub account's current permission, and added access as an explicit final submission gate. | Provide a single Amazon GitHub App, team slug, or machine-readable reviewer list on the submission form so private-repo access cannot drift from current rules. |

## Notes

Do not add speculative friction. New entries should include a reproducible task, expected behavior, actual behavior, workaround, and a concrete improvement request.
