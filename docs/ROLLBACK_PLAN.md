# Rollback Plan

This rollback plan is for a future private/internal Docker deployment of Mission Control. It does not authorize deployment.

## Current Phase

Phase C0.5 is static verification and preflight only.

## Local Docker Rollback

If a local Docker test fails:

1. Stop the local container.
2. Remove the local container if needed.
3. Reopen `index.html` directly in a browser to confirm the static prototype files still work.
4. Fix the local packaging before any hosting step.

Suggested local commands for a future machine with Docker:

```powershell
docker compose down
docker compose ps
```

## Future Hosting Rollback

If a future private/internal hosting test fails:

1. Stop before changing routing, DNS, tunnel, or access settings.
2. Remove or disable only the separate Mission Control service.
3. Do not modify OpenClaw production files.
4. Do not modify the existing Traefik project unless the owner explicitly approved that exact step.
5. Return to local Docker testing.

## What Rollback Must Not Do

- Do not delete OpenClaw production files.
- Do not run cleanup against unrelated projects.
- Do not change Cloudflare settings.
- Do not disable unrelated services.
- Do not remove secrets from systems through automated controls.
- Do not publish or schedule anything.

## Owner Role

The owner approves any future hosting rollback action that touches admin, billing, security, routing, domain, or deployment controls.
