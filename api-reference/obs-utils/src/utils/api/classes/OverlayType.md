[**Module API Reference**](../../../../../README.md)

***

[Module API Reference](../../../../../README.md) / [obs-utils/src/utils/api](../README.md) / OverlayType

# Class: OverlayType

## Constructors

### Constructor

> **new OverlayType**(`overlayClass`): `OverlayType`

#### Parameters

##### overlayClass

`SvelteComponentConstructor`

#### Returns

`OverlayType`

## Properties

### compactEditorButtons

> **compactEditorButtons**: `Map`\<`string`, `boolean`\>

***

### overlayClass

> **overlayClass**: `SvelteComponentConstructor`

***

### overlayComponentEditors

> **overlayComponentEditors**: `Map`\<`string`, `SvelteComponentConstructor`\>

***

### overlayComponentNames

> **overlayComponentNames**: `Map`\<`string`, `string`\>

***

### overlayComponents

> **overlayComponents**: `Map`\<`string`, `SvelteComponentConstructor`\>

***

### overlayEditor

> **overlayEditor**: `SvelteComponentConstructor`

## Methods

### registerComponent()

> **registerComponent**(`key`, `readableName`, `type`): `void`

#### Parameters

##### key

`string`

##### readableName

`string`

##### type

`SvelteComponentConstructor`

#### Returns

`void`

***

### registerComponentEditor()

> **registerComponentEditor**(`key`, `editor`, `compactButtons`): `void`

#### Parameters

##### key

`string`

##### editor

`SvelteComponentConstructor`

##### compactButtons

`boolean` = `false`

#### Returns

`void`

***

### registerOverlayEditor()

> **registerOverlayEditor**(`editor`): `void`

#### Parameters

##### editor

`SvelteComponentConstructor`

#### Returns

`void`
