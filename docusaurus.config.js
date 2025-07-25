// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with the TypeScript language service).

const typedocPlugin = require('docusaurus-plugin-typedoc');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Void Monster Foundry Modules',
  tagline: 'Documentation for Foundry VTT Modules',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.void.monster',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'void-monster', // Usually your GitHub org/user name.
  projectName: 'module-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          path: 'docs/index',
          routeBasePath: '/'
        },
        blog: false, // Disable the blog plugin
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: [
          './submodules/ethereal-plane/src/utils/api.ts',
          './submodules/obs-utils/src/utils/api.ts'
        ],
        out: 'api-reference',
        sidebar: {
          categoryLabel: 'API Reference',
          position: 3,
          fullNames: true
        },
        tsconfig: './tsconfig.json',
        skipErrorChecking: true,
        disableSources: true,
        excludeExternals: true,
        excludeInternal: true,
        excludePrivate: true,
        excludeProtected: true,
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ethereal-plane',
        path: 'docs/ethereal-plane',
        routeBasePath: 'ethereal-plane',
        sidebarPath: './sidebars_ep.js',
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'obs-utils',
        sidebarPath: './sidebars_obsu.js',
        path: 'docs/obs-utils',
        routeBasePath: 'obs-utils', // Serve the docs at the site's root
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Void Monster Foundry Modules',
        logo: {
          alt: 'Void Monster Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'foundryModulesSidebar',
            position: 'left',
            label: 'Home',
          },
          {
            type: 'docSidebar',
            sidebarId: 'obsUtilsSidebar',
            position: 'left',
            label: 'OBS Utils',
            docsPluginId: 'obs-utils',
          },
          {
            type: 'docSidebar',
            sidebarId: 'epSidebar',
            position: 'left',
            label: 'Ethereal Plane',
            docsPluginId: 'ethereal-plane',
          },
          {
            href: 'https://discord.com/invite/WfMaKPPdeM',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://www.patreon.com/bePatron?u=28777355',
            label: 'Patreon',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/WfMaKPPdeM',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Patreon',
                href: 'https://www.patreon.com/bePatron?u=28777355',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Void Monster. Built with Docusaurus.`,
      },
      // Algolia search configuration
      algolia: {
        // Replace with your own values
        appId: 'UN09JIJK4M',
        apiKey: 'de18b51c0168d67679c4fdfc2cd1ced3',
        indexName: 'Module Docs',
        contextualSearch: false,
      },
      // Color mode configuration
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Writerside-like theme
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

module.exports = config;
