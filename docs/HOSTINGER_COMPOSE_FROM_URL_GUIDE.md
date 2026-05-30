# Hostinger Compose From URL Guide

This is a guided pre-deployment plan only. Do not deploy during Phase C1.5.

## Goal

Prepare a new private/internal VPS test project using Hostinger Docker Manager Compose from URL.

The new project must be separate:

- Project/service name: `mission-control`
- Container name: `bmv101-mission-control`
- Test port: `4175`

It must not modify:

- `openclaw-mdb`
- Existing Traefik project
- OpenClaw production files

## What URL Hostinger Needs

Hostinger Docker Manager supports Compose from URL using GitHub, GitLab, or direct links to Docker Compose files.

For this project, the owner should start with the public repository page URL if the Hostinger screen accepts repository URLs.

If the screen specifically requires a direct compose-file URL, use the repository's direct raw `docker-compose.yml` URL only for preview and validation.

## Important Stop Point

This project uses:

```text
build:
  context: .
```

The build needs neighboring repository files. A direct compose-file URL by itself may not provide those files.

Before clicking Deploy, confirm the Hostinger preview or setup screen clearly resolves the repository build context and Dockerfile.

If that is not clear, stop. Do not deploy. The next safe route would be a separately approved prebuilt static image package.

## Owner Steps

1. Log into Hostinger.
2. Open the VPS management area.
3. Open Docker Manager.
4. Open Projects.
5. Click Compose.
6. Choose Compose from URL.
7. Enter the public Mission Control repository URL or direct compose-file URL as described above.
8. Set the new project name to `mission-control`.
9. Review the preview only.
10. Stop before clicking Deploy.

## Screenshots To Send Before Final Deploy

Send screenshots of:

1. Docker Manager project list.
2. Compose from URL screen before entering the URL.
3. Compose from URL screen after URL validation.
4. Project name showing `mission-control`.
5. YAML preview showing service `mission-control`.
6. YAML preview showing container name `bmv101-mission-control`.
7. YAML preview showing port mapping `4175:80`.
8. Any screen showing repository/build context handling.
9. Final screen before Deploy.

## Separation Check

Before any deploy approval, confirm:

- A new project named `mission-control` is being created.
- `openclaw-mdb` remains listed separately and unchanged.
- Traefik remains listed separately and unchanged.
- No routing change is requested.
- No public domain is requested.
- No environment values are requested.
- No secrets are requested.

## Private/Internal First Test Only

The first test must remain private/internal VPS testing only:

- No public domain
- No Cloudflare Tunnel
- No Cloudflare Access
- No Traefik routing update
- No Notion connection
- No Discord webhook
- No OpenClaw bridge
- No LinkedIn API
- No Amazon workflow
- No live integration

## Stop Before Final Deploy

Codex may guide screen-by-screen but must stop before the final Deploy button.

The owner must explicitly approve that final action after reviewing screenshots.
