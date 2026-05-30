# Mission Control Spec

## Purpose

Mission Control will be a local-first prototype for organizing BMV101 operational workflows without touching live systems.

## Initial Scope

- Local dashboard experience.
- Mock workflow data.
- SQLite-first persistence when a database is added.
- Clear separation from OpenClaw production files and services.

## Out of Scope for Initial Prototype

- Production OpenClaw edits.
- Live Notion writes.
- Hostinger integration.
- Cloudflare integration.
- Live credential usage.
- Publishing, scheduling, deletion, cleanup, shell execution, Python execution, raw file editing, Amazon workflows, or unverified live-write controls.

## Safety Expectations

Any action that may later become a live write must start as a local stub with visible confirmation language and no external network side effect.

