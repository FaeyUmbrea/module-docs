---
title: "Following and remote clients"
---

Following holds camera ownership until it stops. Start it from a feature that the user has chosen to enable, keep its handle, and stop it when that feature is finished.

## Follow a local target

Pass a function that returns the next `MoveOptions`. Returning `undefined` skips that sample; it does not end the follow operation.

```js
const started = consumer.follow(() => {
  const point = camera.tokenPosition(tokenId);
  return point ? { ...point, duration: 150 } : undefined;
});

if (started.ok) {
  const follow = started.follow;
  // Keep this handle in your integration and call follow.stop() on cleanup.
  void follow.done.then(result => console.debug('Following ended:', result));
}
```

The default sampling interval is **33ms**. An explicit interval must be between **16 and 60000ms**. Invalid intervals or a non-function source throw `TypeError`.

`pause()` suspends sampling and cancels the current move, but keeps ownership. `resume()` continues a paused operation. `stop()` ends it and releases the claim. Preemption, panic controls, scene teardown, and source or movement failures also end it; `done` resolves with the outcome.

## Request movement on another client

The local consumer only controls this browser's camera. For other clients, use `camera.moveRemote(consumerId, targets, options, remoteOptions)`.

```js
const results = await camera.moveRemote(
  consumer.id,
  [targetUserId],
  { x: 1000, y: 1000, duration: 500 },
  { timeout: 5000 },
);

for (const result of results) {
  console.debug(result.userId, result.status, result.outcomes);
}
```

Targets are a user ID, an array of user IDs, or `'*'` for active users. A GM can target other users; a player can target their own user. The consumer must also be registered on the receiving client. Each receiver applies its own priorities and stop controls, and must be on the same scene.

`timeout` is milliseconds, from **100 to 65000**. It defaults to the movement duration plus 2000ms, capped at 65000ms. Pass an `AbortSignal` as `remoteOptions.signal` when your feature can be cancelled.

## Read the results correctly

You get one `RemoteUserResult` per target user. `acknowledged` means at least one session responded, not that every open browser session completed the move. Inspect each entry in `outcomes` for its actual movement result.

`offline`, `timeout`, `cancelled`, and `rejected` describe the request outcome. An `unauthorized`, `wrong-scene`, or `unregistered` receiver cannot perform the requested operation. Do not count an acknowledgement as a completed camera move.

## Observe or follow a user's view

`camera.observeUser(userId, callback, mode)` returns a subscription with `stop()`. Samples include the source user, scene, and 2D position. Keep the handle and stop it during cleanup.

`camera.followUser(consumerId, userId, options, mode)` follows the latest responding session for that user on the current scene. Check `ok` and keep its follow handle just as with local following.

Tracking modes are `raw`, `smooth`, and `dragRelease`. Choose the mode to suit your integration; changing modes does not bypass ownership or remote authorization.

[CameraFollow](../interfaces/camerafollow/), [RemoteUserResult](../interfaces/remoteuserresult/), and [RemoteOptions](../interfaces/remoteoptions/) contain the released signatures.
