# Ridha Ouni — Portfolio

Personal portfolio site built with Angular 21 (standalone components, signals, SCSS).
No backend required — all data is loaded from a static JSON file.

## Run it

```bash
cd frontend
npm start
```

Open http://localhost:4200.

Production build:

```bash
cd frontend
npm run build
```

Output lands in `frontend/dist/frontend` — deploy to any static host (GitHub Pages, Netlify, Vercel, Firebase Hosting).

## Editing the content

All CV content lives in `frontend/public/data/portfolio.json`.
Change the JSON and the site updates on next reload. If you add or rename fields,
mirror them in `frontend/src/app/core/models/portfolio.model.ts`.

## Contact form

The contact form composes a `mailto:` link and opens the visitor's email client.
No server or database needed.

## Accessibility

Semantic landmarks, a skip link, labelled form fields with `aria-invalid` and
`aria-describedby` error wiring, visible focus rings, `aria-current` on the active nav
link, and `prefers-reduced-motion` handling for the scroll-reveal animations. Full WCAG
conformance still needs manual testing with a screen reader and an expert review.
