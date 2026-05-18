# Interface: OBSRemoteEventTypeRegistration

Defined in: [api.ts:44](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L44)

## Properties

### conditionFields?

> `optional` **conditionFields**: [`OBSRemoteConditionField`](OBSRemoteConditionField.md)[]

Defined in: [api.ts:56](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L56)

Per-instance condition fields the user fills in when configuring.

***

### icon?

> `optional` **icon**: `string`

Defined in: [api.ts:54](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L54)

Optional Font Awesome icon class for the header (e.g. 'fas fa-heart').

***

### key

> **key**: `string`

Defined in: [api.ts:46](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L46)

Unique key — namespace with your module id (e.g. 'dnd5e.hpThreshold').

***

### matcher()?

> `optional` **matcher**: (`conditions`, `context`) => `boolean`

Defined in: [api.ts:62](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L62)

Decide whether a configured instance should fire given its saved
`conditions` and the runtime `context` passed to triggerOBSRemoteEvent.
Omit → instance always fires.

#### Parameters

##### conditions

`Record`\<`string`, `any`\>

##### context

`any`

#### Returns

`boolean`

***

### name

> **name**: `string`

Defined in: [api.ts:52](https://github.com/FaeyUmbrea/obs-utils/blob/e90e62978247d2cf2a4109933f44082df703f5f8/src/utils/api.ts#L52)

i18n key for the section header. Resolved via `game.i18n.localize()`
at render time. Pass a literal string only if you are intentionally
shipping a single-locale module — the UI will display it verbatim.
