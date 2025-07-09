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
  foundryModulesSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome'
    },
    {
      type: 'category',
      label: 'OBS Utils',
      items: [
        'obs-utils/getting-started',
        'obs-utils/obs-remote',
        'obs-utils/stream-overlay-css',
        'obs-utils/api',
        'obs-utils/manual-mode'
      ],
    },
    {
      type: 'category',
      label: 'Ethereal Plane',
      items: [
        'ethereal-plane/getting-started',
        'ethereal-plane/quick-start',
        'ethereal-plane/chat-commands',
        'ethereal-plane/polls',
        'ethereal-plane/api'
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
        },
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
