# Local Testing

This project is currently a dependency-free static prototype.

## Manual Smoke Test

1. Open `index.html` in a browser.
2. Confirm the Dashboard Home loads.
3. Use each navigation item.
4. Press each prototype action button:
   - Send to Mia
   - Ask Eva for checkpoint
   - Run dry-run
   - Upload analytics file
   - Mark done
   - Mark blocked
5. Confirm Audit Logs shows sanitized local entries.
6. Confirm Integrations shows Notion, Hostinger, Cloudflare, OpenClaw production, and Discord webhooks as disconnected or blocked.
7. Confirm Settings / Safety Rules lists blocked dangerous controls.

## Upload Test

1. Go to Mobile Upload Area.
2. Choose a `.csv`, `.xls`, or `.xlsx` file.
3. Confirm only local metadata appears.
4. Confirm no Notion update occurs.

## Safety Test

Confirm the app does not include:

- Terminal, shell, or Python runner UI
- Raw file editor
- Schema editor
- Delete or cleanup controls
- Publishing controls
- Scheduling controls
- Amazon workflows
- Unverified live-write buttons

## Expected Result

All tests should pass locally without credentials, network access, external services, live APIs, or a real `.env` file.
