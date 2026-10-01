import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readCatalog, defaultRelease, releaseRoot } from './tools/catalog.mjs';
import { prepareDocs, redirects } from './tools/prepare-docs.mjs';

await prepareDocs();
const catalog = await readCatalog();
export default defineConfig({
  site: 'https://docs.void.monster',
  outDir: './build',
  trailingSlash: 'always',
  redirects: { ...await redirects(), ...Object.fromEntries(catalog.filter((item) => item.releases.length).map((item) => [`/${item.id}`, `${releaseRoot(item.id, defaultRelease(item))}user/`])) },
  integrations: [starlight({
    title: 'Void Monster Docs',
    description: 'User guides and developer documentation for Void Monster’s Foundry modules.',
    favicon: '/img/favicon.svg',
    customCss: ['./src/styles/docs.css'],
    routeMiddleware: './src/route-middleware.ts',
    components: {
      Header: './src/components/Header.astro',
      Hero: './src/components/Hero.astro',
      Sidebar: './src/components/Sidebar.astro',
      PageTitle: './src/components/PageTitle.astro',
      Search: './src/components/Search.astro',
      Footer: './src/components/Footer.astro',
    },
    credits: false,
    sidebar: [],
  })],
});
