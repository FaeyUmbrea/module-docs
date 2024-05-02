# Quick Start

You want to use Ethereal Plane but don't know how to get started?

This short Guide will help you take your first steps with Ethereal Plane.

Since the Module is subject to change in active development, please note that some of the screenshots might be outdated.

## Setting up the Module

After you have installed the Module, the first thing you need to do to make it work is go to module settings.

Once there, you will be greeted with this screen:

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/72e27188-303c-4fdd-ab18-d6a2f5cfcaa5)

Before any of the Module can work, you need to go through Setup.

In the Setup Menu, you will be asked to select the Mode that Ethereal Plane should run in. 

If you are a Twitch user, I recommend switching the module to Patreon mode. This will immediately give you access to all Module features through the "EtherealPlane" Twitch bot user. You don't need to be subscribed to my Patreon for this to work, all Twitch features are completely free!

If you are a YouTube User, I do recommend considering subscribing to my Patreon at the 5€ Tier. Otherwise, you want to set the mode to "Local Bridge only" and install the [Server](https://github.com/FaeyUmbrea/ethereal-plane-server).

"Local Bridge + Patreon" is a hybrid mode that is not recommended for new users.

### Patreon Setup

If you selected "Patreon Mode" your next step is to log into your Patreon account.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/882ff33d-22fe-46fd-a206-dbdff6da6704)

Once you are logged in, your UI will change based on your patreon tier. From here, just log into the streaming service of your choosing!

#### Twitch Setup

If you are a Twitch user, after logging in you are all set!

Depending on your Tier, a button saying "Log in" with a Bot-Icon will be available:

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/4b0f2fd4-cb28-4795-9607-6a97ca885d49)

You can use this to log into either your main twitch account, or any other twitch account of your choosing. The bot will then use that account instead of the "EtherealPlane" user to interact with your chat.

#### YouTube Setup

The YouTube Setup is very simple. After logging in, everything should be working automatically. However, if the backend fails to correctly connect to your live-stream. Simply copy the URL to your livestream into the Text-Box and press the Save Icon.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/d5a21431-a0df-4283-9fd6-f3accf4eeeb7)


It does not matter if it is a YouTube Studio, youtu.be or youtube.com/watch URL. All three will work!

### Local Server 
If you are running the Module in local mode, all the configuration is done in the companion Server.
All you need to do here is provide the URL your Server is running under. This is typically already set correctly.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/0af5fe20-bcb3-43ba-8b2c-2defc764d9fc)


## Send Rolls to Chat

You've successfully completed the first step of the setup!

The first feature to configure is the one that send rolls to chat. This will grab any roll that is not private or whispered and broadcast it to your stream chat.

To enable or disable it, simply check or uncheck the respective box.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/2496eb43-05a3-470b-b23a-ef68d9179ae1)

You can also edit the Chat Message Template. You can put anything here!

When a roll occurrs the text `%\USER%` is replaced by the player's display name, `%\FORMULA%` is replaced by the roll formula (i.e. `1d20+4+2`) and `%\RESULT%` is replaced by the roll result.

## Polls

In the configuration section for the Local Server or the Patreon Server you can enable or disable Polls. 

If Polls are enabled, a new icon 
![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/5383b177-89b2-4e42-9959-da4328ba9563)
 will appear in the Token Sidebar on the left. 

Clicking on it, will bring up the Poll Menu.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/fddf00e7-9702-4944-bc75-94f56ca9e0a1)

In here, you can set up a Poll with options and a title, define the duration and drag and drop macros into the little boxes next to the option name.

More on Polls can be found in the in-depth tutorial.

## Chat Tab

The Chat Tab can be enabled or disabled in the module settings.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/c7ce8828-a3f7-41f1-b037-80ffde19df01) 

If enabled, a new Tab 
![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/f7598508-4ae3-4a99-ba6f-458ab3f0dc59)
 showing all messages from your chat will appear in the sidebar on the right. 

## Chat Commands

The final feature you want to consider is the Chat Commands.

A more indepth guide on chat commands can be found on their own wiki page. For now, just consider if you want to enable them or not. 

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/31976413-dcaf-44a3-8eaa-456ec75fa926)

## Wrapping up

Now that you have made all your choices and set up your module, the last step is to enable it.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/eb994d91-bb1d-45ca-a92e-a339ee46afa5)

This will reload your page and start the Module once the reload is complete!