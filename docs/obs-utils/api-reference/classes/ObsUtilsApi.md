# Class: ObsUtilsApi

Defined in: [api.ts:65](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L65)

## Constructors

### Constructor

> **new ObsUtilsApi**(): `ObsUtilsApi`

Defined in: [api.ts:72](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L72)

#### Returns

`ObsUtilsApi`

## Properties

### obsRemoteEventTypes

> **obsRemoteEventTypes**: `Map`\<`string`, [`OBSRemoteEventTypeRegistration`](../interfaces/OBSRemoteEventTypeRegistration.md)\>

Defined in: [api.ts:70](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L70)

***

### overlayTypeNames

> **overlayTypeNames**: `Map`\<`string`, `string`\>

Defined in: [api.ts:67](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L67)

***

### overlayTypes

> **overlayTypes**: `Map`\<`string`, [`OverlayType`](OverlayType.md)\>

Defined in: [api.ts:66](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L66)

***

### singleInstanceOverlays

> **singleInstanceOverlays**: `Set`\<`Component`\>

Defined in: [api.ts:68](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L68)

***

### singleInstanceOverlaysSvelte5

> **singleInstanceOverlaysSvelte5**: `Set`\<`Component`\>

Defined in: [api.ts:69](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L69)

## Methods

### getOBSWebsocketClient()

> **getOBSWebsocketClient**(): `Promise`\<`any`\> \| `undefined`

Defined in: [api.ts:140](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L140)

#### Returns

`Promise`\<`any`\> \| `undefined`

***

### getSelectedActors()

> **getSelectedActors**(): `any`

Defined in: [api.ts:128](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L128)

#### Returns

`any`

***

### isOBS()

> **isOBS**(): `any`

Defined in: [api.ts:148](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L148)

#### Returns

`any`

***

### registerOBSRemoteEventType()

> **registerOBSRemoteEventType**(`reg`): `void`

Defined in: [api.ts:81](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L81)

Public — modules call this in their init hook to expose a new event type.

#### Parameters

##### reg

[`OBSRemoteEventTypeRegistration`](../interfaces/OBSRemoteEventTypeRegistration.md)

#### Returns

`void`

***

### registerOverlayType()

> **registerOverlayType**(`key`, `readableName`, `type`): `void`

Defined in: [api.ts:113](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L113)

Register a new overlay type. Surfaces in the Stream Composer's "+ new"
menu and elsewhere the type list is consumed.

#### Parameters

##### key

`string`

Stable key written into `OverlayData.type` (e.g. 'wysiwyg').

##### readableName

`string`

i18n key for the display label. Resolved via
  `game.i18n.localize()` at render time. Pass a literal string only if
  you intentionally ship a single-locale module.

##### type

[`OverlayType`](OverlayType.md)

The OverlayType instance with the renderer and editor wired up.

#### Returns

`void`

***

### registerUniqueOverlay()

> **registerUniqueOverlay**(`overlay`): `void`

Defined in: [api.ts:119](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L119)

#### Parameters

##### overlay

`Component`

#### Returns

`void`

***

### registerUniqueOverlaySvelte5()

> **registerUniqueOverlaySvelte5**(`overlay`): `void`

Defined in: [api.ts:124](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L124)

#### Parameters

##### overlay

`Component`

#### Returns

`void`

***

### setAVData()

> **setAVData**(`actorValueArray`): `void`

Defined in: [api.ts:136](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L136)

#### Parameters

##### actorValueArray

`ActorValues`

#### Returns

`void`

***

### setSelectedActors()

> **setSelectedActors**(`actorArray`): `Promise`\<`void`\>

Defined in: [api.ts:132](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L132)

#### Parameters

##### actorArray

`string`[]

#### Returns

`Promise`\<`void`\>

***

### triggerOBSRemoteEvent()

> **triggerOBSRemoteEvent**(`key`, `context?`): `Promise`\<`void`\>

Defined in: [api.ts:94](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L94)

Public — modules call this when their in-system condition fires
(e.g. on `updateActor` with `system.attributes.hp.value` changed).
Looks up every configured instance for the type, runs the matcher,
and executes the configured OBS actions for instances that pass.

Safe to call from any client; the actual OBS action execution is
already gated to the OBS-mode client by triggerOBSAction.

#### Parameters

##### key

`string`

##### context?

`Record`\<`string`, `any`\> = `{}`

#### Returns

`Promise`\<`void`\>
