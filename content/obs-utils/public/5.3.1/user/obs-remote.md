---
title: "Control OBS from Foundry"
---

OBS Remote connects Foundry events to OBS actions. For example, combat starting can switch to your encounter scene, or a scene change can enable a source.

## Connect

Open **OBS Remote Settings**. Its **Connection** tab holds the OBS WebSocket connection details. Save them, then sync them to the intended OBS user if you're configuring the connection from your GM browser.

Enable **OBS Websocket?** in the module settings when you need WebSocket actions. The browser-source API can switch scenes and start or stop recording or streaming; source controls need WebSocket access.

## Add an event

In the **Events** tab, choose the event and add its actions in the order they should run. Scene-load events can be narrowed to a particular scene name.

Start with one action, such as switching to a named OBS scene when combat starts. Check that the name matches OBS exactly, then try the event while watching the source.

## If nothing happens

Check the connection, whether WebSocket access is enabled for the action, and whether the configuration reached the OBS user. A working Foundry game view does not by itself confirm that OBS Remote is connected.
