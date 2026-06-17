# Type Alias: FieldDef

> **FieldDef** = \{ `group?`: `string`; `key`: `string`; `label?`: `string`; `step?`: `number`; `type`: `"number"`; \} \| \{ `group?`: `string`; `key`: `string`; `label?`: `string`; `type`: `"text"`; \} \| \{ `group?`: `string`; `key`: `string`; `label?`: `string`; `type`: `"color"`; \} \| \{ `group?`: `string`; `key`: `string`; `label?`: `string`; `type`: `"checkbox"`; \} \| \{ `hint?`: `string`; `key`: `string`; `label?`: `string`; `type`: `"code"`; \} \| \{ `key`: `string`; `label?`: `string`; `multiple?`: `boolean`; `options?`: [`FieldOption`](../interfaces/FieldOption.md)[]; `placeholder?`: `string`; `source?`: `"macros"` \| `"states"`; `type`: `"select"`; \} \| \{ `key`: `string`; `type`: `"conditions"`; \}

Defined in: [api.ts:41](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L41)

Declares one editable property of a registered effect/animation/action, so the editors can render it
generically. First-party and third-party registrations go through the same descriptors — no privileged UI.
