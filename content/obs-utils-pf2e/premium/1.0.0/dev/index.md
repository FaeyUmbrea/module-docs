---
title: "Integration notes"
---

The PF2e companion registers curated actor values, starter overlays and system events with OBS Utils. It does not expose a standalone API. Use the [OBS Utils API](/obs-utils/public/5.3.0/dev/) for integrations.

These notes cover the 1.0.0 package distributed through Foundry’s protected platform.

## Event payloads

| Trigger key | Event fields |
| --- | --- |
| `pf2e.onCheckResolved` | `actor`, `outcome`, `checkType`, `summary` |
| `pf2e.onResourceChanged` | `actor`, `resource`, `previous`, `current`, `delta`, `direction`, `summary` |
| `pf2e.onConditionChanged` | `actor`, `condition`, `conditionName`, `change`, `previous`, `current`, `summary` |
| `pf2e.onTurnStart` | `actor`, `round`, `turn`, `summary` |
| `pf2e.onRest` | `actor`, `summary` |

Use the exact trigger key when selecting one of these registered events. `actor` is the actor associated with the event. `summary` is translated display text: bind a temporary text component to `trigger.summary` to show it, and use the structured fields for matching events.

See the [user guide](../user/#use-pf2e-events) for supported filter values. A resource's `delta` is `current - previous`. Combat `turn` is zero-based; the displayed summary adds one. Condition values may be `null` for unvalued conditions or a side of the change where the condition is absent.

The companion registers five event families; it does not register separate Dying, Wounded or critical-success event keys. Select those cases using the condition slug, change or check outcome fields.

Payload filters, custom test payloads and actor-specific animation targeting require the newer OBS Utils build described in the user guide. When supporting released OBS Utils 5.3.0, account for those limitations.
