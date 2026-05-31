# Phase C2 Private Access Plan

## Goal

Replace temporary public-IP testing with a private access model before adding any live integrations.

Mission Control is currently static/mock only.

No live integrations should be added before private access is solved.

## Current Temporary Access

Current temporary test endpoint:

```text
http://76.13.125.106:4175
```

This public-IP endpoint should not remain the final setup.

## Option 1: Stop Mission Control When Not Testing

Use Hostinger Docker Manager to stop only:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Advantages:

- Fastest immediate risk reduction
- No new access technology required
- Keeps `openclaw-mdb` and Traefik unchanged

Limitations:

- The owner must manually start and stop the service for testing
- The service is unavailable while stopped

Recommended immediate action:

- Stop `mission-control` when active testing is finished.

## Option 2: Cloudflare Access And Tunnel Later

Prepare a separate future phase for a private authenticated access route.

Potential benefits:

- Removes direct public-IP access from the normal owner workflow
- Can require authenticated access
- Can provide a cleaner private URL later

Required boundaries:

- Do not configure Cloudflare yet.
- Do not modify Traefik yet.
- Do not add a public domain route yet.
- Owner handles Cloudflare login, Hostinger login, MFA, DNS, tokens, and final approvals.
- Codex may prepare documents, compose patches, and step-by-step guides only.
- Any Cloudflare Tunnel token or Access secret must be owner-handled and never pasted into public docs.

## Option 3: Tailscale Or Admin-Only Access Later

Prepare a separate future phase for a private admin-only network path.

Potential benefits:

- Keeps access limited to approved devices or users
- Avoids leaving a normal public-IP workflow exposed
- Useful for owner-only or small-team testing

Required boundaries:

- Owner approves the chosen access model.
- Owner handles logins, MFA, device approval, admin settings, and final approvals.
- Codex may prepare documents, compose patches, and step-by-step guides only.
- No secrets should be stored in repository docs.

## Why Public IP Access Should Not Remain Final

The current public-IP route is useful for temporary testing, but it is not the final security model.

Reasons:

- It is reachable from the public internet.
- The prototype does not include authentication.
- Future features may become more sensitive.
- Private access should be established before live integrations are considered.

## Integration Freeze Until Private Access Is Solved

Do not connect:

- Notion
- Discord webhooks
- OpenClaw production
- LinkedIn API
- Cloudflare
- Amazon workflows
- Any live API

Do not expose:

- Raw terminal, shell, or Python runner UI
- Raw file editing
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Unverified live-write controls

## Recommended Sequence

1. Stop `mission-control` when not actively testing.
2. Choose a private-access model.
3. Prepare an owner-approved implementation guide.
4. Confirm `openclaw-mdb` and Traefik remain unchanged unless separately approved.
5. Complete private-access testing.
6. Only then consider a separate integration-planning phase.
