# Phase E2A Frontend-Only Local Mock

## Scope

Phase E2A keeps the **Ask Eva for checkpoint** action in the frontend-only local mock:

- `ask_eva_checkpoint`

This is not a sidecar queue. It is not live OpenClaw delivery. It is not Discord webhook integration. External transport remains disabled as `none`.

## Local Flow

1. The owner clicks **Ask Eva for checkpoint**.
2. The browser bridge validates that the action is in its fixed allowlist.
3. The UI records a sanitized local checkpoint event and audit entry in browser `localStorage`.
4. The bridge result uses `local_mock`, `transport: "none"`, and `externalDelivery: false`.

No external delivery occurs.

## Guardrails

- No sidecar service is required.
- Nginx serves static files only.
- Mission Control remains bound to `127.0.0.1:4175:80`.
- Unknown actions are rejected.
- Local event text is sanitized before browser storage.
- No OpenClaw adapter exists.
- No Discord adapter exists.
- No token, webhook URL, API key, or live endpoint is required.
- All other dashboard actions remain browser-local mock actions.

## Data Stored Locally

The browser stores sanitized mock task events and audit entries in `localStorage`. There is no backend queue or Docker volume.

## Future Gate

Any future OpenClaw delivery adapter requires a separate owner approval, read-only discovery of the approved endpoint shape, a new safety review, and a rollback plan. It must not be added implicitly.
