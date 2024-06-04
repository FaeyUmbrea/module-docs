# OBS Remote

This goes over the Features of the new OBS Remote Functionality.

## Caveats

First a few Caveats for this Feature.

OBS Utils is capable of using the OBS-Browser-Source API that is automatically provided. 
However, this API can only switch scenes and start or stop recordings and streams.

For the full feature set, you need to enable OBS-Websocket.

This is also only supported for the /game view.

## OBS Websocket

> THIS REQUIRES OBS Websocket V5 to be installed in OBS
{style="warning"}

To Enable Websocket Support, you have two choices:
* Globally store your Websocket credentials in foundry for all connected accounts to see
* Inject the Credentials only into your browser source

Generally, injecting the Credentials is preferred.
If you do so, you can ignore the OBS Websocket Settings.

### Setup

First enable using Websocket in the Module Settings.

The Websocket is executed inside the OBS Browser Source. So you can use localhost as the url.

Then either enter your Websocket Settings directly in Module Settings and sync them to your stream user.



Alternatively, add this block to your Browser Source's Custom CSS: 

`:root { --local-obs-host:[host]; --local-obs-port:[port]; --local-obs-password:[password]; }`

Replace [host] with your host name, i.e., localhost.
Do not add quotation marks or spaces and make sure to keep the trailing semicolon.
`--Local-obs-host:localhost;` or `--local-obs-host:your.host.com;` or `--local-obs-host:127.0.0.1;` all work.

Then replace [port] with the port of your Websocket. This is usually 4455.
`--Local-obs-port:4455;`

Finally, replace [password] with your websocket password.
`--Local-obs-password:P4ssw0rd!;`

This will override whatever you put into OBS Websocket Settings as well.
You can also define only some of these settings for partial overriding.

## Foundry

### Events

The Tab in OBS Remote Settings dictates what event the changes are fired on.

Currently available are:
* Load > When Foundry First Loads
* Combat Start > When ever any combat starts
* Combat End > When ever any combat ends
* Pause > When the game is Paused
* Unpause > When the game is Unparsed
* Close Obs > Only with Websocket enabled, will fire when OBS is about to close.

### Actions

Added to the Tab, are the actions to be taken on this event.
They are all always fired in sequence when the event occurs.

Available Event Types are:
* Switch Scene > Enter a Scene name. That Scene will be switched to.

Available Websocket only Event Types are:
* Toggle Source > Enter a Scene name and a Source name. That source will be enabled when its disabled, or disabled when its enabled.
* Enable Source > Enter a Scene name and a Source name. That source will be enabled.
* Disable Source > Enter a Scene name and a Source name. That source will be disabled.