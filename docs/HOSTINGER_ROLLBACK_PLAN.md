# Hostinger Rollback Plan

This rollback plan applies only to the separate Mission Control Docker service.

## Rollback Target

Only stop or remove:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Do not stop, delete, or modify:

- `openclaw-mdb`
- OpenClaw production files
- Existing Traefik project
- Cloudflare settings
- Notion settings
- Discord settings
- Any unrelated Docker project or container

## If Something Looks Wrong Before Deploy

1. Stop before clicking Save, Deploy, Apply, or Publish.
2. Take a screenshot.
3. Confirm whether the screen mentions `openclaw-mdb`, Traefik, a public domain, Cloudflare, secrets, or live integrations.
4. Do not continue until the owner approves the corrected path.

## If The Private/Internal Test Fails

1. Open Hostinger Docker Manager.
2. Find only `mission-control`.
3. Stop only `mission-control`.
4. If needed, remove only `bmv101-mission-control`.
5. Leave `openclaw-mdb` and Traefik unchanged.

## If A Public Route Was Accidentally Started

1. Stop and do not make additional changes.
2. Disable only the route connected to `mission-control`, if visible.
3. Do not edit unrelated routing.
4. Do not change Cloudflare.
5. Ask for a separate owner-approved routing rollback plan before touching shared routing.

## Owner Approval Required

Owner approval is required before any rollback action that affects:

- Routing
- Domains
- Cloudflare
- Traefik
- Billing
- Admin settings
- Security settings
- Any project other than `mission-control`
