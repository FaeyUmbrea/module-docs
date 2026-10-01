---
title: "Integration notes"
---

This companion contributes system data and events to OBS Utils. It does not expose a standalone API for other modules to call.

Build integrations against the [OBS Utils host API](/obs-utils/public/5.3.0/dev/), rather than reaching into the companion's internal handlers. The host owns trigger registration, actor-value picker data, and OBS action dispatch.

This companion is still unreleased. Its development behaviour is not a compatibility contract for an installed release.
