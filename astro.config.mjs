// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkReadingTime from './src/plugins/remark-reading-time.mjs';
import rehypeAlerts from './src/plugins/rehype-alerts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://yqamm.top',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeAlerts],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
