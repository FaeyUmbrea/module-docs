---
id: "obs_utils_src_utils_api.ObsUtilsApi"
title: "Class: ObsUtilsApi"
sidebar_label: "obs-utils/src/utils/api.ObsUtilsApi"
custom_edit_url: null
---

[obs-utils/src/utils/api](../modules/obs_utils_src_utils_api.md).ObsUtilsApi

## Constructors

### constructor

• **new ObsUtilsApi**(): [`ObsUtilsApi`](obs_utils_src_utils_api.ObsUtilsApi.md)

#### Returns

[`ObsUtilsApi`](obs_utils_src_utils_api.ObsUtilsApi.md)

## Properties

### overlayTypeNames

• **overlayTypeNames**: `Map`\<`string`, `string`\>

___

### overlayTypes

• **overlayTypes**: `Map`\<`string`, [`OverlayType`](obs_utils_src_utils_api.OverlayType.md)\>

___

### singleInstanceOverlays

• **singleInstanceOverlays**: `Set`\<`SvelteComponentConstructor`\>

## Methods

### getOBSWebsocketClient

▸ **getOBSWebsocketClient**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

___

### getSelectedActors

▸ **getSelectedActors**(): `any`

#### Returns

`any`

___

### isOBS

▸ **isOBS**(): `boolean`

#### Returns

`boolean`

___

### registerOverlayType

▸ **registerOverlayType**(`key`, `readableName`, `type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `readableName` | `string` |
| `type` | [`OverlayType`](obs_utils_src_utils_api.OverlayType.md) |

#### Returns

`void`

___

### registerUniqueOverlay

▸ **registerUniqueOverlay**(`overlay`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `overlay` | `SvelteComponentConstructor` |

#### Returns

`void`

___

### setAVData

▸ **setAVData**(`actorValueArray`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actorValueArray` | `ActorValues` |

#### Returns

`void`

___

### setSelectedActors

▸ **setSelectedActors**(`actorArray`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `actorArray` | `string`[] |

#### Returns

`Promise`\<`void`\>
