# Hostinger Deployment Gate

Phase C1.5 does not deploy this project. It prepares the static prototype repository for a Hostinger Docker Manager Compose from URL preflight.

## Before Any Future Hostinger Deployment

The owner must approve a plain-English deployment plan that confirms:

- What artifact will be deployed
- Which environment will receive it
- Which domain placeholder will be used
- Whether credentials are required
- Whether billing, admin, or security settings are involved
- Whether any live write action exists
- Whether screenshots or previews are approved

## Required Boundaries

- Mission Control must be a separate Docker project/service.
- Mission Control must not be installed inside `openclaw-mdb`.
- Mission Control must not modify OpenClaw production files.
- Mission Control must not touch the existing Traefik project unless the owner explicitly approves routing later.
- First deployment must be private/internal test only.
- No Cloudflare tunnel, access policy, DNS change, or proxy setup yet.
- No Notion, Discord, OpenClaw bridge, LinkedIn API, Amazon workflow, or live integration yet.
- Owner handles Hostinger login and MFA.
- Codex may guide screen-by-screen, but must stop before final Save, Deploy, Apply, Publish, or equivalent buttons.

## Current Status

- No hosting deployment configured
- No production domain configured
- No external service connection configured
- No secrets stored
- No real `.env` file created
- No backend added
- No database added
- No live API calls added

## Still Blocked

- Live write workflows
- Publishing controls
- Scheduling controls
- Delete or cleanup controls
- Terminal, shell, or Python runner UI
- Raw file editor
- Amazon workflows
- Unverified live-write buttons

## Next Approved Step

Create and review a separate public Mission Control repository, then inspect the Hostinger Compose from URL preview only.

Stop before Deploy. Confirm the repository build context is available because the Dockerfile needs the static files stored beside `docker-compose.yml`.
