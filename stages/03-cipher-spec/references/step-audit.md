# Cipher step audit (diagrams)

**Refs:** `encrypt-1.png` … `encrypt-4.png`  
**Goal:** Explain issues without rewriting the story.

## Your 4 encrypt steps (as drawn)

| # | Instruction | Example spirit |
|---|-------------|----------------|
| 1 | Letter → number (A=1…Z=26); ×18 | S=19 → 19×18=342 |
| 2 | Shift **right** by that total | From letter cell, move right 342 (with wrap) |
| 3 | Shift **down 13×** in column | +13 mod column length |
| 4 | up1 → left1 → up1 → right2 | Finisher path |

**Decrypt** = reverse order + inverse moves (left↔right, up↔down, ÷ or inverse of ×18).

## What’s NOT wrong

- Step story is clear for a college “how it works” page.
- ABCD 5-column table with Z under col1 is fine.
- Showing SWORD as a **teaching** example in S3 is fine (not in hero).

## What is rough / risky

### 1) ×18 — clarified (Q8b)

**the model (correct intent):**
- B → 2 → `2×18=36`
- From **B**, walk right 36 times: B→C→D→E→F→… → landing letter
- 36 is a **step count**, not a new letter code.

**Old worry was a different model** (“new letter = 18n mod 26”). That model can collide. **Yours may not.**

If right-walk is on a **26-letter cycle** (after Z → A; after E → F):
- Rough form: from index `n`, land at about `n + 18n` wrapped → factor **19** vs 26 (`gcd(19,26)=1`) → often **invertible**.
- Still prove letter-by-letter in stage 03.

**LOCKED (Q8c=A):** wrap = full A–Z cycle. After E → F. After Z → A.

### 2) Step 3 “down 13×” — wrap locked (updated 2026-10-19)

- Down moves **inside same column only**; wrap top↔bottom in that column.
- Count = **13** (`COLUMN_SHIFT` in `src/lib/cipher/grid.ts`).
- Col A (len 6): $13 \equiv 1 \pmod 6$ → always moves one slot.
- Cols B–E (len 5): $13 \equiv 3 \pmod 5$ → moves three slots (not identity).
- Decrypt uses up 13 (exact inverse).

### 3) Typo in Step 3 note

- Text says other columns have **4** rows.
- Grid shows **5** (B…Y). Trust the grid: col1=6, others=5.

### 4) Wrap rules

| Step | Horizontal | Vertical |
|------|------------|----------|
| **2** | Full A–Z cycle (E→F, Z→A) | n/a (linear walk) |
| **3** | n/a | Same column only |
| **4** | **Same row** wrap (P←→T) | **Same column** (U↔P) |

**Worked example:** U → up P → left T → up O → right×2 L  
Ref: `encrypt-4-example-U.png`

**Z left/right (Q11=A):** stay on Z.  
**Top-row up (Q12=A):** wrap to column bottom — A→Z, B→V, C→W, D→X, E→Y.

### Charset (Q13=C)

- User may type anything.
- Pipeline **ignores** numbers, spaces, special characters.
- Only letters participate in encrypt/decrypt.
- **Case (Q14=B):** a≡A; output always **UPPER**.
- **I/O:** Fixed rules → **one** encrypt output string; decrypt → **one** if map is 1:1 (stage 03 prove). Not a Caesar “pick shift 1–25” UI.

## How many steps to show on the site

| Place | Count | What |
|-------|-------|------|
| **S3 How it works (encrypt)** | **4** | Encrypt 1–4 + ABCD table intro |
| **S4 Decrypt** | **4** | Inverse of 4→3→2→1 |
| Optional intro strip | 1 | “We use this letter table” (not a 5th encrypt step) |
| **Total teaching beats** | **8** (+ table) | Not 18 micro-steps |

Do **not** split Step 4’s four moves into four separate scroll sections — one card “Encrypt 4” with sub-bullets.

## Recommendation (mentor)

- Keep **4 + 4** on the page.
- Prefer **same steps**, fix only: (a) wrap rules written, (b) ×18→coprime if decrypt must be unique, (c) note Step 3 identity on 5-cols.
