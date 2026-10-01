---
title: "Splash script actions"
---

A Script action runs as the body of an async function. It receives `scope`, `context`, and `api`.

Put the script in the action's script field. You can use `await` directly; you don't need to wrap the code in another function.

- `scope` is the object that fired the action, within the live object tree.
- `context` is its configured context data.
- `api` supplies helpers for the running splash.

```js
api.setValue('solved', 'yes');
await api.changeState(['unlocked'], ['locked']);
```

`setValue()` updates a value in the running splash and refreshes its objects. Conditions compare values as strings, so use the same spelling as the condition you've configured. `changeState()` takes the state IDs to load first, then the IDs to unload. A state change already running blocks another change while its animations finish.

## Finish a door puzzle

For a door-launched puzzle, `api.trigger.door` identifies the launch door. `api.unlockDoor()` requests an unlock for that door; you can also pass a wall UUID explicitly. Use `api.close()` to request that the splash close.

```js
if (String(context.answer).toLowerCase() === 'friend') {
  api.setValue('solved', 'yes');
  api.unlockDoor();
  api.close();
}
```

Here, `answer` is a field you've supplied in the firing object's context. The runtime passes that context to your script. A script error is logged as `Splash | inline script failed` in the browser console.

These are runtime script helpers, separate from the module's registration API. The 1.1.0 release has no published type archive, so there is no generated release API reference here.
