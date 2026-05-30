# What Is Mocked

The Phase B Mission Control prototype uses mock data only.

## Mocked Data

- Agents
- Workflow cards
- Kanban status
- Owner tasks
- Agent tasks
- LinkedIn Post Metrics status
- Notion connection status
- Safe tools and blocked tools
- Recent checkpoints
- Audit log entries
- Upload file metadata

## Mocked Actions

Every prototype button creates only a local task event and sanitized audit log entry:

- Send to Mia
- Ask Eva for checkpoint
- Run dry-run
- Upload analytics file
- Mark done
- Mark blocked

## Not Connected

- Notion
- Hostinger
- Cloudflare
- OpenClaw production
- Discord webhooks
- LinkedIn API
- Amazon workflows

## Upload Behavior

The Mobile Upload Area accepts CSV, XLS, and XLSX file selection through the browser UI. The prototype records file name, type, size, and timestamp as local metadata only.

It does not parse live LinkedIn data, upload the file, call external APIs, or update Notion.

## Storage Behavior

The prototype stores mock task events, sanitized audit logs, and upload metadata in browser `localStorage`. No backend database is used in Phase B. If backend persistence is needed later, SQLite should be used first.
