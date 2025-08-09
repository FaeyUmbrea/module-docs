---
id: api
title: API
sidebar_label: API
---

# API

Ethereal Plane provides a simple API that can be accessed through the module's API property.

## Accessing the API

The Ethereal Plane API can be accessed using:

```javascript
game.modules.get('ethereal-plane').api
```

## API Reference

The Ethereal Plane API provides the following methods:

### sendMessageToChat(message: string)

Sends a message to the connected chat platforms.

**Parameters:**
- `message` (string): The message to send to chat

**Example:**
```javascript
// Send a message to chat
game.modules.get('ethereal-plane').api.sendMessageToChat("Hello from Foundry VTT!");
```

**Note:** This method will only work if the "Allow API" setting is enabled in the module settings.

### EtherealPlaneAPI

The main API class that provides methods for interacting with the Ethereal Plane module.

```typescript
export class EtherealPlaneAPI {
  // Methods
  sendMessageToChat(message: string);
}
```
