# Phase C2B Tailscale Private Access Plan

## Status

Cloudflare Access and Tunnel implementation is paused.

Do not change DNS or nameservers.

Do not create or use a Cloudflare Tunnel token.

Do not touch Hostinger live settings.

Do not start `mission-control`.

Mission Control remains static/mock only.

## Goal

Prepare a safer owner-only private access path using Tailscale without changing the BigMoneyVision101 domain, DNS, or nameservers.

The intended model:

1. Owner creates or logs into a Tailscale account using Gmail or another preferred login.
2. Owner installs Tailscale on approved laptop and phone devices.
3. In a later separately approved guided step, owner installs or runs Tailscale on the Hostinger VPS.
4. Mission Control stays bound to VPS localhost:

```text
127.0.0.1:4175
```

5. Tailscale Serve proxies the VPS-local Mission Control service privately inside the owner's tailnet.
6. Tailscale Funnel is not used.

## Why Tailscale Serve

Tailscale documentation says Serve shares a local service with other devices inside the tailnet.

This fits Mission Control because:

- The dashboard should be owner-only/private.
- The app already binds to VPS localhost only.
- Tailscale Serve can proxy a localhost service.
- No domain DNS or nameserver change is required.
- No raw VPS public IP and port should remain exposed.

## Do Not Use Tailscale Funnel

Tailscale documentation says Funnel shares a local service over the public internet.

Do not use:

```text
tailscale funnel
```

Do not approve any Funnel prompt.

Do not publish a Funnel URL.

## Planned VPS Serve Shape

In a later owner-approved VPS step, use Tailscale Serve to proxy the VPS-local service:

```text
http://127.0.0.1:4175
```

The exact Tailscale CLI command must be confirmed against the installed Tailscale version during the later guided step.

Do not execute commands during this planning phase.

## Keep Mission Control Stopped

Keep `mission-control` stopped until:

- Owner Tailscale account exists.
- Owner laptop or phone is connected to the tailnet.
- Tailscale is installed on the VPS in a separately approved guided step.
- Tailscale Serve is configured without Funnel.
- Validation confirms private tailnet-only access.

## Existing Project Boundaries

Do not modify:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- Any unrelated Docker project

## Integration Freeze

Do not connect:

- Notion
- Discord webhooks
- OpenClaw production
- LinkedIn API
- Amazon workflows
- Cloudflare
- Any live API integration

Do not expose:

- Raw terminal, shell, or Python runner UI
- Raw file editor
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Unverified live-write controls

## Official Tailscale References

- Tailscale Serve: https://tailscale.com/docs/features/tailscale-serve
- Serve CLI: https://tailscale.com/docs/reference/tailscale-cli/serve
- Tailscale Funnel: https://tailscale.com/docs/features/tailscale-funnel
- What is a tailnet: https://tailscale.com/kb/1136/tailnet
