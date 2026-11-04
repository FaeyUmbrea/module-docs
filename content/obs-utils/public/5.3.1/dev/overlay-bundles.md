---
title: "Overlay bundle format"
---

Use the Overlay Editor to export a working bundle before generating one yourself. The [user guide](../../user/bundles/) covers export and import.

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

## Image references inside bundle JSON

When a bundle is exported, image-bearing component types have their data fields rewritten to `bundle://images/<sanitized-filename>`. The image-slot registry knows which fields on which component types carry images:

- `img.data` — the source path
- `bavimg.data` — slot 1 (true) and slot 2 (false) of the `;`-separated triple
- `mimgav.data` — slots 1 and 3 of the `;`-separated quad

A custom component type registered by a third-party module can register its own image-slot handlers via `OverlayType.registerComponentImageSlots(key, handlers)` so the walker picks up its image refs too. See [API: OverlayType](../api-reference/) for the full method signature.
