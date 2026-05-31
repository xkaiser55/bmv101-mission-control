# C2 Validation Checklist

Use this checklist only after the owner separately approves the Phase C2 implementation.

## Before Starting

- Confirm `mission-control` is stopped before changes.
- Confirm `openclaw-mdb` is running.
- Confirm Traefik is running.
- Confirm no live integrations are connected.
- Confirm no secrets are written to repository files or public docs.

## Port Binding Validation

- Apply the approved `mission-control` Compose patch only.
- Confirm the binding is:

```text
127.0.0.1:4175:80
```

- Start `mission-control`.
- Confirm direct public access no longer works:

```text
http://76.13.125.106:4175
```

## Cloudflare Access Validation

- Open the approved Cloudflare hostname.
- Confirm Cloudflare Access login appears.
- Enter the approved owner email.
- Confirm the approved email receives an OTP.
- Enter the OTP.
- Confirm the Mission Control dashboard loads after OTP.

## Mission Control Safety Validation

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

## Stop Conditions

Stop and rollback if:

- Direct public VPS-IP access still works after the local-only port patch.
- Cloudflare hostname bypasses Access login.
- An unapproved email receives access.
- A secret appears in repository files, docs, chat, or screenshots.
- `openclaw-mdb` changes.
- Traefik changes.
- Any live integration appears.
- Any raw terminal, shell, Python runner, file editor, delete, cleanup, publish, schedule, Amazon, or unverified live-write control appears.
