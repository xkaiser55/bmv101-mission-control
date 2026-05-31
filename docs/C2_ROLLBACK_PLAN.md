# C2 Rollback Plan

## Scope

Rollback only Phase C2 Mission Control private-access changes.

Do not modify:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- Notion
- Discord
- LinkedIn API
- Amazon workflows
- Any unrelated Docker project

## Rollback Trigger

Rollback if:

- Direct public VPS-IP access remains open unexpectedly.
- Cloudflare hostname bypasses Access login.
- OTP policy allows an unapproved email.
- Tunnel route points to the wrong service.
- `mission-control` fails to load after approved authentication.
- Any secret is exposed.

## Immediate Safety Rollback

1. Stop only:
   - Project/service: `mission-control`
   - Container: `bmv101-mission-control`
2. Leave `openclaw-mdb` running.
3. Leave Traefik running.
4. Do not make further Cloudflare changes until the owner approves a corrected plan.

## Cloudflare Rollback Later

Owner approval is required before changing Cloudflare.

If approved:

1. Disable only the Mission Control Tunnel published application route.
2. Disable only the Mission Control Access application if needed.
3. Leave unrelated routes, DNS records, tunnels, policies, and applications unchanged.
4. Keep any Tunnel token or Access secret private and owner-handled.

## Hostinger Rollback Later

Owner approval is required before changing Hostinger.

If approved:

1. Stop only `mission-control`.
2. Revert or remove only the Mission Control local-only port patch if needed for debugging.
3. Do not restart public testing without a separate owner approval.
4. Do not modify `openclaw-mdb`.
5. Do not modify Traefik.

## Final State After Rollback

- `mission-control` stopped
- `openclaw-mdb` unchanged and running
- Traefik unchanged and running
- No private-access change left partially active without owner approval
- No secrets stored in repository files or public docs
