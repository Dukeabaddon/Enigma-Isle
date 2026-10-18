# Stage 04 — Build

Implement Vite + React + TS site per design and cipher spec.

## Inputs

| Input | Source |
|-------|--------|
| Design outputs | `../02-design/output/` |
| Cipher spec | `../03-cipher-spec/output/` |
| Stack ADR | `decisions/001-stack-vite-react-ts.md` |
| Architecture | `docs/PLAN.md` |

## Process

| Step | Action |
|------|--------|
| 1 | Scaffold Vite app (`package.json`, `src/`) — **not started in plan phase** |
| 2 | Pure TS cipher module + unit tests from test vectors |
| 3 | Hero demo wired to cipher fns |
| 4 | Sections + Tailwind layout |
| 5 | Framer Motion for hero + section entrances |
| 6 | Static build; deploy per hosting decision |

## Outputs

| Artifact | Location |
|----------|----------|
| Working site | repo `src/`, `dist/` (gitignored) |
| Build notes | `output/build-log.md` |
