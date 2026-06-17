---
id: presets
title: Presets & Prefabs
sidebar_label: Presets & Prefabs
---

# Presets & Prefabs

Presets and prefabs are reusable building blocks you save once and drop into any splash. A **preset** carries the style and content of a single object. A **prefab** is a whole selection of objects saved as a group, layout and wiring intact. Both live in the same library and both show up in the same picker.

## What a preset stores

A preset is one of five kinds, matching the object it came from:

| Kind | What it carries |
|---|---|
| `nineslice` | A nine-slice panel image and its slice widths. |
| `button` | A button's labels, image sets, and tints across its normal, hover, and click variants. |
| `animation` | A reusable entrance or exit animation. See [Effects & Animations](./effects.md). |
| `sprite` | A single object's content and style, with its placement stripped out. |
| `spriteGroup` | A group of objects with their layout and click actions kept. This is what a prefab is. |

Single-object presets travel as pure style. The placement an object had in its source splash (`states`) is removed, so when you apply the preset it lands fresh wherever you put it. A `button` preset also drops its click action: a saved button keeps how it looks, not what it does. Group prefabs are the exception. A prefab keeps each member's placement and `onClick`, so applying it reproduces the whole arrangement, wiring and all.

## The library

Presets are stored as journal pages in a single world journal entry named **Splash Presets**. The library is created lazily the first time a GM saves a preset, and only a GM can create it or save into it. Players who try to save get a notification and nothing is written.

Saving is create-only. There is no overwrite. To replace a preset, delete the old page and save a new one.

## Saving a prefab

In the editor's [object tree](./editor.md), select more than one object. A **floppy-disk** button appears in the panel header. Click it, confirm the name in the prompt, and the current selection is saved as a `spriteGroup` prefab in the library.

The save captures each selected object's `raw` data, so the prefab reflects exactly what those objects look like and do at that moment.

## Applying a preset or prefab

Open the **+** (Add object) menu in the Objects panel and choose **Prefab…**. That opens the **preset picker**, a searchable list of every `spriteGroup` preset in the library. Each row shows a thumbnail, the preset's name, and a kind chip. Type in the search box to filter by name.

The picker pulls from two sources and merges them: presets in your world's **Splash Presets** journal, and any presets shipped in an installed compendium. World presets win when a uuid collides. The list refreshes live as the library changes.

When you pick a prefab, ids regenerate and groups remap before it drops in, so it never collides with objects already in your splash. The copy lands cleanly as its own group.

## Behavior-backed prefabs

A prefab can be backed by a **behavior** instead of baked sprites. A normal prefab stamps a fixed set of objects. A behavior-backed prefab runs a config dialog when you apply it, then builds its objects from your answers. The picker entry looks the same, but applying it asks you a question first.

The objects a behavior produces are self-contained. Once built, they carry no link back to the behavior, so the result is a plain, portable splash you can edit like anything else.

## The Tumbler Lock

Splash ships a compendium with one behavior-backed prefab: the **Tumbler Lock**.

Drop it in and it asks for a **code word** (default `OPEN`). The word is uppercased and stripped to letters `A`–`Z`. The build then lays out one letter wheel per character, plus an **Unlock** button beneath them:

- Each wheel is a panel with **▲** and **▼** buttons and three stacked letters. The middle letter is the current pick; the top and bottom show the neighbors. The arrows rotate the wheel through the alphabet.
- The **Unlock** button reads the middle letter of every wheel, joins them, and compares against the code word. A match shows a success notification and unlocks the door. A miss shows a wrong-combination warning.

Players dial the wheels to spell the word, then press **Unlock**. The interactivity rides in inline-macro scripts on the buttons, so the placed lock works on its own with no dependency on the prefab system. See [Actions & Interactivity](./actions.md) for how inline-macro buttons work, and [Triggers](./triggers.md) for launching the lock from a clicked door.
