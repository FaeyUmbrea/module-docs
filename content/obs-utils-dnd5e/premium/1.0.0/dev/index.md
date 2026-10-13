---
title: "Integration notes"
---

The D&D 5e **1.0.0** companion registers curated actor fields, events and a starter overlay with OBS Utils. It has no standalone public API or type package. Use the [OBS Utils API](/obs-utils/public/5.3.1/dev/) for integrations.

## Event payloads

| Trigger key | Event fields |
| --- | --- |
| `dnd5e.onCrit` | `actor`, `weapon`, `summary` |
| `dnd5e.onCritFail` | `actor`, `summary` |
| `dnd5e.onDeathSave` | `actor`, `success`, `summary` |
| `dnd5e.onLevelUp` | `actor`, `newLevel`, `summary` |
| `dnd5e.onActivityUse` | `actor`, `item`, `summary` |
| `dnd5e.onRest` | `actor`, `rest`, `newDay`, `summary` |
| `dnd5e.onResourceChanged` | `actor`, `resource`, `previous`, `current`, `delta`, `direction`, `summary` |
| `dnd5e.onConditionChanged` | `actor`, `condition`, `change`, `previous`, `current`, `summary` |

`actor` identifies the actor associated with the event. Bind a temporary text component to `trigger.summary` for translated display text; use structured fields for matching. See the [user guide](../user/#use-dd-events) for filter values. Resource `delta` is `current - previous`. Inspiration and unvalued conditions use 0/1; exhaustion retains its numeric level.

Game clients initialize through `ready`; stream clients initialize through `streamReady`. The companion seeds per-client snapshots before comparing changes. Receiving an actor for the first time doesn't imply a resource gain or loss. Public chat cards provide the persisted roll and activity results; private and blind cards are excluded.

Optional choice and custom-preview metadata remains compatible with public OBS Utils 5.3.0, which ignores those additional fields. Actor-specific animation playback requires 5.3.1 or newer; event payload filters and custom previews require a host build that implements them.

## Maintain curated fields

Edit the small resource files in `resources/av-data/`. Run `yarn checkParity`, choose to copy the extractor, and paste it into the Foundry browser console. Paste the resulting actor data back into the CLI.

The review separates absent curated paths from uncurated candidates. It supports correcting entries, adding translation keys, retaining the latest extraction and reviewing ignored fields. `ignore.json` excludes candidates from parity reports and isn't imported by the module. It doesn't block raw paths in OBS Utils. An absent path may be optional for the sampled actor types; review it before removing it.

The 6.0.6 review sample contained five characters. It accounted for every extracted leaf, with 477 of 489 curated paths present and 12 conditional fields retained. This sample doesn't establish NPC, vehicle or group runtime coverage.
