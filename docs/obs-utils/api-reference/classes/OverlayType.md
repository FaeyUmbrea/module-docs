# Class: OverlayType

Defined in: [api.ts:63](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L63)

## Constructors

### Constructor

> **new OverlayType**(`overlayClass`): `OverlayType`

Defined in: [api.ts:71](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L71)

#### Parameters

##### overlayClass

`SvelteComponentConstructor`

#### Returns

`OverlayType`

## Properties

### compactEditorButtons

> **compactEditorButtons**: `Map`\<`string`, `boolean`\>

Defined in: [api.ts:69](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L69)

***

### overlayClass

> **overlayClass**: `SvelteComponentConstructor`

Defined in: [api.ts:66](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L66)

***

### overlayComponentEditors

> **overlayComponentEditors**: `Map`\<`string`, `SvelteComponentConstructor`\>

Defined in: [api.ts:68](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L68)

***

### overlayComponentNames

> **overlayComponentNames**: `Map`\<`string`, `string`\>

Defined in: [api.ts:67](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L67)

***

### overlayComponents

> **overlayComponents**: `Map`\<`string`, `SvelteComponentConstructor`\>

Defined in: [api.ts:65](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L65)

***

### overlayEditor

> **overlayEditor**: `SvelteComponentConstructor`

Defined in: [api.ts:64](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L64)

## Methods

### registerComponent()

> **registerComponent**(`key`, `readableName`, `type`): `void`

Defined in: [api.ts:84](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L84)

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

Defined in: [api.ts:89](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L89)

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

Defined in: [api.ts:80](https://github.com/FaeyUmbrea/obs-utils/blob/272e0524ac02e1ec907346a77ca68ca2628c6bfd/src/utils/api.ts#L80)

#### Parameters

##### editor

`SvelteComponentConstructor`

#### Returns

`void`
