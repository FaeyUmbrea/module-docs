---
title: "Integration notes"
---

The CoC **1.0.0** companion registers curated actor fields, three event families and an Investigator Ribbon with OBS Utils. It has no standalone public API or type package. Use the [OBS Utils API](/obs-utils/public/5.3.1/dev/) for integrations.

## Event payloads

| Trigger key | Event fields |
| --- | --- |
| `coc.onResourceChanged` | `actor`, `resource`, `previous`, `current`, `delta`, `direction`, `summary` |
| `coc.onConditionChanged` | `actor`, `condition`, `change`, `previous`, `current`, `summary` |
| `coc.onCheckResolved` | `actor`, `user`, `userId`, `actorUuid`, `outcome`, `checkType`, `checkKey`, `result`, `pushed`, `summary` |

`actor` is the associated Actor document. A check's actor can be unavailable if its UUID can't be resolved. `user` comes from the ChatMessage; `userId` is its user identifier. `actorUuid`, `checkType` and `checkKey` come from CoC7’s persisted check data and can be empty strings.

Bind a temporary text component to `trigger.summary` for translated display text. Use structured fields for matching; see the [user guide](../user/#use-coc-events) for filter values. Resource `delta` is `current - previous`. Condition values use 0 for absent and 1 for present. `result` is the rendered percentile total. `pushed` indicates that more than one dice-pool entry has been rolled.

The companion sends each event through `fireOverlayTrigger` and `triggerOBSRemoteEvent`. Game clients install observers through `ready`; stream clients use `streamReady`. Starting snapshots suppress changes for newly seen actors, and unlinked token actors retain separate identities.

Check events read persisted `flags.CoC7.load` data and the system-rendered result. Private, blind and standby cards are excluded. Unchanged cards don't emit again; changed outcomes or committed rolls can. Check this persisted-card contract when supporting a newer CoC7 release.

Optional field choices and custom-preview metadata remain compatible with public OBS Utils 5.3.0, which ignores them. Actor-specific animation playback requires 5.3.1 or newer. Payload filters and custom previews require a host build that implements those controls.

## Maintain curated fields

Edit the small files in `resources/av-data/`; see the [field list](../user/actor-values/) for their current contents. Run `yarn checkParity`, choose to copy the extractor, and paste it into the Foundry browser console. Paste the resulting extraction back into the CLI.

Review absent curated paths separately from uncurated candidates. The CLI supports correcting entries, adding language keys, saving the latest extraction and reviewing ignored fields. `ignore.json` excludes parity candidates and isn't imported by the module. It doesn't block raw paths in OBS Utils.

The saved CoC7 8.16 sample contains one character: 84 of 99 curated paths are present, and the 15 absent paths are retained for NPC, creature, vehicle or container actors. All extracted leaves are accounted for, with 102 ignored paths. Presence doesn't imply a populated value; the sample's SAN was null. This sample doesn't establish runtime coverage for other actor types.

## Build the companion

Use Node.js 22.13 or newer and the repository’s Yarn 4.18.1 runtime. Run `yarn install`, `yarn lint`, `yarn typecheck`, `yarn test` and `yarn build`. Build dependencies belong in `devDependencies`; the companion doesn't bundle its Foundry type-support packages. The repository allows only the specific Git repositories required by those types.
