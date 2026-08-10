// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { buildLastmodMap } from './scripts/sitemap-lastmod.mjs';

// Real per-file git dates; empty map (= no lastmod emitted) if git is unavailable.
const lastmod = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://learnersacademy.com.pk',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      // Drop draft/utility pages from the sitemap.
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const date = lastmod.get(new URL(item.url).pathname);
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
  build: {
    // Emit /about/index.html etc. — matches trailingSlash:'always'.
    format: 'directory',
  },
});
