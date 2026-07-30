// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkReadingTime from './src/plugins/remark-reading-time.mjs';
import remarkSpoiler from './src/plugins/remark-spoiler.mjs';
import rehypeAlerts from './src/plugins/rehype-alerts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://yqamm.top',
  integrations: [mdx(), sitemap()],

  // ========== 构建优化 ==========
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  markdown: {
    remarkPlugins: [remarkReadingTime, remarkSpoiler],
    rehypePlugins: [rehypeAlerts],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
