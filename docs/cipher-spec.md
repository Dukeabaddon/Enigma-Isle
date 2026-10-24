# Invertible Cipher Specification — Enigma Isle

**Status:** APPROVED & LOCKED  
**Stage:** 03-cipher-spec  
**Target:** Client-side pure TypeScript (`src/lib/cipher/`)

---

## 1. Pipeline Overview

The cipher operates on letters `A–Z` and digits `0–9`. Whitespace is preserved in place. Punctuation and other symbols are stripped (not encrypted).
Letters: lowercase normalized to uppercase (`a ≡ A`). Digits pass through as `0–9`.

### Digits `0–9` (2×5 grid)

Grid layout:

```
0 1 2 3 4
5 6 7 8 9
```

- **Encrypt:** `moveRight` then `moveDown` (wrap horizontally and vertically).
- **Decrypt:** `moveUp` then `moveLeft` (exact inverse).
- No ×18 walk or column-13 shift for digits.

### Encryption Pipeline (Forward)

For each letter $L_0 \in \{ \text{'A'} \dots \text{'Z'} \}$:
1. **Step 1 & 2 (Right-Walk on Cycle):**
   - Value $v = \text{index}(L_0) + 1 \in \{1 \dots 26\}$ (where $\text{'A'} = 1, \dots, \text{'Z'} = 26$).
   - Step count $k = v \times 18$.
   - Walk right $k$ positions on the 26-letter cyclic alphabet:
     $$a_1 = (a_0 + 18(a_0 + 1)) \pmod{26} = (19a_0 + 18) \pmod{26}$$
     where $a_0 \in \{0 \dots 25\}$.
     Since $\gcd(19, 26) = 1$, this linear transformation is a bijection (permutation).

2. **Step 3 (Column-Down Shift 13×):**
   - Letter is mapped onto the 5-column grid:
     - Col 0: `[A, F, K, P, U, Z]` (length 6)
     - Col 1: `[B, G, L, Q, V]` (length 5)
     - Col 2: `[C, H, M, R, W]` (length 5)
     - Col 3: `[D, I, N, S, X]` (length 5)
     - Col 4: `[E, J, O, T, Y]` (length 5)
   - Shift down by **13** within the column with cyclic wrap ($i \mapsto (i + 13) \bmod L$):
     - For Col 0 ($L=6$): $13 \equiv 1 \pmod 6$ → index $i \mapsto (i + 1) \pmod 6$.
     - For Cols 1–4 ($L=5$): $13 \equiv 3 \pmod 5$ → index $i \mapsto (i + 3) \pmod 5$.
     Both operations are permutations on their respective column sets (no longer identity on B–E).

3. **Step 4 (Grid Finisher Path):**
   - Sequence of moves: `up 1` $\to$ `left 1` $\to$ `up 1` $\to$ `right 2`.
   - Direction rules:
     - **Up 1:** Row $r \mapsto r - 1$. If $r = 0$, wrap to column bottom:
       $\text{A} \mapsto \text{Z}$, $\text{B} \mapsto \text{V}$, $\text{C} \mapsto \text{W}$, $\text{D} \mapsto \text{X}$, $\text{E} \mapsto \text{Y}$.
     - **Left 1:** If character is `Z`, stay on `Z`. Otherwise wrap horizontally within row 0..4 modulo 5.
     - **Right 1:** If character is `Z`, stay on `Z`. Otherwise wrap horizontally within row 0..4 modulo 5.
   - Proved 1:1 bijection on all 26 letters (e.g. worked test: `U` $\to$ `L`).

---

## 2. Decryption Pipeline (Inverse)

Decryption applies the exact inverse operations in reverse order:
1. **Inverse Step 4:**
   - Sequence: `left 2` $\to$ `down 1` $\to$ `right 1` $\to$ `down 1`.
   - **Down 1:** If at column bottom (`Z` $\to$ `A`, `V` $\to$ `B`, `W` $\to$ `C`, `X` $\to$ `D`, `Y` $\to$ `E`), else $r \mapsto r + 1$.
2. **Inverse Step 3:**
   - Shift up **13** in column ($i \mapsto (i - 13) \bmod L$): Col 0 ≡ −1 mod 6; Cols 1–4 ≡ −3 mod 5.
3. **Inverse Step 1 & 2:**
   - Since $19^{-1} \equiv 11 \pmod{26}$:
     $$a_0 = (11a_1 + 10) \pmod{26}$$

---

## 3. Mathematical Verification

Every step is an invertible permutation:
$$\text{Decryption}(\text{Encryption}(c)) = c \quad \forall c \in \{ \text{'A'} \dots \text{'Z'} \}$$
Verified by exhaustive automated checking across all 26 letters.
