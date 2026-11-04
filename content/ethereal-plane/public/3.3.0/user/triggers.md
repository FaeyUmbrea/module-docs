---
title: "Chat and channel-point triggers"
---

Triggers connect stream events to macros in your world. Configure what should fire on the website, then assign the macro in Foundry.

## Understanding Triggers and Events

A Trigger is a discrete unit of execution that will be sent to Foundry VTT to execute a macro. It will receive execution context similar to how chat commands worked.

An Event is something that happens on stream that causes a trigger to be triggered.

## Assign a macro in Foundry

Open **Settings → Configure Settings → Ethereal Plane → Open Trigger Setup**. Create the trigger on the website first, then return here and drag a world macro into its Macro slot. Enable its Active checkbox. Keep **Enable Triggers** enabled in module settings.

[![Macro Configuration](./assets/triggers/macro-config.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/macro-config.png "Open full-size screenshot")

The window-frame import and export buttons let you move macro assignments between worlds. Run a macro directly in Foundry before testing it through a trigger.

## Web Configuration

Triggers must be configured through the web interface at [https://etherealplane.app](https://etherealplane.app).

[![Web Config Overview](./assets/triggers/web-config-overview.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/web-config-overview.png "Open full-size screenshot")

### Creating a New Trigger

The web config has a button to create a new trigger, which will open a dialog to set the name and create the trigger.

[![Create Trigger](./assets/triggers/create.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/create.png "Open full-size screenshot")

### Editing a Trigger

After creating a trigger, you can click the "pencil" icon to edit it. This allows you to:
- Edit the trigger name
- Remove the trigger
- Add a new event

[![Create Event](./assets/triggers/create-event.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/create-event.png "Open full-size screenshot")

## Event Types

There are two types of events that can trigger your macros:

### 1. Chat Commands

Chat commands work similarly to the deprecated chat command feature. However, the "alias" list is now the "command list" and all commands need to be entered here in order to be recognized instead of just alternative aliases.

[![Edit Chat Command](./assets/triggers/edit-chat-command.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/edit-chat-command.png "Open full-size screenshot")

Chat commands have context data that is given to the macro when they are executed, allowing your macros to respond dynamically to user input.

#### Setting up the Template

The Template is what dictates how the chat message is going to be evaluated and which variables will contain the data in the macro.

The syntax for the template is straightforward.
Entries are separated by spaces.
Any entry corresponding to an input to be evaluated by the macro is wrapped in double curly braces ``{{ }}``
and can optionally contain double question marks exactly once ``??`` to denote the text after as the default value.
These special characters are reserved and may not be used for naming or default values.
Single curly braces and single question marks, however, are fine.

Let's set up an example template entry: ``{{player??Player 1}}``.

This entry, when the command it is part of is executed by a chat user.
Will take any text at the same position in the command as itself
and give that text to the macro in the variable ``scope.macro_arguments.player``.
If there is no text that corresponds to the template part, the macro will instead receive ``Player 1``.
If no default value is given, the scope variable will instead receive an empty string.

A complete chat command may look like this:

Command: ``!inspire``

Template: ``{{token??Trogdor the Burninator}} {{amount}}``

If a viewer now types ``!inspire Fizzlebang 2`` into the chat.
The macro will be executed,
the variable ``scope.macro_arguments.token`` will receive the value ``Fizzlebang`` and the variable ``scope.macro_arguments.amount``
will receive the value ``2``.
In this example, it is important to note that even numerical values will be passed to the macro as strings.

If a viewer instead types ``!inspire`` the macro will still execute.
In this case,
``scope.macro_arguments.token`` will be evaluated as ``Trogdor the Burninator`` and ``scope.macro_arguments.amount``
will be evaluated as an empty string.

#### Chat Command Context Data

When a Chat Command triggers a macro, it provides context data to the macro. Chat-command template values are in `scope.macro_arguments`. The remaining fields describe the message and viewer:

```typescript
interface ChatCommandEventData {
    macro_arguments: {
        // for each template entry
        template_part: string;
    };
    raw_message: string;
    message_overflow: string[];
    message_parts: string[];
    user: string;
    is_subscribed: boolean;

}
```

##### Explanation of Fields:

- **`macro_arguments`**: A collection of data extracted from the input via the template
- **`raw_message`**: The complete unprocessed message input by the user in chat.
- **`message_overflow`**: A list of additional substrings of the message that couldn't fit into `message_parts` if the message is too long.
- **`message_parts`**: The main parts of the message split by the application's logic (e.g., command name, arguments, etc.).
- **`user`**: The username of the user that sent the message.
- **`is_subscribed`**: A boolean flag indicating whether the user is a channel subscriber.

### 2. Channel Point Redeem (Patron Feature)

Available to subscribed patrons, this event type allows you to use a Twitch channel point reward to trigger an event.

[![Edit Channel Point Event](./assets/triggers/edit-channel-point-event.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/edit-channel-point-event.png "Open full-size screenshot")

You can also set a macro execution context, which is a plain JSON object that will be given to the macro when this trigger is executed.
The JSON will be passed directly to the macro and will be available as ``scope`` in the macro context

Using the edit icon, users can create or reconfigure the channel point reward attached to this trigger.

[![Edit Twitch Channel Point Reward](./assets/triggers/edit-twitch-channel-point-reward.png)](/media/ethereal-plane/public/3.3.0/user/assets/triggers/edit-twitch-channel-point-reward.png "Open full-size screenshot")


## Migrating from Chat Commands

If you were previously using Chat Commands, you'll need to migrate your commands to the new Triggers system. The functionality is similar, but the configuration is different:

1. Create a new Trigger for each of your existing chat commands
2. Set up a Chat Command event for each Trigger
3. Enter all your command aliases in the "command list"
4. Assign the same macro that was used for your chat command

The context data provided to the macro is compatible with the previous chat commands system, so your existing macros should continue to work without modification.

## Test the complete connection

1. Complete [Getting started](../getting-started/) and enable trigger processing.
2. Create a chat-command event on the website and save it.
3. Assign a macro in Foundry and enable that trigger.
4. Send the command from your connected stream chat.
5. Check the macro result in Foundry. If it does nothing, run the macro directly, then check its assignment and the configured command spelling.

Chat-command triggers do not require the separate Chat indicator to show a direct chat-reading connection.
