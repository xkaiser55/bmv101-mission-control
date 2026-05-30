# Hostinger Deployment Steps Owner Safe

This guide is for future planning only. Do not deploy during Phase C1.5.

For the repository-based route, use:

- `docs/GITHUB_REPO_PREP.md`
- `docs/OWNER_GITHUB_STEPS.md`
- `docs/HOSTINGER_COMPOSE_FROM_URL_GUIDE.md`
- `docs/HOSTINGER_COMPOSE_FROM_URL_CHECKLIST.md`

## Required Boundaries

- Mission Control must be a separate Docker project/service.
- Mission Control must not be installed inside `openclaw-mdb`.
- Mission Control must not modify OpenClaw production files.
- Mission Control must not touch the existing Traefik project unless the owner explicitly approves routing later.
- First deployment must be private/internal test only.
- No Cloudflare tunnel, access policy, DNS change, or proxy setup yet.
- No Notion, Discord, OpenClaw bridge, LinkedIn API, or live integrations yet.
- No secrets should be stored in the repository.
- No real `.env` file should be created unless a future approved step requires the owner to enter local-only values manually.

## Owner Responsibilities

The owner handles:

- Hostinger login
- MFA
- Billing, admin, and security settings
- Any secret entry if a future approved phase needs it
- Final approval before pressing Save, Deploy, Apply, Publish, or equivalent buttons

Codex may guide screen-by-screen, but must stop before final Save, Deploy, Apply, Publish, or equivalent buttons.

## Preflight Checklist Before Any Future Deployment

1. Confirm the repository contains only the static Mission Control package.
2. Confirm the Hostinger Compose from URL preview can access the repository build context.
3. Confirm `mission-control` is separate from any OpenClaw project.
4. Confirm no production OpenClaw path is used.
5. Confirm no live integrations are enabled.
6. Confirm no routing changes are made without explicit owner approval.
7. Confirm first access is private/internal test only.
8. Confirm the owner has seen screenshots or a local preview.

## Future Deployment Shape

The expected future deployment artifact is a static Docker service:

- Service name: `mission-control`
- Container name: `bmv101-mission-control`
- Container port: `80`
- Local test port: `4175`

Any production route, domain, TLS, access control, tunnel, or reverse proxy setup requires a separate owner-approved phase.
