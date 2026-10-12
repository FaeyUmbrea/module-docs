---
title: "OBS Utils · Pathfinder 2e"
---

The Pathfinder 2e companion adds curated actor values, five system events and a Player Ribbon preset to OBS Utils. These pages describe the approved **1.0.0** build. Its distribution manifest has not been published yet; this guide will move into the versioned Premium channel when that release is available.

## Requirements

| Dependency | Supported versions |
| --- | --- |
| Foundry VTT | 14.360 or newer within V14; verified against 14.363 |
| Pathfinder 2e | 8.1.2 or newer within V8 |
| OBS Utils | Either Free or Premium, version 5.3.0 or newer; enable only one edition |

English and German are included. The companion does not require an OBS WebSocket connection for actor values or overlay animations. An OBS connection is needed when you want events to run OBS Remote actions.

## Set up the companion

1. Install the companion using the manifest supplied with your premium access once the release is available.
2. Open your Pathfinder 2e world and enable **OBS Utils - Pathfinder 2e**, alongside either OBS Utils or OBS Utils Premium.
3. Reload the world. If the companion reports a dependency error, follow the message to enable or update the required module, then reload again.
4. Follow the [OBS Utils setup guide](/obs-utils/public/5.3.0/user/) to connect your stream browser and choose which actors to display.
5. Open the Overlay Editor to use the PF2e values, events or preset.

The companion adds to OBS Utils; it does not replace the base module or configure your OBS scene for you.

## Choose actor values

Use the actor-value picker for named fields covering health, defenses, abilities, saves, skills, resources, conditions, movement, character details and token data. For a field that isn't listed, enter its raw path instead, for example `system.attributes.hp.value`.

Values come from the selected actor's current data. An absent field stays empty, so a character-only field may be blank on a party or creature. The companion does not change actor data or restrict which raw paths a GM may display.

## Import the Player Ribbon

In the Overlay Editor, click **Import starter overlays** and confirm the import. The companion supplies **Player Ribbon (PF2e)**. Select it and choose the actors you want to display through OBS Utils.

The ribbon is **420×156 pixels**. It shows portrait, name, class, HP and maximum HP, AC, Hero Points, Focus Points, Dying and Wounded. These readouts stay tied to the actor's data.

HP loss briefly highlights damage; HP gain highlights healing. All five event families can display a translated event description inside the ribbon for **2.8 seconds**. Another event replaces the current effect. You can edit the imported ribbon's layout, styling and animations in the Overlay Editor.

**With released OBS Utils 5.3.0:** actor events animate every actor's ribbon. Playback on only the matching actor requires the targeting correction in the newer OBS Utils build. Event payload filters and custom event testing also require that newer build.

## Use PF2e events

In an overlay's **Animation** tab, add tracks and use **Add trigger response** to choose a PF2e event. Choose the destination track and configure any filter fields available in your OBS Utils build.

| Event | Available options and values |
| --- | --- |
| **Check resolved** | Outcome: `criticalSuccess`, `success`, `failure`, `criticalFailure`. Check type, such as `attack-roll` or `saving-throw`. |
| **Resource changed** | Resource: `hp`, `heroPoints`, `focus`. Previous and current values, delta, and direction: `increased` or `decreased`. |
| **Condition changed** | Condition slug, such as `frightened`, plus its display name. Change: `added`, `removed`, `valueChanged`. Previous and current values. |
| **Turn started** | The active actor, combat round and turn. |
| **Rest for the Night** | The actor that rested. |

Every event includes its actor and a translated summary. Leave a filter blank to accept any value; fill it with an exact option from the table to narrow the response. For example, an HP-damage effect uses **Resource changed**, resource `hp`, direction `decreased`. A frightened-condition effect uses **Condition changed**, condition `frightened`; add change `added` if it should run only when the condition first appears.

Dying and Wounded use **Condition changed**, including decreases and removal. A condition without a numeric value has no previous/current number to display. Resource changes include both gains and losses.

For temporary effects, return the animation to its normal track when the effect ends. Keep persistent state, such as HP or Dying, bound to actor values so the overlay reflects the current actor even after a stream reload.

### What causes an event?

- Public PF2e checks use the system's calculated outcome, including DC margins and natural 20/1 adjustments. Whispered, blind and unreadable checks do not fire.
- Resource events fire when HP, Hero Points or Focus Points change.
- Condition events fire when an active condition is added, removed or changes value.
- Turn events fire when combat advances to a visible combatant. Hidden combatants do not fire them.
- Rest events come from PF2e's **Rest for the Night** action. Manual healing or a chat message saying that an actor rested does not count.

Use the editor's event test controls to preview animations. In builds with the separate custom-event button, choose an actor and edit the sample fields before firing the test. Also try a real public check or resource change to confirm the world and stream setup.

## Use events with OBS Remote

The same five PF2e events are available in OBS Remote Settings. Configure an event to run the OBS action you want and, where supported, use its text filters to narrow the match. For example, filter **Check resolved** to `criticalSuccess` to run an action only for that outcome.

Follow the [OBS Utils guide](/obs-utils/public/5.3.0/user/) for OBS WebSocket setup. Adding the companion alone does not enable a connection or create remote actions.

## Troubleshooting

**No PF2e fields or events appear:** check that the companion is enabled in a PF2e world and exactly one supported OBS Utils edition is enabled. A GM receives a persistent startup message if the required version or API is missing. Correct the setup and reload.

**A value is empty:** check the selected actor and its data path. Not every actor type has every field; empty does not mean zero.

**An effect plays on every ribbon:** this is a limitation of released OBS Utils 5.3.0. Use the updated OBS Utils build with actor-specific targeting when available.

**A private check does not play an effect:** private and blind checks are intentionally excluded from stream events.

**An item field does not refresh immediately:** in released OBS Utils 5.3.0, an Item-only change may appear after the next actor update or a stream reload.

For help, join [Discord](https://discord.com/invite/WfMaKPPdeM). To contribute human translations, visit [Void Monster Translations](https://translate.void.monster/projects/obs-utils/pf2e/).
