# Enigma — agent context (ICM)

College final: one-page **encrypt/decrypt** landing site. Adventure/pirate/island theme; SnapTrips-like scroll landscapes.

## Five ICM layers

| Layer | Path | Purpose |
|-------|------|---------|
| **Root** | `CONTEXT.md`, this file | Project identity, stack, stage index |
| **Setup** | `setup/questionnaire.md` | Grill intake; triggers when decisions missing |
| **Design system** | `design-system/CONTEXT.md` | Palette, typography, motion tokens (TBD) |
| **Shared** | `shared/grill-summary.md` | Locked decisions snapshot |
| **Stages** | `stages/01-discovery` … `05-polish` | Phase CONTEXT + `references/` + `output/` |

**Additive (Aaron workflow):** `decisions/` — numbered ADRs; `.context/decisions.md` — running log.

## Agent triggers

| Trigger | Action |
|---------|--------|
| **New session / lost context** | Read `CONTEXT.md` → `shared/grill-summary.md` → active stage `CONTEXT.md` |
| **Setup / requirements unclear** | Open `setup/questionnaire.md`; grill Aaron on open items in `DELEGATE-PLAN.md` |
| **Status check** | List stage outputs under `stages/*/output/`; read latest `decisions/*.md` |
| **Before build** | Stage `04-build` CONTEXT satisfied; Q2 invertible spec in `03-cipher-spec/output/` |
| **Before polish** | Stage `04-build` output exists; motion/a11y in `05-polish` |

## Stack (locked)

Vite + React + TypeScript + Tailwind + Framer Motion. Cipher runs **client-side** only (pure TS).

## Do not

- Overwrite `brainstorms/` capture files (append-only if ever needed).
- Implement app code until stage `04-build` is explicitly started.
