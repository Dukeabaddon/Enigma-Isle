# S3 — How Encryption Works · map UI redesign

**Status:** design intake (branch `feat/encrypt-journey-map-ui`)  
**Ref:** `stages/02-design/references/visual/s3-encrypt-map-infographic-ref.png`  
**Cipher lock:** Step 3 = **13×** (ADR 005) — copy in cards must say 13×, not 5×  
**Obsidian:** mirror when API up → `10_Projects/Enigma/docs/s3-encrypt-journey-map-redesign.md`

## Goal

Rebuild `#encrypt-journey` to match the adventure-map infographic: parchment terrain BG, corner vines, CSS cards + leather ribbons, dotted path, mascot + chest flanks. Keep live cipher demos inside card wells.

## Layer split (CSS vs assets)

| Layer | Method | Notes |
|-------|--------|--------|
| Section board | CSS + optional WebP tile | Cream parchment fill; topo as soft BG image |
| Terrain / topo / compass | **Asset** WebP (tile or full-bleed) | No photo noise; flat map feel |
| Corner vines L/R/top | **Asset** WebP PNG-alpha | Absolute, pointer-events none |
| Step cards | **CSS only** | Radius, shadow, parchment fill |
| Leather ribbon | **CSS only** | Pseudo / SVG path; stitch border |
| Inner “app window” | **CSS only** | Traffic-light dots + well |
| Dotted path + arrows | CSS (border/SVG) | Optional footprint sprites later |
| Mascot + chest | **Reuse** existing WebP | Already in `public/images/` |
| Footprints trail | Optional WebP or CSS | Low priority vs vines/map |

## Component / file map (build later)

| Path | Role |
|------|------|
| `src/components/journey/StepCards.tsx` | Orchestrator (or thin wrapper) |
| `src/components/journey/encrypt/EncryptJourneyMap.tsx` | Section shell + BG layers |
| `src/components/journey/encrypt/EncryptStepCard.tsx` | One step card + ribbon slot |
| `src/components/journey/encrypt/LeatherRibbon.tsx` | CSS ribbon header |
| `src/components/journey/encrypt/encrypt-journey.css` | Map board, path, vine anchors |

## Asset filenames → place here

Generate as **WebP** (alpha where needed). Drop into:

`public/images/encrypt-journey/`

| Filename | Content | Gen size hint |
|----------|---------|----------------|
| `map-terrain-topo.webp` | Full-bleed aged parchment + faint topo contours + soft compass roses (no UI text) | 1920×2400 or tile 1024² |
| `vine-corner-tl.webp` | Tropical leaves/vines, top-left, transparent BG | ~800×600 |
| `vine-corner-tr.webp` | Mirror / variant top-right | ~800×600 |
| `vine-corner-bl.webp` | Bottom-left foliage near mascot | ~700×500 |
| `footprints-trail.webp` *(optional)* | Sparse boot prints on transparent | ~1200×400 |

**Do not regenerate** (reuse):

- `public/images/mascot-enigma.webp`
- `public/images/treasure-chest.webp`

**Reference only** (not shipped to `public/`):

- `stages/02-design/references/visual/s3-encrypt-map-infographic-ref.png`

## Prompt pack

JSON prompts: `stages/02-design/output/prompts/s3-encrypt-map-assets.json`

## Build order (after assets land)

1. Section BG + vines absolute  
2. CSS cards + ribbons  
3. Wire Step 1–4 demos (13× copy)  
4. Path / footprints polish  
5. Mobile stack (vines smaller; path hide or simplify)  
6. `graphify update .` · Obsidian append · Moat QA  

## Out of scope

- Decrypt section twin (separate task)  
- Cipher math changes  
- Replacing mascot/chest art unless seams fail  
