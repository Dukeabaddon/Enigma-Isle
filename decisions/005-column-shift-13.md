# 005 — Column shift 5× → 13×

**Status:** Accepted  
**Date:** 2026-10-19  
**Supersedes (partial):** Step 3 count in ADR 002 / stage-03 “down 5×” story

## Context

Teaching UI and diagram used Step 3 = down 5 in column. On length-5 columns that was identity. Product ask: use **13×** instead so encrypt and decrypt both move every column meaningfully while staying bijective.

## Decision

- `COLUMN_SHIFT = 13` in `src/lib/cipher/grid.ts`.
- Encrypt: `shiftColumnDown13` = $(i + 13) \bmod L$.
- Decrypt: `shiftColumnUp13` = $(i - 13) \bmod L$.
- Col A ($L=6$): ≡ +1 / −1. Cols B–E ($L=5$): ≡ +3 / −3.
- Formal spec + `test-vectors.json` regenerated; Vitest locks `HELLO→CZUUA`, `SWORD→DQAJE`.

## Consequences

- All prior ciphertext examples with shift-5 are invalid.
- Journey cards + StepsModal copy say 13×.
- Stage-03 re-locked for Step 3 only; Steps 1–2 and 4 unchanged.
