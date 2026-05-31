# Tailscale Owner Steps

## Status

This is an owner setup guide only.

Do not touch Hostinger or the VPS during this phase.

Do not start `mission-control`.

## Step 1: Owner Creates Or Logs Into Tailscale

The owner creates or logs into Tailscale using:

- Gmail
- Another preferred supported login

The owner handles:

- Login
- MFA
- Device approval
- Admin settings
- Final approvals

Codex must not ask for passwords, MFA codes, cookies, session values, auth keys, or recovery codes.

## Step 2: Owner Installs Tailscale On Personal Devices

Install Tailscale on owner-approved devices:

- Laptop
- Phone

Confirm the devices appear inside the owner's private tailnet.

## Step 3: Keep Mission Control Stopped

Do not start `mission-control` yet.

The dashboard stays stopped until the VPS Tailscale path and Serve configuration are ready for private testing.

## Step 4: Do Not Change DNS

Do not change:

- BigMoneyVision101 nameservers
- Domain DNS records
- Cloudflare settings
- Traefik routing

The Tailscale route uses the private tailnet, not the BigMoneyVision101 domain.

## Step 5: Do Not Use Funnel

Do not use:

```text
tailscale funnel
```

Funnel would expose the service publicly.

Use Tailscale Serve only in the later guided VPS step.

## Screenshots To Send Before VPS Work

Send screenshots showing:

1. Tailscale account is created or logged in.
2. Owner laptop appears in the private tailnet.
3. Owner phone appears in the private tailnet, if installed.
4. No Funnel configuration is enabled.

Do not include private login values, MFA codes, auth keys, or session details in screenshots.
