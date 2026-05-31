# Hostinger Local Only Port Patch

## Status

This patch is prepared locally only.

Do not deploy it yet.

## Purpose

Prevent direct public VPS-IP access to Mission Control while allowing a `cloudflared` process running on the VPS host to reach the app locally.

## Compose Patch

Change:

```yaml
ports:
  - "4175:80"
```

to:

```yaml
ports:
  - "127.0.0.1:4175:80"
```

## Why This Works

The original binding publishes port `4175` on all host interfaces.

The patched binding publishes port `4175` only on the VPS loopback interface:

```text
127.0.0.1
```

Expected result:

- `http://76.13.125.106:4175` no longer works publicly.
- `http://127.0.0.1:4175` remains reachable from the VPS host.
- A `cloudflared` process running on the VPS host can forward the approved hostname to the local service.

## Scope

Patch only:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Do not modify:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- Cloudflare settings during this documentation phase
- Any unrelated Docker project

## Important Networking Assumption

This plan assumes `cloudflared` runs on the VPS host.

If `cloudflared` runs inside a separate container, do not use this patch blindly. Stop and prepare a separately approved Docker networking plan.
