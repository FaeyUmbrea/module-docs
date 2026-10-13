---
title: "Actor values"
---

Choose a field in the OBS Utils actor-value picker or enter its raw path. These are the **99 curated fields** supplied by CoC **1.0.0**. Some apply only to particular actor types; a missing or unset value isn't zero. The Keeper decides which values to put on stream, including notes and descriptions.

**Armor Has Notes** is a yes/no indicator, rather than the armor note text. Prototype-token fields describe the actor’s default token configuration.


### Basics

| Field | Data path |
| --- | --- |
| Name | `name` |
| Type | `type` |
| Portrait | `img` |
| Actor ID | `_id` |

### Vitals

| Field | Data path |
| --- | --- |
| HP | `system.attribs.hp.value` |
| HP Max | `system.attribs.hp.max` |
| SAN | `system.attribs.san.value` |
| SAN Max | `system.attribs.san.max` |
| SAN Daily Loss | `system.attribs.san.dailyLoss` |
| SAN Daily Limit | `system.attribs.san.dailyLimit` |
| MP | `system.attribs.mp.value` |
| MP Max | `system.attribs.mp.max` |
| Luck | `system.attribs.lck.value` |

### Automatic calculations

| Field | Data path |
| --- | --- |
| Automatic HP Maximum | `system.attribs.hp.auto` |
| Automatic MP Maximum | `system.attribs.mp.auto` |
| Automatic SAN Maximum | `system.attribs.san.auto` |
| Automatic Movement | `system.attribs.mov.auto` |
| Automatic Damage Bonus | `system.attribs.db.auto` |
| Automatic Build | `system.attribs.build.auto` |

### Characteristics

| Field | Data path |
| --- | --- |
| STR | `system.characteristics.str.value` |
| CON | `system.characteristics.con.value` |
| SIZ | `system.characteristics.siz.value` |
| DEX | `system.characteristics.dex.value` |
| APP | `system.characteristics.app.value` |
| INT | `system.characteristics.int.value` |
| POW | `system.characteristics.pow.value` |
| EDU | `system.characteristics.edu.value` |

### Characteristic formulas

| Field | Data path |
| --- | --- |
| Strength formula | `system.characteristics.str.formula` |
| Constitution formula | `system.characteristics.con.formula` |
| Size formula | `system.characteristics.siz.formula` |
| Dexterity formula | `system.characteristics.dex.formula` |
| Appearance formula | `system.characteristics.app.formula` |
| Intelligence formula | `system.characteristics.int.formula` |
| Power formula | `system.characteristics.pow.formula` |
| Education formula | `system.characteristics.edu.formula` |

### Derived checks

| Field | Data path |
| --- | --- |
| Knowledge | `system.config.know.value` |
| Knowledge bonus dice | `system.config.know.bonusDice` |
| Idea | `system.config.idea.value` |
| Idea bonus dice | `system.config.idea.bonusDice` |
| Natural healing per day | `system.config.naturalHealing` |
| Luck to avoid unconsciousness | `system.config.luckAvoidUnconsciousness` |

### Combat

| Field | Data path |
| --- | --- |
| Damage Bonus | `system.attribs.db.value` |
| Build | `system.attribs.build.value` |
| Armor | `system.attribs.armor.value` |
| Movement | `system.attribs.mov.value` |
| Movement Type | `system.attribs.mov.type` |
| Armor Has Notes | `system.attribs.armor.notes` |

### Status

| Field | Data path |
| --- | --- |
| Critical Wounds | `system.conditions.criticalWounds.value` |
| Unconscious | `system.conditions.unconscious.value` |
| Dying | `system.conditions.dying.value` |
| Dead | `system.conditions.dead.value` |
| Prone | `system.conditions.prone.value` |
| Temporarily Insane | `system.conditions.tempoInsane.value` |
| Temporary Insanity Uses Real Time | `system.conditions.tempoInsane.realTime` |
| Temporary Insanity Duration | `system.conditions.tempoInsane.duration` |
| Indefinitely Insane | `system.conditions.indefInsane.value` |

### Details

| Field | Data path |
| --- | --- |
| Occupation | `system.infos.occupation` |
| Age | `system.infos.age` |
| Gender | `system.infos.sex` |
| Residence | `system.infos.residence` |
| Birthplace | `system.infos.birthplace` |
| Archetype | `system.infos.archetype` |
| Organization | `system.infos.organization` |
| Player Name | `system.infos.playername` |
| NPC Type | `system.infos.type` |

### Descriptions

| Field | Data path |
| --- | --- |
| Backstory | `system.backstory` |
| Description | `system.description.value` |
| Keeper description | `system.description.keeper` |
| Personal description | `system.biography.personalDescription.value` |
| Investigator notes | `system.notes` |

### Token defaults

| Field | Data path |
| --- | --- |
| Token Name | `prototypeToken.name` |
| Token Image | `prototypeToken.texture.src` |
| Token Display Name | `prototypeToken.displayName` |
| Token Actor Link | `prototypeToken.actorLink` |

### Investigator Development

| Field | Data path |
| --- | --- |
| Personal Skill Points | `system.development.personal` |
| Occupation Skill Points | `system.development.occupation` |
| Archetype Skill Points | `system.development.archetype` |
| Experience Package Skill Points | `system.development.experiencePackage` |

### Finances

| Field | Data path |
| --- | --- |
| Currency Format | `system.monetary.format` |
| Currency Symbol | `system.monetary.symbol` |
| Amount Spent | `system.monetary.spent` |
| Spending Level | `system.monetary.spendingLevel` |
| Cash | `system.monetary.cash` |
| Assets | `system.monetary.assets` |
| Asset Details | `system.monetary.assetsDetails` |

### Investigator Flags

| Field | Data path |
| --- | --- |
| Mythos Hardened | `system.flags.mythosHardened` |
| Mythos Insanity Experienced | `system.flags.mythosInsanityExperienced` |

### NPC and Creature

| Field | Data path |
| --- | --- |
| SAN Loss on Passed Check | `system.special.sanLoss.checkPassed` |
| SAN Loss on Failed Check | `system.special.sanLoss.checkFailled` |
| Attacks per Round | `system.special.attacksPerRound` |

### Vehicle

| Field | Data path |
| --- | --- |
| Vehicle HP | `system.stats.hp` |
| Vehicle movement | `system.stats.mov` |
| Vehicle maximum build | `system.stats.build.value` |
| Vehicle current build | `system.stats.build.current` |
| Vehicle armor | `system.stats.armor.value` |
| Total crew | `system.crew.total` |
| Armed | `system.properties.armed` |
| Origin | `system.infos.origin` |

### Armor configuration

| Field | Data path |
| --- | --- |
| Localized vehicle armor | `system.stats.armor.localized` |
