# 008 — Decrypt close: quiet bridge (no wood CTA)

**Status:** Accepted  
**Date:** 2026-10-24

## Context

The post-decrypt **TryAgain** section used a photoreal wood sign and overlaid gold “Try Cipher” button. It felt like a second hero and broke the mint → footer rhythm.

## Decision

- Replace woodboard with **`#decrypt-close-bridge`**: mint-to-cream gradient, optional mist seam asset, parchment panel + text CTA **“Open workbench”** (outline / decrypt ink styling).
- Remove references to `woodboard-workbench.webp` from the close section.
- Footer copy mentions **letters and digits 0–9**; add **Number grid** link to `#number-grid` on About.

## Consequences

- Workbench discovery stays hero + nav; close section only scrolls to `#workbench`.
- `prefers-reduced-motion` uses instant scroll, not smooth.
- Wood WebP may remain on disk unused until cleanup.
