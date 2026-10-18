# Enigma

One-page college cipher landing: encrypt/decrypt demo + teaching sections. Built with **Interpretable Context Methodology (ICM)** — context lives in staged folders, not only in chat.

## Status

**Planning phase.** No application code yet.

## For humans

1. Read [CONTEXT.md](./CONTEXT.md) for goals and locked choices.
2. Open [DELEGATE-PLAN.md](./DELEGATE-PLAN.md) for remaining grill questions and build delegation.
3. See [docs/PLAN.md](./docs/PLAN.md) for short architecture.

## For agents

Start with [CLAUDE.md](./CLAUDE.md) (five layers + triggers), then the active stage under `stages/`.

## Structure

```
setup/           Questionnaire intake
design-system/   Tokens and theme (TBD)
shared/          Grill summary
stages/          01–05 discovery → polish
decisions/       Numbered ADRs
.context/        Running decision log
docs/            PLAN and future specs
```

Brainstorm captures live in `brainstorms/` (gitignored).
