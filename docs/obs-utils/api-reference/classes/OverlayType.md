# Class: OverlayType

Defined in: [api.ts:153](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L153)

## Constructors

### Constructor

> **new OverlayType**(`overlayClass`): `OverlayType`

Defined in: [api.ts:163](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L163)

#### Parameters

##### overlayClass

`Component`\<`any`, `any`, `any`\>

#### Returns

`OverlayType`

## Properties

### compactEditorButtons

> **compactEditorButtons**: `Map`\<`string`, `boolean`\>

Defined in: [api.ts:159](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L159)

***

### hasCustomOverlayEditor

> **hasCustomOverlayEditor**: `boolean` = `false`

Defined in: [api.ts:160](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L160)

***

### overlayClass

> **overlayClass**: `Component`

Defined in: [api.ts:156](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L156)

***

### overlayComponentEditors

> **overlayComponentEditors**: `Map`\<`string`, `Component`\<`any`, `any`, `any`\>\>

Defined in: [api.ts:158](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L158)

***

### overlayComponentNames

> **overlayComponentNames**: `Map`\<`string`, `string`\>

Defined in: [api.ts:157](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L157)

***

### overlayComponents

> **overlayComponents**: `Map`\<`string`, `Component`\<`any`, `any`, `any`\>\>

Defined in: [api.ts:155](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L155)

***

### overlayEditor

> **overlayEditor**: `Component`

Defined in: [api.ts:154](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L154)

***

### perActor

> **perActor**: `boolean` = `true`

Defined in: [api.ts:161](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L161)

## Methods

### registerComponent()

> **registerComponent**(`key`, `readableName`, `type`): `void`

Defined in: [api.ts:186](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L186)

Register a renderable component type for this overlay.

#### Parameters

##### key

`string`

Stable key referenced from overlay data (e.g. 'pt', 'pb').

##### readableName

`string`

i18n key for the display label. Resolved via
  `game.i18n.localize()` at render time. Pass a literal string only
  if you intentionally ship a single-locale module.

##### type

`Component`\<`any`, `any`, `any`\>

The Svelte component class that renders the data.

#### Returns

`void`

***

### registerComponentEditor()

> **registerComponentEditor**(`key`, `editor`, `compactButtons?`): `void`

Defined in: [api.ts:191](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L191)

#### Parameters

##### key

`string`

##### editor

`Component`\<`any`, `any`, `any`\>

##### compactButtons?

`boolean` = `false`

#### Returns

`void`

***

### registerOverlayEditor()

> **registerOverlayEditor**(`editor`): `void`

Defined in: [api.ts:172](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L172)

#### Parameters

##### editor

`Component`\<`any`, `any`, `any`\>

#### Returns

`void`
