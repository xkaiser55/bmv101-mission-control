# Phase C2 Cloudflare Access And Tunnel Plan

## Status

This is an implementation plan only.

Do not start `mission-control`.

Do not deploy anything yet.

Do not touch Hostinger live settings, `openclaw-mdb`, or Traefik.

Mission Control is currently static/mock only.

No live integrations should be added before private access is solved.

## Goal

Prepare a future private owner-access route for Mission Control using:

1. Cloudflare Access self-hosted application
2. Cloudflare Access allow policy
3. Cloudflare Tunnel published application route
4. VPS-local Mission Control port binding

## Recommended Private Hostname

Choose one owner-approved hostname:

```text
mission.bigmoneyvision101.com
```

or:

```text
control.bigmoneyvision101.com
```

Do not create DNS, Tunnel, or Access settings yet.

## Required Safety Sequence

Create and verify the Cloudflare Access application and allow policy before adding the Tunnel published application route.

Why:

- Cloudflare Tunnel documentation says a published application route maps a public hostname to a local service.
- Cloudflare documentation also says anyone can view a published application hostname unless it is protected with Access policies.
- Creating Access first reduces the risk of briefly exposing an ungated hostname.

Planned order:

1. Owner logs into Cloudflare and completes MFA.
2. Owner confirms the domain in Cloudflare.
3. Owner creates a Cloudflare Access self-hosted application for the approved hostname.
4. Owner creates a restricted allow policy for approved owner email only.
5. Owner confirms One-time PIN (OTP) login or another owner-approved identity method.
6. Owner reviews the Access policy screenshots.
7. Owner creates the Tunnel.
8. Owner installs or runs `cloudflared` on the VPS host using the Cloudflare-generated owner-handled token.
9. Owner confirms the Tunnel connector is healthy.
10. Owner creates the published application route.
11. The route points to the VPS-local service:

```text
http://127.0.0.1:4175
```

12. Owner validates Access login before leaving `mission-control` running.

## Compose Port Binding Patch

The local Compose patch changes:

```yaml
- "4175:80"
```

to:

```yaml
- "127.0.0.1:4175:80"
```

This binds Mission Control to the VPS loopback interface instead of all network interfaces.

Result:

- Direct public VPS-IP access to port `4175` should stop working.
- A `cloudflared` process running on the VPS host can still reach `http://127.0.0.1:4175`.
- `openclaw-mdb` remains unchanged.
- Traefik remains unchanged.

Important assumption:

- This plan assumes `cloudflared` reaches Mission Control from the VPS host.
- The Cloudflare-generated setup command and Tunnel token must remain private and owner-handled.
- If `cloudflared` is later run inside another container, stop and prepare a separately approved Docker networking plan. Container-local `127.0.0.1` would not automatically mean the VPS host.

## Owner Responsibilities

The owner handles:

- Cloudflare login
- Hostinger login
- MFA
- DNS and domain confirmation
- Any Tunnel token
- Any Access secret
- Approved email address entry
- Final approvals

Codex may prepare:

- Documents
- Compose patches
- Step-by-step guides
- Plain-English safety checks

Any Cloudflare Tunnel token or Access secret must be owner-handled and never pasted into public docs.

## Integration Freeze

Do not connect:

- Notion
- Discord webhooks
- OpenClaw production
- LinkedIn API
- Amazon workflows
- Any live API integration

Do not expose:

- Raw terminal, shell, or Python runner UI
- Raw file editor
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Unverified live-write controls

## Official Cloudflare References

- Cloudflare Tunnel overview: https://developers.cloudflare.com/tunnel/
- Published application routes: https://developers.cloudflare.com/tunnel/setup/
- Cloudflare Access self-hosted applications: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/
- One-time PIN login: https://developers.cloudflare.com/cloudflare-one/identity/one-time-pin/
- Access policy safety guidance: https://developers.cloudflare.com/cloudflare-one/access-controls/policies/
