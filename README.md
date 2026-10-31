# ACSJ 2027 website, Milestone 1 (homepage)

## Requirements
Node.js 22.23.4 or newer (check with `node -v`).

## Run
    npm install
    npm run dev      # http://localhost:4321
    npm run build && npm run preview   # production check

## Edit content
- `src/data/site.ts`: theme, dates, nav, copy, TBC fields (venue, email, socials, register link)
- `src/styles/tokens.css`: colours and fonts (swap in official MESHA values)
- Logo: replace the text wordmark in `Header.astro` and `Footer.astro` with `public/images/mesha-logo.svg`
- Hero image: `public/images/hero-banner.png`

## Test checklist
1. Widths 375 / 768 / 1280: no horizontal scroll; menu collapses below 1100px.
2. Keyboard: Tab shows skip link first, visible focus everywhere, Esc closes the mobile menu, speaker track scrolls with arrow keys.
3. Chrome DevTools > Lighthouse: Accessibility should be 95+.
4. OS "reduce motion" on: no smooth scrolling or transitions.

## Registration demo (localhost only)
1. `npm install`
2. Copy `.env.example` to `.env` and put your email in `ORGANISER_EMAIL`.
3. Terminal 1: `npm run dev`. Terminal 2: `npm run demo:server`.
4. Open http://localhost:4321/demo-registration and submit the form.
Without SMTP settings, the emails and PDFs are saved in the `demo-outbox` folder. The demo is not part of the real site.
