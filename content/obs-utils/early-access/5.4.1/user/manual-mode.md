---
title: "When OBS mode needs a nudge"
---

OBS browser sources are detected automatically. These settings are for cases where that detection isn't enough. Open **Settings → Configure Settings → OBS Utils Premium → Open Setup → Stream Client**.

| Setting | What it changes |
| --- | --- |
| Pin This Browser to OBS Mode | Keeps this browser in OBS mode until you turn it off. |
| Designate User as OBS Client | Treats the selected Foundry user as the stream client. |
| Force OBS Mode on /stream | Enables overlays on the stream page regardless of the user. |
| Disable OBS Mode for Everyone | Turns OBS mode off across the world. |

If you accidentally put your own browser in OBS mode, **Ctrl + Shift + Alt + O** clears the browser pin. Refresh afterwards. You can change that binding in Foundry's controls configuration.

Use the smallest setting that fits your setup. Usually, automatic detection is all you need.

## Recover your normal browser

1. In the affected browser, press **Ctrl + Shift + Alt + O**, or your replacement binding for **Disable OBS Mode**.
2. Refresh the page. Foundry should return to its normal interface.
3. If it still enters OBS mode, check whether your GM user is selected under **Designate User as OBS Client**. Select the intended stream user instead.
4. Refresh again. Check the OBS browser source separately before changing more settings.
