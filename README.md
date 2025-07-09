# Void Monster Foundry Modules Documentation

This repository contains the documentation for Void Monster's Foundry VTT modules, built with [Docusaurus](https://docusaurus.io/).

## Modules

- [OBS Utils](https://github.com/FaeyUmbrea/obs-utils)
- [Ethereal Plane](https://github.com/FaeyUmbrea/ethereal-plane)

## Development

### Installation

```bash
# Install dependencies
yarn install
```

### Local Development

```bash
# Start the development server
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
# Build the static site
yarn build
```

This command generates static content into the `build` directory that can be served by any static content hosting service.

### Deploy

```bash
# Deploy to Cloudflare Pages
yarn deploy
```

## API Documentation

The API documentation is automatically generated from the TypeScript source code using [TypeDoc](https://typedoc.org/) and [docusaurus-plugin-typedoc](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc).

### Generating API Documentation

To generate the API documentation, run:

```bash
yarn generate-api-docs
```

This command will generate Markdown files in the `docs/api-reference` directory based on the TypeScript source code in the submodules.

### Configuration

The TypeDoc configuration is defined in `typedoc.json` and the Docusaurus plugin configuration is in `docusaurus.config.js`.

## Project Structure

```
module-docs/
├── docs/                    # Documentation files
│   ├── ethereal-plane/      # Ethereal Plane documentation
│   ├── obs-utils/           # OBS Utils documentation
│   └── api-reference/       # Auto-generated API documentation
├── src/                     # Docusaurus theme customizations
├── static/                  # Static files
├── submodules/              # Git submodules
│   ├── ethereal-plane/      # Ethereal Plane source code
│   └── obs-utils/           # OBS Utils source code
├── docusaurus.config.js     # Docusaurus configuration
├── sidebars.js              # Sidebar configuration
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── typedoc.json             # TypeDoc configuration
```