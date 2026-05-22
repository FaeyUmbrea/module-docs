# Interface: OBSRemoteConditionField

Defined in: [api.ts:29](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L29)

## Properties

### default?

> `optional` **default?**: `any`

Defined in: [api.ts:41](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L41)

Default value when a new instance is added.

***

### key

> **key**: `string`

Defined in: [api.ts:31](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L31)

Storage key on the configured instance's `conditions` object.

***

### label

> **label**: `string`

Defined in: [api.ts:39](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L39)

i18n key for the field label. Resolved via `game.i18n.localize()` at
render time. Pass a literal string only if you are intentionally
shipping a single-locale module — the UI will display it verbatim.

***

### type

> **type**: `"string"` \| `"number"` \| `"boolean"`

Defined in: [api.ts:33](https://github.com/FaeyUmbrea/obs-utils/blob/80f19c0312521604f37f888f0545f00fb84188f8/src/utils/api.ts#L33)

What the user fills in.
