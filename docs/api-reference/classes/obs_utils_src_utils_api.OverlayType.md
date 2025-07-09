---
id: "obs_utils_src_utils_api.OverlayType"
title: "Class: OverlayType"
sidebar_label: "obs-utils/src/utils/api.OverlayType"
custom_edit_url: null
---

[obs-utils/src/utils/api](../modules/obs_utils_src_utils_api.md).OverlayType

## Constructors

### constructor

• **new OverlayType**(`overlayClass`): [`OverlayType`](obs_utils_src_utils_api.OverlayType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `overlayClass` | `SvelteComponentConstructor` |

#### Returns

[`OverlayType`](obs_utils_src_utils_api.OverlayType.md)

## Properties

### compactEditorButtons

• **compactEditorButtons**: `Map`\<`string`, `boolean`\>

___

### overlayClass

• **overlayClass**: `SvelteComponentConstructor`

___

### overlayComponentEditors

• **overlayComponentEditors**: `Map`\<`string`, `SvelteComponentConstructor`\>

___

### overlayComponentNames

• **overlayComponentNames**: `Map`\<`string`, `string`\>

___

### overlayComponents

• **overlayComponents**: `Map`\<`string`, `SvelteComponentConstructor`\>

___

### overlayEditor

• **overlayEditor**: `SvelteComponentConstructor`

## Methods

### registerComponent

▸ **registerComponent**(`key`, `readableName`, `type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `readableName` | `string` |
| `type` | `SvelteComponentConstructor` |

#### Returns

`void`

___

### registerComponentEditor

▸ **registerComponentEditor**(`key`, `editor`, `compactButtons?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `string` | `undefined` |
| `editor` | `SvelteComponentConstructor` | `undefined` |
| `compactButtons` | `boolean` | `false` |

#### Returns

`void`

___

### registerOverlayEditor

▸ **registerOverlayEditor**(`editor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `SvelteComponentConstructor` |

#### Returns

`void`
