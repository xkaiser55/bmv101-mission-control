# Tailscale VPS Guided Steps

## Status

This is a later guided implementation outline only.

Do not execute VPS commands during this planning phase.

Do not ask the owner to run advanced terminal commands without a separate owner-approved implementation step.

## Preconditions

Before touching the VPS:

- Owner Tailscale account exists.
- Owner laptop or phone is connected to the tailnet.
- `mission-control` remains stopped.
- `openclaw-mdb` is running and must remain unchanged.
- Traefik is running and must remain unchanged.
- Compose binding remains:

```text
127.0.0.1:4175:80
```

## Later Guided VPS Sequence

In a separately approved guided session:

1. Owner logs into Hostinger and completes MFA.
2. Owner opens the VPS management path approved for Tailscale setup.
3. Install or run Tailscale on the VPS using the official Tailscale flow.
4. Owner completes VPS Tailscale login or approval privately.
5. Confirm the VPS appears as an approved device in the owner's tailnet.
6. Confirm Funnel is not enabled.
7. Configure Tailscale Serve to proxy:

```text
http://127.0.0.1:4175
```

8. Start only `mission-control`.
9. Validate tailnet-only access.

## Command Safety

The exact Tailscale Serve command must be checked against the installed Tailscale version during the guided session.

Official Tailscale docs show Serve can proxy localhost services. For example, Serve can proxy a target such as:

```text
localhost:4175
```

or:

```text
http://127.0.0.1:4175
```

Do not use:

```text
tailscale funnel
```

## Stop Conditions

Stop immediately if:

- A command would change DNS or nameservers.
- A command would enable Funnel.
- A command would publish a public URL.
- The setup asks to modify `openclaw-mdb`.
- The setup asks to modify Traefik.
- A secret would be written to repository files or public docs.
- The direct public VPS IP/port would be exposed.

## Owner Responsibilities

The owner handles:

- Hostinger login
- Tailscale login
- MFA
- VPS device approval
- Any auth key if a future approved method requires one
- Final approvals

Codex may prepare documents, compose patches, and step-by-step guides only.

Do not ask for or store Tailscale auth keys.
