import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// SITE_URL and BASE_PATH are only set by the GitHub preview workflow. The real site uses the defaults below.
// `site` is the public address of the finished website. Update it if the final subdomain is different.
export default defineConfig({
  site: process.env.SITE_URL || 'https://acsj.meshascience.org',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap({ filter: (page) => !page.includes('demo-registration') })],
  build: { inlineStylesheets: 'never' },      // keeps CSS in files so a strict Content-Security-Policy works
  vite: { build: { assetsInlineLimit: 0 } },  // same for scripts
});
