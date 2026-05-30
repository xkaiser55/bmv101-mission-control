# Hostinger Pre Deployment Checklist

Use this before any Hostinger Docker Manager deployment attempt.

## Owner Access

- Owner can log into Hostinger.
- Owner can complete MFA.
- Owner can open the VPS management area.
- Owner can open Docker Manager or the Docker service manager screen.

## Project Separation

- Mission Control will be a separate Docker project/service.
- Project/service name will be `mission-control`.
- Container name will be `bmv101-mission-control`.
- It will not be installed inside `openclaw-mdb`.
- It will not modify `openclaw-mdb`.
- It will not modify the existing Traefik project unless the owner separately approves routing later.

## Deployment Scope

- First test is private/internal VPS test only.
- No public domain yet.
- No Cloudflare Tunnel yet.
- No Cloudflare Access yet.
- No Notion connection.
- No Discord webhook.
- No OpenClaw bridge.
- No LinkedIn API connection.
- No live integrations.

## Secrets Check

Mission Control currently needs no secrets.

Confirm Hostinger is not asking for:

- Tokens
- API keys
- Passwords
- Private keys
- Cookies
- Database IDs
- Webhook URLs
- Real `.env` values

If any secret is requested, stop.

## Files To Use

The Docker package is static-only:

- `Dockerfile`
- `docker-compose.yml`
- `index.html`
- `styles.css`
- `app.js`

## Stop Before Final Action

Stop before clicking:

- Save
- Deploy
- Apply
- Publish
- Create public route
- Connect domain
- Configure Cloudflare
- Modify Traefik

The owner must explicitly approve any final action.
