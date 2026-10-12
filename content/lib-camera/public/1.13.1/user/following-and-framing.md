---
title: "Following and framing"
---

Cooperating modules can frame one or more tokens, keep movement within scene
bounds, and follow another user's view. The module requesting control decides
what to follow and when; libCamera supplies the shared camera controls.

A GM can send camera movements to other users. Those requests affect every
open session belonging to the selected user and respect each session's
priorities and opt-out. Ordinary users can follow another user's view but
cannot move another user's camera.
