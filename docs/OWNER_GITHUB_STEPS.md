# Owner GitHub Steps

This is a non-developer owner guide for preparing a repository. It does not authorize deployment.

## Recommended Route

Create a new public GitHub repository for the static Mission Control package.

Recommended repository name:

```text
bmv101-mission-control
```

Do not use:

- `openclaw-mdb`
- An OpenClaw production repository
- A Traefik repository

## Why Public For The First Test

The current package is static-only and contains no secrets. A public repository avoids private-repository access setup.

If the owner wants a private repository, stop. Private access requires a separate guided phase and should not be configured casually.

## What The Owner Handles

The owner handles:

- GitHub login
- MFA
- Creating the new repository
- Final approval before making the repository public
- Final approval before any Hostinger deploy action

Codex may guide the screen-by-screen steps but should not ask for passwords, MFA codes, tokens, private keys, or cookies.

## Screenshots To Send Before Publishing The Repository

Send screenshots of:

1. New repository creation screen.
2. Repository name field showing `bmv101-mission-control`.
3. Visibility selection.
4. Final screen before Create repository.

## Screenshots To Send After Repository Creation

Send screenshots of:

1. Repository root file list.
2. `docker-compose.yml` visible in the root list.
3. `Dockerfile` visible in the root list.
4. `index.html`, `styles.css`, and `app.js` visible in the root list.
5. No `.env` file visible.

## Stop Points

Stop before:

- Creating a repository with a different name
- Uploading a real `.env` file
- Adding secrets
- Adding deploy keys
- Creating GitHub Actions
- Enabling automatic deployment
- Connecting Hostinger
- Pressing Hostinger Deploy

Those require separate owner approval.
