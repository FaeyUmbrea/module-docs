/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  obsUtilsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome'
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'obs-remote',
        'stream-overlay-css',
        'api',
        'manual-mode'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'link',
          label: 'OBS Utils API',
          href: '/api-reference/modules/obs_utils_src_utils_api',
        }
      ],
    },
  ],
};

module.exports = sidebars;
