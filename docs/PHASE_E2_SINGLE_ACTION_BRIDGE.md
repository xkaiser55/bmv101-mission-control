# Phase E2A Single-Action Queue Bridge

## Scope

Phase E2A adds a local queue scaffold for exactly one structured action:

- `ask_eva_checkpoint`

This is not live OpenClaw delivery. It is not Discord webhook integration. External transport remains disabled as `none`.

## Local Flow

1. The owner clicks **Ask Eva for checkpoint**.
2. The browser bridge validates the fixed action and the two allowed payload fields.
3. Nginx forwards the same-origin request to an internal Docker sidecar.
4. The sidecar validates the fixed request again.
5. The sidecar appends sanitized JSONL queue and audit records to the local `mission-control-queue` Docker volume.
6. The UI records a `local_mock` result. The server record uses `queued_local`.

No external delivery occurs.

## Guardrails

- The sidecar has no host port.
- Mission Control remains bound to `127.0.0.1:4175:80`.
- Only `ask_eva_checkpoint` is accepted by the server queue.
- Unknown actions are rejected.
- Extra payload fields are rejected.
- The two accepted text fields are length-limited and sanitized.
- No OpenClaw adapter exists.
- No Discord adapter exists.
- No token, webhook URL, API key, or live endpoint is required.
- All other dashboard actions remain browser-local mock actions.

## Data Stored Locally

The private Docker volume stores:

- `checkpoint-queue.jsonl`
- `checkpoint-audit.jsonl`

Records contain sanitized task metadata, `transport: "none"`, and `externalDelivery: false`.

## Future Gate

Any future OpenClaw delivery adapter requires a separate owner approval, read-only discovery of the approved endpoint shape, a new safety review, and a rollback plan. It must not be added implicitly.
