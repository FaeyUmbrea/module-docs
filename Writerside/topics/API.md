# API

OBS Utils comes with an API to allow custom overlays to be registered to it.

Consider any API properties not mentioned in this Guide "internal."
Not all use-cases are supported for external Components and will cause the module to break.

## Self-Contained, single instance overlays

You can create an overlay that will be rendered into the stream page exactly once. 
To do so, create a Svelte component of your desired overlay and then pass the Class Object you get from importing the Svelte Component to the API:

```Javascript
import YourOverlay from "../YourOverlay.svelte";

game.modules.get("obs-utils").api.registerUniqueOverlay(YourOverlay);
```

The overlay will then be instanced on reload!