# Deployment Plan

## Current Phase

No deployment is configured. The project is in initial local scaffold phase only.

## Prototype Phase

- Build and test locally.
- Use mock data.
- Use SQLite for local persistence if needed.
- Keep all live integrations disabled.

## Future Review Gates

Before any deployment or external integration is added, review:

- Whether the workflow writes to a live system.
- Whether credentials are required.
- Whether a read-only mock can satisfy the current milestone.
- Whether explicit user approval has been given for the specific integration.

## Not Configured

- No Notion connection.
- No Hostinger connection.
- No Cloudflare connection.
- No production OpenClaw connection.
- No live credential storage.

