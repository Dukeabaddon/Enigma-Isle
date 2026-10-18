# Architecture plan (short)

One-page **React** app; no backend. Cipher is a pure TS module imported by the hero demo and teaching sections.

## Layers

```
┌─────────────────────────────────────────┐
│  App (sections, scroll, Framer Motion)   │
├─────────────────────────────────────────┤
│  HeroCipher UI (input, yellow/green key) │
├─────────────────────────────────────────┤
│  cipher/ (encrypt, decrypt, grid utils)  │
└─────────────────────────────────────────┘
```

## Data flow

1. User text + mode (encrypt | decrypt) + optional key params (TBD in spec).
2. `cipher` returns result string + optional step trace for teaching UI.
3. No network calls for crypto.

## Suggested `src/` layout (build phase)

| Path | Role |
|------|------|
| `src/lib/cipher/` | Grid, steps, invertible math |
| `src/lib/cipher/__tests__/` | Vectors from stage 03 |
| `src/components/HeroCipher.tsx` | Wide input + dual keys |
| `src/components/sections/` | How-it-works, encrypt/decrypt walkthrough |
| `src/components/ScrollScene.tsx` | Parallax / landscape layers |

## Static assets

Scroll art (Q8) → `public/` or inline SVG components depending on grill answer.

## Build & deploy

- `vite build` → static `dist/`
- Host on choice from Q10; env vars likely none (client-only).

## Dependencies (when scaffolded)

- `react`, `react-dom`, `typescript`, `vite`
- `tailwindcss`, `postcss`, `autoprefixer`
- `framer-motion`

No `package.json` until stage `04-build`.
