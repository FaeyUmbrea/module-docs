---
id: editor
title: The Splash Editor
sidebar_label: The Splash Editor
---

# The Splash Editor

The editor opens from the Manager as a large, resizable window. The layout is three columns: an **Objects** panel and a **States** panel on the left, the canvas in the middle, and the inspector on the right.

The toolbar across the top carries **Undo**, **Redo**, and a **Preview** button (the play icon) that renders the current splash locally so you can check it. There is no save button. Every edit writes straight to the journal page, so the splash is always saved as you go.

## Objects

A splash is built from objects. There are ten types:

| Type | What it is |
|---|---|
| **Image** | A picture from an image path. |
| **Text** | A line of text with a font, size, color, and alignment. It interpolates `{value}` tokens live. |
| **Button** | A clickable button with a label and optional hover and click images, wired to an action. |
| **Panel** | A filled rectangle with an optional border and corner radius. |
| **Gauge** | A bar that fills from a runtime value, with min/max, fill and background colors, horizontal or vertical. |
| **Hotspot** | An invisible clickable region wired to an action — a click target over anything. |
| **Video** | A looping, muted, autoplaying video from a source path. |
| **Text input** | A field players type into, writing to a runtime value (used in passwords and forms). |
| **Draggable** | A piece players drag, carrying a tag; it records which drop zone it occupies. |
| **Drop zone** | A target that accepts draggables (optionally by tag) and runs an action when one is dropped. |

Add one from the **+** button in the Objects panel header, which opens a menu with every type plus **Prefab…** for placing a ready-made group. You can also right-click empty canvas to drop an image, text, or button at the click point. See [Presets & Prefabs](./presets.md) for the prefab library.

New objects get a default name like "Text 1" until you give them one in the inspector.

## The object tree

The Objects panel lists every object in the splash in z-order. Click a row to select it. Shift-click, Ctrl-click, or Cmd-click adds to or removes from the selection. Drag-select a region on the canvas to lasso multiple objects at once.

Each row has an eye toggle that places the object in the active state or removes it. Right-click a row for **Place in state** / **Remove from state**, **Duplicate**, and **Delete**.

### Grouping

Select two or more loose objects and click the group icon in the panel header to bind them under a shared group. A group shows as one collapsible node in the tree with a member count. The caret expands or collapses it.

- **Select a group** by clicking its header. At the top level, clicking any grouped object selects the whole group.
- **Enter a group** by double-clicking it (on the canvas or in the tree). Inside an entered group you select and edit members one at a time. Press **Escape**, or click empty canvas, to exit back to the top level.
- **Rename** a group from its right-click menu. The name is editor metadata; clearing it falls back to a positional default like "Group 1".
- **Ungroup** dissolves the group and leaves its members loose. **Delete group** removes the group and every member.

The group's eye toggle places or removes all members in the active state in one step.

## States

A splash can have one or more **states**. A state is a named arrangement: each object carries its own placement per state, and an object only appears in the states you have placed it in. The same object can sit at different positions, sizes, and z-orders in each state, and actions move the splash from one state to another (see [Actions & Interactivity](./actions.md)).

The States panel lists every state. Click one to make it active. The canvas, the Objects panel eye toggles, and the inspector all reflect the active state. Add a state with the **+** button. Right-click a state for **Rename**, **Duplicate** (which copies the state and every placement in it), **Set as sole initial**, and **Delete**. A splash must keep at least one state, so the last one cannot be deleted.

### Initial states

One or more states are marked **initial**. These are the states a splash shows when it first opens. A flag icon marks initial states in the panel. **Set as sole initial** makes a state the only initial one; you can also toggle the **Initial state** checkbox on the [State tab](#state-tab) to mark several.

### Placement and states

Placing an object in a state gives it a position there. An object placed in one state but not another does not render in the second. Drag a row from the Objects panel onto the canvas to place an object in the active state at the drop point. The inspector shows a **Place in state** button whenever the selected object is absent from the active state.

## The canvas

The canvas shows the active state at the stage's real proportions, scaled to fit the workspace. A checkered backdrop frames the stage. For a **Handout** splash the stage is drawn at the configured handout size with a border; other layers use the screen size. See [Layers & Modes](./layers-and-modes.md) for what each layer means.

- **Drag** a selected object to move it. Dragging a group member (at the top level) moves the whole group.
- **Snap guides** appear as you drag. Objects snap to the stage edges and center and to other objects' edges and centers. Hold **Alt** to move freely with no snapping. Hold **Ctrl** (or Cmd) to lock movement to a single axis.
- **Resize** by dragging a handle on a selected object. Resize also snaps to guides.
- **Marquee select** by dragging across empty canvas. Hold **Shift** to add to the existing selection.

Right-click an object on the canvas for its menu: **Duplicate**, **Bring to front**, **Send to back**, **Scale to fit stage**, **Reset to natural size**, **Remove from state**, and **Delete**. With more than one object selected, the menu offers a single **Delete** for the whole selection.

**Scale to fit stage** stretches the object to cover the whole stage. **Reset to natural size** clears its explicit width and height so it renders at its source dimensions.

### Keyboard

- **Delete** or **Backspace** removes the selection.
- **Escape** exits an entered group.
- **Ctrl/Cmd+Z** undoes, **Ctrl/Cmd+Shift+Z** redoes. These mirror the toolbar buttons.

## The inspector

The right column is a tabbed inspector. Selecting an object switches it to the **Object** tab automatically.

### Object tab

Edits the selected object. It shows the object's **Name** and type-specific fields:

- **Image** — the image path.
- **Text** — text, font, size, color, and alignment.
- **Panel** — fill color, border color and width, and corner radius.
- **Button** — label text, size, and color; hover and click images (each edited through a nine-slice editor); an **On click** action; and a free-form **macro context** of key/value pairs passed to macro actions.
- **Gauge** — the runtime **value key** it reads, min and max, fill and background colors, and a vertical toggle.
- **Hotspot** — just an **On click** action; the region itself is invisible.
- **Video** — the source path, plus loop, muted, and autoplay toggles.
- **Text input** — the **value key** it writes to, a placeholder, font size, and text/background colors.
- **Draggable** — the **value key** that records its drop zone, a **tag**, an image or fill color, and a corner radius.
- **Drop zone** — what it **accepts** (blank = any, or a tag), an **on drop** action, fill, border, highlight color, and radius.

Every object also has an **effects** subsection (WebGL filters; see [Effects & Animations](./effects.md)) and its own **animation in**/**out**.

Below those, every object type has entrance and exit **animations**, an **effects** list, and, when the object is placed in the active state, its **placement** in that state: **X**, **Y**, **W**, **H**, and **Z** plus optional per-state entrance and exit animations. See [Effects & Animations](./effects.md) for the animation and shader options.

The tab also has buttons to **apply a sprite preset** or, for GMs, save the object as one. Buttons additionally apply or save button presets. With more than one object selected, the tab shows a count instead of fields.

### State tab

Edits the active state: its **label**, the **Initial state** checkbox, and an **On enter** action list that runs when the splash arrives at this state.

### Splash tab

Splash-wide settings: the **Layer** kind, **Mode** (local or [synced](./synced-mode.md)), vote-tally visibility, the **Global** flag, the scenes the splash is pinned to, handout dimensions when the layer is Handout, and the splash's own entrance and exit animations.

## Duplicate and delete

**Duplicate** copies an object (or a state) including its placements, and selects the copy. **Delete** removes the selected object, group, or state. Both are available from the right-click menus and the canvas; delete also responds to the keyboard.

## Atomic edits, no save button

The editor writes optimistically. Each change updates the on-screen splash immediately and commits to the journal page as one atomic update. Undo and redo step back and forward through those commits, so you never lose work to a forgotten save.
