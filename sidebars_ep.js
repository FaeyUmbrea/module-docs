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
  epSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome'
    },
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'quick-start'
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'triggers',
        'chat-commands',
        'polls',
        'midi-qol',
        'api'
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'link',
          label: 'Ethereal Plane API',
          href: '/api-reference/modules/ethereal_plane_src_utils_api',
        }
      ],
    },
  ],
};

module.exports = sidebars;
