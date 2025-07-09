[**Module API Reference**](../../../../../README.md)

***

[Module API Reference](../../../../../README.md) / [obs-utils/src/utils/api](../README.md) / ObsUtilsApi

# Class: ObsUtilsApi

## Constructors

### Constructor

> **new ObsUtilsApi**(): `ObsUtilsApi`

#### Returns

`ObsUtilsApi`

## Properties

### overlayTypeNames

> **overlayTypeNames**: `Map`\<`string`, `string`\>

***

### overlayTypes

> **overlayTypes**: `Map`\<`string`, [`OverlayType`](OverlayType.md)\>

***

### singleInstanceOverlays

> **singleInstanceOverlays**: `Set`\<`SvelteComponentConstructor`\>

## Methods

### getOBSWebsocketClient()

> **getOBSWebsocketClient**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

***

### getSelectedActors()

> **getSelectedActors**(): `any`

#### Returns

`any`

***

### isOBS()

> **isOBS**(): `boolean`

#### Returns

`boolean`

***

### registerOverlayType()

> **registerOverlayType**(`key`, `readableName`, `type`): `void`

#### Parameters

##### key

`string`

##### readableName

`string`

##### type

[`OverlayType`](OverlayType.md)

#### Returns

`void`

***

### registerUniqueOverlay()

> **registerUniqueOverlay**(`overlay`): `void`

#### Parameters

##### overlay

`SvelteComponentConstructor`

#### Returns

`void`

***

### setAVData()

> **setAVData**(`actorValueArray`): `void`

#### Parameters

##### actorValueArray

`ActorValues`

#### Returns

`void`

***

### setSelectedActors()

> **setSelectedActors**(`actorArray`): `Promise`\<`void`\>

#### Parameters

##### actorArray

`string`[]

#### Returns

`Promise`\<`void`\>
