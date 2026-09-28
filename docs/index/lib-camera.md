---
title: libCamera
description: Manage modules that control your Foundry camera.
---

# libCamera

libCamera lets cooperating modules share camera control. You choose which module
takes priority and can stop camera control whenever you need to.

## Installation

In Foundry Setup, open **Add-on Modules → Install Module** and paste the
manifest URL for your Foundry version:

| Foundry version | Manifest URL |
| --- | --- |
| 13.351 or later | `https://github.com/FaeyUmbrea/foundry-lib-camera/releases/download/v1.13.0/module.json` |
| 14 | `https://github.com/FaeyUmbrea/foundry-lib-camera/releases/download/v1.14.0/module.json` |

libCamera requires libWrapper. Foundry will offer to install it if needed.
3D Canvas is optional.

## Following and framing

Cooperating modules can frame one or more tokens, keep movement within scene
bounds, and follow another user's view. The module requesting control decides
what to follow and when; libCamera supplies the shared camera controls.

A GM can send camera movements to other users. Those requests affect every
open session belonging to the selected user and respect each session's
priorities and opt-out. Ordinary users can follow another user's view but
cannot move another user's camera.

On Foundry 14, movements can include a scene level. The requested level must
be available to the receiving user. Foundry 13 does not provide this feature.

## Camera controls

Open **Game Settings → Configure Settings → libCamera → Open camera controls**.
The panel shows the current owner of your camera, whether manual camera input is
temporarily locked, and the modules registered with libCamera. Use **Refresh** to
update the displayed information.

**Release current claim** ends the current module's claim. Another module can
then request control. To prevent further requests as well, choose
**Stop and disable camera control**. This stops movement through libCamera,
restores manual input, and keeps control disabled on this client until you
choose **Re-enable on this client**.

You can also use the **Stop and disable camera control** keybinding, initially
**Control + Shift + Escape**. Change it in Foundry's **Configure Controls** if
that combination conflicts with your operating system or another application.

These controls affect modules using libCamera. A module that moves the camera
directly has its own controls.

## Module priorities

Higher priorities take precedence. When two modules have the same priority,
the current owner keeps control.

Enter a whole number under **This client** to override a module's priority for
your current client. Leave the field blank to inherit the world default or the
module's own default. Choose **Save priorities** to apply your changes.

A GM can set **World default** priorities for all clients. Individual client
overrides take precedence. Changing a priority affects the next request for
control; it does not immediately end an existing claim.

## World-wide controls

GMs have a separate **World-wide controls (GM)** section. **Stop and disable for
everyone** ends library camera control across the world and prevents further
requests, including on clients that connect later.

**Re-enable for everyone** removes the world-wide block. It preserves each
client's individual opt-out. If camera control remains disabled for you,
choose **Re-enable on this client** too.

## Why a module could not take control

Open **Recent ownership events** to see recent requests and why they ended or
were rejected. A `busy` result means another claim has equal or higher priority.
A `disabled` result means camera control is stopped locally or world-wide.

Changing scenes releases current claims. Modules must request control again
after the new canvas is ready.

## 3D Canvas

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
