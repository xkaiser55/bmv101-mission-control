# Owner Next Action Checklist

## Current Status

- Mission Control deployed as separate project/service: `mission-control`
- Container name: `bmv101-mission-control`
- Temporary test URL: `http://76.13.125.106:4175`
- `openclaw-mdb` still running
- Traefik still running
- Safety test passed
- Mission Control remains static/mock only

## Immediate Owner Action

When finished testing:

1. Log into Hostinger.
2. Open Docker Manager.
3. Find only `mission-control`.
4. Stop only `mission-control`.
5. Confirm `openclaw-mdb` remains running.
6. Confirm Traefik remains running.

## Do Not Change Yet

- Do not modify `openclaw-mdb`.
- Do not modify Traefik.
- Do not connect Cloudflare.
- Do not connect Notion.
- Do not connect Discord webhooks.
- Do not connect OpenClaw production.
- Do not connect LinkedIn API.
- Do not add Amazon workflows.
- Do not create secrets.
- Do not create a real `.env` file.
- Do not deploy new code.

## Choose The Next Planning Path

Pick one private-access planning option:

1. Cloudflare Access and Tunnel later
2. Tailscale or admin-only access later
3. Keep Mission Control stopped except during short manual tests

## Owner Responsibilities

The owner handles:

- Cloudflare login
- Hostinger login
- MFA
- DNS
- Tokens
- Final approvals

Codex may prepare:

- Documents
- Compose patches
- Step-by-step guides
- Plain-English safety checks

Any Cloudflare Tunnel token or Access secret must be owner-handled and never pasted into public docs.

## Feature Freeze

Do not expose:

- Raw terminal, shell, or Python runner UI
- Raw file editor
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Amazon workflows
- Unverified live-write controls
