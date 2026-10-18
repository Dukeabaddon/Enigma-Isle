# Executor brief — S3/S4 silent motion (Gemini + subagents)

**Audience:** Build executor (executor may use **Gemini** with subagent spawns).  
**When:** Stage `04-build` only — not during grill/design.  
**ICM:** Read `CONTEXT.md` → `shared/grill-summary.md` → this file → `stages/02-design/output/s3-encrypt-journey.md`.

## Goal

Ship **4 silent looping visuals** for Encrypt cards (+ mirror set for Decrypt later).  
Look: polished graphic motion (2026 JS-capable). Ref energy: https://youtu.be/AsvN_feasyY  
UI shell: Cursor-style cards (`s3-cursor-cards-ref.png`).

## Allowed tech (pick cheapest that looks good)

| Priority | Approach | Notes |
|----------|----------|-------|
| 1 | **CSS + SVG / Framer Motion** loops | Fastest; no video pipeline |
| 2 | **Canvas / rAF** mini scenes | Good for grid hops |
| 3 | **Remotion** → export muted WebM/MP4 | JS composition → video file |
| 4 | **AI video** placeholder → replace | OK temp; swap refined |

**Mentor default:** Try (1)/(2) first. Use Remotion if Gemini/subagents already fluent and time allows. Do not block landing on Remotion setup.

## Remotion path (if used)

1. Subagent: scaffold Remotion composition(s) under e.g. `motion/` or `remotion/`
2. One composition per step (or one with `step` prop)
3. Export **muted** loopable WebM (or MP4)
4. Drop into `public/motion/encrypt-1.webm` … `encrypt-4.webm`
5. React: `<video muted loop playsInline autoPlay />` in card media well
6. `prefers-reduced-motion: reduce` → show poster PNG

## Gemini / subagent split (suggested)

| Subagent | Task |
|----------|------|
| Explore | Find card component patterns in repo once Vite app exists |
| Implementer A | Card shell UI (Tailwind) matching S3 spec |
| Implementer B | Motion assets (CSS or Remotion exports) |
| Implementer C | Wire videos + a11y reduced-motion |

Orchestrator verifies: silent, loops, 4 steps match cipher docs in `stages/03-cipher-spec/`.

## Do not

- Autoplay with sound
- New route per step
- Block hero cipher on video load (lazy / poster first)
- Invent lore copy in cards

## Acceptance

- [ ] 4 encrypt cards, horizontal on desktop
- [ ] Each has silent loop or equivalent Framer loop
- [ ] Reduced-motion safe
- [ ] Steps match locked cipher (Q8–Q14)
- [ ] Placeholders OK if labeled for replace
