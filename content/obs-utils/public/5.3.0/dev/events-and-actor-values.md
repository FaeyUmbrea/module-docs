---
title: "Events and actor values"
---

Register a trigger when your integration starts. Fire it when the corresponding event happens. The registration tells the editor which fields exist; the runtime payload supplies their values.

## Register an overlay trigger

```js
obs.registerOverlayTrigger({
  key: 'my-module.healthChanged',
  name: 'my-module.triggers.healthChanged',
  icon: 'fas fa-heart',
  payloadSchema: [
    { key: 'current', type: 'number', label: 'my-module.fields.currentHealth' },
    { key: 'maximum', type: 'number', label: 'my-module.fields.maximumHealth' },
  ],
});
```

Give each payload field a stable key. Supported field types are `number`, `string`, `boolean`, `Actor`, `ChatMessage`, and `Roll`. Labels are localized through `game.i18n.localize()`.

When your system handler sees the event, use the same registration key and payload field names:

```js
obs.fireOverlayTrigger('my-module.healthChanged', {
  current: 8,
  maximum: 12,
});
```

Users can configure overlay conditions and reference fields as `trigger.current` or `trigger.maximum`. You are reporting an event, not selecting or replacing their overlay configuration.

The declaration describes the payload you promise. It does not validate every value your integration sends, so construct the payload deliberately at your system boundary.

## Offer configurable OBS actions

Overlay triggers and OBS remote events are separate registrations. Register an OBS event type if users should be able to configure OBS actions for it.

```js
obs.registerOBSRemoteEventType({
  key: 'my-module.healthChanged',
  name: 'my-module.triggers.healthChanged',
  icon: 'fas fa-heart',
  conditionFields: [
    { key: 'threshold', type: 'number', label: 'my-module.fields.threshold', default: 5 },
  ],
  matcher: (conditions, context) => context.current <= conditions.threshold,
});

await obs.triggerOBSRemoteEvent('my-module.healthChanged', { current: 8 });
```

`conditions` contains a configured instance's saved values. `context` is the event data you pass when firing it. Without a matcher, the configured instance always matches.

OBS action execution is gated to the OBS-mode client. The released API allows event dispatch from other clients; you do not need to duplicate that execution gate in your event registration.

## Supply actor-value fields

System integrations can provide a grouped list of actor paths for the data picker:

```js
obs.setAVDataGrouped([
  {
    label: 'my-module.groups.health',
    order: 10,
    items: [
      { value: 'system.attributes.hp.value', label: 'my-module.fields.currentHealth' },
      { value: 'system.attributes.hp.max', label: 'my-module.fields.maximumHealth' },
    ],
  },
]);
```

Those paths are examples for a system that actually stores health there. Check your system's actor model before using them.

`setAVDataGrouped()` replaces the current catalogue; it does not append to it. Last writer wins. Use this for the integration responsible for that system's picker data, rather than having unrelated modules repeatedly replace one another's lists.

See [OverlayTriggerRegistration](../interfaces/overlaytriggerregistration/), [OBSRemoteEventTypeRegistration](../interfaces/obsremoteeventtyperegistration/), and [ActorValueGroup](../interfaces/actorvaluegroup/) for the release contracts.
