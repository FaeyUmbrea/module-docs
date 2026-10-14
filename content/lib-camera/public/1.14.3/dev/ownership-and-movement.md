---
title: "Ownership and movement"
---

Register once, then use the returned consumer whenever your integration needs the local camera. Your registration identifies the module and supplies a default priority. It does not take ownership immediately.

## Move once

Use `consumer.move()` for a single pan. It acquires a claim, performs the move, and releases the claim even when movement fails. The camera must be ready; call this from your feature's action handler after `canvasReady`.

```js
async function showLocation(consumer, x, y) {
  const result = await consumer.move({ x, y, duration: 500 });
  if (result.status === 'completed') return result.position;

  console.debug('My module | Camera move did not complete:', result);
  return undefined;
}
```

`x` and `y` are the viewport centre in scene pixels. Omitted position fields keep their current values. `duration` is milliseconds; `0` applies the view immediately. See [coordinates and framing](../coordinates-and-framing/) before passing grid positions or rectangles.

## Handle the outcome

A resolved promise does not necessarily mean the camera reached its destination.

| Status | What it means | What your integration should do |
| --- | --- | --- |
| `completed` | The operation reached its target. | Use the returned position if needed. |
| `cancelled` | The claim ended or the operation was cancelled, interrupted, or retargeted. | End the action or let its replacement continue. |
| `rejected` | Control or movement could not begin. | Check `reason`; do not retry a user's stop decision. |
| `failed` | The camera adapter failed. | Stop the sequence and report useful context in your module. |

A `busy` rejection can mean another consumer already owns the camera, or that your session already has an operation running. `unavailable` means the needed camera is not ready. `invalid-input` means the move itself needs correcting. `disabled` reflects a user's stop control.

## Hold control for a sequence

Use `consumer.acquire()` when several moves belong to one operation. Check `ok` before using its claim, and release it in `finally`.

```js
async function showTwoLocations(consumer) {
  const acquired = consumer.acquire();
  if (!acquired.ok) return acquired;

  const session = acquired.claim;
  try {
    const first = await session.move({ x: 1000, y: 1000, duration: 500 });
    if (first.status !== 'completed') return first;
    return await session.move({ x: 1600, y: 1000, duration: 500 });
  } finally {
    session.release();
  }
}
```

A session permits one movement at a time. Await `session.move()` before starting the next one. To replace a movement already in progress, use `session.retarget()`; it continues from the actual camera view.

`session.signal` is aborted when ownership ends. Your other work should observe it too, so timers or tracking do not keep running after the camera claim is gone.

## Respect priorities and cleanup

Higher effective priorities take precedence. Equal-priority requests leave the existing owner in control. The user can override your default priority, release a claim, or stop camera control entirely.

A scene change releases transient claims. Wait for the new canvas before asking for control again. Reuse your registration across scenes; unregister when the integration itself is disabled or disposed.

Continuous tracking has its own stop handle. See [following and remote clients](../following-and-remote-clients/).

[LocalConsumer](../interfaces/localconsumer/), [CameraSession](../interfaces/camerasession/), and [MovementResult](../type-aliases/movementresult/) describe this release's contracts.
