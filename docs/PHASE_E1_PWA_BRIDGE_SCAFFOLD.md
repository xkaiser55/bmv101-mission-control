# Phase E1 PWA And Bridge Scaffold

## Status

Phase E1 adds app-like mobile polish and a disabled structured bridge scaffold.

Mission Control remains static/mock only.

The working private Tailscale route must remain unchanged.

## PWA Features

Added:

- `manifest.json`
- Local SVG icon placeholders
- Favicon reference
- Apple touch icon reference
- Theme color
- Standalone display mode
- Viewport safe-area support
- Compact mobile page picker
- Add to Home Screen helper note in Settings / Safety Rules

Private Tailscale mode remains the current access path.

Public HTTPS is not required for this prototype phase.

## Structured Bridge Scaffold

The bridge is a separated frontend module:

```text
bridge.js
```

Default bridge status:

```text
local/mock / disabled
```

External transport:

```text
none
```

Approved structured actions:

- `ask_eva_checkpoint`
- `send_to_mia`
- `run_linkedin_metrics_dry_run`
- `upload_linkedin_analytics_file_metadata_only`
- `mark_task_done_local`
- `mark_task_blocked_local`

Each action is recorded locally only.

## Not Added

- No raw terminal UI
- No arbitrary bash
- No arbitrary Python
- No raw file editor
- No delete or cleanup controls
- No publishing or scheduling controls
- No Amazon workflows
- No raw secrets
- No `.env` values shown in UI
- No Notion live writes
- No OpenClaw live transport
- No Discord live transport

## Docker Scope

The static nginx Docker package now also serves:

- `bridge.js`
- `manifest.json`
- `icons/`

The localhost-only binding remains:

```text
127.0.0.1:4175:80
```
