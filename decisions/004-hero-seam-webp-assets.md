# 004 — Hero seam via painted brown + WebP-only assets

**Status:** Accepted (asset map updated 2026-10-24)  
**Date:** 2026-10-18  

## Context

Hero→S2 looked like a leaf cutout: CSS wave `clipPath` + island art that did not match section-2 dirt brown (`#3c2820`). Generators that “dissolve into dirt” buried trees under a foreground dirt mound. Asset masters (png/jpeg) were bloating `public/images/`.

## Decision

1. **Hero seam = painted art**, not CSS wave clip. Desktop/mobile island plates grade into dirt brown; no `hero-island-wave-cut` in `HeroWorkbench.tsx`.
2. **Trees at ground level** in regen prompts — soft bottom color grade only; never a dirt silhouette in front of vegetation.
3. **Sky headroom** ~45–50% desktop, ~50–55% mobile for white UI fade (`#ece0c8` plate).
4. **Production images are WebP only** under `public/images/`.
5. Builder prompts live in chat / design prompts — not committed `docs/prompts/`.

## Live asset map (canonical)

| Path | Role |
|------|------|
| `nav-icon.webp` | Nav + favicon |
| `hero-island.webp` | Desktop hero plate |
| `hero-island-mobile.webp` | Mobile hero plate |
| `misty-pastel-horizon-layers.webp` | Decrypt close → footer mist band |
| `parchment-bridge-panel.webp` | Decrypt close CTA parchment |
| `footer-island.webp` | Footer landscape |
| `treasure-chest.webp` | Encrypt journey accent |
| `mascot-enigma.webp` | Encrypt journey companion |
| `adarna.webp` | Decrypt journey accent |
| `strata.webp` | Result expand dirt texture |
| `parchment-border.webp` | Parchment frame |

**Removed (grep before delete):** `woodboard-workbench.webp`, `hero-dirt.webp`.

## Consequences

- Smoother S1→S2 join; less clip-path maintenance.
- Regenerate hero when art direction shifts — match layered footer / bay reference style.
- Cleanup must grep `src/` before deleting images.

## Alternatives rejected

- Keep CSS scalloped wave over mismatched art — reads as sticker/leaf cut.
- “Bottom 20% solid dirt dissolve” prompts — bury trees; wrong layering.
- Keep jpeg/png masters next to webp — waste disk; confuse wire paths.
