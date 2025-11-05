# 🛠️ SWP Web — Schulahr 2025|2026.

Beautiful, practical, and ready-to-run. This repository contains a small web app and exercises for learning modern frontend fundamentals (HTML, CSS, JavaScript) with a smooth Dockerized setup. It ships with a glossy black–white UI, a red→black gradient theme, and a “liquid glass” success toast for delightful feedback.

## ✨ Highlights
- Glossy black–white theme with a red→black gradient background
- Branded header: “Gabriel Winkler’s code validierungs page”
- Liquid‑glass success toast in the top‑right (“everything is fine”)
- Clean form validation page (`validierung.html`) with modern visuals
- Live updates via bind‑mounted `code/` directory (no rebuild needed)
- Simple Docker + Nginx setup; runs locally at `http://localhost:8080/`

## 📦 What’s Inside
- `code/html/validierung.html` — The stylish validation form page
- `code/css/validierung.css` — Theme styles (glossy, gradient, glass toast)
- `code/js/` — JS exercises and small DOM helpers
- `docker-compose.yml` — Local orchestration with Nginx serving static files
- `Dockerfile` — Base image and runtime setup

## 🧭 Purpose
This repo supports SWP Web coursework and explorations. It’s designed to:
- Provide a clean environment for practicing HTML/CSS/JS
- Demonstrate modern UI polish and micro‑interactions (toast notifications)
- Offer an easy, reproducible local setup using Docker
- Encourage iteration with live updates via bind mounts

## 🚀 Quick Start
Prerequisites: Docker Desktop and Docker Compose installed.

```bash
# From the project root
docker-compose up -d

# Open the validation page
open http://localhost:8080/code/html/validierung.html
```

To stop services:
```bash
docker-compose down
```

## 🔁 Live Updates (No Rebuild Required)
Changes under `code/` are served directly from your host into the container.
- Edit any file in `code/` and refresh the browser.
- For CSS/JS updates, use a hard refresh (`Cmd+Shift+R`) to bypass caching.

Note: The compose file uses a symlinked host path to avoid macOS path issues with colons. Your `source` is set to `/Users/gabriel/SWP-Web/code`, which points to the real project folder.

## 🧩 Pages & Features
- `validierung.html`
  - Branded header: “Gabriel Winkler’s code validierungs page”
  - Glossy card layout, modern inputs, and a vivid submit button
  - Success toast with glass effect, check icon, auto‑hide animation
- `personen-DOM.html` and `js-part.html`
  - Supporting exercises and DOM manipulation examples

## 🎨 Design Notes
- Typeface: Poppins for a crisp, modern feel
- Background: diagonal gradient from rich red to deep black
- Card: translucent glass with blur, subtle border, and shadow
- Inputs: sleek borders, gentle focus ring, and clear feedback
- Toast: liquid‑glass panel with success accent and slide/fade animation

## 🛠️ Troubleshooting
- Invalid volume specification (macOS paths with `:`)
  - Symptom: `Error response from daemon: invalid volume specification: '/Users/...:rw'`
  - Fix: Use a symlink path without colons (already configured).
    - Example: `/Users/gabriel/SWP-Web -> /Users/gabriel/4BHWII:2025-26/SWP-Web`
  - Alternative: Rename your folder to remove `:` and update `docker-compose.yml`.

- CSS/JS not updating immediately
  - Cause: Nginx static asset caching
  - Fix: Hard refresh (`Cmd+Shift+R`) or let me add a dev Nginx config that disables caching.

## 🧪 Rebuild (If Needed)
You generally don’t need this for static changes under `code/`, but if you modify container setup:
```bash
docker-compose up --build -d
```

## 🤝 Contributing
PRs and ideas are welcome. If you want a different theme (e.g., darker glass, reduced red accents, or alternative fonts), open an issue and I can help tailor it.

---
Made with care for SWP Web explorations — polish meets practicality.