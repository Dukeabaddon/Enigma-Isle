# Delegate plan — grill + build

Plan-only workspace. **No app code** until stage `04-build` is delegated.

## Remaining grill (Aaron)

| Topic | Question |
|-------|----------|
| ~~**Name / theme**~~ | **Done Q4:** Enigma Isle + island explorer |
| ~~**Palette hex**~~ | **Q24=A** — `stages/02-design/output/tokens.md` |
| ~~**Sections / S1–S3**~~ | Map + S1 workbench + S3 cards locked — see brainstorm |
| ~~**How-it-works motion**~~ | **Q20=B** Cursor cards + silent loops; see executor brief |
| ~~**S4 Decrypt**~~ | **Q21=A** mirror 4 cards + green + loops |
| ~~**S5 / footer**~~ | **Q22=A** try-again CTA; thin footer |
| ~~**Charset**~~ | **Q13=C** ignore non-letters; **Q14=B** upper out |
| ~~**Hosting**~~ | **Q23=A Vercel** |

Use `setup/questionnaire.md` (Q4–Q10) when grilling.

## Completed grill

- Q1 success metric, Q2=B invertible cipher, Q3=A stack, hero yellow/green UX.

## Later delegate tasks (after grill)

### Stage 01-discovery

- [ ] Export requirements brief to `stages/01-discovery/output/requirements.md` when open Qs closed or explicitly deferred.

### Stage 02-design

- [ ] Section map + wireframes in `stages/02-design/output/`
- [x] Fill `design-system/CONTEXT.md` palette/fonts (Q24)

### Stage 03-cipher-spec

- [ ] `output/cipher-spec.md` + `test-vectors.json` (SWORD round-trip)
- [ ] Resolve grid column row-count flag from brainstorm

### Stage 04-build

**Executor prompt (only):** `docs/prompts/BUILDER-VISUAL-PASS.md`  
Old `docs/prompts/0*.md` removed 2026-10-18.

- [ ] `npm create vite@latest` — React + TS
- [ ] Tailwind + **shadcn/ui** + **Lucide** + Framer Motion
- [ ] `src/lib/cipher/` pure functions + Vitest
- [ ] One-page sections + white→island→dirt S1 expand
- [ ] Hero wired to encrypt/decrypt
- [ ] **S3 motion:** `stages/04-build/references/executor-motion-video.md`
- [ ] Playwright e2e + screenshots → `stages/04-build/output/screenshots/`
- [ ] `graphify update .` after first code
- [ ] Vercel preview

### Stage 05-polish

- [ ] Reduced motion, a11y, perf pass
- [ ] Deploy per hosting decision

## Agent notes

- `brainstorms/2026-10-17-college-cipher-landing.md` — do not delete; do not overwrite.
- Obsidian mirror: `10_Projects/Enigma/` (Local REST API).
- Executor motion: `stages/04-build/references/executor-motion-video.md` + Obsidian `docs/S3 Motion Executor.md`.
- Run `graphify update .` after first code landing.
- **No app code** until Aaron explicitly starts stage 04-build.
