---
title: "OBS Utils · Call of Cthulhu"
---

The Call of Cthulhu 7e companion adds curated actor values, system events and an Investigator Ribbon to OBS Utils. These pages cover **1.0.0**, prepared for Foundry’s protected package platform. Installation becomes available when the package is approved and published there.

## Requirements

| Dependency | Supported versions |
| --- | --- |
| Foundry VTT | V14 |
| Call of Cthulhu 7th Edition | CoC7 8.15 or newer; manifest verified on 8.15 |
| OBS Utils | Either Free or Premium, version 5.3.0 or newer; enable only one edition |

English is included. Actor readouts and overlay animations don't require an OBS WebSocket connection. Connect OBS when you want events to run OBS Remote actions.

## Set up the companion

1. Once available, install the companion through Foundry’s protected package platform using your premium access.
2. Enable **OBS Utils - Call of Cthulhu 7e** in a CoC7 world alongside either OBS Utils or OBS Utils Premium.
3. Reload the world. If a GM receives a dependency error, enable or update the module named in the message and reload again.
4. Follow the [OBS Utils setup guide](/obs-utils/public/5.3.1/user/) to connect your stream browser and select actors.

The module ID is `obs-utils-coc`.

## Choose actor values

The picker provides **99 named fields** covering characteristics, HP, MP, SAN, Luck, combat, conditions, investigator details, finances, descriptions, NPCs and vehicles. Automatic calculations, characteristic formulas and derived checks have their own groups. See the [complete field list](./actor-values/).

For anything outside the curated list, enter a raw data path in OBS Utils. The companion doesn't restrict which information the Keeper may display or change actor data. Fields come from the selected actor, and not every actor type has every field. Prototype-token fields describe the actor’s default token configuration.

## Import the Investigator Ribbon

Open the Overlay Editor, click **Import starter overlays** and confirm the import. Select **Investigator Ribbon** and choose the actors to display.

The ribbon is **440×180 pixels** and shows portrait, name, occupation, HP and SAN. HP and SAN gains or losses briefly highlight the resource area. All three event families show temporary event details for **2.8 seconds**, while actor readouts remain visible. Edit the imported layout, styling and animations to fit your stream.

OBS Utils 5.3.0 plays actor events on every ribbon. Use 5.3.1 or newer for actor-specific playback. Payload filters and custom-event previews require an OBS Utils build that provides those controls.

## Use CoC events

In an overlay’s **Animation** tab, use **Add trigger response** to choose an event and its destination track. Configure filter fields where your OBS Utils build supports them.

| Event | Available values |
| --- | --- |
| **Resource changed** | `hp`, `mp`, `san` or `luck`; previous/current values, delta and `increased` or `decreased` |
| **Condition changed** | `tempoInsane`, `indefInsane`, `criticalWounds`, `unconscious`, `dying`, `dead` or `prone`; `added` or `removed`, and previous/current values |
| **Check resolved** | `critical`, `extreme`, `hard`, `regular`, `failure` or `fumble`; check type/key, percentile result and pushed state |

Leave a filter blank to accept any value. For SAN loss, select **Resource changed**, resource `san`, direction `decreased`. For temporary insanity starting, select **Condition changed**, condition `tempoInsane`, change `added`. `criticalWounds` means a major wound.

Resource and condition events compare actor updates. Newly loaded actors establish their starting values without firing changes. Check events come from committed public system chat cards; private, blind and standby cards don't fire. A changed result can fire again after Luck spending or a pushed roll. Keep lasting readouts bound to actor data and use events for temporary effects.

These events also appear in **OBS Remote Settings**, where you can configure OBS actions and exact text filters. Follow the base module guide to connect OBS first.

## Troubleshooting

**No fields or events:** enable the companion in a CoC7 world and exactly one supported OBS Utils edition. Correct any GM startup message, then reload.

**SAN is empty:** check the selected actor’s actual SAN value. A sheet can show a calculated value while the stored field is still unset. Set the actor’s SAN in CoC7 and check the readout again. Unset doesn't mean zero.

**A field is empty:** check its path and actor type. Investigator fields aren't all available on NPCs or vehicles.

**An Item-only change doesn't refresh:** with OBS Utils 5.3.0, the value may appear after another actor update or a stream reload.

For help, join [Discord](https://discord.com/invite/WfMaKPPdeM).
