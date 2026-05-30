# bmv101-mission-control

Mission Control is a separate local-first prototype project for planning and operating BMV101 workflows safely.

This repository contains a local-only mobile-first Mission Control prototype. It does not connect to production systems, live credentials, Notion, Hostinger, Cloudflare, Discord webhooks, or OpenClaw production files.

## Current Status

- Phase B local prototype
- Local prototype first
- SQLite first if backend persistence is introduced later
- No live integrations configured
- No real `.env` file committed or created
- No `.env` file or environment values required
- Mock data only
- Prototype actions create local task events and sanitized audit logs only

## Local Run Steps

No package install is required.

Option 1:

1. Open `index.html` directly in a browser.

Option 2:

1. From this folder, run a local static server with a tool already available on your machine.
2. Open the local URL shown by that tool.

Example:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Do not enter live credentials into this prototype.

## Project Guardrails

See [AGENTS.md](AGENTS.md) and [docs/SAFETY_RULES.md](docs/SAFETY_RULES.md) before building features.

## Documentation

- [Mission Control Spec](docs/MISSION_CONTROL_SPEC.md)
- [Deployment Plan](docs/DEPLOYMENT_PLAN.md)
- [Local Testing](docs/LOCAL_TESTING.md)
- [What Is Mocked](docs/WHAT_IS_MOCKED.md)
- [Next Deployment Gate](docs/NEXT_DEPLOYMENT_GATE.md)
- [Docker Local Testing](docs/DOCKER_LOCAL_TESTING.md)
- [Hosting Deployment Gate](docs/HOSTINGER_DEPLOYMENT_GATE.md)
- [Hostinger Deployment Steps Owner Safe](docs/HOSTINGER_DEPLOYMENT_STEPS_OWNER_SAFE.md)
- [Rollback Plan](docs/ROLLBACK_PLAN.md)
- [Post Deployment Checklist](docs/POST_DEPLOYMENT_CHECKLIST.md)
- [GitHub Repository Prep](docs/GITHUB_REPO_PREP.md)
- [Hostinger Compose From URL Guide](docs/HOSTINGER_COMPOSE_FROM_URL_GUIDE.md)
- [Owner GitHub Steps](docs/OWNER_GITHUB_STEPS.md)
- [Hostinger Compose From URL Checklist](docs/HOSTINGER_COMPOSE_FROM_URL_CHECKLIST.md)

## Docker Local Package

The Docker package serves the static prototype only.

- Service name: `mission-control`
- Container name: `bmv101-mission-control`
- Local preview port: `4175`
- No backend, database, authentication, secrets, or live API integrations
- No `.env` file or environment values required

## Prototype Pages

- Dashboard Home
- Kanban Board
- Owner Tasks
- Agent Tasks
- Agents
- Tools
- Integrations
- Notion + LinkedIn Status
- Audit Logs
- Mobile Upload Area
- Settings / Safety Rules
