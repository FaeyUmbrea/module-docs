---
title: "Integration notes"
---

The PF2e/SF2e companion registers curated actor values, starter overlays and system events with OBS Utils. It does not expose a standalone API. Use the [OBS Utils API](/obs-utils/public/5.3.1/dev/) for integrations.

These notes cover the 1.0.1 package distributed through Foundry’s protected platform.

## System selection and compatibility

The package remains `obs-utils-pf2e`. All five event keys below retain their `pf2e.` prefix in both systems, and the starter ribbon retains `ribbon-card-pf2e`. Existing saved event responses do not need migration.

In PF2e worlds, checks read `flags.pf2e.context`; in SF2e worlds, they read `flags.sf2e.context`. The system's persisted check result supplies the outcome. Blind, whispered and inaccessible messages are excluded before dispatch.

Both systems use the shared resource, condition, combat and Rest for the Night observers. The SF2e actor-value picker adds Computers and Piloting fields and omits the Pathfinder Society group without changing the PF2e resources.

Automated hook tests cover both system IDs. Live SF2e game/stream behavior has not yet been verified.

## Event payloads

| Trigger key | Event fields |
| --- | --- |
| `pf2e.onCheckResolved` | `actor`, `outcome`, `checkType`, `summary` |
| `pf2e.onResourceChanged` | `actor`, `resource`, `previous`, `current`, `delta`, `direction`, `summary` |
| `pf2e.onConditionChanged` | `actor`, `condition`, `conditionName`, `change`, `previous`, `current`, `summary` |
| `pf2e.onTurnStart` | `actor`, `round`, `turn`, `summary` |
| `pf2e.onRest` | `actor`, `summary` |

Use the exact trigger key when selecting one of these registered events. `actor` is the actor associated with the event. `summary` is translated display text: bind a temporary text component to `trigger.summary` to show it, and use the structured fields for matching events.

See the [user guide](../user/#use-system-events) for supported filter values. A resource's `delta` is `current - previous`. Combat `turn` is zero-based; the displayed summary adds one. Condition values may be `null` for unvalued conditions or a side of the change where the condition is absent.

The companion registers five event families; it does not register separate Dying, Wounded or critical-success event keys. Select those cases using the condition slug, change or check outcome fields.

Actor-specific animation targeting requires OBS Utils 5.3.1 or newer. Public 5.3.0 ignores the optional filter choices and custom-preview metadata; those controls require a host build that implements them.

## Build an upload ZIP

Run `yarn package` from the companion checkout. It builds the module and writes `.release/obs-utils-pf2e-1.0.1.zip`, using the version in `module.json`. The staged manifest is protected and retains the package ID; the command does not upload or publish anything. See the checkout's `PACKAGING.md` for the shared template packaging instructions.
