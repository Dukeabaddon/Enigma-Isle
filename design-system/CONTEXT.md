# Design system context

**Status:** Tokens locked Q24=A. Source of truth: `stages/02-design/output/tokens.md`.

## Color

| Token | Hex | Notes |
|-------|-----|-------|
| `--color-page` | `#FFFFFF` | White chrome / top fade |
| `--color-ink` | `#1A1F1C` | Body on white |
| `--color-ink-muted` | `#5C6560` | Secondary |
| `--color-encrypt` | `#D4A017` | Gold encrypt |
| `--color-encrypt-deep` | `#B8860B` | Gold hover |
| `--color-decrypt` | `#2F8F6B` | Green decrypt |
| `--color-decrypt-deep` | `#1F6B4F` | Green hover |
| `--color-dirt` | `#5C4033` | S1 expand / footer |
| `--color-dirt-deep` | `#3E2A22` | Dirt solid |
| `--color-island-teal` | `#3A8F8C` | Scenic |
| `--color-sand` | `#E8D5B5` | Scenic / parchment tint |
| `--color-parchment` | `#E6C89A` | ABCD frame |

## Type

| Role | Lean |
|------|------|
| UI / body | Manrope or DM Sans |
| Brand | Expressive sans/display (not Inter) |
| ABCD table | Handwriting (Q16=B) |

## Motion (Framer Motion)

| Pattern | Notes |
|---------|-------|
| S1 expand | Into dirt strata ~400–600ms |
| S3/S4 cards | Silent loops 3–8s; reduced-motion posters |
| Scroll | White→island scenic; no water band (Q19=B) |

## References

`stages/02-design/references/visual/`

## Outputs

`stages/02-design/output/tokens.md` → consumed in `04-build`.
