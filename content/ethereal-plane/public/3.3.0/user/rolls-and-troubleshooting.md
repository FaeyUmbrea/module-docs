---
title: "Rolls and connection checks"
---

Enable **Send Rolls to Chat** in setup when you want public rolls sent to your stream chat. Private and whispered rolls are excluded.

The message template can contain `%USER%`, `%FORMULA%`, and `%RESULT%`. Those are replaced with the player's display name, the formula, and the result.

For MidiQoL, enable **Allow Sockets** in setup so player clients can send their roll information to the GM client for broadcast.

## Check the right connection

Polls, chat, and triggers have separate status indicators. A feature's indicator may stay inactive until that feature is being used. In particular, a chat-command trigger does not require the direct chat-reading connection to show as active.

If the login window expires, close it and start login again. Connecting the Foundry installation and logging into your account are separate setup steps; check both before retrying the feature.
