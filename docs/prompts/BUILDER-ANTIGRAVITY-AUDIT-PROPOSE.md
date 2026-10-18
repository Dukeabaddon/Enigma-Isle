# Builder — Antigravity AUDIT + PROPOSE ONLY (AUTHORITATIVE)

**Mode:** THINK → VERIFY → PROPOSE. **DO NOT IMPLEMENT. DO NOT EDIT CODE.**  
**Aaron feedback:** prior pass was incomplete / dishonest vs the task list.

Copy the PROMPT into Antigravity.

---

## PROMPT

```
ROLE
You are a principal frontend engineer (15+ years). Your last Enigma pass
was NOT done properly. Aaron still sees missing work (treasure chest not
used, mascot placement wrong/incomplete, footer/wave seams broken, Moat
marked done while UI still fails).

THIS TURN IS AUDIT + PLAN ONLY.
- DO NOT write code.
- DO NOT edit files.
- DO NOT mark Moat tasks done.
- DO NOT run destructive cleanup.
- THINK first. Then PROPOSE. Stop and wait for Aaron approval.

REPO
/Users/macbookair/Projects/enigma
Dev: http://127.0.0.1:5173/
Moat: .moat/moat-tasks-detail.json + .moat/moat-tasks.md
Screenshots: .moat/screenshots/…

SPAWN SUBAGENTS (required)
Spawn parallel explore/verify subagents. Do not do everything alone.

Suggested subagents:
1) MOAT-AUDITOR — every task status vs live UI + screenshot; find false "done"
2) ASSET-AUDITOR — public/images: webp wired? orphans? treasure-chest usage?
3) SEAM-AUDITOR — hero dirt/wave mask, S1→S2 gap, encrypt↔decrypt transition, footer bg
4) UX-AUDITOR — mascot position, encrypt/decrypt dropdown close, scroll-to-result

Each subagent returns evidence: file path + line OR screenshot ID + what’s wrong.
You integrate into one report. No coding.

KNOWN FAILURES (orchestrator spot-check — verify, do not dismiss)
A) treasure-chest.webp EXISTS at public/images/treasure-chest.webp
   but src/ has ZERO references — never wired next to woodboard/CTA.
B) TryAgain.tsx only has woodboard + button — no chest.
C) Mascot in StepCards is in a flex header; Moat a4bd70cc asked:
   left side, bigger, close to edge AND first card, STILL (no float).
   Confirm if placement actually matches screenshot intent on desktop+mobile.
D) Footer: new Moat ed3f6342 says footer must be SOLID color matching image
   (not transparent). 6b0b1600 / ac5fd4b6 wave MASK still open.
E) Orphan assets may still exist (dirt-strata.png, parchment.png, island.png,
   scroll-map.png, parchment-border.*, candidates/) — cleanup incomplete.
F) Open Moat right now (re-count yourself): ~7 "to do" including
   ed3f6342, 6b0b1600, fab8251a, f9daf886, 5675e5b3, fe139c33, ac5fd4b6
   PLUS re-open any false "done" you prove wrong.

HARD LOCKS (for the future plan — not for this turn)
- Cipher math untouched
- Aaron hero webps stay
- Q6=D clear English

════════════════════════════════════════
PHASE 1 — THINK (write this first in your reply)
════════════════════════════════════════
Before any deep dive, write:
1) What you believe you shipped last time
2) What Aaron says is missing
3) How you will verify (tools, screenshots, grep, browser)
4) Which subagents you will spawn and why
Then spawn them.

════════════════════════════════════════
PHASE 2 — VERIFY FULL TASKLIST
════════════════════════════════════════
For EVERY Moat task (all 90+), build a table:

| # | ID | Status in JSON | Actually satisfied? | Evidence | Action needed |
|---|----|----------------|---------------------|----------|---------------|
| … | … | done/to do | YES / NO / PARTIAL | path or screenshot | keep / reopen / implement |

Rules:
- Read the comment + screenshot for each.
- "done" with broken UI → mark Action = REOPEN (propose status → to do).
- PARTIAL = list what’s missing.
- Pay special attention to: treasure chest, mascot, footer, wave/mask,
  S1 result expand seams, encrypt/decrypt UX, cleanup/webp.

Also verify prior prompt requirements:
- Favicon = nav-icon.webp
- Footer uses footer-island.webp correctly (solid seam #EAE0CA / solid footer bg)
- Webp-only production refs; orphans listed
- Spent one-time prompts cleaned or still present

════════════════════════════════════════
PHASE 3 — PROPOSE ONLY (no execution)
════════════════════════════════════════
Deliver a numbered IMPLEMENTATION PLAN Aaron can approve/reject:

For each work item:
- Goal
- Files to touch
- Approach (1–3 sentences)
- Moat IDs closed by it
- Risk / a11y note
- Which subagent would own the implement pass later

Group as:
1) P0 blockers (visible broken: footer, wave mask, treasure, mascot)
2) P1 UX (scroll-to-result, dropdown close, section transitions)
3) P2 cleanup (orphans, prompts)
4) Moat status corrections (IDs to reopen)

End with:
- Proposed Moat before→after counts IF plan approved
- Explicit: "WAITING FOR AARON APPROVAL — NOT IMPLEMENTING"

DONE FOR THIS TURN MEANS
- Subagents spawned + their evidence folded in
- Full tasklist verification table
- Clear proposal
- ZERO code changes
- ZERO Moat status flips
```

## End
