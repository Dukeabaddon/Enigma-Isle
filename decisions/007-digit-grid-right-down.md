# 007 — Digits 0–9 on 2×5 grid (right → down)

**Status:** Accepted  
**Date:** 2026-10-24

## Context

Users need encrypt/decrypt for digits. Letters keep the existing four-step pipeline.

## Decision

- **Alphabet:** `0`–`9` on a fixed 2×5 grid (row 0: `0–4`, row 1: `5–9`).
- **Encrypt:** `moveRight` then `moveDown` with horizontal and vertical wrap (same spirit as letter grid).
- **Decrypt:** `moveUp` then `moveLeft` (exact inverse).
- **Pass-through:** Whitespace preserved; punctuation/special still stripped (not encrypted).

## Consequences

- Separate module `src/lib/cipher/digits.ts`; no ×18 walk or column-13 for digits.
- Steps modal swaps letter vs digit panels per selected symbol (no global toggle).
