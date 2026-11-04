---
title: "Import and export overlay bundles"
---

A **bundle** is a `.vmoverlay` file containing overlays and their referenced assets. Use it to move a complete setup between worlds or share it with another streamer.

## Export an overlay setup

1. Open the **Overlay Editor** and check the world's overlay set. Export includes that set, rather than only the currently selected overlay.
2. In the editor's window controls, choose **Export**.
3. Choose **Bundle** to include referenced images, or **JSON** for configuration alone.
4. For a bundle, fill in its ID, name, author, licence and optional website URL, then submit.
5. Keep the downloaded file. Import it into a test world to check the result before distributing it.

A JSON export is useful when the receiving world already has the assets. A bundle is useful when you want to package those assets with the layout. You need permission to redistribute any artwork or fonts you include; entering a licence in the export form doesn't grant those rights.

## Import a setup

1. Open the destination world's **Overlay Editor**.
2. Choose **Import** from its window controls and select the `.vmoverlay` or overlay JSON file.
3. Choose **Append** to keep the world's existing overlays and add the imported ones. Choose **Replace** to replace the existing set.
4. Select the imported overlays, review their actor data fields, and choose the actors to display with **Manage Actors**.
5. Check the **Preview** tab and the actual OBS browser source.

**Export the current configuration before using Replace if you may want it back.** Importing an overlay doesn't make a field from another game system exist on your actors. Check system-specific paths and enable the appropriate companion when needed.

## Check images and fonts

Bundle export fetches registered image fields from the overlay components. Fonts and files referenced only inside custom CSS aren't collected automatically; make those available separately in the destination world. Files the browser cannot fetch are omitted and reported in the browser console. Check the imported result for missing artwork or fonts, especially if the source used private or remote URLs.

On import, bundled assets are saved in Foundry's persistent storage and the overlay paths are updated to use those files. Removing an overlay doesn't remove its uploaded assets. Keep your original artwork and the exported bundle as backups.

## Edit an imported overlay

Imported overlays are ordinary editable overlays. Open **Layout** to change their components and styling; use **Animation** to adjust their tracks and trigger responses. [Overlay Editor](../stream-composer/) explains those controls.

For a ready-made system ribbon, use the companion's **Import starter overlays** action. Its guide lists the supplied readouts and events.

Module authors generating or extending the format can use the [bundle format reference](../../dev/overlay-bundles/).
