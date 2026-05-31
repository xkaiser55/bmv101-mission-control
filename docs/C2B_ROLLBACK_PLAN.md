# C2B Rollback Plan

## Scope

Rollback only the Tailscale private-access changes for Mission Control.

Do not modify:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- BigMoneyVision101 DNS or nameservers
- Cloudflare
- Notion
- Discord
- LinkedIn API
- Amazon workflows
- Any unrelated Docker project

## Rollback Triggers

Rollback if:

- Tailscale Funnel is enabled.
- A public Funnel URL exists.
- Direct public VPS-IP access works.
- Tailnet-only access fails.
- VPS device approval is unclear.
- Any secret is exposed.

## Immediate Rollback

1. Stop only:
   - Project/service: `mission-control`
   - Container: `bmv101-mission-control`
2. Leave `openclaw-mdb` running.
3. Leave Traefik running.
4. Do not change DNS or nameservers.
5. Do not configure Cloudflare.

## Tailscale Rollback Later

In a separately approved guided session:

1. Disable only the Mission Control Tailscale Serve configuration.
2. Confirm Tailscale Funnel is disabled.
3. Remove only the VPS Tailscale device from the tailnet if the owner approves.
4. Leave owner laptop and phone devices unchanged unless the owner approves removal.

## Final Safe State

- `mission-control` stopped
- No public VPS-IP access
- No Funnel exposure
- `openclaw-mdb` unchanged and running
- Traefik unchanged and running
- DNS and nameservers unchanged
- No secrets stored in repository files or public docs
