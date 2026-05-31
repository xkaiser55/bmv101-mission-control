# C2B Validation Checklist

Use this only after the owner separately approves Tailscale VPS implementation.

## Before Starting Mission Control

- Confirm `openclaw-mdb` is running.
- Confirm Traefik is running.
- Confirm `mission-control` is stopped.
- Confirm Compose binding is:

```text
127.0.0.1:4175:80
```

- Confirm VPS is connected to the owner's private tailnet.
- Confirm Tailscale Serve is configured.
- Confirm Tailscale Funnel is not enabled.

## Start And Validate

- Start only `mission-control`.
- Confirm direct public access does not work:

```text
http://76.13.125.106:4175
```

- From an owner-approved Tailscale device, open the private Tailscale Serve URL.
- Confirm Dashboard Home loads.
- Confirm `Local Only` is visible.
- Confirm `No live writes` is visible.
- Confirm Audit Logs remain local/mock only.
- Confirm Notion remains disconnected.
- Confirm LinkedIn metrics remain metadata/dry-run only.
- Confirm no live write buttons appear.

## Existing Project Validation

- Confirm `openclaw-mdb` remains running.
- Confirm Traefik remains running.
- Confirm `openclaw-mdb` was not modified.
- Confirm Traefik was not modified.

## DNS Validation

- Confirm BigMoneyVision101 nameservers were not changed.
- Confirm no domain DNS records were changed.
- Confirm Cloudflare was not configured.

## Stop Conditions

Stop and rollback if:

- Direct public VPS-IP access works.
- Tailscale Funnel is enabled.
- A public Funnel URL exists.
- Private tailnet access fails.
- `openclaw-mdb` changes.
- Traefik changes.
- DNS or nameservers change.
- Any live integration appears.
- Any raw terminal, shell, Python runner, file editor, delete, cleanup, publish, schedule, Amazon, or unverified live-write control appears.
