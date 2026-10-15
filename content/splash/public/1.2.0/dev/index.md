---
title: "Splash 1.2.0 integration"
---

These notes cover Splash 1.2.0. Its generated reference uses the exact published `@faeyumbrea/splash-api-types@1.2.0` package; earlier module releases retain their own documentation mappings.

## Editor field metadata

The development API adds optional `source: 'values'` metadata to text fields. Use it for a field that names a shared runtime value. Splash offers value names already used in the edited handout while continuing to allow new names.

```ts
{
  type: 'text',
  key: 'key',
  label: 'Value name',
  source: 'values',
}
```

A state selector still stores state keys. The editor displays the corresponding state labels; changing a label does not change the action's stored key.

Built-in action validation reports missing inputs and references to removed states. It does not infer validation rules for third-party action types. Register the fields and defaults your action requires through the existing action metadata contract.

## Playback observations

The editor's test host uses the normal runtime and renderer. Its states and values are observations of runtime snapshots; restarting disposes that playback and creates a fresh one from the authored configuration. A preview has no source-page UUID, so it does not attach a shared-state driver or presence reporter.

Maintainer architecture and ownership notes belong in the project's YouTrack documentation. These notes describe extension-facing behaviour, rather than the editor's internal component structure.

## Launch permissions

`show(uuid)` checks Observer access for local playback. Passing `targetUser` requires Owner access to that page. Passing `global: true` requires a GM; a rejected global request does not fall back to local playback. `openHandout(uuid)` continues to require Observer access.

Trigger binding grants access to the bound page without raising parent-journal ownership. Code that launches a page locally does not need to grant ownership of its journal or sibling pages.

Module socket receivers use the sender ID supplied by Foundry's server. The `senderId` field inside older messages is retained for compatibility but does not establish permission. Shared-state proxies require a readable Splash page in synced mode and validated field operations or a structurally valid legacy snapshot. OBS mirroring requires both the watched player and the OBS client to be able to read the page.

In an inline script, `api.unlockDoor()` uses the door that launched the handout. A player's request is accepted only for a door bound to a Splash page that player can read. Passing a different door UUID does not bypass that check. A GM can still open an unbound door explicitly.

## Close scope

An authored Close action in the GM’s current global fullscreen overlay ends that global launch, clearing its saved state and live controls. The same action stays local for players, journal handouts and previews. `close()` on the public API remains a local close; `close({ global: true })` requires a GM and ends the global launch.

## Shared value commands

Once synced playback connects, built-in Set and Increment actions run on the active GM against the latest pending state. The GM may accept a declared command without opening the handout. Text inputs may supply a string for their declared value binding. Other local state and macro edits still use field-change proxies.

Declared actions include button and hotspot clicks, drop-zone reactions and state-entry actions. A player's Set or Increment must match the authored action, including its value or step; naming a valid object does not authorize an altered command. A text input is the exception because its declared binding accepts the player's typed string.

Local and shared increments use the same clamp and wrap rules. Built-in increments preserve concurrent clicks; custom script read-modify-write sequences are not atomic commands. Clients adopt the accepted flag snapshot, notifying snapshot observers and presence without echoing shared fields as local changes. Reload clients together when updating the synchronization protocol.

Votes are recorded by the active GM even when that GM has not opened the handout. A user has one current choice per handout; another vote replaces that choice. With tallies visible to all, `vote:<optionId>` values contain the counts and clearing votes zeros them. GM-only tallies stay in the GM's vote ledger rather than entering the shared runtime flag.
