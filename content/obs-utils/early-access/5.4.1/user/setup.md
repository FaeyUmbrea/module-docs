---
title: "Setup and importing settings"
---

## Setup

Open **Settings → Configure Settings → OBS Utils Premium → Open Setup**. Setup groups the module's loose settings into **Stream Client**, **Camera**, **Pop-ups & Notifications**, and **Overlays**. Each setting includes a description.

Changes save automatically when you change a toggle or finish editing a field. If a setting needs a reload, use **Reload to apply changes** when you are ready. **Import & Reset** contains the edition import and **Reset Defaults**. Reset asks for confirmation and applies defaults to the settings in Setup; it keeps your overlays and OBS Remote configurations. Players can change their own client and user preferences; world settings require permission to configure the world.

The Director keeps its operational camera controls. Open the Overlay Editor and OBS Remote Settings through their entries in Foundry’s module settings. The OBS Remote Connection tab contains **Enable OBS Websocket?** and **Allow OBS Websocket API Access?**, alongside your connection details. Dice So Nice settings appear when that module is active.

**Documentation** and **Discord** are direct links at the bottom of the Setup navigation.


## Import settings from the other edition

Open Setup in the edition you want to use, select **Import & Reset**, then click **Import settings from Free** or **Import settings from Premium**. This replaces that edition's settings with the other edition's saved configuration. The source settings stay intact.

The import copies world settings when you have permission to configure the world, plus preferences for your current user and browser. Repeat it in your stream browser to carry over that browser's connection and stream settings. Scene presets and tracked-token flags are already shared between editions.

Settings from an older release are migrated during import. Settings from the same release are copied directly. Settings from a newer release are rejected; update the destination edition first. Existing Free settings without a release marker are recognised as legacy 5.3.0 settings through their migration marker. If no saved settings are found, Setup tells you.

After a successful import, use **Reload to apply changes**. Importing requires an installed release version; development builds marked `0.0.0` cannot import settings.

