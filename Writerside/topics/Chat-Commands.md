# Chat Commands

Chat commands are one of the ways that users can interact directly with foundry from your chat.

However, they are a bit more technical and require a base understanding of JavaScript.

They can be set up via their own menu in module settings.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/d7e9d20b-408d-4769-9868-aad98c0d4db4)


## Creating a chat command

Chat commands can be created and configured in the chat command config UI.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/de8b138e-9189-4342-8596-c167bc71a102)

To create a new command, simply click on the ![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/893ce9da-b9c3-48de-8069-d0843b4e17c9) button.

This will create a new command with no content in the list above.

The first thing you want to set is the Name. As seen in the example image at the start of the section, any prefixes have to be included in the name as this will be used to determine if a command has been executed.

The second thing that need to be set up for a command is the Macro. 
Similar to the Polls, chat commands can be used to execute macros as the GM. However, using either Advanced Macros or Foundry V11, you can pass arguments to those macros from the chat message.

## Setting up the Template

The Template is what dictates how the chat message is going to be evaluated and which variables will contain the data in the macro.

The syntax for the template is simple. Entries are separated by spaces, any entry corresponding to an input to be evaluated by the macro is wrapped in double curly braces ``{{ }}`` and can optionally contain double question marks exactly once ``??`` to denote the text after as the default value. These special characters are reserved and may not be used for naming or default values. Single curly braces and single questionmarks however are fine.

Lets set up an example template entry: ``{{player??Player 1}}``.

This entry, when the command it is part of is executed by a chat user. Will take any text at the same position in the command as itself and give that text to the macro in the variable ``scope.player``. If there is no text that corresponds to the template part, the macro will instead recieve ``Player 1``. If no default value is given, the scope variable will instead recieve an empty string.

A complete chat command may look like this:

Name: ``!inspire``
Template: ``{{token??Trogdor the Burninator}} {{amount}}``

If a viewer now types ``!inspire Fizzlebang 2`` into the chat. The macro will be executed, the variable ``scope.token`` will recieve the value ``Fizzlebang`` and the variable ``scope.amount`` will recieve the value ``2``. In this example it is important to note that even numerical values will be passed to the macro as strings.

If a viewer instead types ``!inspire`` the macro will still execute. In this case ``scope.token`` will be evaluated as ``Trogdor the Burninator`` and ``scope.amount`` will be evaluated as an empty string.

### Reserved Names

Some names are automaticall populated by the module:

"user" and ``scope.user`` respectively will always be overwritten by the username of the person who ran the command

"isSubscribed" and ``scope.isSubscribed`` respectively will always be overwritten by if the user is a Subscriber on Twitch or a Channel Member on YouTube.

## Execution Cooldown

It's possible to set a cooldown for how often a given user can execute the macro.

![image](https://github.com/FaeyUmbrea/ethereal-plane/assets/1144986/177a3734-8df1-4cf3-b3cc-b300f9462ad4)


These limits are stored in the memory of the browser that is used for the GM client and will NOT be kept during a reload.

Cooldowns are always given as seconds, however, since timekeeping is based on miliseconds, fractional values do work.

### Per User Cooldown

The first option for a cool down is to set it per user. 

In this case, the username will be stored together with the command name and any execution will be prevented if the user has alread invoked the same command in the second interval specified.

### Per Target Cooldown

In some cases it might be desirable to have the cooldown not apply to chat users but instead to in-game characters.

To do so, specify the cooldown amount as you usually do and then specify just the name of the template part that contains your target.

This can also be left empty, which would result in a universal cooldown on the entire macro, regardless of who last executed it and who it was executed on.

The system will also treat different capitalization of the same target as different targets.