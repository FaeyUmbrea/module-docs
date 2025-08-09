# Class: ObsUtilsApi

Defined in: [api.ts:18](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L18)

## Constructors

### Constructor

> **new ObsUtilsApi**(): `ObsUtilsApi`

Defined in: [api.ts:23](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L23)

#### Returns

`ObsUtilsApi`

## Properties

### overlayTypeNames

> **overlayTypeNames**: `Map`\<`string`, `string`\>

Defined in: [api.ts:20](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L20)

***

### overlayTypes

> **overlayTypes**: `Map`\<`string`, [`OverlayType`](OverlayType.md)\>

Defined in: [api.ts:19](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L19)

***

### singleInstanceOverlays

> **singleInstanceOverlays**: `Set`\<`SvelteComponentConstructor`\>

Defined in: [api.ts:21](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L21)

## Methods

### getOBSWebsocketClient()

> **getOBSWebsocketClient**(): `undefined` \| `Promise`\<`any`\>

Defined in: [api.ts:50](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L50)

#### Returns

`undefined` \| `Promise`\<`any`\>

***

### getSelectedActors()

> **getSelectedActors**(): `any`

Defined in: [api.ts:38](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L38)

#### Returns

`any`

***

### isOBS()

> **isOBS**(): `any`

Defined in: [api.ts:58](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L58)

#### Returns

`any`

***

### registerOverlayType()

> **registerOverlayType**(`key`, `readableName`, `type`): `void`

Defined in: [api.ts:29](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L29)

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

Defined in: [api.ts:34](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L34)

#### Parameters

##### overlay

`SvelteComponentConstructor`

#### Returns

`void`

***

### setAVData()

> **setAVData**(`actorValueArray`): `void`

Defined in: [api.ts:46](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L46)

#### Parameters

##### actorValueArray

`ActorValues`

#### Returns

`void`

***

### setSelectedActors()

> **setSelectedActors**(`actorArray`): `Promise`\<`void`\>

Defined in: [api.ts:42](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L42)

#### Parameters

##### actorArray

`string`[]

#### Returns

`Promise`\<`void`\>
