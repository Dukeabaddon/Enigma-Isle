# 001 — Stack: Vite + React + TypeScript + Tailwind + Framer Motion

**Status:** Accepted  
**Date:** 2026-10-17  
**Question:** Q3=A

## Context

College final needs a beautiful one-page site with client-side cipher demo. Prof rubric secondary to standout UI.

## Decision

- **Vite** for dev/build
- **React + TypeScript** for UI
- **Tailwind CSS** for styling
- **Framer Motion** for hero and scroll motion
- Cipher logic in **pure TypeScript**, runs **entirely client-side** (no server crypto)

## Consequences

- Static hosting friendly (Vercel/Netlify/Pages once Q10 locked)
- No default Python/Flask unless course mandates
- Stage `04-build` scaffolds from this stack

## Alternatives rejected

- Streamlit / plain HTML — insufficient visual ceiling for SnapTrips-like goal
