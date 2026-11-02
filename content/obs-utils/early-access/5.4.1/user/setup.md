---
title: "Setup and importing settings"
---

## Setup

Open **Settings → Configure Settings → OBS Utils Premium → Open Setup**. Setup groups the module's loose settings into **Stream Client**, **Camera**, **Pop-ups & Notifications**, and **Overlays**. Each setting includes a description.

Changes save automatically when you change a toggle or finish editing a field. If a setting needs a reload, use **Reload to apply changes** when you are ready. **Import & Reset** contains the edition import and **Reset Defaults**. Reset asks for confirmation and applies defaults to the settings in Setup; it keeps your overlays and OBS Remote configurations. Players can change their own client and user preferences; world settings require permission to configure the world.

The Director keeps its operational camera controls. Open the Overlay Editor and OBS Remote Settings through their entries in Foundry’s module settings. The OBS Remote Connection tab contains **Enable OBS Websocket?** and **Allow OBS Websocket API Access?**, alongside your connection details. Dice So Nice settings appear when that module is active.

**Documentation** and **Discord** are direct links at the bottom of the Setup navigation.


## Import settings from the other edition

To move from Free to Premium:

1. In **Manage Modules**, enable **OBS Utils Premium** and disable **OBS Utils**. Save and let Foundry reload.
2. Open **Settings → Configure Settings → OBS Utils Premium → Open Setup**.
3. Select **Import & Reset**, then **Import settings from Free**.
4. After the import succeeds, click **Reload to apply changes**.

The import replaces Premium's settings with your saved Free settings. It does not delete or change the Free settings. Import before making a new Premium configuration you want to keep.

The import copies world settings when you have permission to configure the world, plus preferences for your current user and browser. Repeat it in your stream browser to carry over that browser's connection and stream settings. Scene presets and tracked-token flags are already shared between editions.

Older settings are updated during import. You can't import settings from a newer module release into an older one: update the destination edition first. If no saved settings are found, Setup tells you.

If you later switch back to Free, check its release version first. Free 5.3.1 cannot import settings saved by Premium 5.4.1; wait for a compatible public release.

