# Void Monster module docs

User guides and developer docs for Void Monster’s Foundry modules, built with Astro and Starlight. Search runs locally with Pagefind.

Use Node 22.12 or newer and Yarn 4:

```sh
corepack enable
yarn install
yarn start
```

For the complete static site, including search:

```sh
yarn build
yarn preview
```

The preview stays on localhost. These commands do not publish anything.

Release guides live in `content/`; published manifests and API type packages live in `releases/`. Previous documentation is preserved under the legacy versions. API references use snapshots of exact published npm packages, so rebuilding never follows a module’s development branch or a moving npm tag. Historical references whose packages were never published on npm retain their original release archives.

The [documentation overhaul article](https://tasks.void.monster/articles/MODULEDOCS-A-1) describes the approved release and navigation model.

For a new module release, update its guides and source docstrings first. After publishing its API package, import the release with the exact package version:

```sh
yarn release:import lib-camera public v1.14.1 @faeyumbrea/lib-camera-api-types@1.14.1
```

For a release without an API, omit the package argument. Add its user and developer guides under the content path printed in the release catalog. Existing releases cannot be reimported with a different API mapping.

```sh
yarn docs:prepare
yarn preview
yarn docs:check
```

Review the preview, then publish through the existing production deployment. Pushing to `master` runs `yarn deploy`, which checks the docs before uploading them. The same command can be run locally for an explicit publication. Verify the module's exact documentation link afterward.
