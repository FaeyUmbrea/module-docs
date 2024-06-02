# Quick Start

You want to use Ethereal Plane but don't know how to get started?

This short Guide will help you take your first steps with Ethereal Plane.

Since the Module is subject to change in active development, please note that the screenshots might be outdated.

## Setting up the Module

After you have installed the Module, the first thing you need to do to make it work is go to module settings.

Once there, you will be greeted with this screen:

![image](ep-settings.png)

Before any of the Features can work, you need to go through Setup.

In the Setup Menu, you will be asked to select the Mode that Ethereal Plane should run in. 

If you are a Twitch user, I recommend switching the module to Patreon mode. This will immediately give you access to all Module features through the "EtherealPlane" Twitch bot user. You don't need to be subscribed to my Patreon for this to work, all Twitch features are completely free!

If you are a YouTube User, I do recommend considering subscribing to my Patreon at the 5€ Tier. Otherwise, you want to set the mode to "Local Bridge only" and install the [Server](https://github.com/FaeyUmbrea/ethereal-plane-server).

"Local Bridge + Patreon" is a hybrid mode not recommended for new users.

### Patreon Setup

If you select "Patreon Mode," your next step is to log into your Patreon account.

![image](ep-patreon-setup.png)

Once you are logged in, your UI will change based on your patreon tier.
From here, log into the streaming service of your choosing!

#### Twitch Setup

If you are a Twitch user, after logging in you are all set!

Depending on your Tier, a button saying "Log in" with a Bot-Icon will be available:

![image](ep-twitch-setup.png)

You can use this to log into either your main twitch account, or any other twitch account of your choosing. The bot will then use that account instead of the "EtherealPlane" user to interact with your chat.

#### YouTube Setup

The YouTube Setup is straightforward.
After logging in, everything should be working automatically.
However, if the backend fails to correctly connect to your live-stream.
Copy the URL to your livestream into the Text-Box and press the Save Icon.

![image](ep-youtube-setup.png)


It does not matter if it is a YouTube Studio, "youtu.be" or youtube.com/watch URL. All three will work!

### Local Server 
If you are running the Module in local mode, all the configuration is done in the companion Server.
All you need to do here is provide the URL your Server is running under. This is typically already set correctly.

![image](ep-local.png)


## Send Rolls to Chat

You've successfully completed the first step of the setup!

The first feature to configure is the one that sends rolls to chat.
This will grab any roll that is not private or whispered and broadcast it to your stream chat.

To enable or disable it, check or uncheck the respective box.

![image](ep-rolls.png)

You can also edit the Chat Message Template. You can put anything here!

When a roll occurs, the text `%\USER%` is replaced by the player's display name, `%\FORMULA%`
is replaced by the roll formula (i.e. `1d20+4+2`) and `%\RESULT%` is replaced by the roll result.

## Polls

In the configuration section for the Local Server or the Patreon Server, you can enable or disable Polls. 

If Polls are enabled,
a new icon ![image](ep-poll-icon.png){style="inline"} will appear in the Token Sidebar on the left. 

Clicking on it will bring up the Poll Menu.

![image](ep-polls.png)

In here, you can set up a Poll with options and a title, define the duration and drag and drop macros into the little boxes next to the option name.

More on Polls can be found in the in-depth tutorial.

## Chat Tab

The Chat Tab can be enabled or disabled in the module settings.

![image](ep-chat-tab-setting.png) 

If enabled, a new Tab 
![image](ep-chat-tab-icon.png)
 showing all messages from your chat will appear in the sidebar on the right. 

## Chat Commands

The final feature you want to consider is the Chat Commands.

A more indepth guide on chat commands can be found on their own wiki page.
For now, consider if you want to enable them or not. 

![image](ep-chat-command-settings.png)

## Wrapping up

Now that you have made all your choices and set up your module, the last step is to enable it.

![image](ep-enable.png)

This will reload your page and start the Module once the reload is complete!