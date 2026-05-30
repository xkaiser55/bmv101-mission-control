# Hostinger First Test Checklist

Use this only after the owner has approved a private/internal Hostinger Docker Manager test.

## Before Starting

- Confirm this is not a public launch.
- Confirm no domain is attached.
- Confirm no Cloudflare tunnel or access setup is enabled.
- Confirm no Notion, Discord, OpenClaw bridge, LinkedIn API, or live integration is enabled.
- Confirm no secrets or real `.env` values are entered.

## During Setup

Confirm on-screen values:

- Project/service name: `mission-control`
- Container name: `bmv101-mission-control`
- Static web service only
- No backend
- No database
- No authentication
- No environment variables
- No secrets

## Screenshots To Capture

Send screenshots before final deploy of:

1. Docker Manager project/service list.
2. Mission Control setup details.
3. Container name.
4. Port mapping.
5. Environment variables or secrets screen.
6. Network/routing screen.
7. Final review screen before Save, Deploy, Apply, or Publish.

## After Private/Internal Test Starts

Check:

- Dashboard Home loads.
- `Local Only` is visible.
- `No live writes` is visible.
- Integrations show disconnected or blocked.
- Audit Logs show sanitized local/mock entries only.
- Mobile Upload Area says metadata only.
- No public domain is active.
- No live integration is active.

## Stop Conditions

Stop immediately if:

- The setup touches `openclaw-mdb`.
- The setup edits Traefik.
- A secret is requested.
- A domain or Cloudflare setup appears required.
- A live integration appears enabled.
- A final Save, Deploy, Apply, or Publish action appears before owner approval.
