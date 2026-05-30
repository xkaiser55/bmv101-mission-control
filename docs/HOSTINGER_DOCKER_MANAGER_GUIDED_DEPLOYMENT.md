# Hostinger Docker Manager Guided Deployment

This is a guided deployment plan only. Do not deploy during this phase.

Mission Control must remain a separate Docker project/service named `mission-control` with container name `bmv101-mission-control`.

## Plain-English Goal

Prepare the existing static Mission Control Docker package for a first private/internal VPS test using Hostinger Docker Manager.

This first test must not create a public domain, Cloudflare tunnel, Cloudflare Access policy, Notion connection, Discord webhook, OpenClaw bridge, LinkedIn API connection, live API integration, secret, or real `.env` file.

## What The Owner Logs Into

The owner logs into:

- Hostinger account
- Hostinger VPS management area
- MFA prompts, if shown

Codex should not ask for passwords, MFA codes, private keys, tokens, cookies, API keys, database IDs, webhook URLs, or other secrets.

## What Screen To Open In Hostinger

Open the Hostinger VPS area and look for Docker Manager or the Docker application/service manager screen.

The owner should navigate only as far as the screen where Docker projects, containers, or compose deployments can be reviewed before final deployment.

## What Codex May Guide

Codex may guide the owner screen-by-screen on:

- Finding Docker Manager
- Confirming existing projects/services
- Confirming Mission Control is separate
- Reviewing the planned project/service name
- Reviewing the planned container name
- Reviewing that no secrets or environment variables are required
- Reviewing screenshots before any final action
- Preparing a private/internal test only

Codex must use plain English and should not ask the owner to review raw code.

## What The Owner Must Approve Manually

The owner must manually approve:

- Any final Save button
- Any final Deploy button
- Any final Apply button
- Any final Publish button
- Any billing, admin, or security setting
- Any future routing, domain, TLS, proxy, or access-control change

Codex must stop before those final buttons unless the owner explicitly approves that exact next click.

## What Must Not Be Clicked Yet

Do not click:

- Public domain setup
- DNS setup
- Cloudflare setup
- Tunnel setup
- Access policy setup
- Existing Traefik project changes
- OpenClaw production project changes
- Any Save, Deploy, Apply, or Publish button without a fresh owner approval

## Screenshots Owner Should Send Before Final Deploy

Before any final deploy action, the owner should send screenshots of:

1. Docker Manager project/service list showing existing projects.
2. The new Mission Control project setup screen.
3. The project/service name field showing `mission-control`.
4. The container name field showing `bmv101-mission-control`.
5. Any port mapping screen.
6. Any environment variables or secrets screen showing none are required.
7. Any network/routing screen showing no public domain, tunnel, or proxy change is enabled.
8. The final review screen before Save, Deploy, Apply, or Publish.

## Confirm Mission Control Is Separate

Before final approval, confirm:

- The project/service name is `mission-control`.
- The container name is `bmv101-mission-control`.
- It is not inside `openclaw-mdb`.
- It does not modify `openclaw-mdb`.
- It does not modify the existing Traefik project.
- It does not reference production OpenClaw files or paths.

If the Hostinger screen appears to place Mission Control inside `openclaw-mdb`, stop.

If the Hostinger screen asks to edit Traefik routing, stop unless the owner separately approves routing later.

## Confirm No Secrets Are Needed

Mission Control is currently static HTML/CSS/JS.

Confirm there are no required fields for:

- Tokens
- API keys
- Passwords
- Private keys
- Cookies
- Database IDs
- Webhook URLs
- `.env` values

If Hostinger asks for any secret, stop and do not enter it during this phase.

## Confirm Private/Internal First Test Only

The first test should be private/internal VPS testing only.

Confirm:

- No public domain is attached yet.
- No Cloudflare tunnel is attached yet.
- No Cloudflare Access policy is attached yet.
- No Notion integration is attached.
- No Discord webhook is attached.
- No OpenClaw bridge is attached.
- No LinkedIn API integration is attached.
- No live write action is enabled.

## Rollback Summary

If something looks wrong, stop or remove only the separate Mission Control service:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Do not stop, delete, or modify `openclaw-mdb`.

Do not change Traefik unless the owner separately approved that exact routing step.
