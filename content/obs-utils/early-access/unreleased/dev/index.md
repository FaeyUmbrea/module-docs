---
title: "OBS Utils early access"
---

This early-access edition has no published release type package yet. Its developer reference will be attached to the matching package when the release is available.

The public [5.3.0 developer docs](/obs-utils/public/5.3.0/dev/) describe that public release. Check the release and package version before using them as an integration contract.

## Settings UI

Setup uses a dedicated Svelte application on Foundry's ApplicationV2, following the module's application pattern. It groups only settings previously exposed individually. Director controls, Overlay Editor data, and OBS Remote editing remain in their own applications.

The registered setting keys, scopes, defaults, and `obs-utils` storage namespace are unchanged. The installed premium package registers the menu as `obs-utils-premium.setup`. External integrations using these settings do not need a storage migration.

Setup checks `SETTINGS_MODIFY` before exposing or saving world settings. Client and user preferences remain available to their owner. Changes requiring a reload use Foundry's reload confirmation, with a world reload when required by the changed setting's scope.
