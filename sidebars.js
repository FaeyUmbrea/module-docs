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
      type: 'link',
      label: 'OBS Utils',
      href: '/obs-utils',
    },
    {
      type: 'link',
      label: 'Ethereal Plane',
      href: '/ethereal-plane',
    },
    {
      type: 'link',
      label: 'Splash',
      href: '/splash',
    }
  ],
};

module.exports = sidebars;
