# Class: SplashAPI

Defined in: [api.ts:64](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L64)

## Constructors

### Constructor

> **new SplashAPI**(): `SplashAPI`

#### Returns

`SplashAPI`

## Accessors

### registeredActions

#### Get Signature

> **get** **registeredActions**(): [`RegisteredType`](../interfaces/RegisteredType.md)[]

Defined in: [api.ts:191](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L191)

##### Returns

[`RegisteredType`](../interfaces/RegisteredType.md)[]

***

### registeredAnimations

#### Get Signature

> **get** **registeredAnimations**(): [`RegisteredType`](../interfaces/RegisteredType.md)[]

Defined in: [api.ts:183](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L183)

##### Returns

[`RegisteredType`](../interfaces/RegisteredType.md)[]

***

### registeredEffects

#### Get Signature

> **get** **registeredEffects**(): [`RegisteredType`](../interfaces/RegisteredType.md)[]

Defined in: [api.ts:187](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L187)

##### Returns

[`RegisteredType`](../interfaces/RegisteredType.md)[]

***

### registeredTriggers

#### Get Signature

> **get** **registeredTriggers**(): `TriggerDefinition`[]

Defined in: [api.ts:200](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L200)

##### Returns

`TriggerDefinition`[]

## Methods

### applySplashState()

> **applySplashState**(`uuid`, `snapshot`): `Promise`\<`void`\>

Defined in: [api.ts:279](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L279)

Apply a runtime snapshot to an open splash on this client, mirroring another client's state.

#### Parameters

##### uuid

`string`

##### snapshot

`RuntimeSnapshot`

#### Returns

`Promise`\<`void`\>

***

### bindingsForSplash()

> **bindingsForSplash**(`splashUuid`): `TriggerBinding`[]

Defined in: [api.ts:208](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L208)

#### Parameters

##### splashUuid

`string`

#### Returns

`TriggerBinding`[]

***

### buildAnimation()

> **buildAnimation**(`animation`, `sprite`, `app`): `Promise`\<`void`\>

Defined in: [api.ts:110](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L110)

#### Parameters

##### animation

`any`

##### sprite

`DisplayObject`

##### app

`Application`

#### Returns

`Promise`\<`void`\>

***

### buildEffect()

> **buildEffect**(`app`, `effect`): `Promise`\<`any`\>

Defined in: [api.ts:155](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L155)

#### Parameters

##### app

`Application`

##### effect

`any`

#### Returns

`Promise`\<`any`\>

***

### buildSprite()

> **buildSprite**(`sprite`, `state`, `context`): `Promise`\<`any`\>

Defined in: [api.ts:132](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L132)

#### Parameters

##### sprite

`any`

##### state

`InitializedData`

##### context

`SpriteContext`

#### Returns

`Promise`\<`any`\>

***

### close()

> **close**(`__namedParameters?`): `Promise`\<`void`\>

Defined in: [api.ts:315](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L315)

Close the active splash locally; `global` (GM only) kills it for the whole table.

#### Parameters

##### \_\_namedParameters?

###### global?

`boolean` = `false`

#### Returns

`Promise`\<`void`\>

***

### closeSpectator()

> **closeSpectator**(`uuid`): `Promise`\<`void`\>

Defined in: [api.ts:307](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L307)

Close a spectator mirror opened with openSpectator.

#### Parameters

##### uuid

`string`

#### Returns

`Promise`\<`void`\>

***

### getSplashState()

> **getSplashState**(`uuid`): `Promise`\<`RuntimeSnapshot` \| `null`\>

Defined in: [api.ts:273](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L273)

The current runtime snapshot of an open splash on this client, or null if it isn't open.

#### Parameters

##### uuid

`string`

#### Returns

`Promise`\<`RuntimeSnapshot` \| `null`\>

***

### getTrigger()

> **getTrigger**(`type`): `TriggerDefinition` \| `undefined`

Defined in: [api.ts:204](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L204)

#### Parameters

##### type

`string`

#### Returns

`TriggerDefinition` \| `undefined`

***

### launch()

> **launch**(`uuid`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [api.ts:242](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L242)

Launch using the splash's stored `layer`. `handout` opens a windowed app; `scene`/`hud`/`full` open a fullscreen overlay.

#### Parameters

##### uuid

`string`

##### \_\_namedParameters?

###### global?

`boolean` = `false`

###### targetUser?

`string`

#### Returns

`Promise`\<`void`\>

***

### openHandout()

> **openHandout**(`uuid`): `Promise`\<`void`\>

Defined in: [api.ts:261](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L261)

#### Parameters

##### uuid

`string`

#### Returns

`Promise`\<`void`\>

***

### openSpectator()

> **openSpectator**(`uuid`): `Promise`\<`void`\>

Defined in: [api.ts:285](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L285)

Open a splash on this client as a passive spectator mirror: no input, no presence, driven by applySplashState.

#### Parameters

##### uuid

`string`

#### Returns

`Promise`\<`void`\>

***

### processAction()

> **processAction**(`action`): `Promise`\<`void`\>

Defined in: [api.ts:125](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L125)

#### Parameters

##### action

`any`

#### Returns

`Promise`\<`void`\>

***

### registerAction()

> **registerAction**\<`A`\>(`type`, `name`, `processor`, `meta?`): `void`

Defined in: [api.ts:90](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L90)

#### Type Parameters

##### A

`A` *extends* `any`

#### Parameters

##### type

`A`\[`"type"`\]

##### name

`string`

##### processor

[`ActionProcessor`](../type-aliases/ActionProcessor.md)\<`A`\>

##### meta?

[`EditorMeta`](../interfaces/EditorMeta.md) = `{}`

#### Returns

`void`

***

### registerAnimation()

> **registerAnimation**\<`A`\>(`type`, `name`, `builder`, `meta?`): `void`

Defined in: [api.ts:79](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L79)

#### Type Parameters

##### A

`A` *extends* `any`

#### Parameters

##### type

`A`\[`"type"`\]

##### name

`string`

##### builder

[`AnimationBuilder`](../type-aliases/AnimationBuilder.md)\<`A`\>

##### meta?

[`EditorMeta`](../interfaces/EditorMeta.md) = `{}`

#### Returns

`void`

***

### registerEffect()

> **registerEffect**\<`E`\>(`type`, `name`, `builder`, `meta?`): `void`

Defined in: [api.ts:144](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L144)

#### Type Parameters

##### E

`E` *extends* `any`

#### Parameters

##### type

`E`\[`"type"`\]

##### name

`string`

##### builder

[`EffectBuilder`](../type-aliases/EffectBuilder.md)\<`E`\>

##### meta?

[`EditorMeta`](../interfaces/EditorMeta.md) = `{}`

#### Returns

`void`

***

### registerSprite()

> **registerSprite**\<`S`\>(`type`, `name`, `builder`): `void`

Defined in: [api.ts:101](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L101)

#### Type Parameters

##### S

`S` *extends* `any`

#### Parameters

##### type

`S`\[`"type"`\]

##### name

`string`

##### builder

[`SpriteBuilder`](../type-aliases/SpriteBuilder.md)\<`S`\>

#### Returns

`void`

***

### registerTrigger()

> **registerTrigger**(`type`, `label`, `options`): `void`

Defined in: [api.ts:196](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L196)

First-party triggers (door, region) register through this same API.

#### Parameters

##### type

`string`

##### label

`string`

##### options

`TriggerOptions`

#### Returns

`void`

***

### show()

> **show**(`uuid`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [api.ts:213](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L213)

Show a splash at a layer. `global` (GM) shows it table-wide and persists; `targetUser` shows it transiently to one player; otherwise local.

#### Parameters

##### uuid

`string`

##### \_\_namedParameters?

###### global?

`boolean` = `false`

###### layer?

`SplashLayer` = `'full'`

###### targetUser?

`string`

#### Returns

`Promise`\<`void`\>

***

### getInstance()

> `static` **getInstance**(): `SplashAPI`

Defined in: [api.ts:326](https://github.com/FaeyUmbrea/splash/blob/7fffa29a099223456c1becf55125bcdbe84c12a0/src/api/api.ts#L326)

#### Returns

`SplashAPI`
