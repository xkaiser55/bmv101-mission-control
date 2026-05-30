# Docker Local Testing

This package runs the static Mission Control prototype locally only.

## What It Serves

- `index.html`
- `styles.css`
- `app.js`

No backend, database, authentication, live API integration, secrets, or external write workflow is included.

## Local Build

From the project folder:

```powershell
docker compose build mission-control
```

## Local Run

```powershell
docker compose up -d mission-control
```

Open:

```text
http://localhost:4175
```

## Local Health Check

```powershell
docker compose ps
```

The service should show as running and healthy after startup.

## Stop Local Container

```powershell
docker compose down
```

## Safety Expectations

- No real `.env` file is required.
- No secrets are required.
- No external service is connected.
- No live write action is available.
- Prototype actions remain local/mock only.
