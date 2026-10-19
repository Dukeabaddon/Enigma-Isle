# Project context — Enigma Isle

## Identity

| Field | Value |
|-------|--------|
| **Name** | Enigma Isle |
| **Course** | College final — invertible cipher demo + teaching sections |
| **Success** | Beautiful standout UI + working encrypt/decrypt |

## Locked decisions

| ID | Decision |
|----|----------|
| ADR 001 | Vite + React + TS + Tailwind + Framer; client cipher |
| ADR 002 | Invertible grid/directional variant |
| ADR 003 | Brand Enigma Isle |
| ADR 004 | Hero painted seam `#3c2820`; no CSS wave; WebP-only assets |
| ADR 005 | Step 3 column shift **13×** (was 5×); decrypt up 13× |
| Q6=D | Island visuals; clear English copy |
| Host | Vercel |

See `decisions/`, `.context/decisions.md`, `shared/grill-summary.md`.

## Hero UX

- Wide input; yellow encrypt / green decrypt (single visible control + switch).
- White fade over island; result expands into dirt strata.
- Island art blends to S2 brown — **no wave clip**.

## Stage pipeline

```
01-discovery → 02-design → 03-cipher-spec → 04-build → 05-polish
```

**Active:** `04-build` → `05-polish` · **Next:** a11y / deploy  
**State:** `.context/state.md` · **Plan:** `docs/PLAN.md` (local)  
**Moat:** #120 K highlight · #121 encrypt mobile `touch-pan-y` (no sideways drag)

## Workflow (always)

1. ICM stage CONTEXT + grill-summary  
2. GateMCP (`gate_init` / compress / search)  
3. graphify for structural map (`graphify update .` after edits)  

## References

- Grill: `brainstorms/2026-10-17-college-cipher-landing.md`
- Delegate: `DELEGATE-PLAN.md`
