# Next Deployment Gate

No deployment is approved or configured in Phase B.

## Gate Before Any Future Deployment

Before deployment or live integrations are considered, the owner must approve a plain-English review that confirms:

- What will be deployed
- Where it will be deployed
- Whether credentials are required
- Whether any live system will be touched
- Whether any write action can affect production data
- Whether screenshots or previews match the owner's expectations

## Gate Before Any External Service

Before connecting Notion, Hostinger, Cloudflare, Discord webhooks, LinkedIn, OpenClaw production, or any other external service:

- Codex must describe the exact connection in plain English.
- Codex must identify whether the integration is read-only or write-capable.
- Codex must keep live credentials out of the repository.
- The owner must handle logins, MFA, entering secrets manually, final approvals, billing, admin, security settings, and deployment confirmation.

## Still Blocked

- Live Notion writes
- Hostinger publishing
- Cloudflare changes
- OpenClaw production edits
- Discord webhook calls
- LinkedIn API calls
- Terminal, shell, or Python runner UI
- Raw file editor
- Schema editor
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Amazon workflows
- Unverified live-write buttons

## Current Decision

Continue local prototype testing with mock data only.
