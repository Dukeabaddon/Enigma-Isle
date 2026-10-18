# Grill summary — locked decisions

**Updated:** 2026-10-18  
**Full capture:** `brainstorms/2026-10-17-college-cipher-landing.md`  
**ADRs:** `decisions/` · log `.context/decisions.md` · state `.context/state.md`  
**Plan:** `docs/PLAN.md`

## Product

- One-page cipher landing · beauty + working encrypt/decrypt
- Voice: **normal English**; island = **visuals only** (Q6=D)

## Visual / assets (2026-10-18)

- Hero plates: `hero-island.webp` + `hero-island-mobile.webp` (Aaron)
- Seam: art grades to S2 brown `#3c2820` — **no CSS wave clip** → ADR 004
- WebP-only in `public/images/`; delete masters after convert
- Also live: nav-icon, hero-dirt, woodboard, treasure-chest, mascot, footer-island, parchment-border
- Footer: island silhouette; clear English (no jargon chips)
- CTA: woodboard + real Try Cipher button

## Stack

- Vite + React + TS + Tailwind + Framer Motion
- shadcn + Lucide; builders: ui-ux-pro-max
- Cipher: 4-step invertible client TS — do not break
- Host: Vercel

## Next

1. Aaron QA hero seam (desktop + mobile)
2. Moat: process any new notes; honest status sync
3. Stage `05-polish` + Vercel when signed
4. `graphify update .` after structural edits · Obsidian Build Log
