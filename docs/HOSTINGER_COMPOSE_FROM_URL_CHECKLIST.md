# Hostinger Compose From URL Checklist

Use this checklist before any Hostinger Docker Manager deploy action.

## Repository Check

- Repository is a new separate Mission Control repository.
- Repository is not `openclaw-mdb`.
- Repository root contains `docker-compose.yml`.
- Repository root contains `Dockerfile`.
- Repository root contains `index.html`.
- Repository root contains `styles.css`.
- Repository root contains `app.js`.
- Repository does not contain `.env`.
- Repository does not contain secrets.

## Compose Check

- Service name is `mission-control`.
- Container name is `bmv101-mission-control`.
- Port mapping is `4175:80`.
- Base image is nginx alpine.
- Only static files are copied.
- No backend exists.
- No database exists.
- No authentication exists.
- No environment values are required.
- No secrets are required.

## Hostinger Screen Check

- A new project named `mission-control` will be created.
- `openclaw-mdb` remains separate and unchanged.
- Traefik remains separate and unchanged.
- No routing change is requested.
- No public domain is requested.
- No Cloudflare setup is requested.
- No secret field is required.
- Repository build context is available.

## Stop Conditions

Stop before Deploy if:

- The build context is unclear.
- Hostinger appears to fetch only YAML text without repository files.
- The project appears inside `openclaw-mdb`.
- Traefik changes are requested.
- A domain is requested.
- Cloudflare setup is requested.
- Any secret is requested.
- Any live integration appears.

## Rollback If The New Project Fails

Stop or remove only:

- Project/service: `mission-control`
- Container: `bmv101-mission-control`

Do not modify:

- `openclaw-mdb`
- Traefik
- OpenClaw production files
- Any unrelated Docker project
