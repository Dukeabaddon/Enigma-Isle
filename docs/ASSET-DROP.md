# Asset drop sheet — what to generate & where

Put files under **`public/images/`** (repo: `/Users/macbookair/Projects/enigma/public/images/`).

When done, message me exactly:

```text
Assets dropped. Wire them.
Files: public/images/<names you added>
```

I will update `HeroWorkbench` / Nav / CSS to point at your files and re-check screenshots.

---

## 1) Nav brand icon (SVG)

| | |
|---|---|
| **Prompt file** | `stages/02-design/output/nav-icon-prompt.json` |
| **Save as** | `public/images/nav-icon.svg` |
| **Size** | 36×36 viewBox (or larger SVG scaled down) |
| **BG** | Transparent |

**Paste prompt (for SVG AI / Recraft / Illustrator AI):**

> Pure SVG icon, transparent background, 36×36 viewBox. Geometric 8-point nautical compass ring, ancient key-bit and coordinate cross at center, two minimalist palm/island crest curves at lower perimeter. Colors gold `#D4A017`, deep gold `#B8860B`, teal accent `#2F8F6B`, optional ink `#1A1F1C`. Round caps/joins, stroke ~1.75, crisp at small header size. No text, no raster, no background rectangle.

---

## 2) Hero island (main BG)

| | |
|---|---|
| **Prompt file** | `stages/02-design/output/hero-bg-prompts.json` → `S1-A` / `ready_to_paste` |
| **Save as** | `public/images/hero-island.webp` (keep PNG master optional: `hero-island.png`) |
| **Size** | **1920×1080**, 16:9, sRGB |
| **Also OK** | Replace existing `public/images/island.png` with same art (I can wire either) |

**Midjourney:**

```text
/imagine prompt: Wide 16:9 soft illustrated tropical island landscape for website hero under white fade overlay, layered rolling green hills, distant turquoise teal sea, warm golden-hour sunset sky with soft wispy clouds, calm empty upper third composed for header UI, detailed lush lower two-thirds, painterly travel explorer game landing style, Studio Ghibli inspired matte painting --ar 16:9 --style raw --v 6.0 --no text, letters, watermarks, UI, people, cyberpunk, neon, purple
```

**DALL·E 3:**

```text
A wide 16:9 soft illustrated landscape for a website hero background. The setting is a tropical explorer island with rolling lush green hills, scattered palm tree silhouettes, and distant teal ocean waters under a warm golden-hour sunset sky. The upper third of the composition is calm, soft, and nearly plain sky to allow white web UI text to blend smoothly over it. The lower two-thirds feature detailed painterly terrain. Flat-to-painterly vector illustration style, absolutely no text, no letters, no UI elements, no people, no watermarks.
```

---

## 3) Dirt strata (S1 expand)

| | |
|---|---|
| **Prompt file** | same JSON → `S1-F-dirt-strata` |
| **Save as** | `public/images/hero-dirt.webp` (or replace `dirt-strata.png`) |
| **Size** | **1920×640**, wide strip, tileable left–right |

**Prompt:**

```text
Wide seamless horizontal game background strip, underground soil cross-section, layered brown dirt strata wavy bands, scattered rocks and pebbles, simple flat cartoon dinosaur bones and fossils embedded, warm medium to dark brown, no text, no UI, tileable left-right, soft top edge for blend under island
```

**Negatives:** water band, ocean, blue strip, photo, neon, watermark, text

---

## 4) Optional mobile island

| | |
|---|---|
| **Save as** | `public/images/hero-island-mobile.webp` |
| **Size** | ~780×1688 (9:19) — optional |

Skip if you only generate 16:9; CSS can crop.

---

## Checklist

- [ ] `public/images/nav-icon.svg`
- [ ] `public/images/hero-island.webp` (or `.png`)
- [ ] `public/images/hero-dirt.webp` (or update `dirt-strata.png`)
- [ ] Tell me: **Assets dropped. Wire them.**

Do **not** put assets in `stages/` or `.moat/`. Only `public/images/`.
