# Cloudflare Owner Steps

## Status

This is a future owner-execution guide only.

Do not execute these steps yet.

Do not paste Cloudflare Tunnel tokens, Access secrets, passwords, MFA codes, or private values into chat, repository files, screenshots, or public docs.

## Before Starting

Confirm:

- `mission-control` is stopped.
- `openclaw-mdb` is running and must remain unchanged.
- Traefik is running and must remain unchanged.
- Mission Control remains static/mock only.
- No live integrations are connected.
- The owner selected one private hostname:
  - `mission.bigmoneyvision101.com`
  - `control.bigmoneyvision101.com`

## Step 1: Owner Login

The owner logs into Cloudflare and completes MFA.

Codex must not request login credentials or MFA codes.

## Step 2: Confirm Domain

The owner confirms the intended domain is available in Cloudflare.

Stop if domain or DNS ownership is unclear.

## Step 3: Create Access Application First

Before creating a Tunnel route:

1. Open Cloudflare Zero Trust.
2. Go to Access applications.
3. Create a self-hosted application.
4. Enter the approved hostname.
5. Add a restricted allow policy for the owner's approved email only.
6. Use One-time PIN (OTP) or another owner-approved identity method.
7. Confirm there is no broad `Everyone` allow rule.
8. Confirm OTP is restricted to the approved email list.

Stop and send screenshots before saving or applying the Access application.

## Step 4: Review Access Screenshots

Send screenshots showing:

1. Application type: self-hosted.
2. Application hostname.
3. Allow policy limited to approved owner email only.
4. Login method.
5. Final Access review screen before Save or Apply.

Do not include private email values if screenshots will be stored publicly.

## Step 5: Create Tunnel And Host Connector Later

Only after Access is confirmed:

1. Open Cloudflare Tunnels.
2. Create an owner-approved Tunnel.
3. Use the Cloudflare-generated setup flow to install or run `cloudflared` on the VPS host.
4. Owner handles the generated Tunnel token privately.
5. Confirm the Tunnel connector is healthy.

Stop and send screenshots before adding a published application route.

## Step 6: Add Tunnel Route Later

Only after Access and the healthy Tunnel connector are confirmed:

1. Add a published application route for the approved hostname.
2. Use the VPS-local service URL:

```text
http://127.0.0.1:4175
```

Stop and send screenshots before saving or applying the Tunnel route.

## Step 7: Review Tunnel Screenshots

Send screenshots showing:

1. Tunnel name.
2. Healthy Tunnel connector status.
3. Published application hostname.
4. Service URL: `http://127.0.0.1:4175`
5. Final Tunnel route review screen before Save or Apply.

Do not include Tunnel tokens or secrets in screenshots.

## Step 8: Hostinger Patch Later

Apply the approved local-only port patch to `mission-control` only:

```yaml
- "127.0.0.1:4175:80"
```

Do not modify:

- `openclaw-mdb`
- Traefik
- Any unrelated service

## Owner Approval Boundaries

The owner must manually approve:

- Cloudflare application Save or Apply
- Cloudflare policy Save or Apply
- Tunnel Save or Apply
- DNS changes
- Hostinger redeploy of `mission-control`
- Any token entry

Codex may guide screen-by-screen but must stop before final Save, Apply, or Deploy actions.
