# Getting Started

## Setup

Installing this module is as easy as any other!
Just use the Module Installer in Foundry!

## Configuration

### Setting up OBS

Create a Browser-Source in your OBS Scene and set it to the desired size.
After that, add the link to your Foundry Installation and append either /game for the gameboard view or /stream for the stream view.

Once Loaded, use the Interact Mode to Log In

#### Using both /game and /stream

Create two sources as described above, one with /game and one with /stream.

Set at least one of them to be disabled when it is not visible.

Disable that source and log in with the other.

Finally enable that source. It will now automatically load the other view!

### Setting up Foundry

#### Basic Settings

Go to Settings and set Minimum Scale and Maximum Scale to your liking. They are scale values relative to the Scene background Size. Higher numbers mean more zoomed in.

Finally, configure the Popout Zoom Delay and decide if you want the Combat Tracker to show up in /game view during combat.

#### The Director

The Director Window contains the main set of Controls for this Module.
Hover over each button to get a brief description of what it does.

In Combat Controls are only active while there is a combat running.

Out of Combat Controls are active when ever there isn't a combat.

##### Track all Owned Tokens

This will automatically Track all Tokens that the User logged in with OBS owns.

##### Track the currently active Owned Token

This will track the current turn combatant token, if that token is owned by the OBS Account.

##### Clone the Selected Player's Viewport

This will copy the Viewport of which ever Player is selected with the Dropdown in the Director.

##### Clone the DM's Viewport

This will copy the Viewport of the DM. This currently only supports one connected DM Account.

##### Fit Map to Scene

Just what it sais on the tin. This will zoom out the map to fit exactly, centered and with minimal bars.

##### Clone the Turn Player's Viewport

This will copy the Viewport of the current Turn Player.
