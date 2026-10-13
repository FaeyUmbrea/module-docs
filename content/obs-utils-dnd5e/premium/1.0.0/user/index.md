---
title: "OBS Utils · D&D 5e"
---

The D&D 5e companion adds curated actor values, system events and a Player Ribbon preset to OBS Utils. These pages cover **1.0.0**, distributed through Foundry’s protected package platform.

## Requirements

| Dependency | Supported versions |
| --- | --- |
| Foundry VTT | 14.369 or newer within V14 |
| D&D 5e | 6.0.6 or newer within V6 |
| OBS Utils | Either Free or Premium, version 5.3.0 or newer; enable only one edition |

English is included. Actor values and overlay animations don't require an OBS WebSocket connection. Connect OBS when you want events to run OBS Remote actions.

## Set up the companion

1. Install the companion through Foundry’s protected package platform using your premium access.
2. Enable **OBS Utils - D&D 5e** in your D&D world alongside either OBS Utils or OBS Utils Premium.
3. Reload the world. If a GM receives a dependency error, enable or update the module named in the message and reload again.
4. Follow the [OBS Utils setup guide](/obs-utils/public/5.3.1/user/) to connect your stream browser and select actors.

The current module ID is `obs-utils-dnd5e`. The archived 0.2.0 guide covers the older Foundry 11 module.

## Choose actor values

Use the actor-value picker for named fields covering abilities, skills, defenses, resources, movement, senses and character details. For a field outside the curated list, enter its raw path, such as `system.attributes.ac.value`.

Values come from the selected actor’s data. Fields that don't exist on that actor stay empty; empty doesn't mean zero. The companion doesn't modify actor data or restrict which raw paths a GM may display.

## Import the Player Ribbon

Open the Overlay Editor, click **Import starter overlays** and confirm the import. Select **Player Ribbon (D&D 5e)** and choose the actors to display.

The ribbon is **420×156 pixels** and shows portrait, name, level, HP and AC. Damage and healing briefly highlight the HP area. Each event can show its translated details for **2.8 seconds**, while the actor readouts remain visible. You can edit the imported layout, styling and animations.

OBS Utils 5.3.0 plays actor events on every ribbon. Use 5.3.1 or newer for actor-specific playback. Payload filters and the separate custom-event editor require a newer OBS Utils build that provides those controls.

## Use D&D events

In an overlay’s **Animation** tab, use **Add trigger response** to choose an event and its destination track. Configure filter fields where your OBS Utils build supports them.

| Event | Available values |
| --- | --- |
| **Critical Hit** | Actor and weapon name |
| **Critical Fail** | Actor |
| **Death Save** | Actor and whether the save succeeded |
| **Level Up** | Actor and new level |
| **Activity Used** | Actor and item name |
| **Rest** | `short` or `long`, plus whether a new day started |
| **Resource Changed** | `hp`, `tempHp` or `inspiration`; previous/current values, delta and `increased` or `decreased` |
| **Condition Changed** | Condition identifier, `added`, `removed` or `valueChanged`, and previous/current values |

Leave a filter blank to accept any value. For a damage effect, select **Resource Changed**, resource `hp`, direction `decreased`. Exhaustion uses **Condition Changed**, condition `exhaustion`. Concentration uses `concentrating`. Inspiration and unvalued conditions use 0 for absent and 1 for present.

Attack criticals, death saves, activity usage and rests come from public system chat cards. Private and blind cards don't produce stream events. Resource, level and condition changes come from actor and Active Effect updates. Keep lasting readouts bound to actor data and use events for temporary effects.

These events also appear in **OBS Remote Settings**, where you can configure OBS actions and use the available text filters. Follow the base module guide to connect OBS first.

## Follow transformations

When a selected world actor transforms into another world actor, the companion follows the transformed actor. Deleting that transformed actor restores the original selection. Unlinked token transformations don't create a world actor and aren't covered by this tracking.

## Troubleshooting

**No fields or events:** enable the companion in a compatible D&D world and exactly one supported OBS Utils edition. Correct any GM startup message, then reload.

**An empty readout:** check the selected actor and its path. Actor types don't all provide the same fields.

**An Item-only change doesn't refresh:** with OBS Utils 5.3.0, the value may appear after another actor update or a stream reload.

For help, join [Discord](https://discord.com/invite/WfMaKPPdeM).
