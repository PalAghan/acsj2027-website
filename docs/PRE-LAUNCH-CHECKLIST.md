# Pre-launch checklist: ACSJ 2027 website

## Content (needs MESHA)
- [ ] Theme confirmed (src/data/site.ts)
- [ ] Contact email and phone (site.ts)
- [ ] Social media links (site.ts, socials)
- [ ] Venue name, address, map link (src/data/venue.ts)
- [ ] High-resolution hero photos, no text (public/images/photos/)
- [ ] White logo variant, brand hex codes confirmed (tokens.css)
- [ ] Speakers, programme (and PDF), partners, news, registration details when confirmed
- [ ] Privacy policy page (required before any form or analytics is added)

## Technical
- [ ] `site` in astro.config.mjs and the Sitemap line in public/robots.txt match the real address
- [ ] `npm run build` completes with no errors
- [ ] Upload the contents of `dist/` (including the hidden `.htaccess`) to the subdomain folder
- [ ] HTTPS works on the subdomain (AutoSSL in cPanel) and http:// redirects to https://
- [ ] Open every page on phone, tablet and desktop; check no horizontal scrolling
- [ ] Keyboard only: Tab through each page, skip link works, focus always visible
- [ ] Chrome DevTools > Lighthouse: Accessibility, Best Practices and SEO all 90+
- [ ] https://securityheaders.com scan of the live address shows an A grade
- [ ] Share a page link in WhatsApp/LinkedIn and check the preview image and title
- [ ] Submit sitemap-index.xml in Google Search Console
- [ ] Link the subdomain from the main MESHA WordPress site

## Dependency security
- [ ] Run `npm audit` before launch (currently reports 0 vulnerabilities on Astro 7.4.4)
- [ ] Node.js 22.23.4 or newer is required to build the site (check with `node -v`)
