# Public Exposure Temporary Risk Note

## Current Temporary State

Mission Control currently loads at:

```text
http://76.13.125.106:4175
```

This route is exposed through a public VPS IP and port.

## Risk Summary

Mission Control is currently static/mock only, with no live integrations and no live write controls.

Even so, public-IP access should be treated as temporary because:

- The route is reachable from the public internet.
- The prototype does not include authentication.
- The owner-facing dashboard should move behind a private access model before future integrations are added.

## Immediate Safety Action

When active testing is complete, stop only:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Do not stop, modify, or remove:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- Any unrelated project

## Future Access Gate

Before leaving Mission Control running for normal use, approve and implement one private access model:

- Cloudflare Access and Tunnel later
- Tailscale or admin-only access later
- Another owner-approved private access method

## Integration Freeze

Until private access is solved, do not add:

- Notion
- Discord webhooks
- OpenClaw production bridge
- LinkedIn API
- Cloudflare configuration
- Amazon workflows
- Live APIs
- Live write controls
