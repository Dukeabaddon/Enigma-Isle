<div align="center">

<p>
  <img src="docs/assets/enigma-isle-banner.webp" alt="Enigma Isle — tropical cipher adventure landing" width="100%" />
</p>

# Enigma Isle

### One-page island scroll site with a client-side invertible cipher (letters + digits).

**Encrypt and decrypt in the browser** — painted hero, teaching cards, ABCD table, and step-by-step modal. No backend.

[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

[Features](#features) · [Page map](#page-map) · [Decisions](#design-decisions) · [Quick start](#quick-start) · [Cipher](#cipher) · [Deploy](#deploy) · [FAQ](#faq)

<br/>

<code>git clone &lt;this-repo&gt; && cd Enigma-Isle && npm install && npm run dev</code>

</div>

---

> [!IMPORTANT]
> **Educational demo, not production crypto.** The cipher is a **bijective teaching permutation** (5-column grid + fixed moves) so encrypt and decrypt round-trip in the UI. It is **not** vetted for secrecy, keys, or threat models.

---

## Features

| Area | What you get |
|------|----------------|
| **Hero workbench** | Single input, ⇅ mode switch, gold **Encrypt** / green **Decrypt**, island WebP hero (`100dvh` on mobile), result panel with parchment output |
| **Cipher engine** | Pure TS in `src/lib/cipher/` — **A–Z** letter pipeline + **0–9** on a 2×5 grid; spaces kept; other symbols stripped |
| **About** | 5-column ABCD table + 2×5 number grid (`#table`) on underground soil styling |
| **Journey** | “How Encryption Works” / “How Decryption Works” step cards with live mini-grids |
| **Close** | Mist horizon, parchment “Ready to try?” CTA, island footer art |
| **Quality** | Vitest (`npm test`) · Playwright at **1280px** and **390px** (`npm run test:e2e`) |
| **Motion** | Framer Motion; respects `prefers-reduced-motion` |
| **Assets** | Shipped art is **WebP** (and SVG for birds) under `public/images/` |

---

## Page map

| Anchor | Section |
|--------|---------|
| `#workbench` | Hero + cipher input / result |
| `#about-cipher` | Invertible cipher intro |
| `#table` | ABCD + number grids |
| `#encrypt-journey` | Encryption step cards |
| `#decrypt-journey` | Decryption step cards |
| `#decrypt-close-bridge` | Mist + try-again parchment |
| Footer | Links back to workbench, table, journeys |

---

## Design decisions

Locked choices reflected in the codebase (summary for contributors):

| Topic | Decision |
|-------|----------|
| **Runtime** | Vite 8, React 19, TypeScript 7, Tailwind CSS 4, Framer Motion — **all cipher logic client-side** |
| **Cipher goal** | **Invertible** demo (encrypt ↔ decrypt), not a one-way hash |
| **Letters** | 5-column grid; step 1–2 cyclic walk with step count **value × 18**; step 3 **column down 13×** (mod column length); step 4 finisher **up → left → up → right×2** with documented Z/wrap rules |
| **Digits** | Separate **2×5** grid; encrypt **right then down**; decrypt **up then left** (no letter walk / column shift) |
| **Decrypt walk inverse** | Modular inverse **(11×index + 10) mod 26** — not “walk back 18 steps” (see [cipher spec](docs/cipher-spec.md)) |
| **Hero layout** | Painted island art; plate tint `#f2ebd9`; **no CSS wave clip** on hero; rounded bottom corners; mobile hero **cover + 100dvh** |
| **Seams** | Underground fill `#342319` + tiled soil between hero/about/result; cream sand band before footer island |
| **Brand UI** | Encrypt **gold** (`#D4A017`), decrypt **green** (`#2F8F6B`); display type **Space Grotesk**; hero title **Lilita One** |
| **Close CTA** | Parchment panel on mist (not wood); **font-display** on “Ready to try?” |
| **Deploy** | Static `dist/` on **Vercel**; SPA fallback via `vercel.json` |

---

## Quick start

**Requirements:** Node.js 20+, npm 10+

```bash
git clone https://github.com/Dukeabaddon/Enigma-Isle.git
cd Enigma-Isle
npm install
npm run dev          # http://localhost:5173
```

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc` + production bundle → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm test` | Vitest — cipher unit tests |
| `npm run test:e2e` | Playwright — desktop + mobile projects |

```bash
npx playwright install   # first time only
```

---

## Stack

| Layer | Choice |
|-------|--------|
| Build | [Vite](https://vitejs.dev) 8 |
| UI | [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org) 7 |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 (`@theme` tokens in `src/index.css`) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide](https://lucide.dev) React |
| Tests | [Vitest](https://vitest.dev) · [Playwright](https://playwright.dev) |

---

## Project structure

```
enigma/
├── docs/
│   ├── assets/            README banner (SVG + WebP)
│   ├── cipher-spec.md     Full algorithm
│   └── test-vectors.json  HELLO, SWORD, etc.
├── public/images/         WebP / SVG art
├── e2e/                   Playwright specs
└── src/
    ├── components/        layout, hero, about, journey, close
    ├── hooks/             useCipher, reduced motion
    └── lib/cipher/        encrypt, decrypt, grid, digits, tests
```

---

## Cipher

Full write-up: **[docs/cipher-spec.md](docs/cipher-spec.md)**

**Input:** `A–Z`, `0–9`, spaces preserved; punctuation stripped; lowercase → uppercase for letters.

**Letters (per character):**

1. **Walk** — from letter value `v` (A=1…Z=26), move right **`v × 18`** on the A–Z cycle (bijective mod 26).
2. **Column shift** — move **down 13×** within the letter’s column (length 6 or 5), wrapping.
3. **Finisher** — `up 1 → left 1 → up 1 → right 2` on the teaching grid (inverse on decrypt).

**Digits:** on grid `0–4` / `5–9`, encrypt = right then down; decrypt = up then left.

**Regression vectors:** [docs/test-vectors.json](docs/test-vectors.json) — e.g. `HELLO` → `CZUUA`, `SWORD` → `DQAJE`.

```bash
npm test
```

---

## Deploy

```bash
npm run build
```

| Vercel | Value |
|--------|--------|
| Framework | Vite |
| Output | `dist` |
| Build | `npm run build` |
| Env vars | None required |

Cipher runs entirely in the browser.

---

## FAQ

<details>
<summary><b>Does my text leave the browser?</b></summary>
<br/>
No. Only static assets are served; <code>src/lib/cipher/</code> runs locally in the tab.
</details>

<details>
<summary><b>Why “invertible” instead of “secure”?</b></summary>
<br/>
The site teaches a reversible grid story for class demos. Modern crypto goals (keys, entropy, attacks) are out of scope.
</details>

<details>
<summary><b>Why WebP in the README banner?</b></summary>
<br/>
GitHub’s image proxy handles WebP reliably; SVG source is at <code>docs/assets/enigma-isle-banner.svg</code>.
</details>

---

<div align="center">

**Enigma Isle** — teachable cipher · island scroll · client-side only.

</div>
