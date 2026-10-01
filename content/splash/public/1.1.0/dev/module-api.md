---
title: "Module API"
---

The API is `game.modules.get('splash').api`. Splash attaches it during `init`, registers its built-ins, and emits `splash.init`.

## Open a splash

Use a splash **JournalEntryPage UUID**, not the parent journal UUID or a title:

```js
const splash = game.modules.get('splash')?.api;
if (splash) {
  await splash.launch('JournalEntry.JOURNAL_ID.JournalEntryPage.PAGE_ID');
}
```

`launch(uuid, options)` uses the page's configured layer. A handout opens as a window; a fullscreen splash uses its overlay layer. Opening a handout also checks whether the current user can view it.

For an explicit handout request, use `openHandout(uuid)`. For fullscreen launches, `launch()` accepts `{ global: true }` or `{ targetUser: userId }`; check the page's layer rather than assuming those options broadcast a handout.

`close()` requests closing on this client. `close({ global: true })` kills the active splash globally only when the caller is a GM.

## Register a custom action

Register on `splash.init` so the API and built-in registries are ready. Namespace the type key with your module ID and supply a label or localization key.

```js
Hooks.once('splash.init', () => {
  const splash = game.modules.get('splash')?.api;
  if (!splash) return;

  splash.registerAction(
    'my-module.logMessage',
    'my-module.actions.logMessage',
    async action => { console.info(action.message); },
    {
      defaults: { message: '' },
      fields: [{ type: 'text', key: 'message', label: 'my-module.fields.message' }],
    },
  );
});
```

The processor receives the configured action object. `defaults` seeds new actions, and `fields` tells the editor how to expose their properties. A registration with the same type key replaces that registry entry, so avoid collisions with built-ins and other modules.

The module API also registers animations, sprites, effects, and triggers. Their builders have different inputs; do not reuse an action processor as an animation or sprite builder.

## Work with a live runtime

`getSplashState(uuid)` returns the snapshot of an open splash on this client, or `null` when it is not open. `applySplashState(uuid, snapshot)` applies a snapshot to a currently open runtime; it does not open the page by itself.

`openSpectator(uuid)` opens a passive mirror without user input. `closeSpectator(uuid)` closes that mirror. Keep the UUID associated with your integration so cleanup closes the runtime you opened.

For scripts authored in the Splash editor, use [Script actions](../scripting/) instead of assuming these module methods are the `api` argument passed to the script.
