# 004 — Hero seam via painted brown + WebP-only Aaron assets

**Status:** Accepted  
**Date:** 2026-10-18  

## Context

Hero→S2 looked like a leaf cutout: CSS wave `clipPath` + island art that did not match section-2 dirt brown (`#3c2820`). Generators that “dissolve into dirt” buried trees under a foreground dirt mound. Asset masters (png/jpeg) were bloating `public/images/`.

## Decision

1. **Hero seam = painted art**, not CSS wave clip. New desktop/mobile island plates already grade into `#3c2820`; remove `hero-island-wave-cut` from `HeroWorkbench.tsx`.
2. **Trees at ground level** in regen prompts — soft bottom color grade only; never a dirt silhouette in front of vegetation.
3. **Sky headroom** like original: ~45–50% desktop, ~50–55% mobile for white UI fade.
4. **Production images are WebP only** under `public/images/`. Convert drops → wire → delete jpeg/png masters.
5. **Spent one-time builder prompts** under `docs/prompts/` cleared; paste prompts in chat when needed.

## Live asset map (canonical)

| Path | Role |
|------|------|
| `nav-icon.webp` | Nav + favicon |
| `hero-island.webp` | Desktop hero plate |
| `hero-island-mobile.webp` | Mobile hero plate |
| `hero-dirt.webp` | Result expand dirt |
| `woodboard-workbench.webp` | CTA board |
| `treasure-chest.webp` | CTA accent |
| `mascot-enigma.webp` | How-it-works companion |
| `footer-island.webp` | Footer landscape |
| `parchment-border.webp` | Parchment frame |

## Consequences

- Smoother S1→S2 join; less clip-path maintenance.
- Aaron regenerates art when seam fails — do not reintroduce wave clip as the fix.
- Cleanup must grep `src/` before deleting images.

## Alternatives rejected

- Keep CSS scalloped wave over mismatched art — reads as sticker/leaf cut.
- “Bottom 20% solid dirt dissolve” prompts — bury trees; wrong layering.
- Keep jpeg/png masters next to webp — waste disk; confuse wire paths.
