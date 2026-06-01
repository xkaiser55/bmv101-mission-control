# Phase E1 Testing

## Required Static Checks

- JavaScript syntax passes for `app.js`.
- JavaScript syntax passes for `bridge.js`.
- `manifest.json` parses as valid JSON.
- `manifest.json` references local icon files.
- Dockerfile copies PWA and bridge assets.
- Docker Compose keeps the localhost-only binding:

```text
127.0.0.1:4175:80
```

- No live `fetch`, webhook, or external API call exists in app code.
- No secret or `.env` value is committed.
- No dangerous control is added.

## Owner Visual Checks After A Separate Approved Redeploy

- Dashboard loads through the existing Tailscale private route.
- Phone navigation uses the compact Current view picker.
- Settings / Safety Rules shows Add to Home Screen guidance.
- Settings / Safety Rules shows bridge status as local/mock / disabled and external transport as none.
- Home-screen shortcut can be added where the phone browser supports it.
- Existing local/mock actions still create sanitized local events only.

## Existing Project Boundaries

Do not modify:

- `openclaw-mdb`
- Traefik
- Tailscale Serve
- Cloudflare
