---
title: "3D Canvas"
---

With 3D Canvas installed and a 3D scene open, cooperating modules can read and
set the camera position and viewing target. The same priorities, release and
stop controls apply. Switching between 2D and 3D releases current claims.
3D Canvas is optional; ordinary 2D camera control works without it.

Camera positioning currently uses 3D Canvas's free camera. First-person,
GameCamera, cutscenes and the camera position lock keep their own control;
requests to change the view in those modes return `unsupported-mode`. Switch
back to the free camera to allow a module to position it through libCamera.
The library does not change those modes for you.

Position changes are immediate. 3D Canvas applies its normal camera constraints
and collision handling, and manual camera input stays available.

Cooperating modules can follow another user's native 3D view. Both clients
need a ready free camera on the same scene. The integration can read camera
availability and respond when it changes.

## 3D Canvas credit

This module features the [3D Canvas](https://theripper93.com/module/levels-3d-preview) module by [theripper93](https://theripper93.com/) through its optional camera integration.

3D Canvas has its own [Terms of Use](https://www.patreon.com/theripper93/posts/terms-of-use-65901721). libCamera's Apache-2.0 license does not apply to 3D Canvas. If your module uses this integration, review those terms, including permission and commercial-credit requirements. Contact [theripper93 on Discord](https://discord.theripper93.com/) if you need permission or clarification.
