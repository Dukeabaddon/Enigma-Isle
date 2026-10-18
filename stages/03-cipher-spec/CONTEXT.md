# Stage 03 — Cipher spec

Define **invertible** grid cipher (Q2=B) with teachable encrypt/decrypt steps.

## Inputs

| Input | Source |
|-------|--------|
| Diagram + SWORD example | `brainstorms/2026-10-17-college-cipher-landing.md` |
| Decision Q2=B | `decisions/002-cipher-invertible-variant.md` |
| Grid open flags | Column row counts, wrap rules |

## Process

| Step | Action |
|------|--------|
| 1 | Formalize alphabet grid (5 cols, Z placement) |
| 2 | Replace or adjust ×18 step so mapping is bijective per key/rules |
| 3 | Write encrypt pipeline (4 steps) with worked example |
| 4 | Derive decrypt pipeline (inverse order/steps) |
| 5 | Document edge cases (charset from Q9) |

## Outputs

| Artifact | Location |
|----------|----------|
| Algorithm spec | `output/cipher-spec.md` |
| Test vectors | `output/test-vectors.json` |
| Teaching copy outline | `output/step-copy.md` |
