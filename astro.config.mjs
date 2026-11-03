import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://khalilbenali1.github.io',
  base: '/forma-astro',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { build: { assetsInlineLimit: 0 } },
});
