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
