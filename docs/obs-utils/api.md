---
id: api
title: API
sidebar_label: API
---

# API

OBS Utils comes with an API to allow custom overlays to be registered to it.

## Accessing the API

The OBS Utils API can be accessed using:

```javascript
game.modules.get("obs-utils").api
```

Consider any API properties not mentioned in this Guide "internal."
Not all use-cases are supported for external Components and will cause the module to break.

## Self-Contained, single instance overlays

You can create an overlay that will be rendered into the stream page exactly once. 
To do so, create a Svelte component of your desired overlay and then pass the Class Object you get from importing the Svelte Component to the API:

```javascript
import YourOverlay from "../YourOverlay.svelte";

game.modules.get("obs-utils").api.registerUniqueOverlay(YourOverlay);
```

The overlay will then be instanced on reload!

## API Reference

The OBS Utils API provides the following methods and properties:

### Properties

- `overlayTypes`: Map of overlay types registered with the API
- `overlayTypeNames`: Map of readable names for overlay types
- `singleInstanceOverlays`: Set of Svelte components registered as single instance overlays

### Methods

#### registerOverlayType(key: string, readableName: string, type: OverlayType)

Registers a new overlay type with the API.

**Parameters:**
- `key` (string): The key to identify the overlay type
- `readableName` (string): A human-readable name for the overlay type
- `type` (OverlayType): The overlay type object

#### registerUniqueOverlay(overlay: SvelteComponentConstructor)

Registers a Svelte component as a unique overlay that will be rendered once.

**Parameters:**
- `overlay` (SvelteComponentConstructor): The Svelte component to register

#### getSelectedActors()

Returns the currently selected actors for overlays.

**Returns:** Array of actor IDs

#### setSelectedActors(actorArray: string[])

Sets the selected actors for overlays.

**Parameters:**
- `actorArray` (string[]): Array of actor IDs

#### setAVData(actorValueArray: ActorValues)

Sets actor values data.

**Parameters:**
- `actorValueArray` (ActorValues): Actor values data

#### getOBSWebsocketClient()

Returns the OBS WebSocket client if the WebSocket API is allowed.

**Returns:** OBS WebSocket client or undefined

#### isOBS()

Checks if the current context is OBS.

**Returns:** boolean

### ObsUtilsApi

The main API class that provides methods for registering overlay types and components.

```typescript
export class ObsUtilsApi {
  // Properties
  overlayTypes: Map<string, OverlayType>;
  overlayTypeNames: Map<string, string>;
  singleInstanceOverlays: Set<SvelteComponentConstructor>;

  // Methods
  registerOverlayType(key: string, readableName: string, type: OverlayType);
  registerUniqueOverlay(overlay: SvelteComponentConstructor);
  getSelectedActors();
  setSelectedActors(actorArray: string[]);
  setAVData(actorValueArray: ActorValues);
  getOBSWebsocketClient();
  isOBS();
}
```

### OverlayType

A class for defining custom overlay types.

```typescript
export class OverlayType {
  // Properties
  overlayEditor: SvelteComponentConstructor;
  overlayComponents: Map<string, SvelteComponentConstructor>;
  overlayClass: SvelteComponentConstructor;
  overlayComponentNames: Map<string, string>;
  overlayComponentEditors: Map<string, SvelteComponentConstructor>;
  compactEditorButtons: Map<string, boolean>;

  // Methods
  registerOverlayEditor(editor: SvelteComponentConstructor);
  registerComponent(key: string, readableName: string, type: SvelteComponentConstructor);
  registerComponentEditor(key: string, editor: SvelteComponentConstructor, compactButtons: boolean);
}
```
