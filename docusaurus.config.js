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
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
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
    ]
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
            label: 'Documentation',
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
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
        contextualSearch: true,
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
