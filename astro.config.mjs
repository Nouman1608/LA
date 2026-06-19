// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://learnersacademy.com.pk',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      // Drop draft/utility pages from the sitemap.
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    // Emit /about/index.html etc. — matches trailingSlash:'always'.
    format: 'directory',
  },
});
