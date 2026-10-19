# 002 — Cipher: invertible grid variant (Q2=B)

**Status:** Accepted  
**Date:** 2026-10-17  
**Question:** Q2=B

## Context

Original diagram cipher uses grid shifts and a ×18 letter-value step. Exact diagram math may not yield unique decrypt.

## Decision

- **Keep** the teaching story: 5-column alphabet grid, directional steps (right, down-in-column, up/left/right sequence).
- **Tweak** arithmetic (e.g. multiplier / shift derivation) so encrypt↔decrypt is **bijective** under defined charset and wrap rules.
- Stage **03-cipher-spec** owns the formal algorithm and test vectors.

## Consequences

- Encrypt and decrypt UIs both required for course win (Q1).
- Worked example **SWORD** must round-trip once spec is done.
- **Update (2026-10-19):** Step 3 column count is **13×**, not 5× — see [ADR 005](005-column-shift-13.md).

## Alternatives rejected

- **Q2=A:** Diagram exact — rejected (invertibility risk)
- **Q2=C:** Encrypt-only — rejected (course needs decrypt)
