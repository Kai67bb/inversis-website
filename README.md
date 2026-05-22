# INVERSIS Group — Containerized Boiler Plants

A simple bilingual (PL / EN) static website for **Inversis Group P.S.A.** that presents two product ranges:

- **Water boiler plants** (190 kW → 14,500 kW)
- **Steam boiler plants** (350 kg/h → 22,000 kg/h)

Power-range buttons dynamically update the technical specification table — no backend required.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home page with two product entry points |
| `water-boilers.html` | Water-boiler product page with capacity selector |
| `steam-boilers.html` | Steam-boiler product page with capacity selector |

## Tech

- Plain HTML / CSS / vanilla JavaScript — no build step
- Single shared stylesheet (`css/style.css`) and JS file (`js/main.js`)
- Montserrat from Google Fonts
- Language preference stored in `localStorage`

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. **Settings → Pages → Source: `main` / root**.
3. Done — your site is live at `https://<user>.github.io/<repo>/`.

## Editing data

All boiler variants live in **one place** — the `WATER_VARIANTS` and `STEAM_VARIANTS` arrays at the top of `js/main.js`. Update a value there and it propagates to the stat row, sidebar spec table and brochure card automatically.

## Contact

Inversis Group P.S.A.  
ul. Rondo ONZ 1, 00-124 Warszawa  
+48 571 271 846 · contact@inversis-group.com
