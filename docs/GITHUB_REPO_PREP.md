# GitHub Repository Prep

This is a repository preparation guide only. Do not deploy during Phase C1.5.

## Recommended Repository Visibility

Use a new public repository for the first private/internal VPS test.

Why public is recommended for this phase:

- The package contains static prototype files only.
- The package contains no secrets.
- Hostinger can read a public repository without deploy keys or credentials.
- A private repository requires a separate deploy-key setup step that is outside this phase.

If the owner prefers a private repository, stop and prepare a separate owner-approved private-repository access plan. Do not ask the owner to run advanced terminal commands during this phase.

## Repository Name

Recommended repository name:

```text
bmv101-mission-control
```

This must remain separate from:

- `openclaw-mdb`
- Any OpenClaw production repository
- Any Traefik project

## Required Repository Root Files

The repository root must contain:

```text
index.html
styles.css
app.js
Dockerfile
docker-compose.yml
.dockerignore
.gitignore
README.md
AGENTS.md
docs/
```

No `.env` file is required.

No `.env.example` file is required because the static prototype uses no environment values.

## Static-Only Package Check

The package must remain:

- nginx alpine static server only
- No backend
- No database
- No authentication
- No live API integrations
- No secrets
- No routing configuration
- No Cloudflare configuration
- No Notion configuration
- No Discord webhook
- No OpenClaw bridge
- No LinkedIn API
- No Amazon workflow

## Compose Build Context Note

The current `docker-compose.yml` builds from the repository root:

```text
context: .
```

That means the build needs the complete repository files, not only the YAML text.

Before any final Hostinger deploy action, confirm the Compose from URL flow has access to the repository files needed by the Dockerfile:

```text
index.html
styles.css
app.js
Dockerfile
```

If Hostinger only previews a single compose file and does not clone or resolve the repository build context, stop before Deploy. Prepare a separate owner-approved image publishing route instead.
