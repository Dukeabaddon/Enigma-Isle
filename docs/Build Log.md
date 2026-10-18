# Build Log — Enigma Isle

## 2026-10-18 — Slice 1: Full Implementation & Verification

### Status: Complete & Verified Green

- **Stack:** Vite + React 19 + TypeScript 5.8 + Tailwind CSS v4 (@theme tokens) + Framer Motion + Lucide.
- **Cipher (`src/lib/cipher/`):** Pure client-side TS implementation.
  - Step 1 & 2: Right walk scaled by $18 \times \text{value}$ on cyclic 26-letter ring ($\gcd(19, 26) = 1$).
  - Step 3: Column down shift 5× (Col 1 wraps across 6 slots, Cols 2–5 return to origin).
  - Step 4: Finisher vector path (up 1 → left 1 → up 1 → right 2) with exact boundary wrapping.
  - Decrypt: Exact reverse mathematical operations ($11b + 10 \pmod{26}$, up 5×, inverse finisher).
- **Unit Tests (`vitest`):** 6 tests passed. All 26 letters round-trip with 100% fidelity.
- **UI Sections:**
  - S0: Minimal sticky navigation with responsive mobile menu.
  - S1: Hero workbench with white-to-scenic fade, dual gold/green stone tablets, dirt strata expand with rocks & bones, parchment/scroll skins, deep-dive mechanical trace modal.
  - S2: Cryptographic architecture explanation + 5-column ABCD table on parchment frame with handwritten Caveat typography.
  - S3 & S4: 4 Cursor-style encrypt cards and 4 decrypt mirror cards with silent graphic CSS/interval loops (reduced-motion safe).
  - S5 & S6: Close CTA with smooth scroll to workbench + compact footer credit bar.
- **E2E & Screenshots (`playwright`):** 4 tests passed across desktop (1280px) and mobile (390px).
- **Knowledge Graph:** `graphify update .` executed (334 nodes, 436 edges, 33 communities).

## 2026-10-18 — Slice 2: Drawbridge Moat Batch (Batch Bridge)

### Status: 17/17 Moat Tasks Done & Verified Green

1. **Nav Brand Mark (`36ba5a96`):** Placeholder removed; clean minimal "EI" gold-rimmed mark placed; JSON generation spec written to `stages/02-design/output/nav-icon-prompt.json`.
2. **Result Expand Cleanup (`77aa93e5`, `711467fd`, `e3675f28`, `16978d81`, `a6a6a7c3`):**
   - Letter spacing `tracking-[0.25em] sm:tracking-[0.3em]` applied across ciphertext and plaintext.
   - Removed "Clear & Start Over" button.
   - Breakdown button simplified to "View Step-by-Step Breakdown" (removed step count).
   - Top status label simplified to clean "Result" badge.
3. **Natural Downward Section Expansion (`186536ac`):**
   - Removed fixed viewport heights and `justify-between` from `#workbench`.
   - Result strata now expands downward in normal document flow, naturally pushing Section 2 (`#table`) down.
4. **Rolled Parchment Steps Modal (`35580416`):**
   - Procedural SVG `feTurbulence` / displacement map filter integrated.
   - Aged parchment styling `#F4ECD8` with inner burnt shadow and decorative scroll header/footer rods.
5. **Single Visible Key with Expandable Toggle (`6f1d0420`):**
   - One primary action visible at a time (Encrypt or Decrypt).
   - Expandable toggle switcher button expands with label on hover and supports 1-tap switching on touch (touch targets ≥ 44px).
6. **S4 Decrypt Cards (`09d41eeb`):**
   - Removed parenthetical text `(Undoes Encrypt X)` from card badges.
7. **Parchment Border Table (`eda04bdd`):**
   - Integrated Steven Monson CodePen reference with deckled parchment `border-image` styling.
8. **Island Scenic Plate Prompts (`bcb29241`):**
   - Ready-to-paste Midjourney v6 and DALL-E 3 commands documented in `stages/02-design/output/hero-bg-prompts.json`.
9. **UI Badge & Card Pruning (`afe48d4b`, `52cd9383`, `2702118d`, `79e98afc`, `2047ae9c`):**
   - Pruned redundant hero badge, S3 badge, and 3 feature cards under ABCD table per Moat annotations.

## 2026-10-18 — Slice 3: Moat Batch + Parallel Asset Race

### Status: 22/22 Moat Tasks Done & Candidate Assets Delivered

### Parallel Track A — Asset Race Candidates
Candidate assets generated and placed in `public/images/candidates/antigravity/` for Aaron to compare against his own generations:

| Asset | Path | Dimensions / Format | Tools Used |
|---|---|---|---|
| **Nav Brand Icon** | `public/images/candidates/antigravity/nav-icon.svg` | 36×36 viewBox (SVG) | Pure Vector SVG Generator |
| **Hero Island Plate** | `public/images/candidates/antigravity/hero-island.webp` (+ `.png`) | 1920×1080 (16:9, WebP / PNG) | Gemini AI (`image-generator`) + PIL Lanczos Resampler |
| **Underground Dirt Strata** | `public/images/candidates/antigravity/hero-dirt.webp` (+ `.png`) | 1920×640 (WebP / PNG) | Gemini AI (`image-generator`) + PIL Lanczos Resampler |
| **Mobile Island Plate** | `public/images/candidates/antigravity/hero-island-mobile.webp` | 780×1688 (9:19, WebP) | Gemini AI (`image-generator`) + PIL Aspect Cropper |
| **Asset README** | `public/images/candidates/antigravity/README.md` | Markdown documentation | Antigravity documentation |

### Parallel Track B — Moat Queue (5 New Tasks)
1. **Hero Full Screen 100dvh → ~200dvh Expand (`5a365b7c`):**
   - Section `#workbench` set to full viewport `min-h-[100dvh]` initially with `min-h-[calc(100dvh-4rem)]` centered container.
   - Result strata expands downward with `min-h-[50dvh]` and 0.7s smooth cubic-bezier easing, seamlessly extending the workbench toward ~150–200dvh without cramping the hero.
2. **Decrypt Card 2 Upward AFKPU Motion (`bef05e7e`):**
   - Reordered column display to `A → F → K → P → U` (top to bottom).
   - Animation sequence now travels strictly upward from bottom row (`U`) to top row (`A`) with `<MoveUp />` indicator.
3. **Decrypt Card 1 ABCD Mini Grid Map (`ff8afd9d`):**
   - Replaced plain text badge with an interactive 3×5 mini grid map representing Rows 3–5 of the 5-column ABCD table (`K-O`, `P-T`, `U-Y`).
   - Visually maps the active vector path step-by-step: `L (Start) → O (Left 2 wrap) → T (Down 1) → P (Right 1 wrap) → U (Down 1 Result)`.
4. **Island-Themed 50dvh Footer (`5cd07459`):**
   - Expanded Footer into an atmospheric `min-h-[50dvh]` exploration footer with layered island silhouette, ocean wave vectors, geographic coordinates, 3-column landmark directory, and mathematical cipher foundations.
5. **Close Section Badge Pruned (`7d2b9f36`):**
   - Removed "Interactive Demonstration" badge in `TryAgain.tsx` per Moat screenshot.

### Verification Matrix
- `npm run test`: 6/6 tests passing (Vitest).
- `npm run build`: 0 errors, 0 warnings (tsc + vite build in ~437ms).
- `npx playwright test`: 4/4 tests passing across desktop and mobile.
- Fresh screenshots captured:
  - `stages/04-build/output/screenshots/01-hero-white-fade.png`
  - `stages/04-build/output/screenshots/02-hero-encrypt-expand.png`
  - `stages/04-build/output/screenshots/03-hero-decrypt.png`
  - `stages/04-build/output/screenshots/04-about-abcd.png`
  - `stages/04-build/output/screenshots/05-encrypt-cards.png`
  - `stages/04-build/output/screenshots/06-decrypt-cards.png`
  - `stages/04-build/output/screenshots/07-mobile-hero.png`
  - `stages/04-build/output/screenshots/08-island-footer.png`
- Knowledge Graph: `graphify update .` completed.

---

## 2026-10-18 – Drawbridge Moat Wave 2 (Tasks 23–40 Complete)

### Status: Complete & Verified
- Total Moat Tasks: 40 | Done: 40 | To Do: 0 | Doing: 0

### Summary of Wave 2 Implementations:
1. **Hero Background Plate Fixed (`dc0eb9cf`):**
   - Pinned background container to `absolute top-0 left-0 right-0 h-[100dvh]`.
   - Result expansion never stretches, rescales, or distorts island artwork.
2. **Hero White Fade Tuning (`344ef172`):**
   - Reduced gradient opacity to `from-white/70 via-white/35 to-transparent` to let lush island landscape shine through.
3. **Typography & Positioning (`e4c298a5`, `203775c9`):**
   - Shifted headline and copy upwards (`pt-16 sm:pt-24 justify-start`).
   - Tagline updated to fun, engaging phrasing: *"Drop in a secret phrase. Watch the island grid twist, hop, and lock your message into an unbreakable puzzle."*
4. **Input & Button Alignment (`e0e34bdc`, `4d3ffd53`, `4292edd2`):**
   - Stripped active input glow; styled with refined ink border.
   - Placeholder changed to *"Enter a secret phrase…"*.
   - Outer container flex items stretch with `overflow-visible`, giving 0 gap between input and action button.
   - Button rounded on right edge only (`rounded-r-[14px]`) touching top/right/bottom.
   - Encrypt key: solid gold/yellow `bg-[#D4A017]`, white key icon + white text.
   - Decrypt key: solid green `bg-[#2F8F6B]`, white key icon + white text.
   - Hover dropdown reveals solid alternate action button directly clickable to toggle cipher mode.
5. **Nav CTA Simplification (`e6f056cf`):**
   - Simplified to "Try Cipher", removed unnecessary icon.
6. **Result Strata Height (`2dcd2428`):**
   - Height set to full `min-h-[100dvh]` with Aaron's canonical `hero-dirt.webp`.
7. **Section 2 Styling (`ce449bd3`):**
   - Page body background set to pure `bg-white`.
   - Section 2 `#table` container styled with `rounded-[28px] sm:rounded-[36px] bg-[#FAF7F0] border border-ink/10 shadow-sm`, distinctly contrasting with the white page background.
8. **Unified Teaching Board (`4b17f690`):**
   - Nested cards inside an architectural chamber board (`rounded-[28px] sm:rounded-[36px] bg-[#FAF8F2] border border-ink/10 shadow-sm p-6 sm:p-12`).
   - Smooth section bleed and transitions.
9. **Journey Cards Polish (`f0592967`, `35c2ccd1`, `3532e436`, `e5a68124`, `31e96b23`, `12e32aea`):**
   - Decrypt Card 1: Removed header chrome; rendered full 26-letter ABCD grid map (6×5) highlighting step path `L → O → T → P → U`.
   - Decrypt Card 2: Removed "Row 1" label; displays letters only with "Shift upward" caption.
   - Decrypt Card 3: Simplified explanation text; removed "Coprime Modular Inversion" span.
10. **Atmospheric Island Footer (`a7325fd9`):**
    - Built clean, production-grade 15-year FE/UI standard footer.
    - Integrated `/images/nav-icon.webp`, landmarks directory, and "Back to top" action.

### Verification Matrix:
- `npm run test`: 6/6 tests passing (Vitest).
- `npm run build`: 0 errors, 0 warnings (tsc + vite build in 437ms).
- `npx playwright test`: 4/4 tests passing across desktop and mobile viewports.
- All 8 screenshots freshly updated in `stages/04-build/output/screenshots/` and `shots/`.

---

## 2026-10-18 – Visual / IA Polish Pass (Single Source Pass)

### Status: Complete & Verified
- Total Moat Tasks: 40 | Done: 40 | To Do: 0 | Doing: 0

### Implemented Enhancements:
1. **Navbar Evolution (FOCUS A):**
   - Transparent over hero; transitions on scroll (`scrollY > 20`) to warm parchment/wood plank (`bg-[#FAF6EE]/95 border-b border-[#D8C7A5]/80 shadow-sm`).
   - Links styled as subtle expedition signposts (`text-xs font-bold uppercase tracking-wider`).
   - CTA "Try Cipher" rendered as a tactile brass plate with beveled gold gradient, accessible ≥44px touch target.
2. **Hero Controls & Fade (Aaron Priority):**
   - Both Encrypt (`#D4A017`) and Decrypt (`#2F8F6B`) buttons sit on ONE row inside the input wrapper; never wrap, never offset on any viewport.
   - Reduced milky white fade to `from-white/55 via-white/20 to-transparent` to expose island artwork.
   - Added organic shoreline wave transition at base of hero into Section 2.
3. **Reference Matrix Cartography Overlook (FOCUS B & C):**
   - Eliminated "cream card on cream page" look.
   - Section 2 styled with warm terrace tone (`bg-[#F5EFE6]`).
   - Parchment map sits on wood/stone depth mat with 4 brass corner pins, subtle compass rose watermark, and cartographer coordinate stamps.
   - Hand font (`font-hand`) exclusively for map letters; display font for headings.
   - Row 6 empty slots converted to architectural etched anchor marks, eliminating broken look.
4. **Sunlit Sunstone Chambers (FOCUS D):**
   - Encryption pipeline (#encrypt-journey) styled as warm sunstone chambers (`bg-[#FAF4E8]`, gold torch accents).
   - Four distinct stone expedition tablets with chisel borders, stamped chamber badges, and large readable diagrams.
5. **Architectural Inversion Gateway (FOCUS E):**
   - Built full architectural threshold section between encryption and decryption pipelines.
   - Symmetric inversion gateway with dual gold/teal pillars and 4-way inversion matrix diagram.
6. **Emerald Tidal Caverns (FOCUS F):**
   - Decryption pipeline (#decrypt-journey) given distinct twilight teal/emerald atmosphere (`bg-[#EDF5F1]`).
   - Reverse journey feeling; includes full 26-letter ABCD tidal grid map with animated path.
7. **Unlock Island Cipher CTA (FOCUS G):**
   - Replaced empty cream card with warm ambient vault chamber (`#FAF4E8` to `#EAE0CA`) with glowing vault medallion.
   - Replaced "Back to Workbench" with actionable "Open Workbench" brass plate button.
8. **Night Camp Silhouette Footer (FOCUS H):**
   - Night forest/camp ambiance (`bg-[#131915]`) with top silhouette wave transition.
   - Replaced jargon with "Expedition Log" column and plain English copy ("Runs in your browser", "No backend required").
9. **Asset Prompts:**
   - Created `stages/02-design/output/visual-pass-assets.json` with structured prompts for Inversion Gateway, Vault Medallion, and Cartography Mat.

### Verification Matrix:
- `npm run test`: 6/6 tests passing (Vitest).
- `npm run build`: 0 errors, 0 warnings (tsc + vite build in 500ms).
- `npx playwright test`: 4/4 tests passing across desktop and mobile.
- Fresh screenshots captured:
  - `stages/04-build/output/screenshots/01-hero-white-fade.png`
  - `stages/04-build/output/screenshots/02-hero-encrypt-expand.png`
  - `stages/04-build/output/screenshots/03-hero-decrypt.png`
  - `stages/04-build/output/screenshots/04-about-abcd.png`
  - `stages/04-build/output/screenshots/05-encrypt-cards.png`
  - `stages/04-build/output/screenshots/06-decrypt-cards.png`
  - `stages/04-build/output/screenshots/07-mobile-hero.png`
  - `stages/04-build/output/screenshots/08-island-footer.png`
- Knowledge Graph: `graphify update .` completed.

---

## 2026-10-18 – Mascot + Woodboard Wire-up & Moat Follow-up (Tasks 41–58 Complete)

### Status: Complete & Verified
- Total Moat Tasks: 58 | Done: 58 | To Do: 0 | Doing: 0

### Implemented Enhancements:
1. **Asset WebP Conversion (Mascot Task A):**
   - Converted `06-mascot.png` → `public/images/mascot-enigma.webp` (84KB, transparent RGBA).
   - Converted `07-woodboard.png` → `public/images/woodboard-workbench.webp` (315KB, transparent RGBA).
2. **Mascot Companion (Mascot Task B):**
   - Integrated `mascot-enigma.webp` in `StepCards.tsx` beside "The Sunlit Passage" header.
   - Size: 144px desktop, 96px mobile, idle bobbing animation respecting reduced-motion.
3. **Woodboard Plaque with Real Button (Mascot Task C & Tasks 53, 54, 55):**
   - Wired `woodboard-workbench.webp` into `TryAgain.tsx`.
   - Removed duplicate floating badges and headlines; text is carried by the painted board.
   - Positioned real, keyboard-accessible "Try Cipher" brass button in the empty lower third band (`bottom-[16%]`).
4. **Nav Icon & Subtitle Clean-up (Tasks 41 & 42):**
   - Removed background box, border, and shadow on nav icon (`h-10 w-10 sm:h-11 sm:w-11 object-contain`).
   - Removed `Invertible Grid Cipher` subtitle under `ENIGMA ISLE`.
5. **Section 2 Brown Wood Background & Clean Table (Tasks 43 & 44):**
   - Applied warm brown wood grain pattern (`#4A3528`) across Section 2.
   - Removed outer border and card background on `#table`.
6. **Hero 110dvh & Bottom Color Match (Tasks 45 & 48):**
   - Set `#workbench` height to `min-h-[110dvh]` with bottom 10% bleed into Section 2.
   - Matched bottom curve transition SVG color to Section 2 brown wood (`#4A3528`).
7. **Parchment Watermark & Header Clean-up (Tasks 46 & 47):**
   - Removed compass/cross watermark and "Reference Matrix" badge from `AbcdTable.tsx`.
8. **Taller Strata & Parchment Result (Tasks 49, 50, 51):**
   - Result strata expanded to `110dvh` with layered rocks/sediment texture overlay.
   - Removed top status bar floating above the result card.
   - Styled result container with authentic `parchment-paper` border.
9. **Steps Modal Fold Softening (Task 52):**
   - Reduced conic gradient dark fold shadow opacity to `0.06` in `src/index.css`.
10. **Single Visible Input Control with Hover Dropdown (Task 56):**
    - Only ONE button (Encrypt or Decrypt) visible in the input bar at a time.
    - Hover dropdown displays alternate option; clicking replaces the active option in the input field without immediately firing.
    - Clicking the active primary button executes the cipher.
11. **Decrypt Card 1 Hop Traversal Polish (Task 57):**
    - Included `K` in the left-2 hop animation sequence (`L → K → O → T → P → U`).
12. **Seamless Section Transitions (Task 58):**
    - Removed hard border lines between the Inversion Gateway and surrounding sections.

### Verification Matrix:
- `npm run test`: 6/6 tests passing (Vitest).
- `npm run build`: 0 errors, 0 warnings (tsc + vite build in 538ms).
- `npx playwright test`: 4/4 tests passing across desktop and mobile.
- Fresh screenshots captured:
  - `stages/04-build/output/screenshots/01-hero-white-fade.png`
  - `stages/04-build/output/screenshots/02-hero-encrypt-expand.png`
  - `stages/04-build/output/screenshots/03-hero-decrypt.png`
  - `stages/04-build/output/screenshots/04-about-abcd.png`
  - `stages/04-build/output/screenshots/05-encrypt-cards.png`
  - `stages/04-build/output/screenshots/06-decrypt-cards.png`
  - `stages/04-build/output/screenshots/07-mobile-hero.png`
  - `stages/04-build/output/screenshots/08-island-footer.png`
- Knowledge Graph: `graphify update .` completed.

---

## 2026-10-18 – Footer Island Wire-up, Seam Refinement & Moat Tasks 59–85 Complete

### Status: Complete & Verified
- Total Moat Tasks: 85 | Done: 85 | To Do: 0 | Doing: 0

### Implemented Enhancements:
1. **Footer Island Artwork (Part A & Tasks 19–22 / Moat 7f8589a2, 54fe59f1, 99fcc6b7, 24d36d0d):**
   - Converted `11-footer.jpeg` → `public/images/footer-island.webp` (249KB).
   - Wired `footer-island.webp` as the atmospheric background landscape plate in `Footer.tsx`.
   - Seamless blend at `#EAE0CA` into TryAgain CTA above; removed harsh top border and obsolete SVG cream wave hack.
   - White/cream text sits strictly on the dark lower band of the island plate.
   - Removed subtitle `Invertible Grid Permutation Cipher` and bottom chip clutter.
   - Deleted master `11-footer.jpeg` after verification.
2. **WebP Conversions & Cleanup (Part B):**
   - Converted `08-treasture.png` → `public/images/treasure-chest.webp` (301KB).
   - Deleted masters: `06-mascot.png`, `07-woodboard.png`, `08-treasture.png`.
   - Updated `index.html` favicon to `/images/nav-icon.webp`.
3. **Hero & Section 1→2 Seam Refinement (Tasks 1, 2, 23, 24 / Moat 08057cc0, 87dcbc94, fe37de9a, 1ecdf2f0):**
   - Wave curve cut placed on section 1 image with `#3E2A22` fill matching Section 2 dirt.
   - Result expansion background set to `#3E2A22`, eliminating any seam gap when expanded.
4. **Section 2 Soil & Rock Texture (Task 3 / Moat 12e762c3):**
   - Removed artificial grid repeating lines from `AboutSection.tsx`.
   - Replaced with rich organic soil & embedded rock/pebble radial gradients over `#3E2A22`.
5. **StepCards Layout & Copy Simplification (Tasks 4–18):**
   - Mascot made static (removed bobbing), positioned on left side closer to edge and first card.
   - Simplified titles to "How Encryption Works" and "How Decryption Works".
   - Removed redundant middle Inversion Gateway section (already covered by decrypt section).
   - Removed cycle wrap, cycle steps, shift down, vector hop, and modular recovery clutter spans.
6. **Result Card Polish (Tasks 25 & 26 / Moat 1bda116e, 52efbcb9):**
   - Removed `Result` span.
   - Changed Eye SVG icon to black (`text-ink`).
7. **Prompt & Doc Cleanup (Part D):**
   - Deleted spent builder docs: `BUILDER-VISUAL-PASS.md`, `BUILDER-MOAT-WAVE3.md`, `BUILDER-MASCOT-WOODBOARD.md`, `BUILDER-MOAT-FOLLOWUP.md`, `BUILDER-GEMINI-ISLAND-PASS.md`.
   - Deleted spent asset prompt JSON files.
   - Preserved core docs and `BUILDER-ANTIGRAVITY-FOOTER-MOAT.md`.

### Verification Matrix:
- `npm run test`: 6/6 tests passing (Vitest).
- `npm run build`: 0 errors, 0 warnings (tsc + vite build in 471ms).
- `npx playwright test`: 4/4 tests passing across desktop and mobile.
- Fresh screenshots captured:
  - `stages/04-build/output/screenshots/01-hero-white-fade.png`
  - `stages/04-build/output/screenshots/02-hero-encrypt-expand.png`
  - `stages/04-build/output/screenshots/03-hero-decrypt.png`
  - `stages/04-build/output/screenshots/04-about-abcd.png`
  - `stages/04-build/output/screenshots/05-encrypt-cards.png`
  - `stages/04-build/output/screenshots/06-decrypt-cards.png`
  - `stages/04-build/output/screenshots/07-mobile-hero.png`
  - `stages/04-build/output/screenshots/08-island-footer.png`
- Knowledge Graph: `graphify update .` completed (4,712 nodes, 5,926 edges, 353 communities).




