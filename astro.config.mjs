import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: true },
    }),
    mdx(),
  ],
  site: 'https://sugaroverflow.com',
  output: 'static',
  alias: {
    '@': './src',
  },
});