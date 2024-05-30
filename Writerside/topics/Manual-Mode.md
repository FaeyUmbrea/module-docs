# Manual Mode

## Setup

Version 2.8.0 Adds a new manual mode to the module.

You can either configure the current browser to always load in OBS Mode, regardless of user, or you can configure the a named user to always load in OBS Mode regardless of browser.

You can enable both modes in the settings.

![image.png](image.png)

The "OBS Mode" setting has to be set in the Browser as it is not shared between logins on different browsers.

The "OBS Mode User" setting is stored in the World and will be shared.

## Caveats

In this mode, you will be forced to use OBS Websocket. You will also have to configure it using the Config UI. 
Which means saving your OBS Websocket password to the world file. Any player can extract it from there.