# Builder — Antigravity Footer + Moat (AUTHORITATIVE)

**Skip:** how-it-works soft-3D island chamber cards / card vignette redesign.  
**Footer master:** `public/images/11-footer.jpeg`  
**Moat truth at write:** Total **84** · Done **58** · **To do 26**  
Re-read `.moat/moat-tasks-detail.json` before you stop.

Copy everything under **PROMPT** into Antigravity.

---

## PROMPT

```
ROLE
You are a principal frontend engineer with 15+ years shipping production
marketing sites and design systems. You think before you act: inspect the
repo, read Drawbridge screenshots, plan the seam/layout, then implement
cleanly. You are NOT a junior who paints over problems or leaves Moat lying.

REPO
/Users/macbookair/Projects/enigma
Dev: http://127.0.0.1:5173/
Stack: Vite + React + TypeScript + Tailwind + Framer Motion
Moat truth: .moat/moat-tasks-detail.json (+ .moat/moat-tasks.md)
Screenshots: ./screenshots/… → .moat/screenshots/…

MINDSET (required)
1) Plan first — section seams, asset sizes, a11y, mobile.
2) Verify in the running UI after each meaningful change.
3) Sync Drawbridge status every time (to do → doing → done).
4) Prefer durable CSS/structure over hacks.
5) When unsure, open the screenshot + selector — do not guess.

HARD LOCKS
1) Cipher logic / tests / invertibility — UNTOUCHED.
2) Keep Aaron hero WebPs: nav-icon, hero-island, hero-dirt, hero-island-mobile.
3) Q6=D: clear English. No pirate lore walls.
4) SKIP how-it-works creative island-chamber card art
   (no card-island-sunstone/tidal generation or card redesign from that brief).
   Still DO Moat copy/remove/simplify tasks on StepCards if open.
5) Production images: convert to .webp, rewire, then DELETE unused originals.

════════════════════════════════════════
A — FOOTER ISLAND (priority)
════════════════════════════════════════
Source (already on disk): public/images/11-footer.jpeg

1) Convert → public/images/footer-island.webp
2) Wire into src/components/layout/Footer.tsx as the island silhouette / landscape.
3) Seam with section ABOVE (TryAgain CTA):
   - TryAgain ends on warm sand cream #EAE0CA
     (gradient from-[#EDF5F1] via-[#F4EBD9] to-[#EAE0CA])
   - Footer art sky is already #EAE0CA — join must be seamless
   - REMOVE hard border-t / harsh divider (Moat 7f8589a2)
   - Remove obsolete SVG cream wave hack if the jpeg already provides the top silhouette
4) White/cream text only on the dark lower band of the art.
5) Moat cleanup in footer:
   - 7f8589a2 island silhouette + smooth transition
   - 54fe59f1 / 99fcc6b7 / 24d36d0d remove jargon chips / marked bits
6) After webp wired and verified → DELETE public/images/11-footer.jpeg

════════════════════════════════════════
B — WEBP CONVERSION + FILE CLEANUP
════════════════════════════════════════
Convert + wire where still needed, then delete masters if unreferenced:

| Source | WebP target | Notes |
|--------|-------------|-------|
| 11-footer.jpeg | footer-island.webp | REQUIRED this pass |
| 08-treasture.png (if present) | treasure-chest.webp | wire small accent OR skip place if Moat never asked — still convert+cleanup if file exists |
| 06-mascot.png | mascot-enigma.webp may already exist | delete png if unused |
| 07-woodboard.png | woodboard-workbench.webp may already exist | delete png if unused |

Rules:
- Grep src/ + index.html before deleting any image.
- ALL production <img>/css urls under public/images should be .webp
  (except if a format is truly required — prefer webp).
- Delete orphan png/jpeg/avif no longer referenced
  (dirt-strata.png, island.png, parchment*.png/avif, scroll-map.png, etc. IF unused).
- Leave public/images/candidates/ alone unless clearly dead.

Favicon:
- index.html must use /images/nav-icon.webp (not /vite.svg).

════════════════════════════════════════
C — DRAWBRIDGE / MOAT (all open — think + act)
════════════════════════════════════════
Current open count ~26. Re-read JSON (Aaron adds notes).

For EACH "to do":
1) Read comment + screenshot
2) Decide: already satisfied? → status sync only to done
3) Else implement carefully, then mark done in BOTH
   moat-tasks-detail.json AND moat-tasks.md
4) Lifecycle: to do → doing → done (batch per Drawbridge rules)

Open IDs at prompt write (verify live):
08057cc0  wave/cut inside section1 image (result expand)
87dcbc94  brown same as section 2
12e762c3  remove grid on S2 bg; rocks/dirt
a4bd70cc  mascot left, bigger, STILL (no float)
70f45c9e  remove
cdd06082  simplify encrypt H2 → "How encryption works" / "How it works"
bfcac8c7 4dfd1307 859ad145 a4229ff9  remove micro labels
8ca19acb  remove
dddaf323  simplify decrypt kids copy
193d68e3  remove
30d4a66c  REMOVE Inversion Gateway section (decrypt exists below)
207e110f  simplify → how to decrypt
e2378cfe 33cf391b 4a9c05f5  remove
7f8589a2  footer island + no hard line (Part A)
54fe59f1 99fcc6b7 24d36d0d  footer removes
fe37de9a  plan+fix S1 result expand smoothness / curve in image
1ecdf2f0  plan+fix gap between S1 result and S2
1bda116e  remove "Result" span marked
52efbcb9  make marked SVG black

For fe37de9a / 1ecdf2f0: write a short plan in your reply, then implement
the best clean seam (brown match, curve in image, no ugly gap).

SKIP: generating/wiring soft-3D how-it-works chamber card island assets.

════════════════════════════════════════
D — ONE-TIME PROMPT CLEANUP (end)
════════════════════════════════════════
After ship, delete spent one-time builder docs if superseded:
- docs/prompts/BUILDER-VISUAL-PASS.md
- docs/prompts/BUILDER-MOAT-WAVE3.md
- docs/prompts/BUILDER-MASCOT-WOODBOARD.md
- docs/prompts/BUILDER-MOAT-FOLLOWUP.md
- docs/prompts/BUILDER-GEMINI-ISLAND-PASS.md
KEEP this file OR a short BUILDER-CURRENT.md.
Delete spent asset JSON only if assets already exist as webp and prompts unused:
  mascot-prompt.json, wood-sign-cta-prompt.json,
  woodboard-workbench-copy-prompt.json, nav-icon-prompt.json,
  treasure-chest-prompt.json, island-chamber-card-prompt.json (skipped cards)
KEEP footer-island-silhouette-prompt.json only if still useful; else delete
after 11-footer is converted.
Do NOT delete CONTEXT.md, grill-summary, brainstorms/, tokens, vision.

════════════════════════════════════════
DONE MEANS
════════════════════════════════════════
- [ ] footer-island.webp live; seamless with #EAE0CA CTA; no hard top line
- [ ] 11-footer.jpeg deleted after wire
- [ ] Favicon = nav-icon.webp
- [ ] Webp-only for wired production images; orphans deleted (grep-safe)
- [ ] Moat open queue cleared OR remaining IDs listed with honest reasons
- [ ] JSON + moat-tasks.md synced
- [ ] Spent one-time prompts cleaned
- [ ] npm run build green
- [ ] graphify update .
- [ ] Short note in Obsidian Build Log:
      /Users/macbookair/Documents/Dev_Vault/10_Projects/Enigma/docs/Build Log.md
- [ ] Final report: plan summary, files changed/deleted, Moat before→after counts

OUT OF SCOPE
- Soft-3D how-it-works card island art
- Hero concept rebuild
- Cipher math changes
- Fake “all Moat done” without JSON proof
```

## End
