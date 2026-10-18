# Architecture + action plan

One-page **React** app; no backend. Cipher is pure TS.  
**Stage:** `04-build` live · next `05-polish` + Vercel.

## Layers

```
┌─────────────────────────────────────────┐
│  App (Nav, sections, Framer Motion)      │
├─────────────────────────────────────────┤
│  HeroWorkbench + ResultExpand + Modal    │
├─────────────────────────────────────────┤
│  About / StepCards / TryAgain / Footer   │
├─────────────────────────────────────────┤
│  cipher/ (encrypt, decrypt, grid utils)  │
└─────────────────────────────────────────┘
```

## Data flow

1. User text + mode (encrypt | decrypt).
2. `cipher` returns result + step trace.
3. No network for crypto.

## Asset policy (2026-10-18)

- Production: **WebP only** in `public/images/`.
- Hero seam: **painted** into `#3c2820` — **no** CSS wave clip.
- Canonical map: `decisions/004-hero-seam-webp-assets.md`.

## Action plan (current)

| Priority | Item | Owner |
|----------|------|--------|
| P0 | Visual QA new hero web + mobile vs S2 brown | Aaron |
| P0 | Process new Moat notes; no false “done” | Builder |
| P1 | Encrypt↔decrypt / section transition polish | Builder |
| P1 | Footer solid seam + wave-mask notes if reopened | Builder |
| P2 | `05-polish` a11y + reduced-motion | Builder |
| P2 | Vercel production deploy | Aaron sign-off |
| Always | `graphify update .` after structural edits | Agent |
| Always | Obsidian Build Log / Decisions mirror | Agent |

## Build & deploy

- `vite build` → static `dist/`
- Host: **Vercel**
- Workflow: ICM stages · Gate compress · graphify · Obsidian `10_Projects/Enigma/`

## References

- Decisions: `decisions/` + `.context/decisions.md`
- Grill lock: `shared/grill-summary.md`
- Delegate: `DELEGATE-PLAN.md`
- State: `.context/state.md`
