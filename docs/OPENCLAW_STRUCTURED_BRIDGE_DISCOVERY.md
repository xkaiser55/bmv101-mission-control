# OpenClaw Structured Bridge Discovery

## Discovery Scope

Reviewed only safe visible Mission Control repository files and documentation.

Did not inspect, modify, restart, or connect to:

- `openclaw-mdb`
- Traefik
- OpenClaw production
- Discord
- Notion
- LinkedIn API
- Amazon workflows

## Discovery Result

No approved structured OpenClaw or Discord task endpoint is documented in the Mission Control repository.

No safe endpoint exists in the visible project files for sending structured tasks to Eva or Mia.

The bridge therefore remains:

```text
mock / disabled
```

## Safest Future Path

Before enabling any transport, a separate owner-approved discovery and contract phase must provide:

1. A dedicated structured task endpoint owned by the approved OpenClaw integration layer.
2. A fixed request schema for the existing action allowlist only.
3. Authentication handled privately by the owner.
4. Server-side allowlist validation.
5. Sanitized audit logging.
6. Dry-run behavior for LinkedIn metrics workflows.
7. Explicit rejection of arbitrary commands, raw files, publishing, scheduling, deletion, cleanup, Amazon workflows, or unverified writes.
8. A written rollback plan.
9. Private Tailscale-only reachability.

## Missing Items

The following do not exist yet in the visible Mission Control project:

- Approved OpenClaw endpoint URL
- Approved Discord bridge endpoint URL
- Server-side structured-task contract
- Authentication method
- Owner-approved secret-handling procedure
- Integration test environment
- Rollback-tested bridge deployment

Do not invent or enable a live endpoint until those items are approved.
