# AGENTS.md

Operational instructions for any agent working in this repository.

## Required Direction

- Build a local prototype first.
- Use SQLite first when adding persistence.
- Keep this project separate from `openclaw-recovery`.
- Do not edit production OpenClaw files.
- Do not connect to Notion.
- Do not perform live Notion writes.
- Do not connect to Hostinger.
- Do not connect to Cloudflare.
- Do not use live credentials.
- Do not expose secrets.
- Do not create, request, print, or store tokens, database IDs, API keys, cookies, passwords, private keys, webhook URLs, or other credentials.

## Prohibited UI Capabilities

- No terminal, shell, or Python runner UI.
- No raw file editor.
- No delete or cleanup controls.
- No publishing or scheduling controls.
- No Amazon workflows.
- No unverified live-write buttons.

## Build Rule

If a feature could affect a live external system, production project, customer-facing output, scheduled content, or irreversible state, stub it locally first and require explicit verification before any future live-write path is considered.

## Owner Review Rule

The owner is not a developer and should not be expected to judge code quality manually. Do not ask the owner to review raw code as the normal approval process.

Every task must end with a plain-English Owner Review Report that includes:

1. What was built in plain English
2. Files changed
3. Commands/tests run
4. Test result: pass/fail
5. Live systems touched: yes/no
6. Secrets used or created: yes/no
7. Real `.env` created: yes/no
8. External services connected: yes/no
9. Dangerous controls added: yes/no
10. Screenshot/preview instructions
11. What the owner needs to do, if anything

The owner should only handle:

- Logins
- MFA
- Entering secrets manually
- Final approvals
- Payment, billing, admin, or security settings
- Deployment confirmation
- Visual approval from screenshots or previews

Codex must handle:

- Code implementation
- File structure
- Tests
- Lint and build checks
- Plain-English summaries
- Safety self-audit
- Documentation updates
