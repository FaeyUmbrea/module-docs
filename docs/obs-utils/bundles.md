---
id: bundles
title: Bundles (.vmoverlay)
sidebar_label: Bundles
---

# Bundles

A **bundle** is a single `.vmoverlay` file packaging an overlay export plus the images and fonts it references. Bundles are the format for sharing, selling, and installing complete overlay setups.

Added in 5.1.

## What's in a bundle

A `.vmoverlay` file is JSON with the shape:

```jsonc
{
  "type": "VMOverlayBundle",
  "version": 1,
  "manifest": {
    "id": "parchment-and-ink-dnd5e",
    "name": "Parchment & Ink — D&D 5e",
    "author": "Faey Umbrea",
    "license": "CC-BY-NC-4.0",
    "url": "https://void.monster/bundles/parchment-and-ink",
    "obsUtilsMin": "5.1.0"
  },
  "system": "dnd5e",
  "overlays": [ /* v2 overlay shape with bundle:// image paths */ ],
  "images": {
    "frame-parchment.png": "data:image/png;base64,iVBOR...",
    "Cinzel-Regular.woff2":  "data:font/woff2;base64,..."
  }
}
```

Images are inlined as data URLs — no separate files, no zip. The format is plain JSON so authors can diff and edit it in a text editor.

## Exporting

In the Stream Composer's window header, click **Export**. The dialog offers three buttons:

- **JSON** — plain overlay export, no images. Useful for git-tracking your overlay setup or sharing without the visual assets.
- **Bundle** — opens a manifest form (id, name, author, license, optional URL). On submit, OBS Utils walks the overlay tree, fetches every referenced image, base64-encodes them, rewrites the paths to the `bundle://` scheme, and saves a `.vmoverlay` file.
- **Cancel**

Images that fail to fetch (404, network error) are logged to the console and omitted from the bundle. The overlay JSON still references the bundle:// path, so the importer can fall back to a placeholder.

## Importing

Click **Import**. Pick a `.vmoverlay` (or a legacy v1/v2 JSON export — both still work). Choose:

- **Replace** — wipes existing overlays, installs the bundle's set.
- **Append** — adds the bundle's overlays to whatever's already in the world.

On import, each inlined image is base64-decoded and written into the module's persistent storage at `modules/obs-utils/bundles/<bundleId>/<filename>`. The `bundle://images/X` paths in the overlay data are rewritten to those uploaded paths.

After import, the new overlays appear in the Layers panel like any other.

## Persistence

Bundle images live in your Foundry user data folder, under the obs-utils module's persistent storage. This folder survives module updates — bundles you install today still work after a future obs-utils version bump.

There is no UI to uninstall a bundle. Foundry doesn't expose a file-delete primitive to modules, so removing the overlay layers from the Layers panel just leaves the image files in storage (they're harmless — a few KB each per bundle).

## Distribution

Bundles are distributed however you like — DriveThruRPG, itch.io, your own Patreon, direct link. There's no DRM, no signing, no auth. The `manifest.license` field is for honest-broker information only.

## Authoring a bundle

The supported workflow today is: build the overlays in the Stream Composer in a test world, then Export → Bundle. The `.vmoverlay` file is your shippable artifact.

A standalone CLI tool (`obs-utils-bundle`) is planned for v1+ to make multi-system / multi-theme variants easier to assemble from a single source — see the [bundle concepts repo](https://github.com/FaeyUmbrea) for the spec.

## Image references inside bundle JSON

When a bundle is exported, image-bearing component types have their data fields rewritten to `bundle://images/<sanitized-filename>`. The image-slot registry knows which fields on which component types carry images:

- `img.data` — the source path
- `bavimg.data` — slot 1 (true) and slot 2 (false) of the `;`-separated triple
- `mimgav.data` — slots 1 and 3 of the `;`-separated quad

A custom component type registered by a third-party module can register its own image-slot handlers via `OverlayType.registerComponentImageSlots(key, handlers)` so the walker picks up its image refs too. See [API: OverlayType](./api.md#overlay-types) for the full method signature.
