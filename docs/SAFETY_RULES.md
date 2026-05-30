# Safety Rules

This project is a separate local prototype. It must not touch OpenClaw production files or live services.

## Hard Boundaries

- Do not use or modify `openclaw-recovery`.
- Do not edit production OpenClaw files.
- Do not connect to Notion.
- Do not connect to Hostinger.
- Do not connect to Cloudflare.
- Do not use live credentials.
- Do not ask for secrets.
- Do not create a real `.env` file during initial setup.
- Do not include tokens, database IDs, API keys, cookies, passwords, private keys, or webhook URLs in project files.

## Feature Restrictions

- No terminal, shell, or Python runner UI.
- No raw file editor.
- No delete or cleanup controls.
- No publishing or scheduling controls.
- No Amazon workflows.
- No unverified live-write buttons.

## Allowed Starting Point

- Local prototype only.
- SQLite first for local persistence.
- Mock data before live integrations.
- Read-only simulations before any future write workflow.

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
