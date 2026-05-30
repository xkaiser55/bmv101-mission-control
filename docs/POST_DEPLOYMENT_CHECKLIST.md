# Post Deployment Checklist

This checklist is for a future private/internal deployment test only. No deployment is performed in Phase C0.5.

## Access Check

- Mission Control loads as a separate service.
- The page shows `Local Only`.
- The page shows `No live writes`.
- The deployment is private/internal test only.
- No public route is enabled unless separately approved by the owner.

## Safety Check

- No Notion connection is enabled.
- No Discord webhook is enabled.
- No OpenClaw production bridge is enabled.
- No LinkedIn API connection is enabled.
- No Cloudflare tunnel, access policy, DNS, or proxy change is enabled.
- No Amazon workflow is present.
- No real `.env` file or secrets are exposed.

## UI Check

- Dashboard Home is reachable.
- Kanban Board is reachable.
- Owner Tasks is reachable.
- Agent Tasks is reachable.
- Agents is reachable.
- Tools is reachable.
- Integrations is reachable.
- Notion + LinkedIn Status is reachable.
- Audit Logs is reachable.
- Mobile Upload Area is reachable.
- Settings / Safety Rules is reachable.

## Action Check

Prototype buttons must only create local/mock browser events and sanitized audit log entries:

- Send to Mia
- Ask Eva for checkpoint
- Run dry-run
- Upload analytics file
- Mark done
- Mark blocked

## Stop Conditions

Stop and rollback if:

- Any live integration appears enabled.
- Any secret is displayed.
- Any production OpenClaw file path is involved.
- Any delete, cleanup, publish, schedule, terminal, shell, Python runner, raw file editor, or unverified live-write control appears.
- The owner has not approved the next action.
