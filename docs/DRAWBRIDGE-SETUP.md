# Drawbridge setup — Enigma Isle

**Aaron’s fork (use this):** https://github.com/Dukeabaddon/drawbridge  
**Local clone:** `/Users/macbookair/Downloads/drawbridge-duke`  
**Do not use** `/Users/macbookair/Downloads/drawbridge` for the extension — that folder is still the unstable **breschio** upstream (`package.json` **2.0.0**).

## Versions in this project

| Source | Version / signal |
|--------|------------------|
| Connected Moat in repo | `.moat/config.json` → **`"version": "1.0.0"`** (your extension wrote this) |
| Downloads `drawbridge/` | breschio upstream **2.0.0** — not your fork |
| Downloads `drawbridge-duke/` | **Dukeabaddon/drawbridge** clone |

Load unpacked from:  
`/Users/macbookair/Downloads/drawbridge-duke/chrome-extension/`

## Why localhost kept refreshing (fixed)

**Trigger:** Comment → extension writes `.moat/moat-tasks.md`, `.json`, screenshots, and Chrome temp `*.crswap`.  
**Outcome:** Vite’s watcher sees project file change → **full HMR reload** of `http://127.0.0.1:5173/` → page refreshes → Drawbridge UI feels broken/resets.  
**Fix:** `vite.config.ts` now ignores `**/.moat/**` and `**/*.crswap`.

**You must restart the Vite dev server** after this change (`Ctrl+C`, then `npm run dev`).

## Chrome / Brave setup

1. `chrome://extensions` or Brave equivalent → Developer mode  
2. Load unpacked → `/Users/macbookair/Downloads/drawbridge-duke/chrome-extension/`  
3. Disable/remove the breschio unpacked copy if both loaded  
4. `npm run dev` → open site → Connect Project → enigma root  
5. Annotate (`C` / `R`) — page should **not** full-reload now  

## Process queue in Cursor

```text
/bridge
```

or `bridge` / `step bridge` / `batch bridge`

## Generated under project

- `.moat/moat-tasks.md`
- `.moat/moat-tasks-detail.json`
- `.moat/config.json` (v1.0.0 from your connect)
- `.moat/screenshots/`
- `.moat/drawbridge-workflow.md`
